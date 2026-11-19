# ForgeUI — 221-component React ↔ Flutter parity: implementation checkpoint

Date: 2026-11-18. Status: **PENDING — not visually or natively certified**.

## Scope and sequence

Used the existing `sc-author`/`sc-implementer` instructions: updated `docs/sc/showcase/feature-multiplatform-showcase.sc.md`, `docs/sc/app/feature-showcase-parity.sc.md` and created `docs/sc/app/tech-full-catalog-parity.sc.md` **before code changes**. No PraticarFront/Back edits, no commits, no repo publishing.

## Cross-cutting code implemented

- `app/showcase_flutter/lib/main.dart`: every Flutter preview uses start-aligned content without hard 560dp cap and a theme-owned subtle card surface. It remains the real compiled Flutter widget tree, not a React imitation.
- `FlutterPreview.module.css`: the embedded iframe uses the canonical subtle surface token.
- `ExamplePreview.tsx` uses a shared `formatDartForDisplay` formatter for all Flutter snippets, respecting quoted literals and leaving React examples unchanged; the copied source is the same source shown. This makes existing verbose examples legible, **not** magically minimal reusable snippets.
- `scripts/audit-flutter-react-parity.mjs`: fail-closed catalog/traceability structural gate and a per-component matrix. `--require-visual` deliberately fails while visual evidence is absent.
- `scripts/test-flutter-code-display.mjs` and `scripts/test-showcase-parity-shell.mjs` are regression gates; root `package.json` includes them in the cross-platform check.

The earlier Tabs-specific correction to the public Flutter widget remains in place, but does not prove style/behavior parity for any other widget.

## Evidence gathered in this execution

| Check | Result | Scope |
|---|---|---|
| `node scripts/audit-flutter-react-parity.mjs --check` | PASSED | 221 public native APIs, 221 React traces, 221 catalog entries and manifest registrations; 254 scenario references |
| `node scripts/test-flutter-code-display.mjs` | PASSED | 189 catalog-generated Dart snippets preserved token-for-token after presentation formatting |
| `node scripts/test-showcase-parity-shell.mjs` | PASSED | Five universal preview shell checks |
| `node --check` on new scripts | PASSED | Node parser |
| `dart format`, `flutter analyze`, `flutter test`, Flutter Web rebuild | BLOCKED | Flutter/Dart SDK unavailable in this execution environment |
| Next.js typecheck/build | NOT RUN | Complete local repository dependencies not provisioned here |
| Pixel comparison for 221 components and canonical scenarios, 4 themes | NOT RUN | Real React and Flutter runtimes/screenshots not available |
| Android/iOS assistive-technology checks | NOT RUN | Device/toolchain unavailable |

**Important:** 217 components have *property mappings needing review*, mostly inherited DOM attributes and platform adaptations. This is **not** an assertion of 217 bugs. Every component still has `visualParity=unverified`, `nativeParity=unverified`, `acceptance=PENDING` in the machine-readable matrix.

## Remaining implementation (do not label DONE)

1. Run the cross-platform check, rebuild the 221 Flutter Web previews and run native widget tests on an SDK-enabled checkout.
2. For every row in `docs/migration/validation/flutter-react-parity-inventory.json`, compare actual React source/live example against Flutter widget and owning SC, classify inherited/native-only props, and correct real widget visual/default/interaction mismatches. Approve native deviations explicitly.
3. Replace the generated showcase-internal Dart samples with curated, minimal **compilable public ForgeUI usage recipes** component by component. Full examples remain visible and formatted meanwhile.
4. Compare theme, sizes, spacing, typography, radii, disabled/focus/hover/selected/error, RTL, a11y and all scenario variants. Golden/screenshots and Android/iOS evidence are required before changing PENDING to DONE.
5. After verified ForgeUI Git commit, upgrade the pinned ForgeUI revision in PraticarApp and run its consumer tests; do not silently change the pin.

### Run from ForgeUI checkout

```sh
npm run audit:flutter-parity
npm run report:flutter-parity
npm run test:dart-code-display
npm run test:showcase-parity-shell
npm run check:cross-platform
npm run build:flutter-preview
```

These commands create audit and verify catalog coverage but do not independently prove visual parity. See [the per-component matrix](validation/flutter-react-parity-inventory.md).
