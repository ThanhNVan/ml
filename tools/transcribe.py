"""Transcribe every index.mp4 to timed English captions (index.vtt) with faster-whisper.

The VS Code video player extension only reads index.vtt/index.srt beside the video, so this
replaces the approximate-timing file from make_vtt.py. Course 3+ go first, then 1-2. Re-runnable: videos whose index.vtt
already carries the whisper marker are skipped.

    python tools/transcribe.py [model=small.en] [limit]
"""
import glob, os, sys, time
from faster_whisper import WhisperModel

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARK = "NOTE whisper"


def ts(t):
    return f"{int(t // 3600):02}:{int(t % 3600 // 60):02}:{t % 60:06.3f}"


def main():
    model_name = sys.argv[1] if len(sys.argv) > 1 else "small.en"
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else None
    model = WhisperModel(model_name, device="cpu", compute_type="int8", cpu_threads=os.cpu_count())
    todo = []
    for mp4 in sorted(glob.glob(os.path.join(ROOT, "**", "index.mp4"), recursive=True), key=lambda p: (os.path.relpath(p, ROOT)[:1] < "3", p)):
        vtt = os.path.join(os.path.dirname(mp4), "index.vtt")
        if not (os.path.exists(vtt) and MARK in open(vtt, encoding="utf-8").read(200)):
            todo.append((mp4, vtt))
    for i, (mp4, vtt) in enumerate(todo[:limit], 1):
        t0 = time.time()
        segs, info = model.transcribe(mp4, language="en", vad_filter=True, beam_size=1)
        out = ["WEBVTT", "", MARK + " " + model_name, ""]
        for s in segs:
            out += [f"{ts(s.start)} --> {ts(s.end)}", s.text.strip(), ""]
        open(vtt, "w", encoding="utf-8").write("\n".join(out))
        print(f"[{i}/{min(len(todo), limit or len(todo))}] {info.duration / (time.time() - t0):.1f}x realtime  {os.path.relpath(mp4, ROOT)}", flush=True)


if __name__ == "__main__":
    main()
