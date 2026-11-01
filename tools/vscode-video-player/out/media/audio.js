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
exports.resetFfmpegCache = resetFfmpegCache;
exports.resolveFfmpegOverride = resolveFfmpegOverride;
exports.pruneAudioCache = pruneAudioCache;
exports.findFfmpeg = findFfmpeg;
exports.extractAudio = extractAudio;
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const child_process_1 = require("child_process");
/**
 * ffmpeg-based audio extraction, kept free of any `vscode` import so it can be
 * unit-tested directly against a real ffmpeg binary.
 */
const FFMPEG_CANDIDATES = [
    ...(process.platform === 'win32' && process.arch === 'x64'
        ? [path.join(__dirname, '..', '..', 'bin', 'win32-x64', 'ffmpeg.exe')]
        : []),
    '/opt/homebrew/bin/ffmpeg',
    '/usr/local/bin/ffmpeg',
    '/usr/bin/ffmpeg',
    '/snap/bin/ffmpeg',
    'ffmpeg',
];
const CACHE_DIR = path.join(os.tmpdir(), 'unmute-video-cache');
const STDERR_TAIL_LIMIT = 16 * 1024;
const AUDIO_FILTER = 'aresample=async=1:first_pts=0';
const probeResults = new Map();
const probeInFlight = new Map();
const inFlightExtractions = new Map();
/** For tests: forget the cached probe result. */
function resetFfmpegCache() {
    probeResults.clear();
    probeInFlight.clear();
}
/**
 * Decide whether a user-provided ffmpeg override path may be used.
 * Returns the trimmed override only when it is a non-empty ABSOLUTE path that
 * does NOT resolve inside any of the given workspace roots; otherwise undefined.
 * Belt-and-suspenders on top of the machine-scoped setting.
 */
function resolveFfmpegOverride(override, workspaceRoots) {
    const trimmed = typeof override === 'string' ? override.trim() : '';
    if (trimmed === '' || !path.isAbsolute(trimmed)) {
        return undefined;
    }
    const resolvedOverride = normalizeResolvedPath(trimmed);
    for (const root of workspaceRoots) {
        const trimmedRoot = root.trim();
        if (trimmedRoot === '') {
            continue;
        }
        const resolvedRoot = normalizeResolvedPath(trimmedRoot);
        if (resolvedOverride === resolvedRoot || resolvedOverride.startsWith(ensureTrailingSeparator(resolvedRoot))) {
            return undefined;
        }
    }
    return trimmed;
}
/**
 * Best-effort: delete cached extracted-audio files older than maxAgeMs from the
 * private cache dir. Never throws (swallows all fs errors). Synchronous.
 */
function pruneAudioCache(maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
    try {
        const cutoff = Date.now() - maxAgeMs;
        for (const entry of fs.readdirSync(CACHE_DIR)) {
            if (!/^unmute-audio-.*\.mp3$/.test(entry)) {
                continue;
            }
            const file = path.join(CACHE_DIR, entry);
            try {
                if (fs.statSync(file).mtimeMs < cutoff) {
                    fs.unlinkSync(file);
                }
            }
            catch {
                /* ignore */
            }
        }
    }
    catch {
        /* ignore */
    }
}
function normalizeResolvedPath(value) {
    let resolved = path.resolve(value);
    try {
        // Canonicalize symlinks (and, on Windows, short/namespaced aliases like
        // 8.3 names or \\?\ prefixes) so the boundary check cannot be fooled by an
        // alias that names a workspace path without sharing its textual prefix.
        resolved = fs.realpathSync.native(resolved);
    }
    catch {
        // The path may not exist yet; fall back to the lexically-normalized form.
        resolved = path.normalize(resolved);
    }
    // macOS and Windows default to case-insensitive filesystems, so compare
    // case-insensitively there to avoid a case-only bypass of the boundary check.
    return process.platform === 'win32' || process.platform === 'darwin'
        ? resolved.toLowerCase()
        : resolved;
}
function ensureTrailingSeparator(value) {
    return value.endsWith(path.sep) ? value : `${value}${path.sep}`;
}
/**
 * Locate a working ffmpeg binary. Tries common absolute paths and then a bare
 * `ffmpeg` from PATH; the first that responds to `-version` wins. The result
 * (including "not found") is cached.
 */
async function findFfmpeg(override) {
    const overridePath = typeof override === 'string' ? override.trim() : '';
    if (overridePath === '') {
        return memoizedProbe('', probeDefaultFfmpeg);
    }
    return memoizedProbe(overridePath, async () => {
        if (await probeFfmpeg(overridePath)) {
            return overridePath;
        }
        return findFfmpeg();
    });
}
function memoizedProbe(key, compute) {
    if (probeResults.has(key)) {
        return Promise.resolve(probeResults.get(key));
    }
    const pending = probeInFlight.get(key);
    if (pending !== undefined) {
        return pending;
    }
    const promise = compute()
        .then((result) => {
        if (probeInFlight.get(key) === promise) {
            probeResults.set(key, result);
        }
        return result;
    })
        .finally(() => {
        if (probeInFlight.get(key) === promise) {
            probeInFlight.delete(key);
        }
    });
    probeInFlight.set(key, promise);
    return promise;
}
async function probeDefaultFfmpeg() {
    for (const bin of FFMPEG_CANDIDATES) {
        if (await probeFfmpeg(bin)) {
            return bin;
        }
    }
    return null;
}
function probeFfmpeg(bin) {
    return new Promise((resolve) => {
        (0, child_process_1.execFile)(bin, ['-version'], { timeout: 5000 }, (err) => resolve(!err));
    });
}
/**
 * Extract the audio track of `input` into an MP3 in the private temp cache. The
 * output name is derived from the input path *and* its size+mtime, so editing a
 * file in place re-extracts instead of replaying stale audio. ffmpeg writes to a
 * temporary file that is renamed into place only on success, so a killed
 * extraction can never leave a partial file that a later open would reuse.
 */
async function extractAudio(ffmpeg, input, signal) {
    if (signal?.aborted) {
        throw new Error('Audio extraction cancelled.');
    }
    const stat = fs.statSync(input);
    const key = crypto
        .createHash('md5')
        .update(`${input}\0${stat.size}\0${stat.mtimeMs}\0${AUDIO_FILTER}`)
        .digest('hex')
        .slice(0, 16);
    const out = path.join(CACHE_DIR, `unmute-audio-${key}.mp3`);
    // Reuse a previously-extracted (complete) file if present.
    if (fs.existsSync(out)) {
        return out;
    }
    let entry = inFlightExtractions.get(key);
    if (entry?.controller.signal.aborted) {
        try { await entry.promise; } catch { /* cancelled previous extraction */ }
        return extractAudio(ffmpeg, input, signal);
    }
    if (entry === undefined) {
        const controller = new AbortController();
        entry = { controller, consumers: 0, done: false };
        entry.promise = extractAudioToCache(ffmpeg, input, key, out, controller.signal).finally(() => {
            entry.done = true;
            inFlightExtractions.delete(key);
        });
        inFlightExtractions.set(key, entry);
    }
    entry.consumers++;
    return new Promise((resolve, reject) => {
        let settled = false;
        const onAbort = () => finish(new Error('Audio extraction cancelled.'));
        const finish = (error, value) => {
            if (settled) return;
            settled = true;
            signal?.removeEventListener('abort', onAbort);
            entry.consumers--;
            if (entry.consumers === 0 && !entry.done) entry.controller.abort();
            error ? reject(error) : resolve(value);
        };
        signal?.addEventListener('abort', onAbort, { once: true });
        if (signal?.aborted) onAbort();
        entry.promise.then(value => finish(null, value), error => finish(error));
    });
}
async function extractAudioToCache(ffmpeg, input, key, out, signal) {
    fs.mkdirSync(CACHE_DIR, { recursive: true, mode: 0o700 });
    if (fs.existsSync(out)) {
        return out;
    }
    // The temp name keeps a .mp3 suffix AND we pass `-f mp3`, so ffmpeg's
    // extension-based muxer detection can never trip over the temp suffix.
    const tmpOut = path.join(CACHE_DIR, `unmute-audio-${key}.${crypto.randomBytes(4).toString('hex')}.part.mp3`);
    try {
        await runFfmpeg(ffmpeg, [
            '-nostdin',
            '-i', input,
            '-vn',
            // Normalize the audio to the video timeline: reset the first sample
            // to PTS 0. MP4/MOV audio commonly carries a start-time offset
            // (edit-list priming / encoder delay), and without this the
            // extracted mp3 is shifted a constant amount from the video clock --
            // the offset source that drove the drift-correction feedback loop.
            '-af', AUDIO_FILTER,
            '-c:a', 'libmp3lame',
            '-b:a', '192k',
            '-f', 'mp3',
            '-y', tmpOut,
        ], signal);
        if (signal.aborted) throw new Error('Audio extraction cancelled.');
        fs.chmodSync(tmpOut, 0o600);
        fs.renameSync(tmpOut, out);
    }
    catch (err) {
        // Best-effort cleanup of the partial file.
        try {
            fs.unlinkSync(tmpOut);
        }
        catch {
            /* ignore */
        }
        throw err;
    }
    return out;
}
function runFfmpeg(ffmpeg, args, signal) {
    if (signal?.aborted) return Promise.reject(new Error('Audio extraction cancelled.'));
    return new Promise((resolve, reject) => {
        let stderrTail = '';
        let settled = false;
        let timedOut = false;
        // spawn with an arg array (no shell) avoids command injection from the file path.
        const child = (0, child_process_1.spawn)(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] });
        const onAbort = () => child.kill();
        signal?.addEventListener('abort', onAbort, { once: true });
        if (signal?.aborted) onAbort();
        const timer = setTimeout(() => {
            timedOut = true;
            child.kill();
            finish(makeFfmpegError('ffmpeg timed out after 120s', stderrTail));
        }, 120000);
        const finish = (err) => {
            if (settled) {
                return;
            }
            settled = true;
            clearTimeout(timer);
            signal?.removeEventListener('abort', onAbort);
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        };
        child.stderr.on('data', (chunk) => {
            stderrTail += chunk.toString('utf8');
            if (stderrTail.length > STDERR_TAIL_LIMIT) {
                stderrTail = stderrTail.slice(-STDERR_TAIL_LIMIT);
            }
        });
        child.on('error', (err) => {
            finish(err);
        });
        child.on('close', (code, exitSignal) => {
            if (timedOut) {
                return;
            }
            if (signal?.aborted) {
                finish(new Error('Audio extraction cancelled.'));
                return;
            }
            if (code === 0) {
                finish();
            }
            else {
                const suffix = exitSignal ? `signal ${exitSignal}` : `exit code ${code}`;
                finish(makeFfmpegError(`ffmpeg failed with ${suffix}`, stderrTail));
            }
        });
    });
}
function makeFfmpegError(message, stderr) {
    const detail = stderr.trim();
    const err = new Error(detail ? `${message}: ${detail}` : message);
    if (isNoAudioStderr(stderr)) {
        err.noAudio = true;
    }
    return err;
}
function isNoAudioStderr(stderr) {
    return /does not contain any stream|matches no streams|output file is empty/i.test(stderr);
}
//# sourceMappingURL=audio.js.map
