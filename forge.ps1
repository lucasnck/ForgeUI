# Forge UI: Windows bootstrap without administrator privileges.
# Compatible with Windows PowerShell 3+ (including versions without Get-FileHash/Expand-Archive).
param(
  [Parameter(ValueFromRemainingArguments=$true)]
  [string[]] $ForgeArguments
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

# Avoid relying on newer PowerShell-only script path variables.
$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $ScriptRoot
$Command = if ($ForgeArguments.Count -gt 0) { $ForgeArguments[0] } else { 'start' }
$Version = 'v22.16.0'

if ($PSVersionTable.PSVersion.Major -lt 3) {
  throw '[forge] Windows PowerShell 3.0 or newer is required by the bootstrap.'
}
if (-not [Environment]::Is64BitOperatingSystem) {
  throw '[forge] Windows 64-bit is required for the Node.js bootstrap.'
}

# PROCESSOR_ARCHITEW6432 allows ARM64 detection from an emulated x64 shell.
$Platform = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64' -or $env:PROCESSOR_ARCHITEW6432 -eq 'ARM64') { 'arm64' } else { 'x64' }
$Folder = "node-$Version-win-$Platform"
$ToolPath = Join-Path $ScriptRoot ".forge\tools\$Folder"
$NodeExe = Join-Path $ToolPath 'node.exe'

function Test-Node {
  $node = Get-Command node.exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
  $npm = Get-Command npm.cmd -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $node -or -not $npm) { return $false }
  try {
    # Windows PowerShell strips quotes from native inline JavaScript arguments.
    # --version needs no shell-sensitive expression and also exposes exit status.
    $nodeVersion = & $node.Path --version 2>$null
    if ($LASTEXITCODE -ne 0 -or "$nodeVersion" -notmatch '^v(\d+)\.') { return $false }
    if ([int]$Matches[1] -lt 22) { return $false }
    $npmVersion = & $npm.Path --version 2>$null
    return ($LASTEXITCODE -eq 0 -and "$npmVersion" -match '^\d+\.\d+\.\d+')
  } catch { return $false }
}

function Get-Sha256 {
  param([Parameter(Mandatory=$true)][string]$Path)
  # Use the .NET hashing API, available even without Get-FileHash.
  $stream = [System.IO.File]::OpenRead($Path)
  $hash = [System.Security.Cryptography.SHA256]::Create()
  try {
    return [System.BitConverter]::ToString($hash.ComputeHash($stream)).Replace('-', '').ToLowerInvariant()
  } finally {
    $hash.Dispose()
    $stream.Dispose()
  }
}

function Expand-NodeZip {
  param([Parameter(Mandatory=$true)][string]$Archive, [Parameter(Mandatory=$true)][string]$Destination)
  # ZipFile predates Expand-Archive, which is not available in PowerShell 3/4.
  try {
    Add-Type -AssemblyName 'System.IO.Compression.FileSystem' -ErrorAction Stop
    [System.IO.Compression.ZipFile]::ExtractToDirectory($Archive, $Destination)
  } catch {
    throw "[forge] Could not extract the Node.js ZIP using .NET ZipFile: $($_.Exception.Message)"
  }
}

if (-not (Test-Node) -and (Test-Path -LiteralPath $NodeExe)) {
  $env:PATH = "$ToolPath;$env:PATH"
}

if (-not (Test-Node)) {
  if ($Command -eq 'doctor') {
    Write-Error '[forge] Node.js 22+ and npm not found. Run forge.cmd setup to install locally without administrator privileges.'
    exit 1
  }
  $RootTools = Join-Path $ScriptRoot '.forge\tools'
  New-Item -ItemType Directory -Force -Path $RootTools | Out-Null
  $Temp = Join-Path $RootTools ('.download.' + [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $Temp | Out-Null
  try {
    # Older PowerShell/.NET versions often default to TLS 1.0; prefer TLS 1.2.
    $protocols = [int][Net.ServicePointManager]::SecurityProtocol -bor 3072
    [Net.ServicePointManager]::SecurityProtocol = [enum]::ToObject([Net.SecurityProtocolType], $protocols)
    $Dist = "https://nodejs.org/dist/$Version"
    $ZipName = "$Folder.zip"
    $Manifest = Join-Path $Temp 'SHASUMS256.txt'
    $Archive = Join-Path $Temp $ZipName
    Write-Host "[forge] Downloading Node.js $Version for Windows $Platform..."
    Invoke-WebRequest -UseBasicParsing -Uri "$Dist/SHASUMS256.txt" -OutFile $Manifest
    Invoke-WebRequest -UseBasicParsing -Uri "$Dist/$ZipName" -OutFile $Archive
    $Record = Get-Content -LiteralPath $Manifest | Where-Object { $_ -match "^[a-fA-F0-9]{64}\s+$([regex]::Escape($ZipName))$" } | Select-Object -First 1
    if (-not $Record) { throw "[forge] $ZipName not found in official SHA-256 manifest." }
    $Expected = ($Record -split '\s+')[0].ToLowerInvariant()
    $Actual = Get-Sha256 -Path $Archive
    if ($Expected -ne $Actual) { throw '[forge] SHA-256 mismatch. Download rejected.' }
    Write-Host '[forge] SHA-256 verified. Extracting Node.js...'
    Expand-NodeZip -Archive $Archive -Destination $Temp
    $Extracted = Join-Path $Temp $Folder
    if (-not (Test-Path -LiteralPath (Join-Path $Extracted 'node.exe'))) {
      throw '[forge] Node.js ZIP is missing node.exe.'
    }
    # Replace only Forge-generated portable Node directory when it is incomplete.
    if (Test-Path -LiteralPath $ToolPath) {
      Remove-Item -LiteralPath $ToolPath -Recurse -Force
    }
    Move-Item -LiteralPath $Extracted -Destination $ToolPath
    $env:PATH = "$ToolPath;$env:PATH"
    Write-Host '[forge] Verified Node.js installed in .forge/tools/.'
  } finally {
    Remove-Item -LiteralPath $Temp -Recurse -Force -ErrorAction SilentlyContinue
  }
}

if (-not (Test-Node)) { throw '[forge] Could not enable Node.js 22+ with npm.' }
& node (Join-Path $ScriptRoot 'scripts\forge.mjs') @ForgeArguments
exit $LASTEXITCODE
