# ForgeUI — Showcase React × Flutter visual parity (2026-11-18)

## Scope and workflow

Implemented against the **canonical** `AiWorkspace/ForgeUI` project, not the stale `PraticarFront/vendor/forge-ui` clone. Followed the repository's `sc-author` contract-writing phase, then `sc-implementer`-scoped source changes. No changes to `PraticarFront`/`PraticarBack`, no Git commit/push or published package.

Updated specs (still `PENDING`):
- `docs/sc/showcase/feature-multiplatform-showcase.sc.md`
- `docs/sc/app/feature-showcase-parity.sc.md`

## Implemented source

- `app/library/lib/src/components/forge_tabs.dart`: selected default Tab resolves to branded solid `ForgeButton`; unselected defaults to ghost; explicit appearance remains higher priority. The former underline is only available through the explicit `attached` composition, not the default.
- `app/showcase_flutter/lib/main.dart`: preserve Flutter Web embedded iframe, align scene to directional top/start, use Forge theme's semantic surface color and a responsive maximum width instead of `Center` + forced `SizedBox(width: 560)`.
- `showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.tsx`: remove redundant new-tab link; retain iframe/sandbox, bridge, error/retry and loading states.
- `.../FlutterPreview.module.css`: use semantic surface token for frame and reduce redundant gutter.
- `.../flutter-interaction-configurations.tsx`: Tabs/Tab/TabPanel/related parts display a concise public Dart consumer example rather than generated preview class/serialized schema. All other interaction examples remain unchanged and need separate cleanup if oversized.
- `app/library/analysis_options.yaml`, `app/showcase_flutter/analysis_options.yaml`: Dart SDK linter/analyzer options.
- `package.json`: add `check:showcase-parity` and `check:flutter-format`, run them from cross-platform check.
- `scripts/check-showcase-parity.mjs`: source regression checks for selected Tabs, scene alignment, semantic background, removed link and consumer snippet.
- `app/library/test/forge_tabs_visual_state_test.dart`: selected/unselected behavior and explicit appearance regression.

## Verification actually performed

| Check | Result |
| --- | --- |
| `node scripts/check-showcase-parity.mjs` (in staged source tree) | PASS |
| TypeScript `transpileModule` syntax check for modified TSX | PASS (syntax only) |
| Tabs snippet generator executed with default + modified schema | PASS: 35–36 lines, 809–827 chars; no preview internals |
| `analysis_options.yaml` parser check | PASS |
| Balanced delimiters for changed Dart files | PASS (not Dart compiler) |
| `dart format --output=none --set-exit-if-changed` | NOT RUN — Dart SDK unavailable in this environment |
| `flutter analyze`, widget tests, Flutter Web build | NOT RUN — Flutter SDK unavailable |
| Next/React TypeScript full typecheck and build | NOT RUN — full checkout and dependencies unavailable here |
| Browser screenshot diff, mobile and theme acceptance | NOT RUN — needs real visual review |

**Status: PENDING.** Source regressions passing do not prove Flutter compilation or visual equivalence. The formatter/CI gate may initially find existing unformatted Dart source; run it and format only the scoped files before sign-off.

## Consumer release dependency

`PraticarApp` currently pins ForgeUI Git commit `bf2ded70d9e05e4a7b983cf836f597eafe4b203d`. Updating files in Drive does **not** publish a newer commit or upgrade that dependency. Native app parity will require a verified new ForgeUI Git commit and a separately authorized pin update after tests pass.
