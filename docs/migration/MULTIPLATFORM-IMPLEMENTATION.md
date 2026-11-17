# Forge UI — Multiplatform implementation evidence

The subsequent [preview/property correction](FLUTTER-PREVIEW-FIX.md) replaces the standalone Flutter panel with the common Showcase container, editable Dart properties and a live validated bridge. It includes the current build and verification evidence.

## Local validation — 2026-11-16

Flutter **3.38.7**, Dart **3.10.7**, Windows x64. The complete local checkout and SDK are available; the historical environment blockers below no longer apply to command-line validation here.

| Requested command | Result | Evidence |
| --- | --- | --- |
| `npm run tokens:check` | PASS | 184 portable tokens, four themes, unchanged approved CSS SHA-256; deterministic CSS/Dart generation |
| `npm run build:flutter-preview` | PASS | Both Flutter packages analyzed without issues; two library tests passed; release Flutter Web compilation succeeded; Button registered only after success |
| `npm run typecheck` | PASS | React library and Next portal |
| `npm run build` | PASS | Next static export, including the compiled Flutter files |

Corrections required during real execution:

- Invoke `flutter.bat` through the Windows shell rather than spawning a nonexistent extensionless executable.
- Wait for `kThemeAnimationDuration` before asserting the final theme in the widget test. Loading still disables interaction immediately, and the test checks that before advancing the animation clock.
- Format the handwritten Dart sources/tests; retain deterministic generated token output. Preserve shared token template bytes and use LF for app sources in Git.
- Ignore Dart tool caches and generated build directories.

Logs: [Flutter analysis/tests/build](validation/flutter-preview.log), [TypeScript](validation/multiplatform-typecheck.log), [Next build](validation/multiplatform-build.log), [Dart formatting](validation/dart-format.log).

The actual generated preview is `showcase/portal/public/flutter/index.html`; the verified manifest registers **Button only**. This does not mean 221 Flutter widgets have been migrated. Browser interaction, visual parity, accessibility, Android/iOS rendering and the browser root-font conversion assumption still require verification, so the broader SCs remain `PENDING`.

Flutter emitted a non-fatal warning about the optional Cupertino icon font during compilation. The compilation itself completed successfully; this is recorded rather than described as a warning-free build.

No commit or push is included in this command-validation step.

Scope: Forge UI only. Source contracts were reviewed against `PraticarWorkspace/PraticarFront/docs/sc` and the Forge UI `sc-author` / `sc-implementer` agent instructions. Original PraticarFront was not modified.

## Implemented in the local change set

- Canonical JSON token files (`shared/tokens/primitives.json`, `semantic.json`, `themes.json`, `schema.json`) extracted from the current approved CSS.
- CSS-preserving template and browser-only rule classification; reproducible generator produces a **byte-for-byte identical** `web/library/src/design-system/styles/tokens.css` and a typed Dart API with 184 portable tokens for four themes. Browser-only values and unsupported CSS expressions are reported, not approximated.
- Flutter package with theme adapter (`ForgeThemeData`, `ForgeThemeTokens`), public initial `ForgeButton`, and Flutter test source.
- One existing Next Showcase V2 with React (default) / Flutter tabs; code snippets and a truthful Flutter-unavailable state. No Flutter iframe is registered merely from source presence.
- A Flutter Web demo shell and `npm run build:flutter-preview` workflow which must pass `flutter analyze`, `flutter test`, and a real `flutter build web` before it registers the Button preview.

## Historical evidence from the preceding environment

| Check | Status | Evidence |
| --- | --- | --- |
| `npm run tokens:check` | passed | 184 portable tokens, four themes; CSS SHA-256 `68ed92cc2fd20996fd564709915cbd90acf4742558569c16a9d639da0351fc06`; deterministic CSS + Dart generation |
| `node --check` for Node build/generation scripts | passed | No parser errors |
| CSS comparison against approved Google Drive `tokens.css` | passed | Byte-for-byte match |
| `flutter pub get`, `flutter analyze`, `flutter test` and `flutter build web` | blocked | Flutter SDK executable not installed (`spawnSync flutter ENOENT`) |
| React/Next TypeScript syntax parse | passed | Five added/modified TypeScript/TSX files parsed with no diagnostics |
| React/Next typecheck, static build and browser tab interactions | blocked/not_run | `npm install --offline` fails with `ENOTCACHED` for `@types/node`; full authoritative workspace dependencies/source unavailable locally |
| Android/iOS native rendering and accessibility | not_run | Requires Flutter SDK/devices and platform verification |

**SC status:** `PENDING` for all three cross-platform SCs and Button Flutter addition until checks and visual parity can be verified. The existing validated Web behavior is preserved, but this is not Flutter release acceptance.

## Next validation on a machine with Flutter

```sh
npm run tokens:check
npm run build:flutter-preview
npm run typecheck
npm run build
```

Open the existing Showcase, select Button -> Flutter; confirm the compiled iframe, theme switch, keyboard tab semantics and usable source copy. Test native Android/iOS separately. Do not mark the SCs DONE until evidence is recorded.
