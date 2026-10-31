"""Validate subtitles for every local course video under the parent ml folder."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
from make_vtt import duration  # noqa: E402

TIME = re.compile(r"^(\d\d:\d\d:\d\d\.\d{3}) --> (\d\d:\d\d:\d\d\.\d{3})$")


def seconds(stamp):
    h, m, s = stamp.split(":")
    return int(h) * 3600 + int(m) * 60 + float(s)


def main():
    videos = sorted(ROOT.rglob("*.mp4"))
    errors = []
    cues = 0
    for video in videos:
        subtitle = video.with_suffix(".vtt")
        if not subtitle.exists():
            errors.append(f"Missing: {subtitle}")
            continue
        content = subtitle.read_text(encoding="utf-8-sig")
        index_copy = video.with_name("index.vtt")
        if subtitle != index_copy and index_copy.exists() and subtitle.read_bytes() != index_copy.read_bytes():
            errors.append(f"Sidecar differs from index.vtt: {subtitle}")
        if not content.startswith("WEBVTT\n") or "NOTE whisper" not in content[:100]:
            errors.append(f"Unexpected header: {subtitle}")
        media_duration = duration(video)
        previous_end = 0.0
        count = 0
        for line in content.splitlines():
            if " --> " not in line:
                continue
            match = TIME.fullmatch(line)
            if not match:
                errors.append(f"Invalid timestamp: {subtitle}: {line}")
                continue
            start, end = map(seconds, match.groups())
            if start >= end or start < previous_end - 0.001:
                errors.append(f"Overlapping or reversed cue: {subtitle}: {line}")
            previous_end = end
            count += 1
        if count == 0:
            errors.append(f"Empty subtitles: {subtitle}")
        if media_duration is None or previous_end > media_duration + 1:
            errors.append(f"Cue exceeds video duration by {previous_end - media_duration if media_duration else 'unknown'}s: {subtitle}")
        cues += count
    print(f"Videos: {len(videos)}; timed cues: {cues}; issues: {len(errors)}")
    for issue in errors[:30]:
        print(issue)
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
