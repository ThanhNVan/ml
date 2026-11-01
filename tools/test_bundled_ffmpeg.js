"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const childProcess = require("node:child_process");

async function main() {
  const extension = fs.mkdtempSync(path.join(os.tmpdir(), "bundled-ffmpeg-test-"));
  const media = path.join(extension, "out", "media");
  const bin = path.join(extension, "bin", "win32-x64", "ffmpeg.exe");
  const original = childProcess.execFile;
  fs.mkdirSync(media, { recursive: true });
  fs.mkdirSync(path.dirname(bin), { recursive: true });
  fs.copyFileSync(path.join(__dirname, "vscode-video-player", "out", "media", "audio.js"), path.join(media, "audio.js"));
  fs.writeFileSync(bin, "test executable placeholder");
  childProcess.execFile = (file, args, options, callback) => callback(file === bin ? null : new Error("missing"));
  try {
    const { findFfmpeg, resetFfmpegCache } = require(path.join(media, "audio.js"));
    resetFfmpegCache();
    assert.equal(await findFfmpeg(), bin);
  } finally {
    childProcess.execFile = original;
    fs.rmSync(extension, { recursive: true, force: true });
  }
  console.log("Bundled ffmpeg: OK");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
