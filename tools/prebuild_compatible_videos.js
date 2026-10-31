"use strict";

// Prepare persistent H.264 playback copies for MP4 files whose video codec
// cannot be decoded by the VS Code webview. Source files are never changed.
const fs = require("node:fs");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const { compatibleVideo } = require("./vscode-video-player/out/media/video.js");
const run = promisify(execFile);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(name);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".mp4") ? [name] : [];
  });
}

async function probe(file) {
  const { stdout } = await run("ffprobe", [
    "-v", "error", "-show_entries", "format=duration:stream=codec_name,codec_type",
    "-of", "json", file,
  ]);
  const result = JSON.parse(stdout);
  return {
    video: result.streams.find((stream) => stream.codec_type === "video")?.codec_name,
    duration: Number(result.format.duration),
  };
}

async function main() {
  if (process.argv.length !== 3) {
    throw new Error("Usage: node tools/prebuild_compatible_videos.js <course folder>");
  }
  const root = path.resolve(process.argv[2]);
  if (!fs.statSync(root).isDirectory()) throw new Error(`Not a directory: ${root}`);
  const files = walk(root);
  console.log(`Checking ${files.length} MP4 files in ${root}`);
  let next = 0;
  let converted = 0;
  let skipped = 0;
  const failures = [];
  const workers = Array.from({ length: 4 }, async () => {
    while (next < files.length) {
      const file = files[next++];
      try {
        const source = await probe(file);
        if (source.video === "h264") {
          skipped++;
          continue;
        }
        const output = await compatibleVideo("ffmpeg", file);
        const prepared = await probe(output);
        if (prepared.video !== "h264" || Math.abs(prepared.duration - source.duration) > 0.2) {
          throw new Error("Prepared video failed codec or duration check");
        }
        converted++;
        console.log(`${converted} ready: ${path.relative(root, file)}`);
      } catch (error) {
        failures.push(file);
        console.error(`FAILED: ${path.relative(root, file)}: ${error.message}`);
      }
    }
  });
  await Promise.all(workers);
  console.log(`Ready: ${converted}; already compatible: ${skipped}; failed: ${failures.length}`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
