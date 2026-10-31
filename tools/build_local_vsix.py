"""Repack the checked-in local VS Code extension without downloading dependencies."""

from pathlib import Path
import os
import zipfile


TOOLS = Path(__file__).resolve().parent
SOURCE = TOOLS / "vscode-video-player"
VSIX = TOOLS / "vscode-video-player.vsix"
TEMP = TOOLS / "vscode-video-player.vsix.tmp"


def main() -> None:
    if not VSIX.is_file():
        raise FileNotFoundError(VSIX)
    if TEMP.exists():
        raise FileExistsError(TEMP)
    try:
        with zipfile.ZipFile(VSIX, "r") as old, zipfile.ZipFile(TEMP, "w") as new:
            packaged = set(old.namelist())
            for info in old.infolist():
                if info.filename == "extension.vsixmanifest":
                    data = (SOURCE / ".vsixmanifest").read_bytes()
                elif info.filename.startswith("extension/") and not info.is_dir():
                    source_file = SOURCE / info.filename.removeprefix("extension/")
                    data = source_file.read_bytes()
                else:
                    data = old.read(info.filename)
                new.writestr(info, data)
            # Include newly added compiled modules that were not in the old VSIX.
            for source_file in SOURCE.rglob("*.js"):
                archive_name = "extension/" + source_file.relative_to(SOURCE).as_posix()
                if archive_name not in packaged:
                    new.write(source_file, archive_name)
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
