"use strict";
(() => {
  // src/webview/dom.ts
  var els = {
    player: document.getElementById("player"),
    stage: document.getElementById("stage"),
    video: document.getElementById("video"),
    track: document.getElementById("subTrack"),
    fileLabel: document.getElementById("fileLabel"),
    flash: document.getElementById("flash"),
    flashIcon: document.getElementById("flashIcon"),
    stageError: document.getElementById("stageError"),
    seek: document.getElementById("seek"),
    seekBuffered: document.getElementById("seekBuffered"),
    seekPlayed: document.getElementById("seekPlayed"),
    seekHandle: document.getElementById("seekHandle"),
    markerA: document.getElementById("markerA"),
    markerB: document.getElementById("markerB"),
    playBtn: document.getElementById("playBtn"),
    back10Btn: document.getElementById("back10Btn"),
    fwd10Btn: document.getElementById("fwd10Btn"),
    loopBtn: document.getElementById("loopBtn"),
    setABtn: document.getElementById("setABtn"),
    setBBtn: document.getElementById("setBBtn"),
    muteBtn: document.getElementById("muteBtn"),
    volSlider: document.getElementById("volSlider"),
    timeCur: document.getElementById("timeCur"),
    timeDur: document.getElementById("timeDur"),
    speedBtn: document.getElementById("speedBtn"),
    subBtn: document.getElementById("subBtn"),
    selectSubBtn: document.getElementById("selectSubBtn"),
    pipBtn: document.getElementById("pipBtn"),
    fsBtn: document.getElementById("fsBtn"),
    status: document.getElementById("status"),
    statusSpinner: document.getElementById("statusSpinner"),
    statusText: document.getElementById("statusText"),
    statusAction: document.getElementById("statusAction"),
    statusActionSecondary: document.getElementById("statusActionSecondary")
  };

  // src/shared/preferences.ts
  var ALLOWED_RATES = [0.5, 0.75, 1, 1.1, 1.25, 1.5, 2];
  var DEFAULT_PREFERENCES = {
    volume: 1,
    muted: false,
    playbackRate: 1
  };
  function clampPreferences(raw) {
    if (typeof raw !== "object" || raw === null) {
      return { ...DEFAULT_PREFERENCES };
    }
    const prefs = raw;
    const volume = typeof prefs.volume === "number" && Number.isFinite(prefs.volume) ? Math.min(1, Math.max(0, prefs.volume)) : DEFAULT_PREFERENCES.volume;
    const playbackRate = typeof prefs.playbackRate === "number" && ALLOWED_RATES.some((rate) => rate === prefs.playbackRate) ? prefs.playbackRate : DEFAULT_PREFERENCES.playbackRate;
    return {
      volume,
      muted: prefs.muted === true,
      playbackRate
    };
  }

  // src/shared/resume.ts
  var RESUME_END_THRESHOLD_SEC = 5;
  function shouldResume(saved, duration, endThresholdSec) {
    return saved > 0 && Number.isFinite(duration) && saved < duration - endThresholdSec;
  }

  // src/shared/config.ts
  var FRAME_STEP_SECONDS = 1 / 30;

  // src/webview/abLoop.ts
  function nextLoopTarget(current, state) {
    if (state.a !== null && state.b !== null && state.b > state.a) {
      if (current >= state.b) {
        return state.a;
      }
      return null;
    }
    if (state.whole && Number.isFinite(state.duration) && state.duration > 0) {
      if (current >= state.duration) {
        return 0;
      }
    }
    return null;
  }

  // src/webview/bufferingOverlay.ts
  var BufferingOverlay = class {
    // timers is injected (not taken from a DOM global) so this module stays pure
    // and compiles/tests in Node without a DOM lib; the caller passes window.
    constructor(onShow, onHide, timers, delayMs = 250) {
      this.onShow = onShow;
      this.onHide = onHide;
      this.timers = timers;
      this.delayMs = delayMs;
    }
    // Reveal the spinner after the debounce. A second show() while one is pending
    // is a no-op so the timer isn't restarted on every micro-stall.
    show() {
      if (this.timer !== void 0) {
        return;
      }
      this.timer = this.timers.setTimeout(() => {
        this.timer = void 0;
        this.onShow();
      }, this.delayMs);
    }
    // Cancel any pending reveal and hide immediately. Safe to call when nothing
    // is pending or showing.
    hide() {
      if (this.timer !== void 0) {
        this.timers.clearTimeout(this.timer);
        this.timer = void 0;
      }
      this.onHide();
    }
  };

  // src/webview/sync.ts
  var DEFAULT_DRIFT_TUNING = {
    soft: 0.1,
    hard: 1,
    rateNudge: 0.05
  };
  function driftAction(audioTime, videoTime, baseRate, tuning = DEFAULT_DRIFT_TUNING) {
    if (!Number.isFinite(audioTime) || !Number.isFinite(videoTime)) {
      return { kind: "none" };
    }
    const diff = audioTime - videoTime;
    const magnitude = Math.abs(diff);
    if (magnitude >= tuning.hard) {
      return { kind: "seek", to: videoTime };
    }
    if (magnitude <= tuning.soft) {
      return { kind: "none" };
    }
    const direction = diff > 0 ? -1 : 1;
    const playbackRate = Math.max(0.0625, baseRate + direction * tuning.rateNudge);
    return { kind: "rate", playbackRate };
  }
  var AUDIO_READY_THRESHOLD = 3;
  function canResumeAudio(readyState, seeking) {
    return readyState >= AUDIO_READY_THRESHOLD && !seeking;
  }
  function isBenignPlayError(errorName) {
    return errorName === "AbortError" || errorName === "NotAllowedError";
  }

  // src/webview/util.ts
  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) {
      seconds = 0;
    }
    const total = Math.floor(seconds);
    const s = total % 60;
    const m = Math.floor(total / 60) % 60;
    const h = Math.floor(total / 3600);
    const ss = String(s).padStart(2, "0");
    if (h > 0) {
      const mm = String(m).padStart(2, "0");
      return h + ":" + mm + ":" + ss;
    }
    return m + ":" + ss;
  }
  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }
  function ratioInRect(clientX, left, width) {
    if (width <= 0) {
      return 0;
    }
    return clamp((clientX - left) / width, 0, 1);
  }
  function latestBufferedEnd(ranges, currentTime) {
    let end = 0;
    for (const range of ranges) {
      if (range.start <= currentTime) {
        end = Math.max(end, range.end);
      }
    }
    return end;
  }

  // src/webview/seekbar.ts
  function renderLoopMarkers(a, b, duration) {
    renderLoopMarker(els.markerA, a, duration);
    renderLoopMarker(els.markerB, b, duration);
  }
  function renderLoopMarker(marker, time, duration) {
    if (time === null || !Number.isFinite(duration) || duration <= 0) {
      marker.hidden = true;
      marker.style.left = "0%";
      return;
    }
    marker.hidden = false;
    marker.style.left = time / duration * 100 + "%";
  }
  var Seekbar = class {
    constructor(controller2) {
      this.controller = controller2;
      this.scrubbing = false;
      this.wasPlayingBeforeScrub = false;
      els.seek.addEventListener("mousedown", (evt) => {
        evt.preventDefault();
        this.beginScrub(evt);
      });
      window.addEventListener("mousemove", (evt) => {
        this.moveScrub(evt);
      });
      window.addEventListener("mouseup", (evt) => {
        this.endScrub(evt);
      });
      els.seek.addEventListener("touchstart", (evt) => {
        this.beginScrub(evt);
      }, { passive: true });
      els.seek.addEventListener("touchmove", (evt) => {
        this.moveScrub(evt);
      }, { passive: true });
      els.seek.addEventListener("touchend", (evt) => {
        this.endScrub(evt);
      });
      els.seek.addEventListener("keydown", (evt) => {
        this.handleKey(evt);
      });
    }
    handleKey(evt) {
      const dur = isFinite(this.controller.duration) ? this.controller.duration : 0;
      if (dur <= 0) {
        return;
      }
      if (evt.key === "Home") {
        this.controller.seekTo(0);
        evt.preventDefault();
      } else if (evt.key === "End") {
        this.controller.seekTo(dur);
        evt.preventDefault();
      }
    }
    isScrubbing() {
      return this.scrubbing;
    }
    beginScrub(evt) {
      this.scrubbing = true;
      this.wasPlayingBeforeScrub = !this.controller.isPaused();
      els.seek.classList.add("scrubbing");
      this.moveScrub(evt);
    }
    moveScrub(evt) {
      if (!this.scrubbing) {
        return;
      }
      const t = this.timeFromEvent(evt);
      const dur = isFinite(this.controller.duration) ? this.controller.duration : 0;
      const pct = dur > 0 ? t / dur * 100 : 0;
      els.seekPlayed.style.width = pct + "%";
      els.seekHandle.style.left = pct + "%";
      els.timeCur.textContent = formatTime(t);
      if (dur > 0) {
        els.seek.setAttribute("aria-valuenow", String(Math.floor(t)));
        els.seek.setAttribute("aria-valuetext", formatTime(t) + " of " + formatTime(dur));
      }
    }
    endScrub(evt) {
      if (!this.scrubbing) {
        return;
      }
      const t = this.timeFromEvent(evt);
      this.scrubbing = false;
      els.seek.classList.remove("scrubbing");
      this.controller.seekTo(t);
      if (this.wasPlayingBeforeScrub) {
        this.controller.play();
      }
    }
    timeFromEvent(evt) {
      const rect = els.seek.getBoundingClientRect();
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      const ratio = ratioInRect(clientX, rect.left, rect.width);
      const dur = isFinite(this.controller.duration) ? this.controller.duration : 0;
      return ratio * dur;
    }
  };

  // src/webview/status.ts
  var actionSlots = [null, null];
  function slotButtons() {
    return [els.statusAction, els.statusActionSecondary];
  }
  function hideActions() {
    const buttons = slotButtons();
    for (let i = 0; i < buttons.length; i++) {
      actionSlots[i] = null;
      buttons[i].hidden = true;
      buttons[i].textContent = "";
    }
  }
  function showStatus(text, variant) {
    els.status.hidden = false;
    els.status.setAttribute("aria-live", variant === "warning" ? "assertive" : "polite");
    hideActions();
    if (variant === "warning") {
      els.status.classList.add("is-warning");
      els.statusSpinner.hidden = true;
    } else if (variant === "loading") {
      els.status.classList.remove("is-warning");
      els.statusSpinner.hidden = false;
    } else {
      els.status.classList.remove("is-warning");
      els.statusSpinner.hidden = true;
    }
    els.statusText.textContent = text;
  }
  function clearStatus() {
    els.status.hidden = true;
    els.statusText.textContent = "";
    els.statusSpinner.hidden = true;
    hideActions();
    els.status.classList.remove("is-warning");
  }
  function setStatusActions(actions) {
    const buttons = slotButtons();
    for (let i = 0; i < buttons.length; i++) {
      const spec = actions[i] ?? null;
      actionSlots[i] = spec;
      if (spec === null) {
        buttons[i].hidden = true;
        buttons[i].textContent = "";
      } else {
        buttons[i].textContent = spec.label;
        buttons[i].hidden = false;
      }
    }
  }
  function statusActionAt(index) {
    const button = slotButtons()[index];
    const spec = actionSlots[index];
    if (!button || button.hidden || spec === null) {
      return null;
    }
    return spec.action;
  }
  function flashFeedback(playing) {
    if (playing) {
      els.flashIcon.innerHTML = '<path d="M8 5v14l11-7z" fill="currentColor"></path>';
    } else {
      els.flashIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z" fill="currentColor"></path>';
    }
    els.flash.classList.remove("show");
    void els.flash.offsetWidth;
    els.flash.classList.add("show");
  }

  // src/webview/playerController.ts
  var PlayerController = class {
    constructor(postMessage) {
      this.postMessage = postMessage;
      /** The separate audible mp3 track, created when 'audioSrc' arrives. */
      this.audio = null;
      this.subtitlesUrl = null;
      this.videoCarriesAudio = false;
      this.videoFallbackPending = false;
      this.fallbackAttempted = false;
      this.seekStep = 10;
      // User's intended mute state, independent of which element is currently
      // audible -- so muting before the audio track attaches is preserved.
      this.userMuted = false;
      this.SPEEDS = ALLOWED_RATES;
      this.speedIndex = this.SPEEDS.indexOf(1);
      this.hasPendingVolumePreferenceSave = false;
      this.PROGRESS_SAVE_DELTA_SEC = 5;
      this.resumeTime = 0;
      this.lastSavedTime = 0;
      // Whether the user wants playback running, independent of whether an element
      // is momentarily paused for buffering. Drives togglePlay and buffer recovery.
      this.userIntendsPlay = false;
      // True while the video is held paused *because the audio track underran*. The
      // pause is masked from the UI/progress so it reads as buffering, not a stop.
      this.waitingForAudio = false;
      // Stage buffering spinner with a debounce so micro-stalls don't flash it. The
      // debounce/cancel logic lives in a pure BufferingOverlay so it is unit-tested
      // with a fake clock; this only wires it to the CSS class toggle.
      this.buffering = new BufferingOverlay(
        () => els.player.classList.add("is-buffering"),
        () => els.player.classList.remove("is-buffering"),
        {
          setTimeout: (handler, ms) => window.setTimeout(handler, ms),
          clearTimeout: (id) => window.clearTimeout(id)
        }
      );
      this.loop = { a: null, b: null, whole: false, duration: 0 };
      // Whether a drag-scrub is in progress. Wired by the Seekbar via
      // setScrubProvider so the timeupdate handler can skip redrawing the bar
      // mid-drag. Defaults to "not scrubbing" until the Seekbar attaches.
      this.isScrubbing = () => false;
      this.attachVideoListeners();
    }
    /** Let the Seekbar report when a drag-scrub is active. */
    setScrubProvider(isScrubbing) {
      this.isScrubbing = isScrubbing;
    }
    get duration() {
      return els.video.duration;
    }
    setNativeAudio(on) {
      this.videoCarriesAudio = on;
      this.applyAudible();
    }
    setSeekStep(step) {
      this.seekStep = step;
      if (Number.isFinite(step)) {
        this.updateSeekStepLabels(step);
      }
    }
    getSeekStep() {
      return this.seekStep;
    }
    // Keep the back/forward buttons honest about the configured step: their face
    // badge, tooltip, and accessible name all derive from the live seekStep
    // instead of a baked-in "10".
    updateSeekStepLabels(step) {
      const label = String(step);
      const backSub = els.back10Btn.querySelector(".btn-sub");
      const fwdSub = els.fwd10Btn.querySelector(".btn-sub");
      if (backSub) {
        backSub.textContent = label;
      }
      if (fwdSub) {
        fwdSub.textContent = label;
      }
      els.back10Btn.title = "Back " + label + "s (J)";
      els.fwd10Btn.title = "Forward " + label + "s (L)";
      els.back10Btn.setAttribute("aria-label", "Rewind " + label + " seconds");
      els.fwd10Btn.setAttribute("aria-label", "Forward " + label + " seconds");
    }
    applyPreferences(p) {
      const preferences = clampPreferences(p);
      els.volSlider.value = String(preferences.volume);
      this.userMuted = preferences.muted;
      const preferredIndex = this.SPEEDS.indexOf(preferences.playbackRate);
      this.speedIndex = preferredIndex === -1 ? this.SPEEDS.indexOf(1) : preferredIndex;
      this.applyRate();
      this.applyAudible();
    }
    setResumeTime(time) {
      this.resumeTime = Number.isFinite(time) && time > 0 ? time : 0;
      this.lastSavedTime = this.resumeTime;
    }
    attachVideo(url, nativeAudio, compatibleFallback = false) {
      this.videoCarriesAudio = nativeAudio;
      this.fallbackAttempted = compatibleFallback;
      els.video.src = url;
      els.video.preservesPitch = true;
      this.applyAudible();
    }
    isPaused() {
      return els.video.paused;
    }
    // The element that carries audible volume/mute for the user: the mp3 if we
    // have it, otherwise the (muted-for-AAC) video element as a fallback target.
    audibleEl() {
      return this.audio || els.video;
    }
    syncAudioToVideo() {
      if (this.audio && Math.abs(this.audio.currentTime - els.video.currentTime) > DEFAULT_DRIFT_TUNING.soft) {
        this.audio.currentTime = els.video.currentTime;
      }
    }
    tryPlayAudio() {
      if (!this.audio) {
        return;
      }
      this.audio.play().catch((err) => {
        const name = err instanceof DOMException ? err.name : "";
        if (isBenignPlayError(name)) {
          return;
        }
        showStatus("Audio playback error", "warning");
      });
    }
    play() {
      this.userIntendsPlay = true;
      els.video.play().catch(function() {
      });
      if (this.audio) {
        this.syncAudioToVideo();
        this.tryPlayAudio();
      }
    }
    pause() {
      const wasBufferHeld = this.waitingForAudio;
      this.userIntendsPlay = false;
      this.waitingForAudio = false;
      els.video.pause();
      if (this.audio) {
        this.audio.pause();
      }
      this.hideBuffering();
      if (wasBufferHeld) {
        els.player.classList.remove("is-playing");
        els.player.classList.add("is-paused");
        els.playBtn.setAttribute("aria-pressed", "false");
      }
    }
    videoIsPlaying() {
      return !els.video.paused && !els.video.ended;
    }
    pauseAudioForBuffering() {
      if (this.audio && !this.audio.paused) {
        this.audio.pause();
      }
    }
    resumeAudioWithVideo() {
      if (this.audio && this.videoIsPlaying()) {
        this.syncAudioToVideo();
        if (canResumeAudio(this.audio.readyState, this.audio.seeking)) {
          this.tryPlayAudio();
        }
      }
    }
    // Show the stage spinner after a short delay so brief stalls don't flicker it.
    showBuffering() {
      this.buffering.show();
    }
    hideBuffering() {
      this.buffering.hide();
    }
    showStageError(message) {
      this.hideBuffering();
      els.stageError.textContent = message;
      els.player.classList.add("is-stage-error");
    }
    clearStageError() {
      els.player.classList.remove("is-stage-error");
    }
    // The audio track underran. Mirror how the video's `waiting` pauses audio:
    // hold the video so it cannot run ahead of silent audio, but mask the pause
    // (waitingForAudio) so it reads as buffering rather than a user stop.
    holdForAudioBuffering() {
      if (this.audio && this.userIntendsPlay && this.videoIsPlaying()) {
        this.waitingForAudio = true;
        els.video.pause();
        this.showBuffering();
      }
    }
    // The audio track recovered. Release a buffering hold and resume the pair the
    // user still wants playing.
    resumeAfterAudioBuffering() {
      if (!this.waitingForAudio) {
        return;
      }
      this.waitingForAudio = false;
      if (this.userIntendsPlay) {
        this.syncAudioToVideo();
        els.video.play().catch(() => this.dropToPausedFromBuffering());
        if (this.audio && canResumeAudio(this.audio.readyState, this.audio.seeking)) {
          this.tryPlayAudio();
        }
      }
    }
    // A buffering resume failed to start the video. Reflect a real stop so the UI
    // doesn't keep a spinner over a frame that will never advance.
    dropToPausedFromBuffering() {
      this.userIntendsPlay = false;
      this.hideBuffering();
      els.player.classList.remove("is-playing");
      els.player.classList.add("is-paused");
      els.playBtn.setAttribute("aria-pressed", "false");
    }
    // An audio readiness event fired. Resume whichever path was waiting on it:
    // a masked buffering hold, or a play deferred while video kept running.
    onAudioReady() {
      if (this.waitingForAudio) {
        this.resumeAfterAudioBuffering();
      } else {
        this.resumeAudioWithVideo();
      }
    }
    togglePlay() {
      if (!this.userIntendsPlay) {
        this.play();
        flashFeedback(true);
      } else {
        this.pause();
        flashFeedback(false);
      }
    }
    seekTo(time) {
      const dur = isFinite(els.video.duration) ? els.video.duration : time;
      const clamped = clamp(time, 0, dur || 0);
      els.video.currentTime = clamped;
      if (this.audio) {
        this.audio.currentTime = clamped;
      }
    }
    nudge(delta) {
      this.seekTo(els.video.currentTime + delta);
    }
    frameStep(direction) {
      this.pause();
      this.seekTo(els.video.currentTime + direction * FRAME_STEP_SECONDS);
    }
    setLoopA() {
      const a = els.video.currentTime;
      this.loop.a = a;
      if (this.loop.b !== null && this.loop.b <= a) {
        this.loop.b = null;
      }
      this.refreshLoopUi();
    }
    setLoopB() {
      if (this.loop.a === null) {
        return;
      }
      const b = els.video.currentTime;
      if (b <= this.loop.a) {
        return;
      }
      this.loop.b = b;
      this.refreshLoopUi();
    }
    toggleWholeLoop() {
      this.loop.whole = !this.loop.whole;
      this.refreshLoopUi();
    }
    clearLoop() {
      this.loop = { a: null, b: null, whole: false, duration: els.video.duration };
      this.refreshLoopUi();
    }
    applyRate() {
      const rate = this.SPEEDS[this.speedIndex];
      els.video.playbackRate = rate;
      if (this.audio) {
        this.audio.playbackRate = rate;
      }
      els.speedBtn.textContent = rate + "x";
      els.speedBtn.setAttribute("aria-label", "Playback speed " + rate + "x");
    }
    cycleSpeed() {
      this.speedIndex = (this.speedIndex + 1) % this.SPEEDS.length;
      this.applyRate();
      this.emitPreferences();
    }
    // Apply the current volume + mute intent to whichever element is audible,
    // keeping the video itself permanently muted (its AAC can't decode and would
    // be a second, out-of-sync sound source).
    applyAudible() {
      const v = parseFloat(els.volSlider.value);
      const el = this.audibleEl();
      el.volume = v;
      el.muted = this.userMuted;
      if (el !== els.video) {
        els.video.muted = true;
      } else if (!this.videoCarriesAudio) {
        els.video.muted = true;
      }
      this.updateMuteUi();
    }
    onVolumeInput() {
      if (parseFloat(els.volSlider.value) > 0) {
        this.userMuted = false;
      }
      this.applyAudible();
      this.queueVolumePreferences();
    }
    toggleMute() {
      this.userMuted = !this.userMuted;
      this.applyAudible();
      this.emitPreferences();
    }
    emitPreferences() {
      this.hasPendingVolumePreferenceSave = false;
      this.postMessage({
        type: "savePreferences",
        preferences: {
          volume: parseFloat(els.volSlider.value),
          muted: this.userMuted,
          playbackRate: this.SPEEDS[this.speedIndex]
        }
      });
    }
    queueVolumePreferences() {
      if (this.volumePreferenceSaveTimeout === void 0) {
        this.emitPreferences();
        this.volumePreferenceSaveTimeout = window.setTimeout(() => {
          this.flushVolumePreferences();
        }, 400);
        return;
      }
      this.hasPendingVolumePreferenceSave = true;
    }
    flushVolumePreferences() {
      if (this.hasPendingVolumePreferenceSave) {
        this.emitPreferences();
        this.volumePreferenceSaveTimeout = window.setTimeout(() => {
          this.flushVolumePreferences();
        }, 400);
        return;
      }
      this.volumePreferenceSaveTimeout = void 0;
    }
    updateMuteUi() {
      const v = parseFloat(els.volSlider.value);
      const muted = this.userMuted || v === 0;
      els.player.classList.toggle("is-muted", muted);
      els.muteBtn.setAttribute("aria-pressed", muted ? "true" : "false");
    }
    attachAudio(url) {
      if (this.audio) {
        this.audio.pause();
        this.audio.removeAttribute("src");
        this.audio.load();
        this.audio.remove();
      }
      this.audio = document.createElement("audio");
      this.audio.preload = "auto";
      this.audio.hidden = true;
      this.audio.src = url;
      document.body.appendChild(this.audio);
      this.audio.playbackRate = this.SPEEDS[this.speedIndex];
      this.audio.preservesPitch = true;
      els.video.preservesPitch = true;
      this.applyAudible();
      this.syncAudioToVideo();
      if (!els.video.paused) {
        this.tryPlayAudio();
      }
      this.audio.addEventListener("error", function() {
        showStatus("Audio playback error", "warning");
      });
      this.audio.addEventListener("waiting", () => this.holdForAudioBuffering());
      this.audio.addEventListener("stalled", () => this.holdForAudioBuffering());
      this.audio.addEventListener("canplay", () => this.onAudioReady());
      this.audio.addEventListener("playing", () => this.onAudioReady());
      this.audio.addEventListener("seeked", () => this.onAudioReady());
      if (!this.videoFallbackPending) {
        clearStatus();
      }
    }
    attachSubtitles(vtt, label, activate = false) {
      const showing = activate || els.player.classList.contains("is-subtitles-on");
      if (this.subtitlesUrl !== null) {
        URL.revokeObjectURL(this.subtitlesUrl);
      }
      const blob = new Blob([vtt], { type: "text/vtt" });
      this.subtitlesUrl = URL.createObjectURL(blob);
      els.track.src = this.subtitlesUrl;
      els.track.label = label;
      els.track.track.mode = "hidden";
      els.subBtn.hidden = false;
      els.subBtn.title = `Subtitles: ${label} (C)`;
      els.selectSubBtn.title = `Choose subtitle file (current: ${label})`;
      els.subBtn.setAttribute("aria-pressed", showing ? "true" : "false");
      els.player.classList.toggle("is-subtitles-on", showing);
    }
    toggleSubtitles() {
      if (els.video.textTracks.length === 0 || els.subBtn.hidden) {
        return;
      }
      const track = els.video.textTracks[0];
      const showing = !els.player.classList.contains("is-subtitles-on");
      track.mode = "hidden"; // cues are drawn as selectable text by .cc-text
      els.player.classList.toggle("is-subtitles-on", showing);
      els.subBtn.setAttribute("aria-pressed", showing ? "true" : "false");
    }
    // Keep the audio track in step with the video clock without re-seeking every
    // frame: nudge playbackRate for small drift, hard-seek only for large drift.
    // Policy lives in the pure `driftAction` so it is unit-tested in isolation.
    correctDrift() {
      if (!this.audio || this.audio.paused || els.video.paused) {
        return;
      }
      if (this.audio.seeking || els.video.seeking) {
        return;
      }
      const baseRate = this.SPEEDS[this.speedIndex];
      const action = driftAction(this.audio.currentTime, els.video.currentTime, baseRate);
      switch (action.kind) {
        case "seek":
          this.audio.currentTime = action.to;
          this.audio.playbackRate = baseRate;
          break;
        case "rate":
          this.audio.playbackRate = action.playbackRate;
          break;
        case "none":
          if (this.audio.playbackRate !== baseRate) {
            this.audio.playbackRate = baseRate;
          }
          break;
      }
    }
    postProgress(time) {
      if (!Number.isFinite(time)) {
        return;
      }
      this.lastSavedTime = time;
      this.postMessage({ type: "progress", time });
    }
    postProgressIfNeeded() {
      const time = els.video.currentTime;
      if (!Number.isFinite(time)) {
        return;
      }
      if (Math.abs(time - this.lastSavedTime) >= this.PROGRESS_SAVE_DELTA_SEC) {
        this.postProgress(time);
      }
    }
    renderProgress() {
      const dur = els.video.duration;
      if (isFinite(dur) && dur > 0) {
        const pct = els.video.currentTime / dur * 100;
        els.seekPlayed.style.width = pct + "%";
        els.seekHandle.style.left = pct + "%";
      } else {
        els.seekPlayed.style.width = "0%";
        els.seekHandle.style.left = "0%";
      }
      this.renderBuffered();
      this.updateSeekAria();
    }
    // Mirror the seek bar's position into ARIA so screen readers announce a
    // human-readable timestamp; the visual width/handle alone are silent.
    updateSeekAria() {
      const dur = els.video.duration;
      if (!isFinite(dur) || dur <= 0) {
        return;
      }
      els.seek.setAttribute("aria-valuemax", String(Math.floor(dur)));
      els.seek.setAttribute("aria-valuenow", String(Math.floor(els.video.currentTime)));
      els.seek.setAttribute("aria-valuetext", formatTime(els.video.currentTime) + " of " + formatTime(dur));
    }
    renderBuffered() {
      const dur = els.video.duration;
      if (!isFinite(dur) || dur <= 0 || els.video.buffered.length === 0) {
        els.seekBuffered.style.width = "0%";
        return;
      }
      const ranges = Array.from({ length: els.video.buffered.length }, function(_, i) {
        return {
          start: els.video.buffered.start(i),
          end: els.video.buffered.end(i)
        };
      });
      const end = latestBufferedEnd(ranges, els.video.currentTime);
      els.seekBuffered.style.width = end / dur * 100 + "%";
    }
    refreshLoopUi() {
      this.loop.duration = els.video.duration;
      renderLoopMarkers(this.loop.a, this.loop.b, this.loop.duration);
      els.player.classList.toggle("is-looping", this.loop.whole);
      els.loopBtn.classList.toggle("is-active", this.loop.whole);
      els.loopBtn.setAttribute("aria-pressed", this.loop.whole ? "true" : "false");
      els.setABtn.classList.toggle("is-active", this.loop.a !== null);
      els.setBBtn.classList.toggle("is-active", this.loop.b !== null);
    }
    applyLoop(resumeAfterSeek) {
      const target = nextLoopTarget(els.video.currentTime, { ...this.loop, duration: els.video.duration });
      if (target === null) {
        return false;
      }
      this.seekTo(target);
      this.renderProgress();
      if (resumeAfterSeek) {
        this.play();
      }
      return true;
    }
    attachVideoListeners() {
      els.video.addEventListener("loadedmetadata", () => {
        if (this.videoFallbackPending) {
          this.videoFallbackPending = false;
          clearStatus();
        }
        els.timeDur.textContent = formatTime(els.video.duration);
        this.refreshLoopUi();
        this.renderProgress();
        if (shouldResume(this.resumeTime, els.video.duration, RESUME_END_THRESHOLD_SEC)) {
          this.seekTo(this.resumeTime);
        }
        this.hideBuffering();
      });
      els.video.addEventListener("durationchange", () => {
        els.timeDur.textContent = formatTime(els.video.duration);
        this.refreshLoopUi();
        this.updateSeekAria();
      });
      els.video.addEventListener("timeupdate", () => {
        if (!this.isScrubbing()) {
          els.timeCur.textContent = formatTime(els.video.currentTime);
          this.renderProgress();
        }
        if (this.applyLoop(this.videoIsPlaying())) {
          return;
        }
        this.correctDrift();
        this.postProgressIfNeeded();
      });
      els.video.addEventListener("progress", () => {
        this.renderBuffered();
      });
      els.video.addEventListener("play", () => {
        els.player.classList.add("is-playing");
        els.player.classList.remove("is-paused");
        els.playBtn.setAttribute("aria-pressed", "true");
        this.resumeAudioWithVideo();
      });
      els.video.addEventListener("pause", () => {
        if (this.waitingForAudio) {
          return;
        }
        this.hideBuffering();
        els.player.classList.remove("is-playing");
        els.player.classList.add("is-paused");
        els.playBtn.setAttribute("aria-pressed", "false");
        if (this.audio && !this.audio.paused) {
          this.audio.pause();
        }
        this.postProgress(els.video.currentTime);
      });
      els.video.addEventListener("seeking", () => {
        if (this.audio) {
          this.audio.currentTime = els.video.currentTime;
        }
      });
      els.video.addEventListener("seeked", () => {
        this.resumeAudioWithVideo();
        this.hideBuffering();
      });
      els.video.addEventListener("waiting", () => {
        this.pauseAudioForBuffering();
        this.showBuffering();
      });
      els.video.addEventListener("stalled", () => {
        this.pauseAudioForBuffering();
        this.showBuffering();
      });
      els.video.addEventListener("playing", () => {
        this.resumeAudioWithVideo();
        this.hideBuffering();
        this.clearStageError();
      });
      els.video.addEventListener("canplay", () => {
        this.hideBuffering();
        this.clearStageError();
      });
      els.video.addEventListener("loadstart", () => {
        this.showBuffering();
      });
      els.video.addEventListener("ended", () => {
        if (this.applyLoop(true)) {
          return;
        }
        this.userIntendsPlay = false;
        this.waitingForAudio = false;
        this.hideBuffering();
        if (this.audio) {
          this.audio.pause();
        }
      });
      els.video.addEventListener("error", () => {
        const code = els.video.error && els.video.error.code;
        if ((code === 3 || code === 4) && !this.fallbackAttempted) {
          this.fallbackAttempted = true;
          this.videoFallbackPending = true;
          this.postMessage({ type: "videoUnsupported" });
          showStatus("Preparing this MP4 for playback...", "loading");
          this.showBuffering();
          return;
        }
        let detail = "Unknown playback error";
        if (els.video.error) {
          switch (els.video.error.code) {
            case 1:
              detail = "Playback aborted";
              break;
            case 2:
              detail = "Network error while streaming video";
              break;
            case 3:
              detail = "Video could not be decoded";
              break;
            case 4:
              detail = "Video format is not supported";
              break;
          }
        }
        this.postMessage({ type: "error", message: detail });
        showStatus(detail, "warning");
        this.showStageError(detail);
      });
    }
  };

  // src/webview/main.ts
  var vscode = acquireVsCodeApi();
  var controller = new PlayerController(function(message) {
    vscode.postMessage(message);
  });
  var seekbar = new Seekbar(controller);
  controller.setScrubProvider(function() {
    return seekbar.isScrubbing();
  });
  window.addEventListener("message", function(event) {
    const msg = event.data;
    if (!msg || typeof msg.type !== "string") {
      return;
    }
    switch (msg.type) {
      case "init":
        els.fileLabel.textContent = msg.name || "";
        els.fileLabel.title = msg.name || "";
        controller.setResumeTime(msg.resumeTime || 0);
        controller.setNativeAudio(!!msg.nativeAudio);
        controller.setSeekStep(msg.seekStep);
        controller.applyPreferences(msg.preferences);
        if (msg.audioPending) {
          showStatus("Extracting audio\u2026", "loading");
        } else if (msg.ffmpegMissing) {
          const hint = msg.ffmpegInstall;
          if (hint) {
            showStatus(
              `Audio needs ffmpeg, which wasn't found. Install it with ${hint.manager} (${hint.command}), then reload the window.`,
              "warning"
            );
            setStatusActions([
              { label: "Copy command", action: "copyFfmpegCommand" },
              { label: "Open settings", action: "openFfmpegSettings" }
            ]);
          } else {
            showStatus(
              "Audio needs ffmpeg, which wasn't found. Install it (see README) or set its path in Settings, then reload the window.",
              "warning"
            );
            setStatusActions([{ label: "Open settings", action: "openFfmpegSettings" }]);
          }
        } else {
          clearStatus();
        }
        break;
      case "videoSrc":
        controller.attachVideo(msg.url, !!msg.nativeAudio, !!msg.compatibleFallback);
        break;
      case "videoFallbackError":
        controller.videoFallbackPending = false;
        showStatus(msg.message, "warning");
        controller.showStageError(msg.message);
        break;
      case "subtitles":
        controller.attachSubtitles(msg.vtt, msg.label, !!msg.activate);
        break;
      case "audioSrc":
        controller.attachAudio(msg.url);
        break;
      case "audioNone":
        showStatus("No audio track", "info");
        break;
      case "audioError":
        showStatus("Audio extraction failed", "warning");
        break;
      case "audioUntrusted":
        showStatus("Audio is disabled because this workspace isn't trusted.", "warning");
        setStatusActions([{ label: "Trust workspace", action: "trustWorkspace" }]);
        break;
    }
  });
  els.playBtn.addEventListener("click", function() {
    controller.togglePlay();
  });
  els.stage.addEventListener("click", function() {
    controller.togglePlay();
  });
  els.back10Btn.addEventListener("click", function() {
    controller.nudge(-controller.getSeekStep());
  });
  els.fwd10Btn.addEventListener("click", function() {
    controller.nudge(controller.getSeekStep());
  });
  els.loopBtn.addEventListener("click", function() {
    controller.toggleWholeLoop();
  });
  els.setABtn.addEventListener("click", function() {
    controller.setLoopA();
  });
  els.setBBtn.addEventListener("click", function() {
    controller.setLoopB();
  });
  els.muteBtn.addEventListener("click", function() {
    controller.toggleMute();
  });
  els.volSlider.addEventListener("input", function() {
    controller.onVolumeInput();
  });
  els.speedBtn.addEventListener("click", function() {
    controller.cycleSpeed();
  });
  els.subBtn.addEventListener("click", function() {
    controller.toggleSubtitles();
  });
  els.selectSubBtn.addEventListener("click", function() {
    vscode.postMessage({ type: "action", name: "selectSubtitles" });
  });
  var pipSupported = document.pictureInPictureEnabled && typeof els.video.requestPictureInPicture === "function";
  if (!pipSupported) {
    els.pipBtn.hidden = true;
  }
  function togglePip() {
    if (!pipSupported) {
      return;
    }
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(function() {
      });
    } else {
      els.video.requestPictureInPicture().catch(function() {
      });
    }
  }
  els.pipBtn.addEventListener("click", togglePip);
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function() {
      });
    } else if (els.stage.requestFullscreen) {
      els.stage.requestFullscreen().catch(function() {
      });
    }
  }
  els.fsBtn.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", function() {
    const isFs = !!document.fullscreenElement;
    els.player.classList.toggle("is-fullscreen", isFs);
    els.fsBtn.setAttribute("aria-pressed", isFs ? "true" : "false");
  });
  function postStatusAction(index) {
    const action = statusActionAt(index);
    if (action !== null) {
      vscode.postMessage({ type: "action", name: action });
    }
  }
  els.statusAction.addEventListener("click", function() {
    postStatusAction(0);
  });
  els.statusActionSecondary.addEventListener("click", function() {
    postStatusAction(1);
  });
  function isTypingTarget(el) {
    if (!el) {
      return false;
    }
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  }
  document.addEventListener("keydown", function(evt) {
    if (isTypingTarget(evt.target)) {
      return;
    }
    let handled = true;
    switch (evt.key) {
      case " ":
      case "k":
      case "K":
        controller.togglePlay();
        break;
      case "m":
      case "M":
        controller.toggleMute();
        break;
      case "c":
      case "C":
        controller.toggleSubtitles();
        break;
      case "j":
      case "J":
      case "ArrowLeft":
        controller.nudge(-controller.getSeekStep());
        break;
      case "l":
      case "L":
      case "ArrowRight":
        controller.nudge(controller.getSeekStep());
        break;
      case ",":
        controller.frameStep(-1);
        break;
      case ".":
        controller.frameStep(1);
        break;
      case "[":
        controller.setLoopA();
        break;
      case "]":
        controller.setLoopB();
        break;
      case "\\":
        controller.toggleWholeLoop();
        break;
      case "p":
      case "P":
        togglePip();
        break;
      case "f":
      case "F":
        toggleFullscreen();
        break;
      default:
        handled = false;
    }
    if (handled) {
      evt.preventDefault();
    }
  });
  (function() {
    var KEY = "ccSettings", D = { size: 22, font: "sans-serif", color: "#ffffff", bg: 75, pos: null };
    var s = Object.assign({}, D);
    try { Object.assign(s, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
    var $ = function(id) { return document.getElementById(id); };
    var panel = $("ccPanel");
    var txt = document.createElement("div");
    txt.className = "cc-text";
    ["click", "dblclick", "mousedown"].forEach(function(t) { txt.addEventListener(t, function(e) { e.stopPropagation(); }); });
    var grip = document.createElement("span"), body = document.createElement("span");
    grip.className = "cc-grip"; grip.textContent = "\u283f"; grip.title = "Drag to move";
    txt.append(grip, body);
    els.stage.appendChild(txt);
    function render() {
      var on = els.player.classList.contains("is-subtitles-on"), cues = els.track.track.activeCues, t = [];
      for (var i = 0; on && cues && i < cues.length; i++) t.push(cues[i].text);
      var out = t.join("\n");
      if (body.textContent !== out) body.textContent = out;
      txt.hidden = !out;
    }
    grip.addEventListener("pointerdown", function(e) {
      var r = els.stage.getBoundingClientRect(), b = txt.getBoundingClientRect();
      var dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
      grip.setPointerCapture(e.pointerId);
      function move(ev) {
        s.pos = {
          x: Math.min(1, Math.max(0, (ev.clientX - dx - r.left) / r.width)),
          y: Math.min(1, Math.max(0, (ev.clientY - dy - r.top) / r.height))
        };
        place();
      }
      function up() {
        grip.removeEventListener("pointermove", move); grip.removeEventListener("pointerup", up);
        apply();
      }
      grip.addEventListener("pointermove", move); grip.addEventListener("pointerup", up);
      e.preventDefault();
    });
    function place() {
      var p = s.pos;
      txt.style.left = p ? p.x * 100 + "%" : "";
      txt.style.top = p ? p.y * 100 + "%" : "";
      txt.style.bottom = p ? "auto" : "";
      txt.style.transform = p ? "translate(-50%, -50%)" : "";
    }
    els.track.track.addEventListener("cuechange", render);
    els.track.addEventListener("load", render);
    els.video.addEventListener("timeupdate", render);
    els.video.addEventListener("seeked", render);
    new MutationObserver(render).observe(els.player, { attributes: true, attributeFilter: ["class"] });
    function apply() {
      var c = s.color;
      [els.video.style, txt.style].forEach(function(st) {
        st.setProperty("--cc-size", s.size + "px");
        st.setProperty("--cc-font", s.font);
        st.setProperty("--cc-color", c);
        st.setProperty("--cc-bg", "rgba(0,0,0," + s.bg / 100 + ")");
      });
      place();
      $("ccSize").value = s.size; $("ccSizeOut").textContent = s.size + "px";
      $("ccFont").value = s.font; $("ccColor").value = c;
      $("ccBg").value = s.bg; $("ccBgOut").textContent = s.bg + "%";
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    }
    $("ccSetBtn").addEventListener("click", function() { panel.hidden = !panel.hidden; });
    $("ccSize").addEventListener("input", function(e) { s.size = +e.target.value; apply(); });
    $("ccFont").addEventListener("change", function(e) { s.font = e.target.value; apply(); });
    $("ccColor").addEventListener("change", function(e) { s.color = e.target.value; apply(); });
    $("ccBg").addEventListener("input", function(e) { s.bg = +e.target.value; apply(); });
    $("ccReset").addEventListener("click", function() { s = Object.assign({}, D); apply(); });
    panel.addEventListener("keydown", function(e) { e.stopPropagation(); });
    document.addEventListener("click", function(e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== $("ccSetBtn")) panel.hidden = true;
    }, true);
    document.addEventListener("keydown", function(e) { if (e.key === "Escape") panel.hidden = true; });
    apply();
  })();
  controller.applyRate();
  els.player.classList.add("is-paused");
  vscode.postMessage({ type: "ready" });
})();
