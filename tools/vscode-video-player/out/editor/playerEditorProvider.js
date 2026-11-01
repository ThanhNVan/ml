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
exports.PlayerEditorProvider = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const audioExtractionController_1 = require("./audioExtractionController");
const ccController_1 = require("./ccController");
const compatibleVideo_1 = require("../media/video");
const audioMedia_1 = require("../media/audio");
const mediaFormat_1 = require("../media/mediaFormat");
const config_1 = require("../shared/config");
const ffmpegInstall_1 = require("../shared/ffmpegInstall");
const preferences_1 = require("../shared/preferences");
const resume_1 = require("../shared/resume");
const subtitles_1 = require("../media/subtitles");
const ccModel_1 = require("../media/ccModel");
const transcription_1 = require("../media/transcription");
const PREFS_KEY = 'unmuteVideo.preferences';
/**
 * Custom editor that plays .mp4/.mov/.m4v files WITH sound inside VS Code.
 *
 * The webview's Chromium build cannot decode AAC, so the <video> is played muted
 * and a separately-extracted MP3 (via ffmpeg on the host) is played in sync as
 * the audible track. Both media files are streamed from a loopback HTTP server.
 */
class PlayerEditorProvider {
    constructor(context, server) {
        this.context = context;
        this.server = server;
    }
    openCustomDocument(uri) {
        // This editor is read-only, so the document is just the uri plus a no-op
        // dispose.
        return {
            uri,
            dispose() {
                /* nothing to clean up */
            },
        };
    }
    async resolveCustomEditor(document, webviewPanel) {
        const fsPath = document.uri.fsPath;
        const stateKey = (0, resume_1.resumeKey)(fsPath);
        const saved = this.context.workspaceState.get(stateKey) ?? 0;
        const nativeAudio = (0, mediaFormat_1.isNativeAudioFormat)(fsPath);
        const seekStep = (0, config_1.resolveSeekStep)(vscode.workspace.getConfiguration('unmuteVideo').get('seekStep'));
        const mediaDir = vscode.Uri.joinPath(this.context.extensionUri, 'media');
        const webview = webviewPanel.webview;
        webview.options = {
            enableScripts: true,
            localResourceRoots: [mediaDir],
        };
        // Register the video with the streaming server.
        const videoToken = this.server.register(fsPath);
        const videoUrl = this.server.urlFor(videoToken);
        let fallbackToken;
        let fallbackPath;
        let fallbackStarted = false;
        let disposed = false;
        let handledReady = false;
        let trustListener;
        // Outgoing messages are checked against the shared protocol type.
        const post = (message) => {
            void webview.postMessage(message);
        };
        const currentPreferences = () => (0, preferences_1.clampPreferences)(this.context.globalState.get(PREFS_KEY));
        const audio = nativeAudio ? null : new audioExtractionController_1.AudioExtractionController(this.server, fsPath, post, currentPreferences, saved, seekStep);
        const cc = new ccController_1.CcController(fsPath, post, {
            isTrusted: () => vscode.workspace.isTrusted,
            confirm: async (replacing) => {
                const label = replacing ? 'Replace CC' : 'Generate CC';
                const message = replacing
                    ? 'Replace the existing English captions for this video?'
                    : 'Generate English captions from this video’s audio?';
                const choice = await vscode.window.showWarningMessage(message, {
                    modal: true,
                    detail: 'Speech recognition can take several minutes and may mishear words. The result is saved beside the video as a .vtt file for review.',
                }, label);
                return choice === label;
            },
            getMp3: async (signal) => {
                const config = vscode.workspace.getConfiguration('unmuteVideo');
                const roots = (vscode.workspace.workspaceFolders ?? []).map(folder => folder.uri.fsPath);
                const override = (0, audioMedia_1.resolveFfmpegOverride)(config.get('ffmpegPath'), roots);
                const ffmpeg = await (0, audioMedia_1.findFfmpeg)(override);
                if (ffmpeg === null) throw new Error('ffmpeg is needed to extract MP3 audio. Install it or set its path in Settings.');
                return (0, audioMedia_1.extractAudio)(ffmpeg, fsPath, signal);
            },
            getModel: (progress, signal) => (0, ccModel_1.ensureCcModel)(this.context.globalStorageUri.fsPath, progress, signal, undefined, undefined, this.context.extensionUri.fsPath),
            transcribe: (mp3, model, signal) => (0, transcription_1.transcribeMp3)(mp3, model, (0, ccModel_1.ccRunnerPath)(this.context.extensionUri.fsPath), signal),
            write: transcription_1.writeVttAtomic,
        });
        const postSidecarSubtitles = () => {
            const subtitles = this.readSidecarSubtitles(fsPath);
            if (subtitles !== undefined) {
                post({ type: 'subtitles', vtt: subtitles.vtt, label: subtitles.label });
            }
        };
        const postInit = (audioPending, ffmpegMissing, initNativeAudio) => {
            post({
                type: 'init',
                name: path.basename(fsPath),
                audioPending,
                ffmpegMissing,
                ffmpegInstall: ffmpegMissing ? (0, ffmpegInstall_1.ffmpegInstallHint)(process.platform) : null,
                nativeAudio: initNativeAudio,
                resumeTime: saved,
                preferences: currentPreferences(),
                seekStep,
            });
        };
        const messageListener = webview.onDidReceiveMessage(async (message) => {
            if (!message || typeof message.type !== 'string') {
                return;
            }
            switch (message.type) {
                case 'videoUnsupported': {
                    if (fallbackStarted || disposed) {
                        break;
                    }
                    fallbackStarted = true;
                    if (!vscode.workspace.isTrusted) {
                        post({ type: 'videoFallbackError', message: 'Trust this workspace to prepare a compatible video.' });
                        break;
                    }
                    try {
                        const config = vscode.workspace.getConfiguration('unmuteVideo');
                        const workspaceRoots = (vscode.workspace.workspaceFolders ?? []).map((folder) => folder.uri.fsPath);
                        const override = (0, audioMedia_1.resolveFfmpegOverride)(config.get('ffmpegPath'), workspaceRoots);
                        const ffmpeg = await (0, audioMedia_1.findFfmpeg)(override);
                        if (ffmpeg === null) {
                            throw new Error('ffmpeg is required to prepare this MP4.');
                        }
                        const playable = await (0, compatibleVideo_1.compatibleVideo)(ffmpeg, fsPath);
                        if (disposed) {
                            break;
                        }
                        fallbackToken = this.server.register(playable);
                        fallbackPath = playable;
                        (0, compatibleVideo_1.retainVideo)(playable);
                        post({ type: 'videoSrc', url: this.server.urlFor(fallbackToken), nativeAudio: false, compatibleFallback: true });
                    }
                    catch (error) {
                        if (!disposed) {
                            const detail = error instanceof Error ? error.message : String(error);
                            post({ type: 'videoFallbackError', message: `Could not prepare a compatible video: ${detail}` });
                        }
                    }
                    break;
                }
                case 'ready': {
                    if (handledReady) {
                        return;
                    }
                    handledReady = true;
                    if (nativeAudio) {
                        postInit(false, false, true);
                        post({ type: 'videoSrc', url: videoUrl, nativeAudio: true });
                        postSidecarSubtitles();
                        return;
                    }
                    const trusted = vscode.workspace.isTrusted;
                    postInit(trusted, false, false);
                    post({ type: 'videoSrc', url: videoUrl, nativeAudio: false });
                    postSidecarSubtitles();
                    if (trusted) {
                        audio?.start(false);
                    }
                    else {
                        post({ type: 'audioUntrusted' });
                        // start() is a no-op after dispose, so no extra guard here.
                        trustListener = vscode.workspace.onDidGrantWorkspaceTrust(() => {
                            audio?.start(true);
                        });
                    }
                    break;
                }
                case 'error': {
                    const text = typeof message.message === 'string' ? message.message : 'Unknown error';
                    vscode.window.showErrorMessage(`vscode-video-player: ${text}`);
                    break;
                }
                case 'progress': {
                    if (Number.isFinite(message.time) && message.time > 0) {
                        void this.context.workspaceState.update(stateKey, message.time);
                    }
                    break;
                }
                case 'action': {
                    // Explicit allowlist: every branch is a known action. An
                    // unknown name is logged rather than silently ignored so
                    // boundary drift (webview/host protocol mismatch) is observable.
                    switch (message.name) {
                        case 'toggleFullscreen':
                            void vscode.commands.executeCommand('workbench.action.toggleZenMode').then(undefined, () => {
                                void vscode.window.showWarningMessage('vscode-video-player: could not switch VS Code to full screen.');
                            });
                            break;
                        case 'getCc':
                            void cc.start();
                            break;
                        case 'selectSubtitles': {
                            const chosen = await vscode.window.showOpenDialog({
                                title: `Choose subtitles for ${path.basename(fsPath)}`,
                                defaultUri: vscode.Uri.file(path.dirname(fsPath)),
                                openLabel: 'Use subtitles',
                                canSelectFiles: true,
                                canSelectFolders: false,
                                canSelectMany: false,
                                filters: { 'Subtitle files': ['vtt', 'srt'] },
                            });
                            if (!chosen || chosen.length === 0) {
                                break;
                            }
                            try {
                                const subtitles = this.readSubtitleFile(chosen[0].fsPath);
                                post({ type: 'subtitles', vtt: subtitles.vtt, label: subtitles.label, activate: true });
                            }
                            catch (error) {
                                const detail = error instanceof Error ? error.message : String(error);
                                void vscode.window.showErrorMessage(`vscode-video-player: could not load subtitles: ${detail}`);
                            }
                            break;
                        }
                        case 'trustWorkspace':
                            // Open the Workspace Trust editor; the user decides — we
                            // never grant trust. Skip when already trusted so the
                            // command can't be replayed pointlessly.
                            if (!vscode.workspace.isTrusted) {
                                void vscode.commands.executeCommand('workbench.trust.manage').then(undefined, () => {
                                    void vscode.window.showWarningMessage('vscode-video-player: could not open Workspace Trust settings.');
                                });
                            }
                            break;
                        case 'copyFfmpegCommand': {
                            // Only while the hint is actually on screen. Without
                            // this the webview could overwrite the clipboard at
                            // any moment - before `ready`, or for a .webm that
                            // never needed ffmpeg at all.
                            if (audio === null || !audio.isFfmpegMissing()) {
                                break;
                            }
                            // Resolved here rather than taken from the webview:
                            // the clipboard text must come from the host's own
                            // platform, not from whatever the webview echoes back.
                            const hint = (0, ffmpegInstall_1.ffmpegInstallHint)(process.platform);
                            if (hint === null) {
                                void vscode.window.showWarningMessage('vscode-video-player: no install command is known for this platform. See https://ffmpeg.org/download.html');
                                break;
                            }
                            void vscode.env.clipboard.writeText(hint.command);
                            void vscode.window.showInformationMessage(`vscode-video-player: copied "${hint.command}" to the clipboard.`);
                            break;
                        }
                        case 'openFfmpegSettings':
                            void vscode.commands.executeCommand('workbench.action.openSettings', 'unmuteVideo.ffmpegPath').then(undefined, () => {
                                void vscode.window.showWarningMessage('vscode-video-player: could not open settings.');
                            });
                            break;
                        default:
                            console.warn(`vscode-video-player: ignoring unknown webview action "${String(message.name)}"`);
                            break;
                    }
                    break;
                }
                case 'savePreferences': {
                    void this.context.globalState.update(PREFS_KEY, (0, preferences_1.clampPreferences)(message.preferences));
                    break;
                }
                default:
                    break;
            }
        });
        webviewPanel.onDidDispose(() => {
            disposed = true;
            cc.dispose();
            audio?.dispose();
            messageListener.dispose();
            if (trustListener !== undefined) {
                trustListener.dispose();
            }
            this.server.unregister(videoToken);
            if (fallbackToken !== undefined) {
                this.server.unregister(fallbackToken);
            }
            if (fallbackPath !== undefined) {
                (0, compatibleVideo_1.releaseVideo)(fallbackPath);
            }
        });
        webview.html = this.buildHtml(webview, mediaDir);
    }
    readSidecarSubtitles(videoFsPath) {
        for (const candidate of (0, subtitles_1.sidecarCandidates)(videoFsPath)) {
            try {
                if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
                    continue;
                }
                return this.readSubtitleFile(candidate);
            }
            catch {
                // Try the next same-name subtitle format if this one is unreadable.
            }
        }
        return undefined;
    }
    readSubtitleFile(fsPath) {
        const extension = path.extname(fsPath).toLowerCase();
        if (extension !== '.vtt' && extension !== '.srt') {
            throw new Error('choose a .vtt or .srt file');
        }
        if (!fs.statSync(fsPath).isFile()) {
            throw new Error('the selected path is not a file');
        }
        const text = fs.readFileSync(fsPath, 'utf8');
        return {
            vtt: extension === '.srt' ? (0, subtitles_1.srtToVtt)(text) : text,
            label: path.basename(fsPath),
        };
    }
    /**
     * Read media/player.html and substitute the CSP / nonce / style / script
     * tokens. The CSP must exactly match what the contract specifies so the
     * webview can load media from the loopback server.
     */
    buildHtml(webview, mediaDir) {
        const htmlPath = vscode.Uri.joinPath(mediaDir, 'player.html').fsPath;
        const template = fs.readFileSync(htmlPath, 'utf8');
        const nonce = crypto.randomBytes(16).toString('hex');
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaDir, 'player.css'));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaDir, 'player.js'));
        const cspSource = webview.cspSource;
        const port = this.server.getPort();
        const csp = [
            "default-src 'none'",
            `img-src ${cspSource} data:`,
            `style-src ${cspSource}`,
            `font-src ${cspSource}`,
            `script-src 'nonce-${nonce}'`,
            `media-src http://127.0.0.1:${port} blob:`,
        ].join('; ');
        return template
            .replace(/{{CSP}}/g, csp)
            .replace(/{{NONCE}}/g, nonce)
            .replace(/{{STYLE}}/g, styleUri.toString())
            .replace(/{{SCRIPT}}/g, scriptUri.toString());
    }
}
exports.PlayerEditorProvider = PlayerEditorProvider;
PlayerEditorProvider.viewType = 'unmuteVideo.viewer';
//# sourceMappingURL=playerEditorProvider.js.map
