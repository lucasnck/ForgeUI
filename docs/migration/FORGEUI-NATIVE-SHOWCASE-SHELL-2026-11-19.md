# ForgeUI — Showcase Flutter: shell independente de MaterialApp e Roboto

Data: 19/11/2026  |  Local: `AiWorkspace/ForgeUI`

## Problema confirmado

`app/showcase_flutter/lib/main.dart` utilizava `MaterialApp`, `Scaffold` e a expressão `theme.textTheme.apply(fontFamily: 'Roboto')`, que ocultava a identidade tipográfica da Web. O `pubspec.yaml` do showcase ainda registrava três fontes Roboto (`regular`, `medium`, `bold`). O build publicado em `showcase/portal/public/flutter/` e o manifesto das prévias permanecem de 17/11/2026; alterar fonte Dart no Drive não recompila `main.dart.js`.

## Alterações desta etapa

1. `main.dart`: usa `WidgetsApp` de `widgets.dart`, com `pageRouteBuilder` para manter Navigator/Overlay, e `ForgeThemeScope` envolvendo o Navigator; usa `DefaultTextStyle`, `IconTheme`, `ColoredBox` e os valores da paleta Forge. Os switches de componente, estado e bridge de mensagens permanecem inalterados. Não usa mais import Material, `MaterialApp`, `Scaffold` ou imposição Roboto.
2. `legacy_material_bridge.dart`: adaptador temporário e separado que injeta `Theme` dos tokens Forge, `Material` transparente e `DefaultMaterialLocalizations` para `TextField`, `Select`, `ColorInput` e pickers antigos. Isso **não** é independência global do Material; evita quebrar demos antes da migração dos controles.
3. `pubspec.yaml`: remove a inclusão explícita de fontes Roboto. Os arquivos antigos continuam no Drive como fontes históricas, mas não são registrados/empacotados pelo pubspec deste showcase. `uses-material-design: true` permanece temporariamente: outros exemplos/partes da biblioteca ainda importam Material; este recorte **não** certifica independência global da biblioteca.
4. Fontes: a ordem declarada no shell corresponde a `--font-family-brand` da Web (`DM Sans`, `Segoe UI`, `Arial`, `sans-serif`). **Não há DM Sans em `app/showcase_flutter/assets/fonts`**; declarar uma família sem arquivo e sem instalação no SO NÃO garante sua renderização. A homologação de glifos, métricas e pesos Web/Android/iOS segue pendente e não foi feito download de fonte de terceiros.
5. Testes: `app/showcase_flutter/test/preview_test.dart` valida `WidgetsApp`, ausência de `MaterialApp`/`Scaffold`, tipografia declarada, precedência de paleta e troca entre light/dark/contrast/liquid-glass. A expectativa obsoleta de `OutlinedButton` foi substituída por `ForgeButton` real.
6. `scripts/check-native-showcase-shell.mjs` compara as famílias declaradas no Dart com o token de `shared/tokens/primitives.json`, audita a árvore estática e rejeita dependências de shell Material. `scripts/test-native-showcase-shell.mjs` executa seis mutações negativas. O gate foi adicionado ao `check:cross-platform`.

## Validação

- PASS: `node scripts/check-native-showcase-shell.mjs --root <staging>`.
- PASS: `node scripts/test-native-showcase-shell.mjs` (fonte limpa + 6 mutações negativas rejeitadas).
- NÃO EXECUTADO: `dart format`, `flutter analyze`, `flutter test` e `flutter build web`. Flutter/Dart SDK ausente nesta execução.
- NÃO ALTERADO: `showcase/portal/public/flutter/main.dart.js`, `flutter-preview-manifest.json`, Git, PraticarFront/PraticarApp e consumidores.

## Próximos gates

```bash
npm run test:native-showcase-shell
cd app/showcase_flutter
flutter pub get
flutter analyze
flutter test
cd ../..
npm run build:flutter-preview
```

Após o build aprovado, sincronizar os arquivos de `showcase/portal/public/flutter/` e o manifesto de prévias com a versão publicada do Showcase. Validar os quatro temas em navegador e mobile e instalar/registrar a família DM Sans sob licença adequada para paridade tipográfica efetiva. As SCs permanecem `PENDING` até essas evidências.
