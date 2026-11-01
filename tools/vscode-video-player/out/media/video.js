"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawn } = require("node:child_process");

const CACHE_DIR = path.join(os.tmpdir(), "unmute-video-cache");
const CACHE_LIMIT = 512 * 1024 * 1024;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const inFlight = new Map();
const active = new Map();

function retainVideo(file) { active.set(file, (active.get(file) ?? 0) + 1); }
function releaseVideo(file) {
  const remaining = (active.get(file) ?? 1) - 1;
  if (remaining > 0) active.set(file, remaining);
  else active.delete(file);
}

function pruneVideoCache(exclude) {
  try {
    const entries = fs.readdirSync(CACHE_DIR)
      .filter((name) => /^unmute-video-[a-f0-9]{16}\.mp4$/.test(name))
      .map((name) => {
        const file = path.join(CACHE_DIR, name);
        return { file, stat: fs.statSync(file) };
      })
      .sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs);
    let total = entries.reduce((sum, entry) => sum + entry.stat.size, 0);
    const cutoff = Date.now() - MAX_AGE_MS;
    for (const entry of entries) {
      if (entry.file === exclude || active.has(entry.file) || (entry.stat.mtimeMs >= cutoff && total <= CACHE_LIMIT)) continue;
      try {
        fs.unlinkSync(entry.file);
        total -= entry.stat.size;
      } catch {
        // A file currently being played may be locked on Windows.
      }
    }
  } catch {
    // Cache cleanup must never stop playback.
  }
}

async function compatibleVideo(ffmpeg, input) {
  const stat = fs.statSync(input);
  const key = crypto.createHash("md5")
    .update(`${input}\0${stat.size}\0${stat.mtimeMs}\0h264-crf23-v1`)
    .digest("hex").slice(0, 16);
  const out = path.join(CACHE_DIR, `unmute-video-${key}.mp4`);
  if (fs.existsSync(out)) {
    fs.utimesSync(out, new Date(), new Date());
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
    pruneVideoCache(out);
    return out;
  } finally {
    try { fs.unlinkSync(temp); } catch { /* no partial file to remove */ }
  }
}

module.exports = { compatibleVideo, pruneVideoCache, retainVideo, releaseVideo };
