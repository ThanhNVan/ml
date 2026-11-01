"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

function validateVtt(text) {
  if (!/^WEBVTT(?:\r?\n)/.test(text)) throw new Error("Speech runner did not produce WebVTT captions.");
  if (!/\d\d:\d\d:\d\d\.\d{3} --> \d\d:\d\d:\d\d\.\d{3}[ \t]*\r?\n[ \t]*\S/.test(text)) {
    throw new Error("Speech runner produced no timed captions.");
  }
  return text;
}

async function writeVttAtomic(videoPath, vtt, original) {
  validateVtt(vtt);
  const target = path.join(path.dirname(videoPath), `${path.basename(videoPath, path.extname(videoPath))}.vtt`);
  const temp = `${target}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  try {
    await fsp.writeFile(temp, vtt, { encoding: "utf8", flag: "wx" });
    if (original !== undefined) {
      let current = null;
      try { current = await fsp.readFile(target); }
      catch (error) { if (error.code !== "ENOENT") throw error; }
      if (original === null ? current !== null : current === null || !current.equals(original)) {
        throw new Error("English captions changed during transcription; nothing was replaced.");
      }
      if (original === null) {
        await fsp.link(temp, target);
        return { vtt, label: path.basename(target) };
      }
    }
    await fsp.rename(temp, target);
    return { vtt, label: path.basename(target) };
  } finally {
    await fsp.rm(temp, { force: true });
  }
}

async function transcribeMp3(mp3Path, modelPath, runnerPath, signal) {
  if (signal?.aborted) throw new Error("Caption generation cancelled.");
  const dir = await fsp.mkdtemp(path.join(os.tmpdir(), "get-cc-"));
  const output = path.join(dir, "captions");
  try {
    if (signal?.aborted) throw new Error("Caption generation cancelled.");
    await new Promise((resolve, reject) => {
      const child = spawn(runnerPath, ["-m", path.resolve(modelPath), "-f", path.resolve(mp3Path), "-l", "en", "-ng", "-ovtt", "-of", output], {
        cwd: path.dirname(runnerPath), stdio: ["ignore", "ignore", "pipe"], windowsHide: true,
      });
      let stderr = "";
      child.stderr.on("data", chunk => { stderr = (stderr + chunk.toString()).slice(-2048); });
      const onAbort = () => child.kill();
      const finish = error => {
        signal?.removeEventListener("abort", onAbort);
        error ? reject(error) : resolve();
      };
      child.once("error", finish);
      child.once("close", code => finish(code === 0 ? null : new Error(`Speech recognition failed (${code}): ${stderr.trim()}`)));
      if (signal) {
        signal.addEventListener("abort", onAbort, { once: true });
        if (signal.aborted) onAbort();
      }
    });
    if (signal?.aborted) throw new Error("Caption generation cancelled.");
    return validateVtt(await fsp.readFile(`${output}.vtt`, "utf8"));
  } finally {
    await fsp.rm(dir, { recursive: true, force: true });
  }
}

module.exports = { validateVtt, writeVttAtomic, transcribeMp3 };
