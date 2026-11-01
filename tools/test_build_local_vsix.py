"""Check that the shareable VSIX includes non-JavaScript speech runner files."""

from zipfile import ZipFile

import build_local_vsix as builder


def test_binary_assets() -> None:
    builder.main()
    with ZipFile(builder.VSIX) as archive:
        assert archive.read("extension/bin/win32-x64/whisper-cli.exe").startswith(b"MZ")
        assert archive.read("extension/bin/win32-x64/whisper.dll").startswith(b"MZ")


if __name__ == "__main__":
    test_binary_assets()
    print("VSIX binary packaging: OK")
