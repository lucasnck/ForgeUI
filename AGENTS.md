# Forge UI agents

Work SC-first. Primary entry point: `docs/sc/core/start-here.sc.md`. The design system's origin is `PraticarWorkspace/PraticarFront`; originals stay unchanged until explicit consumer-integration work. The React library has no Next coupling; consumers use its public entry point. Flutter has 221 resolved public constructor APIs and generated tokens/themes. Source/API presence does not imply full SC acceptance or compiled preview availability. Read `docs/migration/FLUTTER-IMPLEMENTATION-REPORT.md` and the actual compiled `flutter-preview-manifest.json`; native/visual and remaining parity criteria are pending.

- `sc-author`: documents contracts without implementing.
- `sc-implementer`: implements authorized contracts and records test evidence.

Use `PENDING` and `DONE` only with real evidence; do not silently declare migrated features complete. No NPM publication or remote Git repository is required for local consumption. A Git submodule, if later added, updates only when consumers deliberately commit a new reference.
