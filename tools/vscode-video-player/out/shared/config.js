"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAME_STEP_SECONDS = void 0;
exports.resolveSeekStep = resolveSeekStep;
const DEFAULT_SEEK_STEP_SECONDS = 10;
exports.FRAME_STEP_SECONDS = 1 / 30;
function resolveSeekStep(raw) {
    if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) {
        return raw;
    }
    return DEFAULT_SEEK_STEP_SECONDS;
}
//# sourceMappingURL=config.js.map