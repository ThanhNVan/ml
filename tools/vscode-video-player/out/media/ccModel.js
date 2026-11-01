"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const http = require("node:http");
const https = require("node:https");
const path = require("node:path");
const { pipeline } = require("node:stream/promises");

// Quantized small.en retains the course script's English model family while
// keeping the one-time download below 200 MB.
const MODEL_URL = "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en-q5_1.bin";
const MODEL_SHA256 = "bfdff4894dcb76bbf647d56263ea2a96645423f1669176f4844a1bf8e478ad30";
const MODEL_NAME = "ggml-small.en-q5_1.bin";

function ccRunnerPath(extensionPath, platform = process.platform, arch = process.arch) {
  if (platform !== "win32" || arch !== "x64") {
    throw new Error(`Get CC is unsupported on ${platform}-${arch}; this VSIX includes a Windows x64 runner.`);
  }
  const runner = path.join(extensionPath, "bin", "win32-x64", "whisper-cli.exe");
  if (!fs.existsSync(runner)) throw new Error("Get CC speech runner is missing from this extension installation.");
  return runner;
}

async function fileSha256(file) {
  const hash = crypto.createHash("sha256");
  await pipeline(fs.createReadStream(file), hash);
  return hash.digest("hex");
}

async function download(url, target, progress, signal, redirects = 0) {
  if (redirects > 5) throw new Error("Too many model download redirects.");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && parsed.hostname === "127.0.0.1")) {
    throw new Error("Model download requires HTTPS.");
  }
  const agent = parsed.protocol === "https:" ? https : http;
  const response = await new Promise((resolve, reject) => {
    const request = agent.get(parsed, resolve);
    request.on("error", reject);
    if (signal) signal.addEventListener("abort", () => request.destroy(new Error("Caption generation cancelled.")), { once: true });
  });
  if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
    const next = response.headers.location;
    response.resume();
    if (!next) throw new Error("Model download redirect has no destination.");
    return download(new URL(next, url).href, target, progress, signal, redirects + 1);
  }
  if (response.statusCode !== 200) {
    response.resume();
    throw new Error(`Model download failed (HTTP ${response.statusCode}).`);
  }
  const size = Number(response.headers["content-length"] || 0);
  let bytes = 0;
  response.on("data", chunk => {
    bytes += chunk.length;
    if (size > 0) progress(`Downloading English speech model… ${Math.floor(bytes * 100 / size)}%`);
  });
  await pipeline(response, fs.createWriteStream(target, { flags: "wx" }), { signal });
}

async function ensureCcModel(storagePath, progress = () => {}, signal, url = MODEL_URL, sha256 = MODEL_SHA256, extensionPath) {
  if (extensionPath && process.platform === "win32" && process.arch === "x64") {
    const bundled = path.join(extensionPath, "bin", "win32-x64", MODEL_NAME);
    if (fs.existsSync(bundled)) {
      if (await fileSha256(bundled) !== sha256) throw new Error("Bundled speech model failed SHA-256 verification.");
      return bundled;
    }
  }
  await fsp.mkdir(storagePath, { recursive: true });
  const model = path.join(storagePath, MODEL_NAME);
  if (fs.existsSync(model) && await fileSha256(model) === sha256) return model;
  const temp = `${model}.${crypto.randomBytes(6).toString("hex")}.part`;
  try {
    progress("Downloading English speech model…");
    await download(url, temp, progress, signal);
    if (await fileSha256(temp) !== sha256) throw new Error("Downloaded speech model failed SHA-256 verification.");
    await fsp.rename(temp, model);
    return model;
  } finally {
    await fsp.rm(temp, { force: true });
  }
}

module.exports = { ensureCcModel, ccRunnerPath, MODEL_NAME };
