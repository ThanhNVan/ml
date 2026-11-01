"use strict";

const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const { spawn } = require("node:child_process");

function speechIntervals(vtt) {
  if (!/^WEBVTT(?:\r?\n)/.test(vtt)) throw new Error("The English VTT is invalid.");
  const stamp = /(?:(\d{2}):)?(\d{2}):(\d{2})\.(\d{3})/g;
  const seconds = value => {
    const parts = [...value.matchAll(stamp)][0];
    return Number(parts[1] || 0) * 3600 + Number(parts[2]) * 60 + Number(parts[3]) + Number(parts[4]) / 1000;
  };
  const intervals = [];
  for (const line of vtt.split(/\r?\n/)) {
    const match = line.match(/^\s*((?:\d{2}:)?\d{2}:\d{2}\.\d{3})\s+-->\s+((?:\d{2}:)?\d{2}:\d{2}\.\d{3})(?:\s|$)/);
    if (!match) continue;
    const start = Math.max(0, seconds(match[1]) - 0.2);
    const end = seconds(match[2]) + 0.2;
    if (end <= start) continue;
    intervals.push([start, end]);
  }
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of intervals) {
    const previous = merged.at(-1);
    if (previous && start <= previous[1]) previous[1] = Math.max(previous[1], end);
    else merged.push([start, end]);
  }
  if (!merged.length) throw new Error("The English VTT has no timed captions.");
  return merged;
}

function audioFilter(vtt) {
  const speech = speechIntervals(vtt).map(([start, end]) => `between(t,${start.toFixed(3)},${end.toFixed(3)})`).join("+");
  return `afftdn=nr=8:nf=-50,volume=0.25:enable='not(${speech})'`;
}

function runFfmpeg(ffmpeg, input, output, filterFile, signal) {
  const webm = path.extname(input).toLowerCase() === ".webm";
  const args = ["-nostdin", "-hide_banner", "-loglevel", "error", "-i", input,
    "-/filter_complex", filterFile, "-map", "0:v:0", "-map", "[a]",
    "-c:v", "copy", "-c:a", webm ? "libopus" : "aac", "-b:a", "192k", "-y", output];
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, args, { stdio: ["ignore", "ignore", "pipe"], windowsHide: true });
    let stderr = "";
    child.stderr.on("data", chunk => { stderr = (stderr + chunk.toString()).slice(-2048); });
    const abort = () => child.kill();
    const finish = error => {
      signal?.removeEventListener("abort", abort);
      error ? reject(error) : resolve();
    };
    child.once("error", finish);
    child.once("close", code => finish(code === 0 ? null : new Error(`FFmpeg failed: ${stderr.trim() || code}`)));
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
  });
}

class AudioEnhancementController {
  constructor(videoPath, post, services) {
    this.videoPath = videoPath;
    this.post = post;
    this.services = services;
    this.abort = new AbortController();
    this.pending = null;
  }

  start() {
    if (this.abort.signal.aborted) return Promise.resolve();
    if (this.pending) return this.pending;
    this.pending = this.run().finally(() => { this.pending = null; });
    return this.pending;
  }

  async run() {
    if (!this.services.isTrusted()) {
      this.post({ type: "enhanceProgress", message: "Trust this workspace to enhance audio.", running: false, warning: true });
      return;
    }
    const ext = path.extname(this.videoPath);
    const stem = this.videoPath.slice(0, -ext.length);
    const caption = `${stem}.vtt`;
    const target = `${stem}-enhanced${ext}`;
    const targetCaption = `${stem}-enhanced.vtt`;
    try {
      let vtt;
      try { vtt = await fsp.readFile(caption, "utf8"); }
      catch (error) {
        if (error.code === "ENOENT") throw new Error("Generate a same-name English VTT with Get CC first.");
        throw error;
      }
      const filter = audioFilter(vtt);
      if (fs.existsSync(target) || fs.existsSync(targetCaption)) throw new Error("An enhanced video or its captions already exist.");
      this.post({ type: "enhanceProgress", message: "Waiting for confirmation…", running: true });
      if (!await this.services.confirm(path.basename(target))) {
        this.post({ type: "enhanceProgress", message: "", running: false });
        return;
      }
      if (this.abort.signal.aborted) return;
      const ffmpeg = await this.services.getFfmpeg();
      if (!ffmpeg) throw new Error("FFmpeg is required to enhance audio.");
      const work = await fsp.mkdtemp(path.join(path.dirname(this.videoPath), ".enhance-audio-"));
      const filterFile = path.join(work, "filter.txt");
      const output = path.join(work, `result${ext}`);
      try {
        await fsp.writeFile(filterFile, `${filter}[a]`, "utf8");
        this.post({ type: "enhanceProgress", message: "Enhancing audio…", running: true });
        await runFfmpeg(ffmpeg, this.videoPath, output, filterFile, this.abort.signal);
        if (this.abort.signal.aborted) return;
        await fsp.link(output, target);
        try { await fsp.writeFile(targetCaption, vtt, { encoding: "utf8", flag: "wx" }); }
        catch (error) {
          await fsp.rm(target, { force: true });
          if (error.code !== "EEXIST") await fsp.rm(targetCaption, { force: true });
          throw error;
        }
        this.post({ type: "enhanceProgress", message: `Saved ${path.basename(target)}.`, running: false });
      } finally {
        await fsp.rm(work, { recursive: true, force: true });
      }
    } catch (error) {
      if (!this.abort.signal.aborted) this.post({ type: "enhanceProgress", message: `Enhance Audio failed: ${error.message || error}`, running: false, warning: true });
    }
  }

  dispose() { this.abort.abort(); }
}

module.exports = { AudioEnhancementController, speechIntervals, audioFilter };
