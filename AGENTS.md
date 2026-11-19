# Forge UI agents

Work SC-first. Primary entry point: `docs/sc/core/start-here.sc.md`. The design system's origin is `PraticarWorkspace/PraticarFront`; originals stay unchanged until explicit consumer-integration work. The React library has no Next coupling; consumers use its public entry point. Flutter has 221 resolved public constructor APIs and generated tokens/themes. Source/API presence does not imply full SC acceptance or compiled preview availability. Read `docs/migration/FLUTTER-IMPLEMENTATION-REPORT.md` and the actual compiled `flutter-preview-manifest.json`; native/visual and remaining parity criteria are pending.

- `sc-author`: documents contracts without implementing. Before creating an SC, it must classify and bound the work using the granularity policy in `docs/sc/core-template.sc.md`: FEATURE = one coherent consumer-facing capability; TECH = one independently testable technical capability/integration (not a grab bag of frameworks or a spec per method/file). Reuse existing contracts and link one FEATURE to the TECH SCs it actually consumes.
- `sc-implementer`: implements authorized contracts and records test evidence. Never silently expand a TECH into another integration or a FEATURE into an unrelated journey: route the discovered scope to `sc-author` for a separate/dependent SC first. Tests, documentation and configuration for the same capability may stay together.

Use `PENDING` and `DONE` only with real evidence; do not silently declare migrated features complete. No NPM publication or remote Git repository is required for local consumption. A Git submodule, if later added, updates only when consumers deliberately commit a new reference.

## UI runtime independence (required direction)

- The ForgeUI libraries target **zero third-party production runtime dependencies** beyond their platform engines (React/ReactDOM as peers and the Flutter SDK). This includes state/form/validation/phone libraries, not only component kits. All existing exceptions are migration debt, not permanent exceptions.
- Do not introduce Material, Cupertino, Radix or another design system as a base for ForgeUI widgets. Flutter code may use the Flutter SDK's `widgets.dart` and rendering/semantics primitives; existing Material imports are transitional compatibility only and must be replaced under owning SCs without breaking consumers.
- Execute `npm run test:independence` and `npm run audit:independence` during changes; strict mode is the final target and must not be reported as passing until all migration debt is resolved.
- Tooling in Showcase/dev/test has a separate dependency boundary; production library restrictions do not pretend Next/Flutter tooling can run without their own development dependencies.
