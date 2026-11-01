"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "vscode-video-player/media/player.js"), "utf8");
const start = source.indexOf("  // src/webview/status.ts");
const end = source.indexOf("  function flashFeedback", start);
assert.ok(start >= 0 && end > start);

const classes = new Set();
const els = {
  status: { hidden: true, classList: { add: x => classes.add(x), remove: x => classes.delete(x) }, setAttribute() {} },
  statusSpinner: { hidden: true },
  statusText: { textContent: "" },
  statusAction: { hidden: true, textContent: "" },
  statusActionSecondary: { hidden: true, textContent: "" },
};
const timers = new Map();
let nextTimer = 0;
const window = {
  setTimeout(callback, delay) { const id = ++nextTimer; timers.set(id, { callback, delay }); return id; },
  clearTimeout(id) { timers.delete(id); },
};
const status = vm.runInNewContext(source.slice(start, end) + "\n({ showStatus, clearStatus })", { els, window });

status.showStatus("Saved captions", "info", 5000);
assert.equal(els.status.hidden, false);
assert.equal(timers.size, 1, "success notice should schedule dismissal");
const first = [...timers.values()][0];
assert.equal(first.delay, 5000);
first.callback();
assert.equal(els.status.hidden, true, "success notice should disappear");

status.showStatus("Saved captions", "info", 5000);
status.showStatus("New error", "warning");
assert.equal(timers.size, 0, "new status cancels the earlier dismissal");
assert.equal(els.status.hidden, false);
assert.equal(els.statusText.textContent, "New error");
console.log("Status success timeout and replacement: OK");
