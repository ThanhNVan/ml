"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");

// The provider is normally loaded by VS Code; these file-reading methods do
// not need the editor API, so a small stub keeps this test dependency-free.
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === "vscode") return {};
  return originalLoad.call(this, request, parent, isMain);
};
const { PlayerEditorProvider } = require("./vscode-video-player/out/editor/playerEditorProvider.js");
Module._load = originalLoad;

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "unmute-subtitles-"));
const video = path.join(dir, "lesson (1).mp4");
const sidecar = path.join(dir, "lesson (1).vtt");
const alternate = path.join(dir, "chosen.srt");
const invalid = path.join(dir, "chosen.txt");

try {
  fs.writeFileSync(sidecar, "WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nDefault\n");
  fs.writeFileSync(alternate, "1\n00:00:01,000 --> 00:00:02,000\nChosen\n");
  fs.writeFileSync(invalid, "not subtitles\n");
  const provider = new PlayerEditorProvider({}, {});
  assert.equal(provider.readSidecarSubtitles(video).label, "lesson (1).vtt");
  assert.match(provider.readSubtitleFile(alternate).vtt, /WEBVTT[\s\S]*00:00:01\.000[\s\S]*Chosen/);
  assert.throws(() => provider.readSubtitleFile(invalid), /\.vtt or \.srt/);
  assert.equal(provider.readSidecarSubtitles(path.join(dir, "other.mp4")), undefined);
  console.log("Local subtitle lookup and file selection: OK");
} finally {
  fs.unlinkSync(sidecar);
  fs.unlinkSync(alternate);
  fs.unlinkSync(invalid);
  fs.rmdirSync(dir);
}
