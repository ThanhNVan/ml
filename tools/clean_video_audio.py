"""Clean steady whine and background hiss in course MP4s without re-encoding video.

Run from the repository root: python tools/clean_video_audio.py
Pass a video or course directory to limit the run. Use --dry-run to preview.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parent.parent
FILTER = "bandreject=f=11334.5:width_type=h:width=30,afftdn=nf=-35:nr=8"
MARKER = "course_audio_cleaned_v1"
VOICE_MODEL = "6b9c2ca1"
VOICE_MARKER = f"course_voice_isolated_{VOICE_MODEL}_v1"


def original_source(video: Path) -> Path:
    """Use the Git LFS source when available to avoid re-encoding cleaned AAC."""
    try:
        relative = video.resolve().relative_to(ROOT).as_posix()
        pointer = subprocess.run(
            ["git", "show", f"HEAD:{relative}"], cwd=ROOT,
            capture_output=True, text=True, check=True,
        ).stdout
        digest = next(line.removeprefix("oid sha256:") for line in pointer.splitlines() if line.startswith("oid sha256:"))
        source = ROOT / ".git" / "lfs" / "objects" / digest[:2] / digest[2:4] / digest
        if source.is_file():
            return source
    except (ValueError, StopIteration, OSError, subprocess.CalledProcessError):
        pass
    return video


def clean_video(video: Path, dry_run: bool = False, voice_isolate: bool = False) -> bool:
    metadata = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format_tags", "-of", "json", str(video)],
        capture_output=True, text=True, check=True,
    )
    tags = json.loads(metadata.stdout).get("format", {}).get("tags", {})
    marker = VOICE_MARKER if voice_isolate else MARKER
    if tags.get("audio_cleanup") == marker:
        return False
    if dry_run:
        print(f"Would clean: {video}")
        return True

    temporary = video.with_name(video.stem + ".audio-cleanup.tmp.mp4")
    if temporary.exists():
        raise FileExistsError(f"Refusing to overwrite temporary file: {temporary}")
    try:
        source = original_source(video) if voice_isolate else video
        with tempfile.TemporaryDirectory(prefix="voice-isolation-", dir=video.parent) as work:
            if voice_isolate:
                audio = Path(work) / "audio.wav"
                subprocess.run([
                    "ffmpeg", "-nostdin", "-v", "error", "-i", str(source),
                    "-vn", "-ac", "2", "-ar", "44100", str(audio),
                ], check=True)
                subprocess.run([
                    sys.executable, "-m", "demucs", "-n", VOICE_MODEL, "--two-stems", "vocals",
                    "--other-method", "none", "--segment", "12", "-d", "cpu", "-o", work, str(audio),
                ], check=True)
                vocals = Path(work) / VOICE_MODEL / "audio" / "vocals.wav"
                inputs = ["-i", str(source), "-i", str(vocals)]
                mapping = ["-map", "0:v?", "-map", "0:s?", "-map", "1:a:0"]
                audio_filter = "bandreject=f=11334.5:width_type=h:width=30"
            else:
                inputs = ["-i", str(source)]
                mapping = ["-map", "0:v?", "-map", "0:a?", "-map", "0:s?"]
                audio_filter = FILTER
            subprocess.run([
                "ffmpeg", "-nostdin", "-v", "error", *inputs, *mapping,
                "-c", "copy", "-c:a", "aac", "-b:a", "192k",
                "-af", audio_filter, "-metadata", f"audio_cleanup={marker}",
                "-movflags", "use_metadata_tags", str(temporary),
            ], check=True)
        if temporary.stat().st_size == 0:
            raise RuntimeError(f"ffmpeg produced an empty file: {temporary}")
        os.replace(temporary, video)
        return True
    finally:
        temporary.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", nargs="?", type=Path, default=ROOT)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--voice-isolate", action="store_true", help="use Demucs to separate speech from music and transient noise")
    parser.add_argument("--workers", type=int)
    args = parser.parse_args()
    if args.workers is None:
        args.workers = 2 if args.voice_isolate else 6
    if args.workers < 1:
        parser.error("--workers must be at least 1")
    if args.voice_isolate and not args.dry_run and importlib.util.find_spec("demucs") is None:
        parser.error("Demucs is missing. Run tools/.venv-audio/Scripts/python -m pip install demucs diffq, then use that Python to run this script.")
    target = args.path.resolve()
    videos = [target] if target.is_file() else sorted(target.rglob("*.mp4"))
    changed = skipped = failed = 0
    videos = [video for video in videos if not video.name.endswith(".audio-cleanup.tmp.mp4")]
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        jobs = {executor.submit(clean_video, video, args.dry_run, args.voice_isolate): video for video in videos}
        for job in as_completed(jobs):
            video = jobs[job]
            try:
                if job.result():
                    changed += 1
                    if not args.dry_run:
                        print(f"Cleaned: {video}", flush=True)
                else:
                    skipped += 1
            except (OSError, subprocess.CalledProcessError, ValueError, RuntimeError) as error:
                failed += 1
                print(f"Failed: {video}: {error}", file=sys.stderr, flush=True)
    print(f"Videos: {changed} {'would clean' if args.dry_run else 'cleaned'}, {skipped} skipped, {failed} failed")
    return int(failed > 0)


if __name__ == "__main__":
    raise SystemExit(main())
