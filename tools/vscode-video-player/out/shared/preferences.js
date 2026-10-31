"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_RATES = void 0;
exports.clampPreferences = clampPreferences;
exports.ALLOWED_RATES = [0.5, 0.75, 1, 1.1, 1.25, 1.5, 2];
const DEFAULT_PREFERENCES = {
    volume: 1,
    muted: false,
    playbackRate: 1,
};
function clampPreferences(raw) {
    if (typeof raw !== 'object' || raw === null) {
        return { ...DEFAULT_PREFERENCES };
    }
    const prefs = raw;
    const volume = typeof prefs.volume === 'number' && Number.isFinite(prefs.volume)
        ? Math.min(1, Math.max(0, prefs.volume))
        : DEFAULT_PREFERENCES.volume;
    const playbackRate = typeof prefs.playbackRate === 'number' && exports.ALLOWED_RATES.some((rate) => rate === prefs.playbackRate)
        ? prefs.playbackRate
        : DEFAULT_PREFERENCES.playbackRate;
    return {
        volume,
        muted: prefs.muted === true,
        playbackRate,
    };
}
//# sourceMappingURL=preferences.js.map