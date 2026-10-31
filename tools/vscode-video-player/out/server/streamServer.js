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
exports.StreamServer = void 0;
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const path = __importStar(require("path"));
/**
 * A tiny loopback-only HTTP server that streams registered files with HTTP Range
 * support. Files are exposed indirectly: callers register an absolute fs path and
 * receive an opaque token. Only registered tokens can be served, so the server
 * never exposes an arbitrary path on disk.
 *
 * Bodies are streamed with fs.createReadStream — files are never read fully into
 * memory, which keeps large video seeks cheap.
 */
class StreamServer {
    constructor() {
        this.port = 0;
        /** token -> absolute fs path */
        this.tokenToPath = new Map();
        /** fs path -> token, so register() is idempotent per path */
        this.pathToToken = new Map();
        /**
         * token -> how many live holders share it. The same path can back several
         * editors at once (supportsMultipleEditorsPerDocument), so a token is only
         * really forgotten when the last holder unregisters it.
         */
        this.refCount = new Map();
    }
    /**
     * Create the HTTP server and start listening on an OS-assigned free port,
     * bound to the loopback interface only.
     */
    start() {
        return new Promise((resolve, reject) => {
            const server = http.createServer((req, res) => {
                this.handleRequest(req, res);
            });
            // Surface listen-time errors as a rejected promise.
            const onError = (err) => {
                reject(err);
            };
            server.once('error', onError);
            // Port 0 => OS assigns a free port. Bind to 127.0.0.1 only.
            server.listen(0, '127.0.0.1', () => {
                server.removeListener('error', onError);
                const addr = server.address();
                if (addr && typeof addr === 'object') {
                    this.port = addr.port;
                }
                this.server = server;
                resolve();
            });
        });
    }
    getPort() {
        return this.port;
    }
    /**
     * Register an absolute fs path and return an opaque hex token. Calling this
     * again with the same path returns the same token (idempotent).
     */
    register(fsPath) {
        const existing = this.pathToToken.get(fsPath);
        if (existing !== undefined) {
            this.refCount.set(existing, (this.refCount.get(existing) ?? 0) + 1);
            return existing;
        }
        // 16 random bytes -> 32 hex chars. Unguessable handle for the path.
        const token = crypto.randomBytes(16).toString('hex');
        this.tokenToPath.set(token, fsPath);
        this.pathToToken.set(fsPath, token);
        this.refCount.set(token, 1);
        return token;
    }
    /**
     * Release one hold on a token. The token (and its path mapping) is only
     * removed once the last holder releases it, so disposing one editor never
     * pulls the rug out from another editor still streaming the same file.
     */
    unregister(token) {
        const fsPath = this.tokenToPath.get(token);
        if (fsPath === undefined) {
            return;
        }
        const next = (this.refCount.get(token) ?? 1) - 1;
        if (next > 0) {
            this.refCount.set(token, next);
            return;
        }
        this.refCount.delete(token);
        this.tokenToPath.delete(token);
        this.pathToToken.delete(fsPath);
    }
    urlFor(token) {
        return `http://127.0.0.1:${this.port}/${token}`;
    }
    /** Close the server and forget every registered path. */
    dispose() {
        if (this.server) {
            this.server.close();
            this.server = undefined;
        }
        this.tokenToPath.clear();
        this.pathToToken.clear();
        this.refCount.clear();
    }
    /** Map a file extension to a Content-Type the webview understands. */
    contentTypeFor(fsPath) {
        switch (path.extname(fsPath).toLowerCase()) {
            case '.mp4':
            case '.mov':
            case '.m4v':
                return 'video/mp4';
            case '.webm':
                return 'video/webm';
            case '.mp3':
                return 'audio/mpeg';
            default:
                return 'application/octet-stream';
        }
    }
    handleRequest(req, res) {
        // Only GET/HEAD make sense for streaming.
        const method = req.method ?? 'GET';
        if (method !== 'GET' && method !== 'HEAD') {
            res.writeHead(405, { 'Allow': 'GET, HEAD' });
            res.end();
            return;
        }
        // Defense-in-depth against DNS-rebinding: only answer requests addressed
        // to the loopback host:port we actually listen on. Media elements (HTTP/1.1)
        // always send Host: 127.0.0.1:<port>, so a missing or mismatched Host is
        // never legitimate here and is rejected.
        if (req.headers.host !== `127.0.0.1:${this.port}`) {
            res.writeHead(403);
            res.end();
            return;
        }
        // The token is the first (and only meaningful) path segment.
        // Use a dummy base because req.url is path-only.
        let token;
        try {
            const parsed = new URL(req.url ?? '/', 'http://127.0.0.1');
            token = decodeURIComponent(parsed.pathname.replace(/^\/+/, '').split('/')[0] ?? '');
        }
        catch {
            res.writeHead(400);
            res.end();
            return;
        }
        const fsPath = this.tokenToPath.get(token);
        if (fsPath === undefined) {
            // Unknown token: never serve an arbitrary path.
            res.writeHead(404);
            res.end();
            return;
        }
        fs.stat(fsPath, (statErr, stat) => {
            if (statErr || !stat.isFile()) {
                // File vanished or is not a regular file.
                res.writeHead(404);
                res.end();
                return;
            }
            const total = stat.size;
            const contentType = this.contentTypeFor(fsPath);
            const rangeHeader = req.headers['range'];
            const range = this.parseRange(rangeHeader, total);
            if (range === 'invalid') {
                // Range requested but unsatisfiable.
                res.writeHead(416, {
                    'Content-Range': `bytes */${total}`,
                    'Accept-Ranges': 'bytes',
                });
                res.end();
                return;
            }
            if (range) {
                // Partial content.
                const { start, end } = range;
                const chunkSize = end - start + 1;
                res.writeHead(206, {
                    'Content-Type': contentType,
                    'Content-Length': String(chunkSize),
                    'Content-Range': `bytes ${start}-${end}/${total}`,
                    'Accept-Ranges': 'bytes',
                });
                if (method === 'HEAD') {
                    res.end();
                    return;
                }
                this.streamFile(fsPath, res, start, end);
                return;
            }
            // Full body.
            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': String(total),
                'Accept-Ranges': 'bytes',
            });
            if (method === 'HEAD' || total === 0) {
                // An empty file has no body to stream; createReadStream with
                // end=-1 would otherwise throw synchronously.
                res.end();
                return;
            }
            this.streamFile(fsPath, res, 0, total - 1);
        });
    }
    /**
     * Parse a single Range header of the form `bytes=start-end`.
     * Returns a {start,end} pair, undefined when no range is requested, or
     * 'invalid' when the range cannot be satisfied.
     */
    parseRange(header, total) {
        if (header === undefined || Array.isArray(header)) {
            return undefined;
        }
        // Honor the first range of a (possibly multi-) range request; the first
        // spec must be followed by a comma or the end of the header. Anything
        // clearly malformed falls through to a full-body response.
        const match = /^bytes=(\d*)-(\d*)(?:,|$)/.exec(header.trim());
        if (!match) {
            return undefined;
        }
        const startStr = match[1];
        const endStr = match[2];
        let start;
        let end;
        if (startStr === '' && endStr === '') {
            return 'invalid';
        }
        if (startStr === '') {
            // Suffix range: last N bytes.
            const suffixLen = parseInt(endStr, 10);
            if (suffixLen <= 0) {
                return 'invalid';
            }
            start = Math.max(0, total - suffixLen);
            end = total - 1;
        }
        else {
            start = parseInt(startStr, 10);
            end = endStr === '' ? total - 1 : parseInt(endStr, 10);
        }
        // Clamp end to the last byte.
        if (end > total - 1) {
            end = total - 1;
        }
        if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
            return 'invalid';
        }
        return { start, end };
    }
    /** Stream a byte range of a file to the response, handling stream errors. */
    streamFile(fsPath, res, start, end) {
        if (end < start) {
            // Nothing to send (e.g. an empty range). Avoid an invalid stream range.
            res.end();
            return;
        }
        const stream = fs.createReadStream(fsPath, { start, end });
        let finished = false;
        stream.on('error', (err) => {
            if (finished) {
                return;
            }
            finished = true;
            if (!res.headersSent) {
                res.writeHead(500);
                res.end();
                return;
            }
            res.destroy(err);
        });
        // If the client disconnects, stop reading.
        res.on('close', () => {
            if (finished) {
                return;
            }
            finished = true;
            stream.destroy();
        });
        stream.pipe(res);
    }
}
exports.StreamServer = StreamServer;
//# sourceMappingURL=streamServer.js.map