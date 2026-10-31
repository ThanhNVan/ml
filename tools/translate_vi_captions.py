"""Standardize Vietnamese VTT names and fill missing course captions.

Requires network access only for missing translations. Existing Vietnamese
captions are reused and their timestamps are preserved. Translation requests
are batched by complete English phrases; output is written per video so reruns
resume after the last completed file.
"""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import math
import os
from pathlib import Path
import re
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request


ROOT = Path(__file__).resolve().parent.parent
COURSE = re.compile(r"^[1-6]\. ")
TIMING = re.compile(r"^(\d\d:\d\d:\d\d\.\d{3}) --> (\d\d:\d\d:\d\d\.\d{3})")
LEGACY = re.compile(r"^subtitles-vi(?: \(1\))?\.vtt$", re.I)
API = "https://translate.googleapis.com/translate_a/single"
USER_AGENT = "Mozilla/5.0"

# Keep standard ML terms in English. Apply longer terms first so a short term
# cannot partially replace a longer one (for example regression).
GLOSSARY = {
    "phân đoạn ngữ nghĩa": "semantic segmentation",
    "phát hiện đối tượng": "object detection",
    "nhận dạng đối tượng": "object recognition",
    "hộp giới hạn": "bounding box",
    "mức độ chú ý của bản thân": "self-attention",
    "mạng lưới thần kinh": "neural network",
    "trang bị quá mức": "overfitting",
    "trang bị thiếu": "underfitting",
    "phù hợp quá mức": "overfitting",
    "lỗi huấn luyện": "training error",
    "lỗi độ sâu": "dev error",
    "hồi quy logistic": "logistic regression",
    "hồi quy tuyến tính": "linear regression",
    "hồi quy đa thức": "polynomial regression",
    "hàm kích hoạt": "activation function",
    "hàm chi phí": "cost function",
    "hàm mất mát": "loss function",
    "tốc độ học": "learning rate",
    "tỷ lệ học": "learning rate",
    "giảm dần độ dốc": "gradient descent",
    "giảm độ dốc": "gradient descent",
    "độ dốc giảm dần": "gradient descent",
    "lan truyền ngược": "backpropagation",
    "lan truyền tiến": "forward propagation",
    "lan truyền xuôi": "forward propagation",
    "mạng thần kinh": "neural network",
    "mạng thần kinh nhân tạo": "artificial neural network",
    "mạng nơ-ron": "neural network",
    "mạng nơ ron": "neural network",
    "mạng neuron": "neural network",
    "học máy": "machine learning",
    "máy học": "machine learning",
    "học sâu": "deep learning",
    "học có giám sát": "supervised learning",
    "học không giám sát": "unsupervised learning",
    "học tăng cường": "reinforcement learning",
    "tập huấn luyện": "training set",
    "tập đào tạo": "training set",
    "tập phát triển": "dev set",
    "tập xác thực": "validation set",
    "tập kiểm tra": "test set",
    "tập thử nghiệm": "test set",
    "dữ liệu huấn luyện": "training data",
    "dữ liệu đào tạo": "training data",
    "chuẩn hóa hàng loạt": "batch normalization",
    "chuẩn hóa theo lô": "batch normalization",
    "ranh giới quyết định": "decision boundary",
    "ranh giới phân loại": "decision boundary",
    "phân loại": "classification",
    "hồi quy": "regression",
    "phân cụm": "clustering",
    "tích chập": "convolution",
    "lớp gộp": "pooling layer",
    "nhúng từ": "word embedding",
    "nhúng": "embedding",
    "tự chú ý": "self-attention",
    "cơ chế chú ý": "attention",
    "sự chú ý": "attention",
    "tìm kiếm chùm": "beam search",
    "mô hình biến áp": "Transformer",
    "máy biến áp": "Transformer",
    "chính quy hóa": "regularization",
    "điều chuẩn": "regularization",
    "thường xuyên hóa": "regularization",
    "quá khớp": "overfitting",
    "quá phù hợp": "overfitting",
    "điều chỉnh quá mức": "overfitting",
    "thiếu khớp": "underfitting",
    "phương sai": "variance",
    "độ lệch": "bias",
    "tính năng": "feature",
    "đặc trưng": "feature",
}
PATTERNS = [
    (re.compile(r"(?<!\w)" + re.escape(source) + r"(?!\w)", re.I), target)
    for source, target in sorted(GLOSSARY.items(), key=lambda item: len(item[0]), reverse=True)
]
ENGLISH_TERMS = [
    re.compile(re.escape(term), re.I)
    for term in sorted(set(GLOSSARY.values()), key=len, reverse=True)
    if " " in term
]


def normalize_terms(text: str) -> str:
    for pattern, target in PATTERNS:
        text = pattern.sub(
            lambda match: target[0].upper() + target[1:] if match.group()[0].isupper() and target[0].islower() else target,
            text,
        )
    text = re.sub(r"\b(regularization|overfitting|underfitting)\s*\(\1\)", r"\1", text, flags=re.I)
    return text


def videos() -> list[Path]:
    courses = [p for p in ROOT.iterdir() if p.is_dir() and COURSE.match(p.name)]
    return sorted(video for course in courses for video in course.rglob("*.mp4"))


def target(video: Path) -> Path:
    return video.with_name(video.stem + "-vi.vtt")


def assert_inside(path: Path) -> None:
    if not path.resolve().is_relative_to(ROOT.resolve()):
        raise ValueError(f"Path escaped course root: {path}")


def plan(videos_by_folder: dict[Path, list[Path]]) -> tuple[int, int]:
    reused = 0
    missing = 0
    for folder, media in videos_by_folder.items():
        old = [p for p in folder.iterdir() if p.is_file() and LEGACY.fullmatch(p.name)]
        for video in media:
            if target(video).is_file() or old:
                reused += 1
            else:
                missing += 1
    return reused, missing


def rename_existing(videos_by_folder: dict[Path, list[Path]]) -> None:
    moved = 0
    copied = 0
    for folder, media in videos_by_folder.items():
        old = sorted((p for p in folder.iterdir() if p.is_file() and LEGACY.fullmatch(p.name)), key=lambda p: p.name)
        if not old:
            continue
        if len(old) > 1:
            raise RuntimeError(f"Ambiguous Vietnamese sources: {folder}: {old}")
        source = old[0]
        ordered_media = sorted(media, key=lambda p: (p.name != "index.mp4", p.name))
        destinations = [target(video) for video in ordered_media]
        for destination in destinations:
            assert_inside(destination)
            if destination.exists():
                raise FileExistsError(destination)
        assert_inside(source)
        data = source.read_text(encoding="utf-8-sig")
        if not data.startswith("WEBVTT"):
            raise ValueError(f"Not a VTT file: {source}")
        data = "\n".join(normalize_terms(line) if not TIMING.match(line) else line for line in data.splitlines()) + "\n"
        source.rename(destinations[0])
        destinations[0].write_text(data, encoding="utf-8")
        moved += 1
        for destination in destinations[1:]:
            destination.write_text(data, encoding="utf-8")
            copied += 1
    print(f"Renamed {moved} existing Vietnamese VTTs; copied {copied} for a second video in the same lesson", flush=True)


def millis(stamp: str) -> int:
    hours, minutes, seconds = stamp.split(":")
    return int(hours) * 3600000 + int(minutes) * 60000 + round(float(seconds) * 1000)


def stamp(ms: int) -> str:
    hours, remainder = divmod(ms, 3600000)
    minutes, remainder = divmod(remainder, 60000)
    seconds, fraction = divmod(remainder, 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02}.{fraction:03}"


def parse_vtt(path: Path) -> list[tuple[int, int, str]]:
    lines = path.read_text(encoding="utf-8-sig").splitlines()
    cues = []
    for index, line in enumerate(lines):
        match = TIMING.match(line)
        if not match:
            continue
        words = []
        for following in lines[index + 1:]:
            if not following.strip():
                break
            words.append(re.sub(r"<[^>]+>", "", following.strip()))
        text = " ".join(words).strip()
        if text:
            cues.append((millis(match.group(1)), millis(match.group(2)), text))
    if not cues:
        raise ValueError(f"No timed English cues: {path}")
    return cues


def phrase_groups(cues: list[tuple[int, int, str]]) -> list[tuple[int, int, str]]:
    groups = []
    start = end = 0
    parts: list[str] = []
    for cue_start, cue_end, text in cues:
        if not parts:
            start = cue_start
        end = cue_end
        parts.append(text)
        joined = " ".join(parts)
        if re.search(r"[.!?][\"']?$", text) or len(joined) >= 190 or end - start >= 10000:
            groups.append((start, end, joined))
            parts = []
    if parts:
        groups.append((start, end, " ".join(parts)))
    return groups


def translate_request(text: str) -> str:
    query = urllib.parse.urlencode({"client": "gtx", "sl": "en", "tl": "vi", "dt": "t", "q": text})
    request = urllib.request.Request(API + "?" + query, headers={"User-Agent": USER_AGENT})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=40) as response:
                payload = json.load(response)
            result = "".join(part[0] or "" for part in payload[0]).strip()
            if result:
                return result
            raise RuntimeError("Empty translation")
        except (urllib.error.URLError, TimeoutError, RuntimeError, json.JSONDecodeError):
            if attempt == 4:
                raise
            time.sleep(1.5 * 2 ** attempt)
    raise AssertionError("Unreachable")


def translate_batch(groups: list[tuple[int, int, str]]) -> list[str]:
    if len(groups) == 1:
        return [normalize_terms(translate_request(groups[0][2]))]
    marker = lambda n: f"@@@{n:03}@@@"
    source = "\n".join(part for index, group in enumerate(groups) for part in ([marker(index), group[2]]))
    result = translate_request(source)
    pieces = re.split(r"@@@(\d{3})@@@", result)
    if len(pieces) == 2 * len(groups) + 1 and all(int(pieces[i * 2 + 1]) == i for i in range(len(groups))):
        translated = [normalize_terms(pieces[i * 2 + 2].strip()) for i in range(len(groups))]
        if all(translated):
            return translated
    midpoint = len(groups) // 2
    return translate_batch(groups[:midpoint]) + translate_batch(groups[midpoint:])


def chunks(groups: list[tuple[int, int, str]]) -> list[list[tuple[int, int, str]]]:
    batches = []
    current = []
    length = 0
    for group in groups:
        if current and (len(current) >= 6 or length + len(group[2]) > 1100):
            batches.append(current)
            current = []
            length = 0
        current.append(group)
        length += len(group[2])
    if current:
        batches.append(current)
    return batches


def wrap_words(text: str, width: int = 46) -> str:
    words = text.split()
    lines = []
    current = ""
    for word in words:
        if current and len(current) + 1 + len(word) > width:
            lines.append(current)
            current = word
        else:
            current = f"{current} {word}".strip()
    if current:
        lines.append(current)
    return "\n".join(lines)


def render(groups: list[tuple[int, int, str]], translated: list[str]) -> str:
    output = ["WEBVTT", ""]
    for (start, end, _), vietnamese in zip(groups, translated, strict=True):
        protected = vietnamese
        for pattern in ENGLISH_TERMS:
            protected = pattern.sub(lambda match: match.group().replace(" ", "\u2060"), protected)
        words = protected.split()
        pieces = []
        current = ""
        count = max(1, math.ceil(len(vietnamese) / 86))
        target_length = math.ceil(len(vietnamese) / count)
        for word in words:
            if current and len(current) + 1 + len(word) > target_length and len(pieces) < count - 1:
                pieces.append(current)
                current = word
            else:
                current = f"{current} {word}".strip()
        if current:
            pieces.append(current)
        if not pieces:
            raise ValueError("Translation produced an empty phrase")
        for index, piece in enumerate(pieces):
            cue_start = start + round((end - start) * index / len(pieces))
            cue_end = start + round((end - start) * (index + 1) / len(pieces))
            if cue_end <= cue_start:
                cue_end = cue_start + 1
            output += [f"{stamp(cue_start)} --> {stamp(cue_end)}", wrap_words(piece).replace("\u2060", " "), ""]
    return "\n".join(output)


def translate_video(video: Path) -> tuple[Path, int]:
    english = video.with_suffix(".vtt")
    if not english.is_file():
        raise FileNotFoundError(f"Missing matching English subtitles: {english}")
    groups = phrase_groups(parse_vtt(english))
    results: list[str] = []
    for batch in chunks(groups):
        results.extend(translate_batch(batch))
    content = render(groups, results)
    destination = target(video)
    assert_inside(destination)
    if destination.exists():
        return destination, 0
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".vtt.tmp", dir=destination.parent, delete=False) as temp:
        temp.write(content)
        temporary = Path(temp.name)
    try:
        if destination.exists():
            raise FileExistsError(destination)
        os.replace(temporary, destination)
    finally:
        temporary.unlink(missing_ok=True)
    return destination, len(groups)


def polish(media: list[Path]) -> None:
    changed = 0
    for video in media:
        destination = target(video)
        if not destination.is_file():
            continue
        before = destination.read_text(encoding="utf-8-sig")
        after = "\n".join(normalize_terms(line) for line in before.splitlines()) + "\n"
        if after != before:
            destination.write_text(after, encoding="utf-8")
            changed += 1
    print(f"Polished technical terms in {changed} Vietnamese VTTs", flush=True)


def verify(media: list[Path]) -> None:
    errors = []
    total_cues = 0
    for video in media:
        destination = target(video)
        if not destination.is_file():
            errors.append(f"Missing {destination}")
            continue
        try:
            data = destination.read_text(encoding="utf-8-sig")
            if not data.startswith("WEBVTT"):
                raise ValueError("No WEBVTT header")
            cues = parse_vtt(destination)
            if not cues:
                raise ValueError("No timed cues")
            for index, (start, end, _) in enumerate(cues):
                if end <= start:
                    raise ValueError(f"Cue {index + 1} has invalid duration")
                if index and start < cues[index - 1][0]:
                    raise ValueError(f"Cue {index + 1} is out of time order")
            total_cues += len(cues)
        except (UnicodeError, ValueError) as error:
            errors.append(f"Invalid {destination}: {error}")
    leftovers = [p for course in ROOT.iterdir() if course.is_dir() and COURSE.match(course.name) for p in course.rglob("*.vtt") if LEGACY.fullmatch(p.name)]
    if leftovers:
        errors.append(f"Old Vietnamese filenames remain: {len(leftovers)}")
    print(f"Vietnamese captions: {len(media) - len(errors)}/{len(media)} videos; timed cues: {total_cues}; issues: {len(errors)}", flush=True)
    for error in errors[:20]:
        print(error, flush=True)
    if errors:
        raise RuntimeError("Vietnamese caption verification failed")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--plan", action="store_true", help="print coverage without changing files")
    parser.add_argument("--verify", action="store_true", help="check all expected Vietnamese files")
    parser.add_argument("--polish", action="store_true", help="normalize terminology in existing Vietnamese files")
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()
    media = videos()
    by_folder: dict[Path, list[Path]] = {}
    for video in media:
        by_folder.setdefault(video.parent, []).append(video)
    reused, missing = plan(by_folder)
    print(f"Videos: {len(media)}; existing Vietnamese coverage: {reused}; need translation: {missing}", flush=True)
    if args.plan:
        return
    if args.verify:
        verify(media)
        return
    if args.polish:
        polish(media)
        verify(media)
        return
    rename_existing(by_folder)
    remaining = [video for video in media if not target(video).exists()]
    print(f"Translating {len(remaining)} missing videos with {args.workers} workers", flush=True)
    errors = []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(translate_video, video): video for video in remaining}
        for number, future in enumerate(as_completed(futures), 1):
            video = futures[future]
            try:
                _, groups = future.result()
                print(f"[{number}/{len(remaining)}] {video.relative_to(ROOT)} ({groups} phrases)", flush=True)
            except Exception as error:
                errors.append((video, error))
                print(f"[{number}/{len(remaining)}] FAILED {video.relative_to(ROOT)}: {error}", flush=True)
    if errors:
        raise RuntimeError(f"{len(errors)} videos failed; rerun to resume")
    verify(media)


if __name__ == "__main__":
    main()
