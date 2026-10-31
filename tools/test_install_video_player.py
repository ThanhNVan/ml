"""Offline checks for the local one-command installer."""

import contextlib
import io
from unittest.mock import call, patch

import install_video_player as installer


def test_local() -> None:
    with (
        patch.object(installer, "code_cli", return_value="code"),
        patch.object(installer, "local_version", return_value="1.0.1"),
        patch.object(installer, "installed", return_value={installer.LOCAL_ID: "1.0.1"}),
        patch.object(installer.subprocess, "run") as run,
        contextlib.redirect_stdout(io.StringIO()),
    ):
        installer.install()
    run.assert_called_once_with(
        ["code", "--install-extension", str(installer.VSIX), "--force"], check=True,
    )


def test_removes_old_editions() -> None:
    with (
        patch.object(installer, "code_cli", return_value="code"),
        patch.object(installer, "local_version", return_value="1.0.1"),
        patch.object(installer, "installed", side_effect=[
            {installer.OLD_LOCAL_ID: "1.0.1", installer.MARKET_ID: "1.2.3", installer.LOCAL_ID: "1.0.1"},
            {installer.MARKET_ID: "1.2.3", installer.LOCAL_ID: "1.0.1"},
            {installer.LOCAL_ID: "1.0.1"},
        ]),
        patch.object(installer.subprocess, "run") as run,
        contextlib.redirect_stdout(io.StringIO()),
    ):
        installer.install()
    assert run.call_args_list == [
        call(["code", "--install-extension", str(installer.VSIX), "--force"], check=True),
        call(["code", "--uninstall-extension", installer.OLD_LOCAL_ID], check=True),
        call(["code", "--uninstall-extension", installer.MARKET_ID], check=True),
    ]


if __name__ == "__main__":
    test_local()
    test_removes_old_editions()
    print("Local installer paths: OK")
