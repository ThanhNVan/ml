"""Sanity checks over every generated tests / answer-key pair."""
import os, re, glob
from test_paths import test_file
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ok = True
for n in range(1, 7):
    t = open(test_file(n, "Tests"), encoding="utf-8").read()
    a = open(test_file(n, "Test_Answers"), encoding="utf-8").read()
    qs = [int(x) for x in re.findall(r"^### Question (\d+)", t, re.M)]
    rows = re.findall(r"^\| (\d+) \|", a, re.M)
    probs = []
    if "<details" in t or "Show answer" in t: probs.append("answers leaked into tests file")
    if len(set(qs)) != len(qs): probs.append("question numbers repeat inside the file (ok for Course 2 chapters)" if n == 2 else "duplicate question numbers")
    if len(qs) != len(rows): probs.append(f"{len(qs)} questions vs {len(rows)} answer rows")
    print(f"Course {n}: {len(qs)} questions, {len(rows)} answers", "OK" if not probs else probs)
    ok &= not probs
print("ALL OK" if ok else "CHECK ABOVE")
