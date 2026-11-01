"""Repack a Windows x64 VSIX with local FFmpeg and the verified speech model."""

from pathlib import Path
import hashlib
import os
import shutil
import zipfile


TOOLS = Path(__file__).resolve().parent
SOURCE = TOOLS / "vscode-video-player"
VSIX = TOOLS / "vscode-video-player.vsix"
TEMP = TOOLS / "vscode-video-player.vsix.tmp"
MODEL_NAME = "ggml-small.en-q5_1.bin"
MODEL_SHA256 = "bfdff4894dcb76bbf647d56263ea2a96645423f1669176f4844a1bf8e478ad30"


def bundled_assets() -> dict[str, Path]:
    ffmpeg_command = shutil.which("ffmpeg")
    if not ffmpeg_command:
        raise FileNotFoundError("ffmpeg is needed to build the self-contained VSIX")
    ffmpeg = Path(ffmpeg_command).resolve()
    distribution = ffmpeg.parent.parent
    model = Path(os.environ["APPDATA"]) / "Code" / "User" / "globalStorage" / "local.vscode-video-player" / MODEL_NAME
    if not model.is_file():
        raise FileNotFoundError(f"English speech model is missing: {model}")
    with model.open("rb") as stream:
        model_digest = hashlib.file_digest(stream, "sha256").hexdigest()
    if model_digest != MODEL_SHA256:
        raise RuntimeError(f"The verified English speech model is missing or corrupt: {model}")
    assets = {
        "extension/bin/win32-x64/ffmpeg.exe": ffmpeg,
        f"extension/bin/win32-x64/{MODEL_NAME}": model,
        "extension/bin/FFMPEG_LICENSE": distribution / "LICENSE",
        "extension/bin/FFMPEG_README.txt": distribution / "README.txt",
    }
    for source in assets.values():
        if not source.is_file():
            raise FileNotFoundError(source)
    return assets


def main() -> None:
    assets = bundled_assets()
    if not VSIX.is_file():
        raise FileNotFoundError(VSIX)
    if TEMP.exists():
        raise FileExistsError(TEMP)
    try:
        with zipfile.ZipFile(VSIX, "r") as old, zipfile.ZipFile(TEMP, "w") as new:
            packaged = set(old.namelist())
            for info in old.infolist():
                if info.filename in assets:
                    continue
                if info.filename == "extension.vsixmanifest":
                    data = (SOURCE / ".vsixmanifest").read_bytes()
                elif info.filename.startswith("extension/") and not info.is_dir():
                    source_file = SOURCE / info.filename.removeprefix("extension/")
                    data = source_file.read_bytes()
                else:
                    data = old.read(info.filename)
                new.writestr(info, data)
            # Include new host modules and the local speech runner with its DLLs.
            for source_file in SOURCE.rglob("*"):
                if not source_file.is_file() or not (source_file.suffix == ".js" or source_file.relative_to(SOURCE).parts[0] == "bin"):
                    continue
                archive_name = "extension/" + source_file.relative_to(SOURCE).as_posix()
                if archive_name not in packaged:
                    new.write(source_file, archive_name)
            for archive_name, source_file in assets.items():
                new.write(source_file, archive_name, compress_type=zipfile.ZIP_DEFLATED, compresslevel=6)
        with zipfile.ZipFile(TEMP, "r") as package:
            if package.testzip() is not None:
                raise RuntimeError("VSIX ZIP validation failed")
        os.replace(TEMP, VSIX)
    finally:
        if TEMP.exists():
            TEMP.unlink()
    print(f"Updated {VSIX}")


if __name__ == "__main__":
    main()
