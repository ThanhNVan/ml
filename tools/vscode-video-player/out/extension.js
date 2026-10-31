"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const streamServer_1 = require("./server/streamServer");
const playerEditorProvider_1 = require("./editor/playerEditorProvider");
const audio_1 = require("./media/audio");
const mediaFormat_1 = require("./media/mediaFormat");
/**
 * Extension entry point. Starts the loopback streaming server, registers the
 * custom video editor, and wires up the `unmuteVideo.open` command.
 */
async function activate(context) {
    try {
        (0, audio_1.pruneAudioCache)();
    }
    catch {
        /* ignore */
    }
    // One streaming server shared by all open editors.
    const server = new streamServer_1.StreamServer();
    context.subscriptions.push({
        dispose: () => server.dispose(),
    });
    try {
        await server.start();
    }
    catch (err) {
        // Don't hard-fail activation (which would leave the file in a bare text
        // editor with no explanation). Surface the error; playback stays
        // unavailable until the window is reloaded.
        const detail = err instanceof Error ? err.message : String(err);
        void vscode.window.showErrorMessage(`vscode-video-player: failed to start the media server — ${detail}. Reload the window to retry.`);
    }
    const provider = new playerEditorProvider_1.PlayerEditorProvider(context, server);
    context.subscriptions.push(vscode.window.registerCustomEditorProvider(playerEditorProvider_1.PlayerEditorProvider.viewType, provider, {
        webviewOptions: { retainContextWhenHidden: true },
        supportsMultipleEditorsPerDocument: true,
    }));
    context.subscriptions.push(vscode.commands.registerCommand('unmuteVideo.open', async (uri) => {
        let target = uri;
        // Invoked from the command palette (no uri): ask the user to pick a file.
        if (!target) {
            const picked = await vscode.window.showOpenDialog({
                canSelectMany: false,
                // Derive from the single source of truth (drop the leading dot).
                filters: { Video: mediaFormat_1.VIDEO_EXTENSIONS.map((ext) => ext.slice(1)) },
            });
            if (!picked || picked.length === 0) {
                return;
            }
            target = picked[0];
        }
        await vscode.commands.executeCommand('vscode.openWith', target, playerEditorProvider_1.PlayerEditorProvider.viewType);
    }));
}
function deactivate() {
    /* nothing to clean up beyond context.subscriptions */
}
//# sourceMappingURL=extension.js.map
