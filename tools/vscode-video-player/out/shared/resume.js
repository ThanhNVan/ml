"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESUME_END_THRESHOLD_SEC = void 0;
exports.resumeKey = resumeKey;
exports.shouldResume = shouldResume;
exports.RESUME_END_THRESHOLD_SEC = 5;
function resumeKey(fsPath) {
    return `resume:${fsPath}`;
}
function shouldResume(saved, duration, endThresholdSec) {
    return saved > 0 && Number.isFinite(duration) && saved < duration - endThresholdSec;
}
//# sourceMappingURL=resume.js.map