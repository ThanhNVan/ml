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
exports.AudioExtractionController = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const audio_1 = require("../media/audio");
const ffmpegInstall_1 = require("../shared/ffmpegInstall");
/**
 * Owns the asynchronous audio-extraction lifecycle for one open editor:
 * runs ffmpeg off the host, registers the resulting mp3 with the stream server,
 * and posts the right protocol message - guarding against an editor that closes
 * mid-extraction (no leaked token, no post to a dead webview).
 */
class AudioExtractionController {
    constructor(server, fsPath, post, getPreferences, resumeTime = 0, seekStep = 10) {
        this.server = server;
        this.fsPath = fsPath;
        this.post = post;
        this.getPreferences = getPreferences;
        this.resumeTime = resumeTime;
        this.seekStep = seekStep;
        this.disposed = false;
        this.started = false;
        this.ffmpegMissing = false;
        this.abort = new AbortController();
    }
    /**
     * Begin extraction at most once, and never after dispose. `showPendingStatus`
     * posts the "Extracting…" init.
     */
    start(showPendingStatus) {
        if (this.disposed || this.started) {
            return;
        }
        this.started = true;
        if (showPendingStatus) {
            this.postInit(true, false);
        }
        void (async () => {
            const config = vscode.workspace.getConfiguration('unmuteVideo');
            const workspaceRoots = (vscode.workspace.workspaceFolders ?? []).map((folder) => folder.uri.fsPath);
            const ffmpegOverride = (0, audio_1.resolveFfmpegOverride)(config.get('ffmpegPath'), workspaceRoots);
            const ffmpeg = await (0, audio_1.findFfmpeg)(ffmpegOverride);
            if (this.disposed) {
                return;
            }
            if (ffmpeg === null) {
                this.ffmpegMissing = true;
                this.postInit(false, true);
                return;
            }
            try {
                const mp3Path = await (0, audio_1.extractAudio)(ffmpeg, this.fsPath, this.abort.signal);
                const token = this.server.register(mp3Path);
                if (this.disposed) {
                    // Editor closed before extraction finished:
                    // release the token instead of leaking it.
                    this.server.unregister(token);
                    return;
                }
                this.audioToken = token;
                this.post({ type: 'audioSrc', url: this.server.urlFor(token) });
            }
            catch (err) {
                if (!this.disposed) {
                    this.post(hasNoAudioFlag(err) ? { type: 'audioNone' } : { type: 'audioError' });
                }
            }
        })().catch(() => {
            if (!this.disposed) {
                this.post({ type: 'audioError' });
            }
        });
    }
    /**
     * Whether the probe came back empty, i.e. the status bar is currently
     * offering the install hint. The host gates the clipboard action on this so
     * the webview cannot ask for a copy while no hint is on screen.
     */
    isFfmpegMissing() {
        return this.ffmpegMissing;
    }
    /** Stop guarding posts and release the audio token if one was registered. */
    dispose() {
        this.disposed = true;
        this.abort.abort();
        if (this.audioToken !== undefined) {
            this.server.unregister(this.audioToken);
            this.audioToken = undefined;
        }
    }
    postInit(audioPending, ffmpegMissing) {
        this.post({
            type: 'init',
            name: path.basename(this.fsPath),
            audioPending,
            ffmpegMissing,
            // Only resolved while ffmpeg is actually missing: the webview has no
            // use for it otherwise, and it keeps the platform out of the
            // messages the webview receives in the normal case.
            ffmpegInstall: ffmpegMissing ? (0, ffmpegInstall_1.ffmpegInstallHint)(process.platform) : null,
            nativeAudio: false,
            resumeTime: this.resumeTime,
            preferences: this.getPreferences(),
            seekStep: this.seekStep,
        });
    }
}
exports.AudioExtractionController = AudioExtractionController;
const hasNoAudioFlag = (err) => typeof err === 'object' && err !== null && err.noAudio === true;
//# sourceMappingURL=audioExtractionController.js.map
