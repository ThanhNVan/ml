"""Re-apply local patches to the yutabee.unmute-video VS Code extension after an update.

1. Add a 1.1x playback speed.
2. Make the video fill the tab instead of a 1100px column.
3. Add an "Aa" caption settings panel (size, font, colour, background opacity).

Safe to run repeatedly. Reload the VS Code window afterwards.
"""
import glob, os

EXT = os.path.expanduser("~/.vscode/extensions/yutabee.unmute-video-*")

OLD_RATES, NEW_RATES = "[0.5, 0.75, 1, 1.25, 1.5, 2]", "[0.5, 0.75, 1, 1.1, 1.25, 1.5, 2]"
CSS = [
    ("  max-width: 1100px;\n  margin: 0 auto;\n  padding: 12px;\n}",
     "  max-width: none;\n  height: 100%;\n  margin: 0;\n  padding: 12px;\n}"),
    ("  min-height: 120px;\n  cursor: pointer;\n}",
     "  min-height: 120px;\n  flex: 1 1 0;\n  cursor: pointer;\n}"),
    ("  width: 100%;\n  max-height: 65vh;\n",
     "  width: 100%;\n  height: 100%;\n  object-fit: contain;\n"),
]

HTML_ANCHOR = ">CC</button>\n"
HTML_NEW = HTML_ANCHOR + """
      <button class="btn btn-cc" id="ccSetBtn" type="button" title="Caption settings" aria-label="Caption settings">Aa</button>
      <div id="ccPanel" class="cc-panel" hidden>
        <label>Size <input id="ccSize" type="range" min="12" max="64" step="1"><output id="ccSizeOut"></output></label>
        <label>Font <select id="ccFont">
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Consolas, monospace">Consolas</option>
          <option value="'Comic Sans MS', cursive">Comic Sans</option>
        </select></label>
        <label>Color <select id="ccColor">
          <option value="#ffffff">White</option>
          <option value="#ffe14d">Yellow</option>
          <option value="#5ff0ff">Cyan</option>
          <option value="#7dff7d">Green</option>
        </select></label>
        <label>Background <input id="ccBg" type="range" min="0" max="100" step="5"><output id="ccBgOut"></output></label>
        <button id="ccReset" type="button">Reset</button>
      </div>
"""

JS_ANCHOR = '  controller.applyRate();\n  els.player.classList.add("is-paused");'
JS_NEW = """  (function() {
    var KEY = "ccSettings", D = { size: 22, font: "sans-serif", color: "#ffffff", bg: 75, pos: null };
    var s = Object.assign({}, D);
    try { Object.assign(s, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
    var $ = function(id) { return document.getElementById(id); };
    var panel = $("ccPanel");
    var txt = document.createElement("div");
    txt.className = "cc-text";
    ["click", "dblclick", "mousedown"].forEach(function(t) { txt.addEventListener(t, function(e) { e.stopPropagation(); }); });
    var grip = document.createElement("span"), body = document.createElement("span");
    grip.className = "cc-grip"; grip.textContent = "\\u283f"; grip.title = "Drag to move";
    txt.append(grip, body);
    els.stage.appendChild(txt);
    function render() {
      var on = els.player.classList.contains("is-subtitles-on"), cues = els.track.track.activeCues, t = [];
      for (var i = 0; on && cues && i < cues.length; i++) t.push(cues[i].text);
      var out = t.join("\\n");
      if (body.textContent !== out) body.textContent = out;
      txt.hidden = !out;
    }
    grip.addEventListener("pointerdown", function(e) {
      var r = els.stage.getBoundingClientRect(), b = txt.getBoundingClientRect();
      var dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
      grip.setPointerCapture(e.pointerId);
      function move(ev) {
        s.pos = {
          x: Math.min(1, Math.max(0, (ev.clientX - dx - r.left) / r.width)),
          y: Math.min(1, Math.max(0, (ev.clientY - dy - r.top) / r.height))
        };
        place();
      }
      function up() {
        grip.removeEventListener("pointermove", move); grip.removeEventListener("pointerup", up);
        apply();
      }
      grip.addEventListener("pointermove", move); grip.addEventListener("pointerup", up);
      e.preventDefault();
    });
    function place() {
      var p = s.pos;
      txt.style.left = p ? p.x * 100 + "%" : "";
      txt.style.top = p ? p.y * 100 + "%" : "";
      txt.style.bottom = p ? "auto" : "";
      txt.style.transform = p ? "translate(-50%, -50%)" : "";
    }
    els.track.track.addEventListener("cuechange", render);
    els.video.addEventListener("timeupdate", render);
    els.video.addEventListener("seeked", render);
    new MutationObserver(render).observe(els.player, { attributes: true, attributeFilter: ["class"] });
    function apply() {
      var c = s.color;
      [els.video.style, txt.style].forEach(function(st) {
        st.setProperty("--cc-size", s.size + "px");
        st.setProperty("--cc-font", s.font);
        st.setProperty("--cc-color", c);
        st.setProperty("--cc-bg", "rgba(0,0,0," + s.bg / 100 + ")");
      });
      place();
      $("ccSize").value = s.size; $("ccSizeOut").textContent = s.size + "px";
      $("ccFont").value = s.font; $("ccColor").value = c;
      $("ccBg").value = s.bg; $("ccBgOut").textContent = s.bg + "%";
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    }
    $("ccSetBtn").addEventListener("click", function() { panel.hidden = !panel.hidden; });
    $("ccSize").addEventListener("input", function(e) { s.size = +e.target.value; apply(); });
    $("ccFont").addEventListener("change", function(e) { s.font = e.target.value; apply(); });
    $("ccColor").addEventListener("change", function(e) { s.color = e.target.value; apply(); });
    $("ccBg").addEventListener("input", function(e) { s.bg = +e.target.value; apply(); });
    $("ccReset").addEventListener("click", function() { s = Object.assign({}, D); apply(); });
    panel.addEventListener("keydown", function(e) { e.stopPropagation(); });
    document.addEventListener("click", function(e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== $("ccSetBtn")) panel.hidden = true;
    }, true);
    document.addEventListener("keydown", function(e) { if (e.key === "Escape") panel.hidden = true; });
    apply();
  })();
""" + JS_ANCHOR

TOGGLE_OLD = '''const showing = track.mode !== "showing";
      track.mode = showing ? "showing" : "hidden";'''
TOGGLE_NEW = '''const showing = !els.player.classList.contains("is-subtitles-on");
      track.mode = "hidden"; // cues are drawn as selectable text by .cc-text'''

CSS_ANCHOR = ".btn-cc {"
CSS_NEW = """.cc-text {
  position: absolute;
  left: 50%;
  bottom: 8%;
  transform: translateX(-50%);
  width: max-content;
  max-width: 90%;
  padding: 2px 10px;
  text-align: center;
  white-space: pre-line;
  user-select: text;
  cursor: text;
  z-index: 5;
  font-size: var(--cc-size, 22px);
  font-family: var(--cc-font, sans-serif);
  color: var(--cc-color, #fff);
  background-color: var(--cc-bg, rgba(0, 0, 0, 0.75));
}

.cc-text[hidden] { display: none; }
.cc-grip { margin-right: 8px; cursor: move; user-select: none; touch-action: none; opacity: 0.6; }
.cc-grip:hover { opacity: 1; }

.cc-panel {
  position: fixed;
  right: 12px;
  bottom: 90px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vscode-editorWidget-background, #252526);
  color: var(--vscode-foreground, #ccc);
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  font-size: 12px;
}

.cc-panel[hidden] { display: none; }
.cc-panel label { display: flex; align-items: center; gap: 8px; justify-content: space-between; }
.cc-panel select, .cc-panel button { font: inherit; }
.cc-panel output { min-width: 34px; text-align: right; }

""" + CSS_ANCHOR


def patch(path, pairs):
    text = open(path, encoding="utf-8").read()
    done = 0
    for old, new in pairs:
        if new in text:
            continue
        if old in text:
            text, done = text.replace(old, new, 1), done + 1
        else:
            print(f"  WARN {os.path.basename(path)}: pattern not found, extension changed?")
    open(path, "w", encoding="utf-8").write(text)
    print(f"  {os.path.basename(path)}: {done} change(s)")


dirs = glob.glob(EXT)
if not dirs:
    raise SystemExit("extension not found")
for d in dirs:
    print(d)
    patch(os.path.join(d, "media", "player.js"), [(OLD_RATES, NEW_RATES), (TOGGLE_OLD, TOGGLE_NEW)])
    patch(os.path.join(d, "out", "shared", "preferences.js"), [(OLD_RATES, NEW_RATES)])
    patch(os.path.join(d, "media", "player.css"), CSS + [(CSS_ANCHOR, CSS_NEW)])
    patch(os.path.join(d, "media", "player.html"), [(HTML_ANCHOR, HTML_NEW)])
    patch(os.path.join(d, "media", "player.js"), [(JS_ANCHOR, JS_NEW)])
