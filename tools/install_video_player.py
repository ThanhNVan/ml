"""Install this repository's local VS Code video player with a single command."""

import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import zipfile


TOOLS = Path(__file__).resolve().parent
VSIX = TOOLS / "vscode-video-player.vsix"
LOCAL_ID = "local.vscode-video-player"
OLD_LOCAL_ID = "local.unmute-video-patched"
MARKET_ID = "yutabee.unmute-video"


def code_cli() -> str:
    for name in ("code", "code.cmd"):
        found = shutil.which(name)
        if found:
            return found
    if os.name == "nt":
        for base in (os.environ.get("LOCALAPPDATA"), os.environ.get("ProgramFiles")):
            if base:
                candidate = Path(base) / "Microsoft VS Code" / "bin" / "code.cmd"
                if candidate.is_file():
                    return str(candidate)
    raise RuntimeError("VS Code CLI was not found. Install VS Code and make its 'code' command available.")


def installed(cli: str) -> dict[str, str]:
    result = subprocess.run(
        [cli, "--list-extensions", "--show-versions"],
        check=True, capture_output=True, text=True,
    )
    entries = {}
    for line in result.stdout.splitlines():
        name, separator, version = line.strip().partition("@")
        if separator:
            entries[name.lower()] = version
    return entries


def local_version() -> str:
    if not VSIX.is_file():
        raise FileNotFoundError(f"Local VSIX missing: {VSIX}")
    with zipfile.ZipFile(VSIX) as package:
        manifest = json.loads(package.read("extension/package.json"))
    if f"{manifest['publisher']}.{manifest['name']}".lower() != LOCAL_ID:
        raise RuntimeError("Local VSIX has an unexpected extension ID")
    return str(manifest["version"])


def install() -> None:
    cli = code_cli()
    expected_version = local_version()

    subprocess.run([cli, "--install-extension", str(VSIX), "--force"], check=True)
    found = installed(cli)
    if LOCAL_ID not in found:
        raise RuntimeError(f"VS Code did not report {LOCAL_ID} after installation")
    if found[LOCAL_ID] != expected_version:
        raise RuntimeError(f"Expected {LOCAL_ID}@{expected_version}, found {found[LOCAL_ID]}")

    for old_id in (OLD_LOCAL_ID, MARKET_ID):
        if old_id not in found:
            continue
        subprocess.run([cli, "--uninstall-extension", old_id], check=True)
        found = installed(cli)
        if LOCAL_ID not in found or old_id in found:
            raise RuntimeError("Could not finish installing the local video player")

    print(f"Installed {LOCAL_ID}@{found[LOCAL_ID]}.")
    print("If VS Code was already open, reload that window to activate the extension.")


if __name__ == "__main__":
    try:
        install()
    except (OSError, RuntimeError, subprocess.CalledProcessError, zipfile.BadZipFile) as error:
        print(f"Video player installation failed: {error}", file=sys.stderr)
        raise SystemExit(1)
