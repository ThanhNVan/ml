"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { AudioEnhancementController, speechIntervals } = require("./vscode-video-player/out/editor/audioEnhancementController");

async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "enhance-audio-test-"));
  const video = path.join(dir, "lesson.mp4");
  const target = path.join(dir, "lesson-enhanced.mp4");
  const vtt = "WEBVTT\n\n00:00:00.400 --> 00:00:00.900\nHello\n\n00:00:01.500 --> 00:00:02.000\nAgain\n";
  try {
    assert.deepEqual(speechIntervals(vtt), [[0.2, 1.1], [1.3, 2.2]]);
    assert.throws(() => speechIntervals("WEBVTT\n\n"), /no timed captions/);
    fs.writeFileSync(path.join(dir, "lesson.vtt"), vtt);
    execFileSync("ffmpeg", ["-nostdin", "-loglevel", "error", "-f", "lavfi", "-i", "color=c=black:s=160x90:r=10:d=3", "-f", "lavfi", "-i", "sine=frequency=440:duration=3", "-shortest", "-c:v", "mpeg4", "-c:a", "aac", video]);
    const original = fs.readFileSync(video);
    const messages = [];
    let confirmed = false;
    const controller = new AudioEnhancementController(video, message => messages.push(message), {
      isTrusted: () => true,
      confirm: async () => { confirmed = true; return true; },
      getFfmpeg: async () => "ffmpeg",
    });
    await controller.start();
    assert.equal(confirmed, true);
    assert.equal(messages.at(-1).warning, undefined, messages.at(-1).message);
    assert.equal(fs.existsSync(target), true);
    assert.equal(fs.readFileSync(path.join(dir, "lesson-enhanced.vtt"), "utf8"), vtt);
    assert.deepEqual(fs.readFileSync(video), original, "original video stays unchanged");
    const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", target], { encoding: "utf8" }));
    assert.ok(duration > 2.8 && duration < 3.2, `unexpected duration ${duration}`);
    const rms = at => {
      const samples = execFileSync("ffmpeg", ["-nostdin", "-loglevel", "error", "-ss", String(at), "-i", target, "-t", "0.1", "-vn", "-ac", "1", "-ar", "48000", "-f", "f32le", "pipe:1"]);
      let power = 0;
      for (let i = 0; i < samples.length; i += 4) power += samples.readFloatLE(i) ** 2;
      return Math.sqrt(power / (samples.length / 4));
    };
    assert.ok(rms(2.5) < rms(0.6) * 0.4, "sound between captions is attenuated");
    await controller.start();
    assert.match(messages.at(-1).message, /already exist/);
    controller.dispose();
    const webm = path.join(dir, "clip.webm");
    execFileSync("ffmpeg", ["-nostdin", "-loglevel", "error", "-i", video, "-c:v", "libvpx-vp9", "-c:a", "libopus", webm]);
    fs.writeFileSync(path.join(dir, "clip.vtt"), vtt);
    const webmMessages = [];
    const webmController = new AudioEnhancementController(webm, message => webmMessages.push(message), {
      isTrusted: () => true,
      confirm: async () => true,
      getFfmpeg: async () => "ffmpeg",
    });
    await webmController.start();
    assert.equal(webmMessages.at(-1).warning, undefined, webmMessages.at(-1).message);
    assert.equal(fs.existsSync(path.join(dir, "clip-enhanced.webm")), true);
    webmController.dispose();
    console.log("Caption-guided audio enhancement: OK");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
