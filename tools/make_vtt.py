"""Write an approximate-timing index.vtt next to every index.mp4 that has a subtitle.txt.

subtitle.txt has no timestamps, so the text is cut into short cues and spread over the
video length in proportion to character count. Timing drifts by a few seconds; it follows
the lecture loosely. The VS Code video player extension shows index.vtt via its CC button.
"""
import glob, os, re, struct

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX_CUE = 90  # characters per caption line


def duration(path):
    """Seconds from the mvhd box of an MP4, or None."""
    with open(path, "rb") as f:
        size = os.path.getsize(path)
        pos = 0
        while pos + 8 <= size:
            f.seek(pos)
            n, kind = struct.unpack(">I4s", f.read(8))
            if n == 1:
                n = struct.unpack(">Q", f.read(8))[0]
            if kind == b"moov":
                end = pos + n
                pos += 8
                while pos + 8 <= end:
                    f.seek(pos)
                    m, k = struct.unpack(">I4s", f.read(8))
                    if k == b"mvhd":
                        ver = f.read(1)[0]
                        f.read(3)
                        if ver == 1:
                            f.read(16)
                            scale, dur = struct.unpack(">IQ", f.read(12))
                        else:
                            f.read(8)
                            scale, dur = struct.unpack(">II", f.read(8))
                        return dur / scale
                    pos += m or 8
                return None
            pos += n or 8
    return None


def cues(text):
    out = []
    for s in re.split(r"(?<=[.?!])\s+", re.sub(r"\s+", " ", text).strip()):
        while len(s) > MAX_CUE:
            cut = s.rfind(",", 0, MAX_CUE)
            cut = cut if cut > 30 else s.rfind(" ", 0, MAX_CUE)
            out.append(s[:cut + 1].strip())
            s = s[cut + 1:].strip()
        if s:
            out.append(s)
    return out


def ts(t):
    return f"{int(t // 3600):02}:{int(t % 3600 // 60):02}:{t % 60:06.3f}"


def main():
    done = 0
    for mp4 in glob.glob(os.path.join(ROOT, "**", "index.mp4"), recursive=True):
        sub = os.path.join(os.path.dirname(mp4), "subtitle.txt")
        total = duration(mp4)
        if not os.path.exists(sub) or not total:
            print("skip", os.path.relpath(mp4, ROOT))
            continue
        lines = cues(open(sub, encoding="utf-8").read())
        weight = sum(len(c) for c in lines)
        t, vtt = 0.0, ["WEBVTT", ""]
        for c in lines:
            d = total * len(c) / weight
            vtt += [f"{ts(t)} --> {ts(t + d)}", c, ""]
            t += d
        open(os.path.join(os.path.dirname(mp4), "index.vtt"), "w", encoding="utf-8").write("\n".join(vtt))
        done += 1
    print(f"wrote {done} index.vtt files")


if __name__ == "__main__":
    main()
