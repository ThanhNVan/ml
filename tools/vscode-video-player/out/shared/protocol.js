"use strict";
/**
 * Message protocol shared by the extension host (playerEditorProvider) and the
 * webview controller (webview/*) — the single source of truth for the
 * postMessage boundary.
 *
 * The webview bundle is produced by esbuild, so both ends can `import type`
 * these definitions as a normal module. Being type-only, this module emits no
 * runtime JavaScript (esbuild drops it from the bundle; tsc emits an empty
 * `out/shared/protocol.js` on the host side).
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=protocol.js.map