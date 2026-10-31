"""Locations of the full-course tests and answer keys."""

from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent


def course_test_dir(number):
    matches = list(ROOT.glob(f"{number}. *"))
    if len(matches) != 1 or not matches[0].is_dir():
        raise FileNotFoundError(f"Course {number} folder not found")
    return ROOT / "test" / f"course {matches[0].name}"


def test_file(number, suffix):
    return course_test_dir(number) / f"MLS_Course_{number}_Chapter_{suffix}_EN.md"
