"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { extractAudio } = require("./vscode-video-player/out/media/audio.js");

function toneAmplitude(file, frequency) {
  const pcm = execFileSync("ffmpeg", [
    "-v", "error", "-i", file, "-ac", "1", "-ar", "44100",
    "-f", "f32le", "-",
  ]);
  let real = 0;
  let imaginary = 0;
  const samples = pcm.length / 4;
  for (let i = 0; i < samples; i++) {
    const sample = pcm.readFloatLE(i * 4);
    const phase = 2 * Math.PI * frequency * i / 44100;
    real += sample * Math.cos(phase);
    imaginary += sample * Math.sin(phase);
  }
  return 2 * Math.hypot(real, imaginary) / samples;
}

async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "video-audio-filter-"));
  const source = path.join(dir, "two-tones.wav");
  let filtered;
  try {
    execFileSync("ffmpeg", [
      "-v", "error", "-f", "lavfi", "-i", "sine=frequency=1000:duration=2:sample_rate=44100",
      "-f", "lavfi", "-i", "sine=frequency=11334.5:duration=2:sample_rate=44100",
      "-filter_complex", "[0:a][1:a]amix=inputs=2:normalize=0[a]",
      "-map", "[a]", "-c:a", "pcm_s16le", source,
    ]);
    filtered = await extractAudio("ffmpeg", source);
    const notchDb = 20 * Math.log10(toneAmplitude(filtered, 11334.5) / toneAmplitude(source, 11334.5));
    const speechDb = 20 * Math.log10(toneAmplitude(filtered, 1000) / toneAmplitude(source, 1000));
    assert.ok(notchDb < -25, `11.334 kHz tone only reduced ${notchDb.toFixed(1)} dB`);
    assert.ok(Math.abs(speechDb) < 1, `1 kHz tone changed ${speechDb.toFixed(1)} dB`);
    console.log(`Audio filter: 11.334 kHz ${notchDb.toFixed(1)} dB; 1 kHz ${speechDb.toFixed(1)} dB`);
  } finally {
    if (filtered) fs.rmSync(filtered, { force: true });
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
