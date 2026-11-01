"use strict";

const fs = require("node:fs");
const path = require("node:path");

class CcController {
  constructor(videoPath, post, services) {
    this.videoPath = videoPath;
    this.post = post;
    this.services = services;
    this.abort = new AbortController();
    this.disposed = false;
    this.pending = null;
  }

  start() {
    if (this.disposed) return Promise.resolve();
    if (this.pending) return this.pending;
    this.pending = this.run().finally(() => { this.pending = null; });
    return this.pending;
  }

  async run() {
    if (!this.services.isTrusted()) {
      this.post({ type: "ccProgress", message: "Trust this workspace to generate captions.", running: false, warning: true });
      return;
    }
    const target = path.join(path.dirname(this.videoPath), `${path.basename(this.videoPath, path.extname(this.videoPath))}.vtt`);
    const original = fs.existsSync(target) ? fs.readFileSync(target) : null;
    const replacing = original !== null;
    this.post({ type: "ccProgress", message: "Waiting for confirmation…", running: true });
    try {
      if (!await this.services.confirm(replacing)) {
        this.post({ type: "ccProgress", message: "", running: false });
        return;
      }
      if (this.abort.signal.aborted) return;
      this.post({ type: "ccProgress", message: "Preparing MP3 audio…", running: true });
      const mp3 = await this.services.getMp3(this.abort.signal);
      if (this.abort.signal.aborted) return;
      const model = await this.services.getModel(message => {
        if (!this.disposed) this.post({ type: "ccProgress", message, running: true });
      }, this.abort.signal);
      if (this.abort.signal.aborted) return;
      this.post({ type: "ccProgress", message: "Transcribing English speech…", running: true });
      const vtt = await this.services.transcribe(mp3, model, this.abort.signal);
      if (this.abort.signal.aborted) return;
      const saved = await this.services.write(this.videoPath, vtt, original);
      if (!this.disposed) {
        this.post({ type: "subtitles", ...saved, activate: true });
        this.post({ type: "ccProgress", message: `Saved ${saved.label}. Review generated captions for mistakes.`, running: false });
      }
    } catch (error) {
      if (!this.disposed) this.post({ type: "ccProgress", message: `Get CC failed: ${error.message || error}`, running: false, warning: true });
    }
  }

  dispose() {
    this.disposed = true;
    this.abort.abort();
  }
}

module.exports = { CcController };
