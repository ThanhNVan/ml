"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "vscode-video-player/media/player.js"), "utf8");
const start = source.indexOf("  var Seekbar = class {");
const end = source.indexOf("  // src/webview/status.ts", start);
assert.ok(start >= 0 && end > start);

const events = {};
let timer;
const el = name => ({
  addEventListener(type, listener) { events[name + ":" + type] = listener; },
  style: {},
  classList: { add() {}, remove() {} },
  setAttribute() {},
});
const seek = el("seek");
seek.getBoundingClientRect = () => ({ left: 10, width: 200 });
const preview = el("preview");
preview.readyState = 1;
preview.seeking = false;
const tooltip = el("tooltip");
tooltip.hidden = true;
const els = {
  seek,
  seekPreview: tooltip,
  previewVideo: preview,
  previewTime: el("time"),
};
const window = {
  addEventListener(type, listener) { events["window:" + type] = listener; },
  setTimeout(callback) { timer = callback; return 1; },
  clearTimeout() { timer = undefined; },
};
const Seekbar = vm.runInNewContext(source.slice(start, end) + "\nSeekbar", {
  els, window,
  formatTime: seconds => `0:${String(Math.floor(seconds)).padStart(2, "0")}`,
  ratioInRect: (x, left, width) => Math.max(0, Math.min(1, (x - left) / width)),
});
const seeks = [];
const bar = new Seekbar({ duration: 100, seekTo(time) { seeks.push(time); } });
bar.setPreviewSource("http://127.0.0.1/video");
events["seek:mousemove"]({ clientX: 110 });
assert.equal(tooltip.hidden, false);
assert.equal(els.previewTime.textContent, "0:50");
assert.equal(preview.currentTime, undefined, "hover seek is delayed");
timer();
assert.equal(preview.currentTime, 50);
assert.deepEqual(seeks, [], "hover must not move playback");
preview.readyState = 2;
events["preview:seeked"]();
assert.equal(preview.style.visibility, "visible");
events["seek:mouseleave"]();
assert.equal(tooltip.hidden, true);
preview.currentTime = 0;
events["seek:mousemove"]({ clientX: 10 });
timer();
assert.equal(preview.style.visibility, "visible", "the first frame also previews without a seek event");
console.log("Seek hover previews a frame without moving playback: OK");
