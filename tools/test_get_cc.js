"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { ensureCcModel, ccRunnerPath } = require("./vscode-video-player/out/media/ccModel.js");
const { writeVttAtomic, validateVtt, transcribeMp3 } = require("./vscode-video-player/out/media/transcription.js");
const { extractAudio } = require("./vscode-video-player/out/media/audio.js");
const { CcController } = require("./vscode-video-player/out/editor/ccController.js");

async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "get-cc-test-"));
  const video = path.join(dir, "lesson (1).mp4");
  const caption = path.join(dir, "lesson (1).vtt");
  const valid = "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nHello world\n";
  const payload = Buffer.from("fake model bytes");
  const digest = crypto.createHash("sha256").update(payload).digest("hex");
  let requests = 0;
  const server = http.createServer((req, res) => { requests++; res.end(payload); });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    assert.equal(validateVtt(valid), valid);
    assert.equal(validateVtt(valid.replace("Hello world", " Hello world")), valid.replace("Hello world", " Hello world"));
    assert.throws(() => validateVtt("WEBVTT\n\nno speech"), /timed captions/);
    await writeVttAtomic(video, valid);
    assert.equal(fs.readFileSync(caption, "utf8"), valid);
    await assert.rejects(writeVttAtomic(video, "invalid"), /WebVTT/);
    assert.equal(fs.readFileSync(caption, "utf8"), valid, "failed generation preserves old captions");
    const original = fs.readFileSync(caption);
    fs.writeFileSync(caption, "edited while transcribing");
    await assert.rejects(writeVttAtomic(video, valid, original), /changed/i);
    assert.equal(fs.readFileSync(caption, "utf8"), "edited while transcribing");
    await assert.rejects(writeVttAtomic(video, valid, null), /changed/i);
    fs.unlinkSync(caption);
    await writeVttAtomic(video, valid, null);

    const stopped = new AbortController();
    stopped.abort();
    await assert.rejects(transcribeMp3("missing.mp3", "missing.bin", "missing.exe", stopped.signal), /cancel/i);
    await assert.rejects(extractAudio("missing.exe", "missing.mp4", stopped.signal), /cancel/i);

    const url = `http://127.0.0.1:${server.address().port}/model`;
    const model = await ensureCcModel(dir, () => {}, undefined, url, digest);
    assert.deepEqual(fs.readFileSync(model), payload);
    assert.equal(await ensureCcModel(dir, () => {}, undefined, url, digest), model);
    assert.equal(requests, 1, "verified model cache is reused");
    fs.writeFileSync(model, "corrupt");
    await ensureCcModel(dir, () => {}, undefined, url, digest);
    assert.deepEqual(fs.readFileSync(model), payload, "corrupt cache is repaired");
    assert.equal(requests, 2);
    const packaged = path.join(dir, "bin", "win32-x64");
    fs.mkdirSync(packaged, { recursive: true });
    fs.writeFileSync(path.join(packaged, "ggml-small.en-q5_1.bin"), payload);
    const offline = await ensureCcModel(path.join(dir, "fresh-storage"), () => {}, undefined, url, digest, dir);
    assert.equal(offline, path.join(packaged, "ggml-small.en-q5_1.bin"), "bundled model works without a download");
    assert.equal(requests, 2);
    assert.throws(() => ccRunnerPath(dir, "plan9", "x64"), /unsupported/i);
    assert.match(ccRunnerPath(path.join(__dirname, "vscode-video-player"), "win32", "x64"), /whisper-cli\.exe$/);

    const messages = [];
    let confirmations = 0;
    const services = {
      isTrusted: () => true,
      confirm: async () => { confirmations++; return false; },
      getMp3: async () => "audio.mp3",
      getModel: async () => "model.bin",
      transcribe: async () => valid,
      write: writeVttAtomic,
    };
    const controller = new CcController(video, message => messages.push(message), services);
    await controller.start();
    assert.equal(confirmations, 1);
    assert.equal(fs.readFileSync(caption, "utf8"), valid, "cancel keeps existing caption");
    assert.equal(messages.at(-1).running, false);

    services.isTrusted = () => false;
    await controller.start();
    assert.equal(confirmations, 1, "untrusted workspace cannot confirm or run");
    services.isTrusted = () => true;
    services.confirm = async () => true;
    services.transcribe = async () => { throw new Error("worker failed"); };
    await controller.start();
    assert.equal(fs.readFileSync(caption, "utf8"), valid, "worker failure keeps existing caption");
    assert.match(messages.at(-1).message, /worker failed/);

    services.transcribe = async () => {
      fs.writeFileSync(caption, "edited in another editor");
      return valid;
    };
    await controller.start();
    assert.equal(fs.readFileSync(caption, "utf8"), "edited in another editor");
    assert.match(messages.at(-1).message, /changed during transcription/);
    fs.writeFileSync(caption, valid);

    let release;
    services.transcribe = () => new Promise(resolve => { release = resolve; });
    const pending = controller.start();
    await new Promise(resolve => setImmediate(resolve));
    const duplicate = controller.start();
    assert.equal(pending, duplicate, "duplicate click shares the active job");
    controller.dispose();
    release(valid);
    await pending;
    assert.equal(fs.readFileSync(caption, "utf8"), valid, "closing editor prevents writing captions");
    console.log("Get CC model and caption safety: OK");
  } finally {
    server.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
