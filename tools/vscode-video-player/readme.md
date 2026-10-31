# vscode-video-player

## Local subtitle picker

This repository's patched VSIX loads a `.vtt` or `.srt` file with the same base name as the video from the same folder when the video opens. For example, `lesson.mp4` uses `lesson.vtt` (or `lesson.srt`). Click **CC** to show or hide the loaded subtitles. Click **Sub** next to CC to choose a different `.vtt` or `.srt` file; the selected subtitles appear immediately. The picker opens in the video's folder, and canceling it keeps the current subtitles.

From the repository root, run `python tools/install_video_player.py` to install this local build in one command. Reload an already-open VS Code window to activate it.

For this study set, extracted audio passes through a narrow 11.334 kHz notch filter. It applies to every MP4 opened in this player, leaving the video files unchanged. The extracted-audio cache key includes the filter, so previously opened lessons are regenerated with filtered sound.

The video element has a subtle brightness, contrast, and saturation filter during playback. It applies to every video opened in this player without changing the source file or the separate subtitle overlay.

[![CI](https://github.com/yutabee/vscode-unmute-video/actions/workflows/ci.yml/badge.svg)](https://github.com/yutabee/vscode-unmute-video/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yutabee/vscode-unmute-video/blob/main/LICENSE.md)

Play MP4 / MOV / M4V / WebM videos **with sound** directly inside VS Code — audio that actually plays, and stays in sync.

![vscode-video-player playing a clip inside VS Code](https://raw.githubusercontent.com/yutabee/vscode-unmute-video/main/images/demo.gif)

## Features

- 🔊 Plays **MP4 / MOV / M4V / WebM with real sound** — not the silent preview the built-in editor gives you.
- 🪶 **WebM needs nothing installed** — it plays with native audio, so `.webm` works on a machine without ffmpeg.
- 🎯 **Audio stays in sync** with the video through continuous drift correction, even on long clips.
- 🚀 **Streams large files** over HTTP Range — the video is never loaded fully into memory.
- ⌨️ **Full keyboard controls**, adjustable playback speed (0.5×–2×), and picture-in-picture.
- 🔒 **Safe by default** in untrusted workspaces — stays muted until you trust the workspace.
- ♿ **Accessible** — keyboard navigation and screen-reader announcements.

## Supported formats

| Format | Audio | Needs ffmpeg |
| --- | --- | --- |
| `.mp4` / `.mov` / `.m4v` | ✅ extracted via ffmpeg | Yes |
| `.webm` | ✅ native | No |

Where these usually come from: screen recordings and bug reports from Loom,
CleanShot or QuickTime (`.mp4` / `.mov`), and test videos from Playwright
(`.webm`, so no ffmpeg) or Cypress (`.mp4`).

## Requirements

Needs [`ffmpeg`](https://ffmpeg.org/) on your `PATH` for MP4/MOV/M4V audio; WebM needs nothing. Without ffmpeg the video still plays, just silently — the player says so and offers the command for your platform. Install it, then reload the window.

- VS Code `^1.90.0`
- `ffmpeg` (for `.mp4` / `.mov` / `.m4v` audio):
  - macOS: `brew install ffmpeg`
  - Ubuntu/Debian: `sudo apt install ffmpeg`
  - Windows: `winget install Gyan.FFmpeg`

## Install

From the repository root, install the local patched edition with:

```text
python tools/install_video_player.py
```

The installer verifies the result and removes the upstream edition if it is installed. Python and the VS Code `code`
CLI are required.

## Usage

- Open any `.mp4` / `.mov` / `.m4v` / `.webm` file from the Explorer — it opens in the
  player automatically.
- Or run **"Open with vscode-video-player"** from the Command Palette.
- The same-name `.vtt` or `.srt` is loaded automatically. Use **CC** to toggle it,
  **Sub** to pick another subtitle file, and **Aa** to change caption appearance.

Controls: click the stage or use `space`/`k` to play-pause, `j`/`l` (or ←/→)
to seek by the configured step (±10s by default — change it with
`unmuteVideo.seekStep`), `m` to mute, the volume slider to adjust audio, `f` for
fullscreen, and `p` for picture-in-picture when the host supports it. The speed
button cycles 0.5×–2×. The action buttons copy the file path or open the file in
an external player.

## Default editor

The extension registers as the default editor for `.mp4`, `.mov`, `.m4v`, and
`.webm` files. To opt out for a file type or glob, map it back to the built-in editor in
`workbench.editorAssociations`:

```json
{
  "workbench.editorAssociations": {
    "*.mp4": "default",
    "*.mov": "default",
    "*.m4v": "default",
    "*.webm": "default"
  }
}
```

## How it works

VS Code's webview runs on the Electron/Chromium build that ships **without the
AAC codec** (patent licensing). So a normal `<video>` element shows the picture
but stays silent. This extension works around that:

1. The video stream is served from a tiny loopback HTTP server with HTTP Range
   support, so even large files play without being loaded into memory.
2. `ffmpeg` extracts the audio track to MP3 in the background.
3. The webview plays a **muted `<video>`** alongside a hidden `<audio>` element
   and keeps the two in sync (play/pause/seek/speed/volume).

## Limitations

- `ffmpeg` must be installed on the same machine as the extension host.
- In Remote-SSH, WSL, and Codespaces, the extension runs on the remote machine;
  `ffmpeg` and the video files need to be available there.
- Virtual and web workspaces are not supported because the player needs a real
  on-disk path.
- Without `ffmpeg`, the video still plays, but silently.
- `.webm` plays with native audio and does not need `ffmpeg`; `.mp4`, `.mov`,
  and `.m4v` need `ffmpeg` for sound.

## Security

Media is streamed from a loopback-only, token-gated HTTP server with a strict
Host-header check. The webview uses a tight CSP, and `ffmpeg` is invoked without
a shell. See [SECURITY.md](https://github.com/yutabee/vscode-unmute-video/blob/HEAD/SECURITY.md) for the disclosure process and full
security model.

## Develop

This local copy contains the compiled extension host in `out/` and webview
assets in `media/`. After editing them or `package.json`, rebuild the package
from the repository root:

```text
python tools/build_local_vsix.py
```

## Support

This extension is maintained in my own time — if it saves you some, you can [sponsor its upkeep](https://github.com/sponsors/yutabee). It is entirely optional and does not change how issues are handled.

## License

MIT
