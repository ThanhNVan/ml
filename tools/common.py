"""Shared builder for course test + answer-key markdown.

Question tuple: (type, question, options|None, answer, why, lesson, keywords)
  lesson   - lesson number inside the week, as a string ("3")
  keywords - terms that must appear in that lesson's subtitle; "a|b" accepts either
"""
import os, re, glob, sys
from test_paths import test_file

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = {"mc": "🔘 Multiple choice", "tf": "✅ True / False", "fill": "✏️ Fill in", "calc": "🧮 Calculation",
     "short": "💬 Short answer", "sel": "☑️ Select all", "match": "🔗 Matching", "scen": "🎯 Scenario"}


def norm(s):
    return re.sub(r"\s+", " ", s.lower().replace(",", ".").replace("-", " "))


# Subtitles are machine-translated into Vietnamese, so some English terms never appear verbatim.
GLOSS = {
    "bias": "thiên vị", "variance": "phương sai", "early stopping": "dừng sớm|sớm dừng",
    "precision": "độ chính xác", "recall": "thu hồi", "error": "lỗi", "systematic": "lỗi hệ thống",
    "pre-training": "trước đào tạo", "fine-tuning": "tinh chỉnh", "transfer": "học chuyển",
    "stop": "dấu dừng", "end-to-end": "đầu cuối", "one hour": "cùng một giờ",
    "overfit": "quá phù hợp|overfit", "pedestrian": "người đi bộ", "mismatch": "không phù hợp|không khớp",
    "training-dev": "train-dev|train dev|đào tạo-dev|đào tạo dev",
}


def folder_resolver(course_dir):
    """Lesson 'N' of week W -> (title, subtitle text) from '<course_dir>/week W/N. Title/subtitle.txt'."""
    def resolve(week, lesson):
        base = os.path.join(ROOT, course_dir)
        wk = [d for d in glob.glob(os.path.join(base, "*")) if re.search(rf"week {week}$", d, re.I)][0]
        d = glob.glob(os.path.join(wk, f"{lesson}. *"))[0]
        sub = [f for f in glob.glob(os.path.join(d, "*.txt")) if "sub" in os.path.basename(f).lower()][0]
        return os.path.basename(d).split(". ", 1)[1], norm(open(sub, encoding="utf-8").read())
    return resolve


def cell(s):
    return s.replace("|", "\\|").replace("\n", "<br>")


def build(num, title, subtitle, weeks, resolve, intro, check=True):
    """weeks: list of (label, topic, questions)."""
    total = sum(len(w[2]) for w in weeks)
    tests = [f"# 📘 {title}", f"## {subtitle} — Chapter Tests", "",
             f"> **{total} questions** across {len(weeks)} weeks · {intro} Answers are in the separate answer key file.", "",
             "| Week | Topic | Questions |", "|---|---|---|"]
    n = 0
    for wk, topic, qs in weeks:
        tests.append(f"| [{wk}](#{wk.lower().replace(' ', '-')}) | {topic} | {n + 1}–{n + len(qs)} |")
        n += len(qs)
    tests += ["", "**Question types:** " + " · ".join(T.values()), "", "---", ""]
    ans = [f"# 🔑 Course {num} — Answer Key", f"## {subtitle}", "",
           f"> {total} answers with the lesson each question comes from.", ""]
    n, bad = 0, []
    for wi, (wk, topic, qs) in enumerate(weeks, 1):
        tests += [f"## {wk}", f"*{topic}*", ""]
        ans += [f"## {wk}", f"*{topic}*", "", "| # | Answer | Why | Lesson |", "|---|---|---|---|"]
        for t, q, opts, a, why, lesson, kws in qs:
            n += 1
            ltitle, text = resolve(wi, lesson)
            if check:
                for k in kws:
                    alts = [a for x in k.split("|") for a in (x, *GLOSS.get(x, "").split("|"))]
                    flat = text.replace(" ", "").replace("×", "x")
                    if not any(a and (norm(a) in text or norm(a).replace(" ", "").replace("×", "x") in flat) for a in alts):
                        bad.append(f"Q{n} ({wk} lesson {lesson} {ltitle}): '{k}' not in subtitle")
            tests += [f"### Question {n} &nbsp; `{T[t]}`", "", q, ""]
            if opts:
                tests += [f"- {o}" for o in opts] + [""]
            tests += ["---", ""]
            ans.append(f"| {n} | **{cell(a)}** | {cell(why)} | {wi}.{lesson} {ltitle} |")
        ans.append("")
    out = lambda s: test_file(num, s)
    open(out("Tests"), "w", encoding="utf-8").write("\n".join(tests).rstrip() + "\n")
    open(out("Test_Answers"), "w", encoding="utf-8").write("\n".join(ans).rstrip() + "\n")
    print(f"course {num}: {total} questions, {len(bad)} unverified keywords")
    for b in bad:
        print("  ", b)
