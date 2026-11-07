"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const source = fs.readFileSync(__dirname + "/vscode-video-player/media/player.js", "utf8");
const start = source.indexOf("  function isTypingTarget(el)");
const end = source.indexOf("  (function() {", start);
let keydown;
const seeks = [];
const controller = { duration: 200, seekTo: time => seeks.push(time) };
vm.runInNewContext(source.slice(start, end), {
  controller, document: { addEventListener: (type, fn) => { keydown = fn; } }
});
function press(code, key, extra = {}) {
  let prevented = false;
  keydown({code, key, target: {tagName: "VIDEO"}, preventDefault() { prevented = true; }, ...extra});
  return prevented;
}
for (const [digit, expected] of [[1,20],[2,40],[3,60],[4,80],[5,100],[6,120],[7,140],[8,160],[9,180],[0,0]]) {
  assert.equal(press("Digit" + digit, String(digit)), true);
  assert.equal(seeks.at(-1), expected);
}
const count = seeks.length;
for (const extra of [{ctrlKey:true},{altKey:true},{metaKey:true},{shiftKey:true},{target:{tagName:"INPUT"}},{target:{tagName:"TEXTAREA"}},{target:{isContentEditable:true}}]) {
  assert.equal(press("Digit5", "5", extra), false);
}
assert.equal(press("Numpad5", "5"), false);
for (const duration of [NaN, Infinity, 0]) {
  controller.duration = duration;
  press("Digit5", "5");
}
assert.equal(seeks.length, count);
console.log("Top-row percentage seeking and shortcut guards: OK");
