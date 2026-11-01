param(
    [Parameter(Mandatory)] [int]$ProcessId,
    [Parameter(Mandatory)] [string]$LogPath,
    [Parameter(Mandatory)] [string]$ErrorLogPath,
    [string]$AdditionalLogPath,
    [string]$AdditionalErrorLogPath,
    [int]$AdditionalProcessId = 0,
    [string]$ProgressPath,
    [int]$Total = 240,
    [int]$AlreadyDone = 0,
    [int]$IntervalSeconds = 60
)

do {
    $cleaned = @(Select-String -LiteralPath $LogPath -Pattern '^Cleaned:' -ErrorAction SilentlyContinue).Count
    if ($AdditionalLogPath) {
        $cleaned += @(Select-String -LiteralPath $AdditionalLogPath -Pattern '^Cleaned:' -ErrorAction SilentlyContinue).Count
    }
    $failed = @(Select-String -LiteralPath $ErrorLogPath -Pattern '^Failed:' -ErrorAction SilentlyContinue).Count
    if ($AdditionalErrorLogPath) {
        $failed += @(Select-String -LiteralPath $AdditionalErrorLogPath -Pattern '^Failed:' -ErrorAction SilentlyContinue).Count
    }
    $done = [Math]::Min($Total, $AlreadyDone + $cleaned)
    $width = 30
    $filled = [int][Math]::Floor($width * $done / $Total)
    $bar = ('#' * $filled) + ('-' * ($width - $filled))
    $percent = [int][Math]::Floor(100 * $done / $Total)
    $line = '{0:yyyy-MM-dd HH:mm:ss} [{1}] {2}/{3} ({4}%) complete, {5} failed' -f (Get-Date), $bar, $done, $Total, $percent, $failed
    if ($ProgressPath) { Add-Content -LiteralPath $ProgressPath -Value $line } else { $line }
    $running = [bool](Get-Process -Id $ProcessId -ErrorAction SilentlyContinue)
    if ($AdditionalProcessId -gt 0) {
        $running = $running -or [bool](Get-Process -Id $AdditionalProcessId -ErrorAction SilentlyContinue)
    }
    if ($running) { Start-Sleep -Seconds $IntervalSeconds }
} while ($running)
