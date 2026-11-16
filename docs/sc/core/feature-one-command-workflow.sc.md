---
title: "Forge UI — One-command developer workflow"
scope: "Portable setup, diagnostics, verification, and launch of Forge UI without manual per-project dependency installation"
status: PENDING
type: feature
ds-level: none
---

# One-command developer workflow

## Files

- (C) `forge.sh`
- (C) `forge.command`
- (C) `forge.ps1`
- (C) `forge.cmd`
- (C) `scripts/forge.mjs`
- (C) `scripts/verify-workspace.mjs`
- (C) `docs/integration/local-setup.md`
- (M) `package.json`
- (M) `README.md`
- (M) `.gitignore`

## Contract

- One entry point per platform: `./forge.sh` for macOS/Linux and `forge.cmd` on Windows; macOS users may double-click `forge.command`.
- Running without arguments sets up missing dependencies and launches the web showcase. `setup` provisions tooling and dependencies, then verifies the repository structure and TypeScript. `check` also verifies a production build; `doctor` diagnoses without installing; `build` creates static output. `clean` deletes only generated install/build artifacts and requires no network.
- Resolve the script's own root, irrespective of the caller's working directory. All package installation occurs from the root npm workspace, never manually inside child projects. Use npm workspaces and local `@forge-ui/web` linkage, avoiding duplicate React installations or publication to NPM.
- Accept a valid existing Node.js >=22 installation; otherwise automatically bootstrap an officially distributed, pinned Node.js toolchain into ignored `.forge/tools/` without requiring administrator access. Verify the downloaded archive against the official published SHA-256 checksum. Never execute an unverified archive; stop on unsupported architecture, no download utility, or checksum mismatch.
- Windows detection must parse `node.exe --version` without inline JavaScript quoting, check native exit codes, and verify that `npm.cmd --version` succeeds. Reuse a healthy portable installation without downloading it again.
- Setup must be idempotent, run npm `ci` when an existing lockfile is present (and `install` if not yet locked), report concrete failures, preserve user files and prevent overlapping installation jobs. Do not silently skip a failed check or claim it passed.
- Scripts must support macOS/Linux bash and Windows PowerShell (through `.cmd`), provide clear actionable output, and require no GitHub credentials or remote Git push. Windows PowerShell 3/4 compatibility requires streaming SHA-256 through .NET and ZIP extraction through `System.IO.Compression.ZipFile`, without calling `Get-FileHash` or `Expand-Archive`. TLS 1.2 must be enabled for HTTPS downloads, and the download must stay checksum-verified.
- `doctor` should distinguish: missing toolchain, missing packages, missing lock, broken workspace references, and unmet Git remote expectations without modifying the project.
- `check` verifies scripts and source layout in addition to TypeScript and Next build. Security: do not hardcode credentials, use `npm --ignore-scripts` only if it does not break the verified stack (not currently claimed), and avoid shell execution of downloaded install scripts.

## Criteria

### Windows detection verification

- [x] Windows PowerShell launcher accepts Node.js when multiple executable paths are returned, selecting the first application in PATH.
- [x] Version detection uses `--version`, checks native exit codes, and successfully reuses installed tooling.
- [x] `forge.cmd start` completes dependency installation and starts Next.js 16.4.0 at localhost:3000 (Ready).

The broader cross-platform criteria below remain pending; this verification covers the Windows startup correction only.

- [ ] Bootstrap and workflow entry points authored and executable where supported.
- [ ] Local diagnostics validated with both healthy and missing-dependency cases.
- [ ] Setup idempotence and the skip-if-healthy behavior covered by tests.
- [ ] `npm install`, TypeScript check and Next production build passed in an environment with registry access.
- [ ] Windows PowerShell and macOS startup paths verified on their respective operating systems.
- [ ] Launching the showcase needs no manual per-project install and the Git remote remains configured but is never pushed.
