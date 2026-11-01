"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const Module = require("node:module");

async function main() {
  const source = fs.readFileSync(path.join(__dirname, "vscode-video-player/media/player.js"), "utf8");
  const start = source.indexOf("  function toggleFullscreen() {");
  const end = source.indexOf("  function postStatusAction(", start);
  assert.ok(start >= 0 && end > start, "fullscreen handler exists");

  const handlers = {};
  const messages = [];
  const fsBtn = {
    addEventListener(name, listener) { handlers[name] = listener; },
    setAttribute() {},
  };
  vm.runInNewContext(source.slice(start, end), {
    document: { fullscreenElement: null, addEventListener() {} },
    els: {
      fsBtn,
      player: { requestFullscreen() { return Promise.resolve(); } },
      stage: { requestFullscreen() { return Promise.resolve(); } },
    },
    vscode: { postMessage(message) { messages.push(message); } },
  });
  handlers.click();
  assert.equal(messages.length, 1, "the button must ask VS Code to change its layout");
  assert.equal(messages[0].type, "action");
  assert.equal(messages[0].name, "toggleFullscreen");

  const commands = [];
  const vscode = {
    Uri: { joinPath(base, name) { return { fsPath: path.join(base.fsPath, name) }; } },
    workspace: { isTrusted: true, getConfiguration() { return { get() { return undefined; } }; } },
    commands: { executeCommand(name) { commands.push(name); return Promise.resolve(); } },
    window: { showWarningMessage() { return Promise.resolve(); } },
  };
  const originalLoad = Module._load;
  Module._load = function(request, parent, isMain) {
    if (request === "vscode") return vscode;
    return originalLoad.call(this, request, parent, isMain);
  };
  let PlayerEditorProvider;
  try {
    ({ PlayerEditorProvider } = require("./vscode-video-player/out/editor/playerEditorProvider.js"));
  } finally {
    Module._load = originalLoad;
  }
  let receive;
  const webview = {
    cspSource: "test:",
    asWebviewUri(uri) { return { toString() { return uri.fsPath; } }; },
    onDidReceiveMessage(listener) { receive = listener; return { dispose() {} }; },
    postMessage() { return Promise.resolve(); },
  };
  const provider = new PlayerEditorProvider({
    extensionUri: { fsPath: path.join(__dirname, "vscode-video-player") },
    workspaceState: { get() { return 0; } },
    globalState: { get() { return undefined; } },
  }, {
    register() { return "video"; },
    urlFor() { return "http://127.0.0.1:1234/video"; },
    getPort() { return 1234; },
  });
  await provider.resolveCustomEditor({ uri: { fsPath: "lesson.webm" } }, {
    webview,
    onDidDispose() {},
  });
  await receive(messages[0]);
  assert.deepEqual(commands, ["workbench.action.toggleZenMode"]);
  console.log("Fullscreen button reaches VS Code's full-screen view: OK");
}

main().catch(error => { console.error(error); process.exitCode = 1; });
