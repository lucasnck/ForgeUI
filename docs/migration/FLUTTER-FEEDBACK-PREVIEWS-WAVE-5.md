# Forge UI Flutter — Feedback preview wave 5 (2026-11-16)

## Validação no checkout com SDK — 17/11/2026

- Flutter 3.38.7 / Dart 3.10.7 disponíveis; análise da biblioteca e do showcase sem problemas.
- **113 testes da biblioteca e 353 testes do showcase passaram**, incluindo a repetição do contrato de Option, as novas composições e os snippets Dart reais.
- **68 prévias compiladas e registradas**, build `13099cb03e02cedd`. Bootstrap e índice do portal reconhecem os mesmos 68 identificadores.
- Corrigidas as listas finitas que omitiam as nove novas prévias; o pipeline agora compara o bootstrap compilado ao catálogo antes de escrever o manifesto.
- Controles de conteúdo do consumidor aparecem separados das propriedades públicas Dart. A documentação das APIs também permanece visível quando a prévia ainda está indisponível.
- Typecheck web/portal, tokens e documentação passaram. Build do portal passou com 297 rotas exportadas. As 10 verificações HTTP passaram, incluindo os arquivos Flutter/CanvasKit e a correspondência do hash servido ao manifesto.

Evidência: [pipeline Flutter](validation/flutter-preview.log), [relatório consolidado](FLUTTER-IMPLEMENTATION-REPORT.md). Aceite visual em navegador/dispositivos nativos permanece pendente; nenhuma SC foi elevada a DONE por contagem de exports ou de testes.

## Registro histórico da preparação

## Scope and ownership

Continues from wave 4 without altering public API count (221 resolved). Uses existing `ForgeCard`, `ForgeAlert`, `ForgeEmptyState`, `ForgeErrorState`, `ForgeLoadingState` and canonical Header/Body/Footer parts in `app/library/lib/src/components/forge_sections.dart`. No mocks or demo-local wrappers substitute public components.

- Card: token-backed elevation/fullWidth; independently actionable footer; no click on passive owner.
- Alert/ErrorState: explicit `off`/`polite`/`assertive` Body announcement policy; footer callbacks are caller-owned, never auto-retry or navigation.
- EmptyState: optional consumer action omitted cleanly when requested.
- LoadingState: nonblank localized label, a single decorative `ForgeSpinner` in Body and no implicit completion.

## Repair to previous wave

`ForgePagination` now rejects duplicate `ForgePaginationItem.page` targets (SC requirement). The earlier preview generated `Anterior`/`Próxima` alongside numeric page items, duplicating targets; it now uses only unique page targets. Regression test added to `composite_preview_test.dart`. This avoids bypassing source validation to make a demo pass.

## Staged files

- `app/library/lib/src/components/forge_pagination.dart` (updated)
- `app/showcase_flutter/lib/examples/composite_examples.dart` and `test/composite_preview_test.dart` (updated)
- `app/showcase_flutter/lib/examples/feedback_contracts.dart` and `feedback_examples.dart` (new)
- `app/showcase_flutter/test/feedback_preview_test.dart` and `generated_feedback_snippets_test.dart` (new)
- `showcase/portal/src/features/showcase-v2/model/flutter-feedback.json` (new)
- `showcase/portal/src/features/showcase-v2/components/FlutterPreview/flutter-feedback-configurations.tsx` (new)
- `app/showcase_flutter/lib/main.dart`, `preview_settings.dart`, portal `FlutterComponentShowcase.tsx`, `useFlutterPreview.ts`, `scripts/build-flutter-preview.mjs` (updated)
- `scripts/test-flutter-feedback-catalog.mjs` (new)
- `docs/sc/showcase/feature-multiplatform-showcase.sc.md` (updated)

## Verification

| Check | Result |
| --- | --- |
| `node scripts/test-flutter-feedback-catalog.mjs` | PASS: 5 finite schemas, 6 generated Dart snippets incl. text escaping |
| Node syntax (`node --check`) | PASS: feedback generator and guarded builder |
| TypeScript transpilation/syntax | PASS: feedback config, portal showcase, preview hook |
| Dart analyzer, widget tests, input `Option` rerun | NOT_RUN: Flutter/Dart SDK unavailable |
| Flutter Web build, registered preview artifact | NOT_RUN: manifest unchanged |
| Browser/device accessibility, visual parity | NOT_RUN |

This batch does not change the official accepted SC count. The source includes 221 exported Dart APIs, but full visual/native parity is not proven. Preserve prior success evidence as historical, not proof of the new changes.

## Required final execution (ForgeUI checkout with Flutter SDK)

```sh
node scripts/test-flutter-composite-catalog.mjs
node scripts/test-flutter-feedback-catalog.mjs
cd app/library && flutter analyze && flutter test && cd ../..
cd app/showcase_flutter
flutter analyze
flutter test test/inputs_preview_test.dart
flutter test test/composite_preview_test.dart
flutter test test/generated_composite_snippets_test.dart
flutter test test/feedback_preview_test.dart
flutter test test/generated_feedback_snippets_test.dart
cd ../..
npm run build:flutter-preview
npm run typecheck
npm run verify:docs
```

Do not publish any new preview or mark component SCs `DONE` if analysis, tests, builds or native/visual criteria remain unverified. PraticarFront, remotes and consuming apps are unchanged.

[Validação HTTP](validation/flutter-wave5-http.json): portal em `http://localhost:3000`, bootstrap com 68 identificadores e JS servido com build `13099cb03e02cedd`.
