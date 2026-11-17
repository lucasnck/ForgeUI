# Flutter Showcase — Composition preview batch (16 Nov 2026)

## Validação no checkout com SDK — 17/11/2026

- Flutter 3.38.7 / Dart 3.10.7 disponíveis; análise da biblioteca e do showcase sem problemas.
- **113 testes da biblioteca e 353 testes do showcase passaram**, incluindo a repetição do contrato de Option, as novas composições e os snippets Dart reais.
- **68 prévias compiladas e registradas**, build `13099cb03e02cedd`. Bootstrap e índice do portal reconhecem os mesmos 68 identificadores.
- Corrigidas as listas finitas que omitiam as nove novas prévias; o pipeline agora compara o bootstrap compilado ao catálogo antes de escrever o manifesto.
- Controles de conteúdo do consumidor aparecem separados das propriedades públicas Dart. A documentação das APIs também permanece visível quando a prévia ainda está indisponível.
- Typecheck web/portal, tokens e documentação passaram. Build do portal passou com 297 rotas exportadas. As 10 verificações HTTP passaram, incluindo os arquivos Flutter/CanvasKit e a correspondência do hash servido ao manifesto.

Evidência: [pipeline Flutter](validation/flutter-preview.log), [relatório consolidado](FLUTTER-IMPLEMENTATION-REPORT.md). Aceite visual em navegador/dispositivos nativos permanece pendente; nenhuma SC foi elevada a DONE por contagem de exports ou de testes.

## Registro histórico da preparação

## Resume point

The Codex report already records **221 public Dart APIs**, analyzer-backed namespace resolution, **113 passing library tests** and previous successful Flutter Web builds. Do not recreate these components or reinterpret API coverage as SC acceptance. The recent `flutter-input-previews.log` showed an `option` bridge failure before regenerated input contracts at 00:23 UTC; no passing rerun is recorded here.

## SC Author → SC Implementer

Read existing component SCs for Breadcrumb, Pagination, TagGroup and PageHeader and updated the single multiplatform Showcase resource SC while retaining `PENDING`. Added real, stateful consumer demonstrations using their already-public Forge widgets. Each example preserves the established composition contract:

| Family | State/interaction | Exact public ownership |
| --- | --- | --- |
| Breadcrumb + Item | Ancestor activation reports the selected destination; current item remains passive | Link activation delegated to consumer |
| Pagination + Item | Page change requests update the consumer's controlled page; boundary/disabled requests do nothing | Owner owns the page, not the library |
| TagGroup + Item | Stable IDs and removals update caller list; restore is caller-owned | No internal tag selection or deletion state |
| PageHeader | Heading, description, identity, breadcrumb and action slots; divider control | Caller supplies widgets/actions and heading identity |

The version-2 preview bridge rejects unknown or badly typed fields. React controls map to supported public/part properties and copyable Dart snippets describe actual library consumption. The test generator produces **5 compilable Dart examples** (four canonical plus an escaped-character case) for real Flutter compilation. The manifest builder is wired to add these four slugs **only after** library/widget tests and the Flutter Web build succeed.

## Verification performed in this environment

| Check | Status | Evidence |
| --- | --- | --- |
| New editor schemas and snippet generation | PASS | `node scripts/test-flutter-composite-catalog.mjs` — four schemas and five copyable samples |
| TypeScript syntax transpilation | PASS (syntax only) | 3 changed/new TypeScript/TSX files parsed without diagnostics |
| Flutter analyzer | NOT_RUN | Dart/Flutter SDK not installed locally |
| Widget tests and copyable sample compilation | NOT_RUN | New Dart test files staged |
| Flutter Web build / manifest | NOT_RUN | Do not activate until successful build, registry unchanged |
| Browser + Android/iOS visual and semantic comparison | NOT_RUN | Requires device/browser verification |

## Next required execution on Codex checkout

```sh
node scripts/test-flutter-composite-catalog.mjs
cd app/showcase_flutter
flutter analyze
flutter test test/composite_preview_test.dart
flutter test test/generated_composite_snippets_test.dart
flutter test test/inputs_preview_test.dart
cd ../..
npm run build:flutter-preview
npm run typecheck
npm run verify:docs
```

If any test fails, fix the public behavior or fixture rather than marking the associated SC DONE. The input-preview option failure requires a real rerun following Codex's source regeneration. No changes were made to PraticarFront, consumers or any Git remote.

[Validação HTTP](validation/flutter-wave5-http.json): portal em `http://localhost:3000`, bootstrap com 68 identificadores e JS servido com build `13099cb03e02cedd`.
