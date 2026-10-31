"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawn } = require("node:child_process");

// Keep compatible video copies across reboots and VS Code updates. They are
// derived files outside the course repository, never extra Git LFS objects.
const CACHE_BASE = process.env.LOCALAPPDATA || process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache");
const CACHE_DIR = path.join(CACHE_BASE, "vscode-video-player", "h264");
const inFlight = new Map();

function retainVideo(_file) { /* persistent copies are never evicted while playing */ }
function releaseVideo(_file) { /* reserved for future cache maintenance */ }

function pruneVideoCache() {
  try {
    for (const name of fs.readdirSync(CACHE_DIR)) {
      if (!/^unmute-video-[a-f0-9]{16}\.part\.mp4$/.test(name)) continue;
      const file = path.join(CACHE_DIR, name);
      if (fs.statSync(file).mtimeMs > Date.now() - 24 * 60 * 60 * 1000) continue;
      try {
        fs.unlinkSync(file);
      } catch { /* another process may still be writing it */ }
    }
  } catch {
    // Old partial-file cleanup must never stop playback.
  }
}

async function compatibleVideo(ffmpeg, input) {
  const stat = fs.statSync(input);
  const key = crypto.createHash("md5")
    .update(`${input}\0${stat.size}\0${stat.mtimeMs}\0h264-crf23-v1`)
    .digest("hex").slice(0, 16);
  const out = path.join(CACHE_DIR, `unmute-video-${key}.mp4`);
  if (fs.existsSync(out)) {
    return out;
  }
  if (inFlight.has(key)) return inFlight.get(key);
  const pending = convert(ffmpeg, input, out).finally(() => inFlight.delete(key));
  inFlight.set(key, pending);
  return pending;
}

async function convert(ffmpeg, input, out) {
  fs.mkdirSync(CACHE_DIR, { recursive: true, mode: 0o700 });
  if (fs.existsSync(out)) return out;
  const temp = path.join(CACHE_DIR, `unmute-video-${crypto.randomBytes(8).toString("hex")}.part.mp4`);
  try {
    await new Promise((resolve, reject) => {
      let stderr = "";
      const child = spawn(ffmpeg, [
        "-nostdin", "-v", "error", "-i", input,
        "-map", "0:v:0", "-an", "-c:v", "libx264", "-preset", "veryfast",
        "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        "-y", temp,
      ], { stdio: ["ignore", "ignore", "pipe"] });
      child.stderr.on("data", (chunk) => { stderr = (stderr + chunk).slice(-4096); });
      child.on("error", reject);
      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Video conversion failed (${code}): ${stderr.trim()}`));
      });
    });
    fs.renameSync(temp, out);
    return out;
  } finally {
    try { fs.unlinkSync(temp); } catch { /* no partial file to remove */ }
  }
}

module.exports = { compatibleVideo, pruneVideoCache, retainVideo, releaseVideo };
