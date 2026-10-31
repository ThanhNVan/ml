import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from test_paths import course_test_dir

D = course_test_dir(2)
BAK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bak")  # original Course 1/2 files; Course 1 is now built by gen_c1.py
T = {"mc": "🔘 Multiple choice", "tf": "✅ True / False", "fill": "✏️ Fill in", "calc": "🧮 Calculation",
     "short": "💬 Short answer", "sel": "☑️ Select all", "match": "🔗 Matching", "scen": "🎯 Scenario"}


def rd(name):
    return open(os.path.join(BAK, name), encoding="utf-8").read()


def kind2(label):
    l = label.lower()
    if l.startswith("multiple"): return "mc"
    if l.startswith("true"): return "tf"
    if l.startswith("fill"): return "fill"
    if l.startswith(("calc", "computation")): return "calc"
    if l.startswith("select"): return "sel"
    if l.startswith("match"): return "match"
    if l.startswith("scen"): return "scen"
    return "short"


def expand(kind, ans, opts):
    """Turn 'B' into 'B — option text' for multiple choice."""
    if kind == "mc" and opts:
        m = re.match(r"^([A-D])\b", ans)
        if m and ans.strip() == m.group(1):
            for o in opts:
                if o.startswith(m.group(1) + "."):
                    return f"{ans.strip()} — {o[3:].strip()}"
    return ans


def parse_c2():
    t, a = rd("MLS_Course_2_Chapter_Tests_EN.md"), rd("MLS_Course_2_Chapter_Test_Answers_EN.md")
    ans = {}
    for l in a.splitlines():
        m = re.match(r"^(\d+)\. (.*?)\s*$", l)
        if m: ans[int(m.group(1))] = m.group(2).strip()
    secs, cur = [], None
    for l in t.splitlines():
        if l.startswith("## ") and not l.startswith("## Advanced"):
            cur = {"title": l[3:].strip(), "qs": []}; secs.append(cur)
        elif cur is not None:
            m = re.match(r"^(\d+)\. \*\*(.+?):\*\* (.*)$", l)
            if m:
                cur["qs"].append({"n": int(m.group(1)), "kind": kind2(m.group(2)), "text": m.group(3), "opts": []})
            elif re.match(r"^\s+- [A-D]\. ", l):
                cur["qs"][-1]["opts"].append(l.strip()[2:])
    for s in secs:
        for q in s["qs"]:
            q["ans"] = expand(q["kind"], ans[q["n"]], q["opts"]); q["why"] = ""
    return secs


def parse_c1():
    t, a = rd("MLS_Course_1_Chapter_Tests_EN.md"), rd("MLS_Course_1_Chapter_Test_Answers_EN.md")
    asec = {}
    for blk in re.split(r"\n(?=## Chapter )", a)[1:]:
        title = blk.splitlines()[0][3:].strip()
        quick = dict((int(n), v.strip()) for n, v in re.findall(r"\*\*(\d+) ([^*]+?)\*\*", blk))
        for n, v in re.findall(r"^\| (\d+) \| \*\*(.+?)\*\* \|$", blk, re.M):
            quick[int(n)] = v.strip()
        written = {}
        for n, ttl, body in re.findall(r"\*\*(\d+)\. ([^*]+)\*\*\n\n(.*?)(?=\n\*\*\d+\. |\n---|\Z)", blk, re.S):
            written[int(n)] = (ttl.strip(), body.strip())
        asec[title] = (quick, written)
    secs, cur = [], None
    for l in t.splitlines():
        if l.startswith("## "):
            cur = {"title": l[3:].strip(), "qs": []}; secs.append(cur)
        elif cur is not None:
            m = re.match(r"^(\d+)\. (.*)$", l)
            if not m: continue
            n, s = int(m.group(1)), m.group(2)
            om = re.search(r"(?:(?<=:)|(?<=\?))\s+A\. ", s)
            opts = []
            if om:
                stem = s[:om.start()].strip()
                rest = "A. " + s[om.end():]
                opts = [o.strip().rstrip(".") for o in re.split(r";\s*(?=[B-D]\. )", rest)]
                kind = "mc"
            else:
                stem = s
                if s.startswith("True/False"): kind, stem = "tf", s.split(":", 1)[1].strip()
                elif s.startswith("Fill in"): kind, stem = "fill", s.split(":", 1)[1].strip()
                elif re.search(r"\bcalculate\b", s, re.I): kind = "calc"
                else: kind = "scen"
            cur["qs"].append({"n": n, "kind": kind, "text": stem, "opts": opts})
    for s in secs:
        quick, written = asec[s["title"]]
        for q in s["qs"]:
            n = q["n"]
            if n in written:
                ttl, body = written[n]
                q["ans"], q["why"] = body, ""
            else:
                q["ans"], q["why"] = expand(q["kind"], quick[n], q["opts"]), ""
    return secs


def build(title, subtitle, secs, tests_name, ans_name, intro, tail=""):
    total = sum(len(s["qs"]) for s in secs)
    tests = [f"# {title}", f"## {subtitle} — Chapter Tests", "",
             f"> **{total} questions** · {intro} Answers are in the separate answer key file.", "",
             "| Section | Questions |", "|---|---|"]
    for s in secs:
        anchor = re.sub(r"[^\w\- ]", "", s["title"].lower()).strip().replace(" ", "-")
        tests.append(f"| [{s['title']}](#{anchor}) | {len(s['qs'])} |")
    tests += ["", "**Question types:** " + " · ".join(T.values()), "", "---", ""]
    ans = [f"# 🔑 {title.split(' ', 1)[1]} — Answer Key", f"## {subtitle}", "",
           f"> {total} answers · open after you finish the test.", ""]
    for s in secs:
        tests += [f"## {s['title']}", ""]
        ans += [f"## {s['title']}", "", "| # | Answer | Explanation |", "|---|---|---|"]
        for q in s["qs"]:
            tests += [f"### Question {q['n']} &nbsp; `{T[q['kind']]}`", "", q["text"], ""]
            if q["opts"]:
                tests += [f"- {o}" for o in q["opts"]] + [""]
            tests += ["---", ""]
            def cell(s):
                s = s.replace("|", "\\|")
                s = re.sub(r"^- ", "• ", s)
                return s.replace("\n- ", "<br>• ").replace("\n\n", "<br>").replace("\n", "<br>")
            ans.append(f"| {q['n']} | {cell(q['ans'])} | {cell(q['why'])} |")
        ans.append("")
    ans.append(tail)
    open(os.path.join(D, tests_name), "w", encoding="utf-8").write("\n".join(tests).rstrip() + "\n")
    open(os.path.join(D, ans_name), "w", encoding="utf-8").write("\n".join(ans).rstrip() + "\n")
    print(tests_name, total)


c2 = parse_c2()
build("📘 Machine Learning Specialization — Course 2", "Advanced Learning Algorithms", c2,
      "MLS_Course_2_Chapter_Tests_EN.md", "MLS_Course_2_Chapter_Test_Answers_EN.md",
      "Unless stated otherwise, choose one answer.")
