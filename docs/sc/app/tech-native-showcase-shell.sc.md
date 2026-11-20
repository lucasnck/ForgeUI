---
title: 'TECH — ForgeUI Flutter Showcase sem MaterialApp e Roboto forçado'
type: tech
platforms: [flutter, flutter-web]
status: PENDING
owner: app/showcase_flutter
---

# TECH — Shell nativo de preview e tipografia de marca

## Fonte de verdade

- O Showcase deve renderizar os mesmos contratos e tokens da Web (`shared/tokens/primitives.json`), inclusive as quatro paletas Forge; não deve injetar tema/presets Material no conteúdo.
- `--font-family-brand` é `"DM Sans", "Segoe UI", Arial, sans-serif`. Transpor a ordem da família para `TextStyle`; não impor Roboto. A família DM Sans **ainda precisa de assets Flutter licenciados e testados** para ter paridade visual garantida em Web/Android/iOS. Não baixar fonte automaticamente nem afirmar que uma família não instalada será renderizada.
- A biblioteca Flutter e seus adapters Material legados são uma migração distinta. Este recorte muda apenas o **shell** e testes da prévia; `uses-material-design` continua temporariamente para exemplos/transições que ainda o exijam.

## Arquivos

- `app/showcase_flutter/lib/main.dart` (M)
- `app/showcase_flutter/pubspec.yaml` (M)
- `app/showcase_flutter/lib/legacy_material_bridge.dart` (C)
- `app/showcase_flutter/test/preview_test.dart` (M)
- `scripts/check-native-showcase-shell.mjs` (C)
- `scripts/test-native-showcase-shell.mjs` (C)
- `package.json` (M)
- `docs/migration/FORGEUI-NATIVE-SHOWCASE-SHELL-2026-11-19.md` (C)
- `PLAN.md`, `STATUS.md` (M)

## Contrato

1. Shell: `WidgetsApp` de `widgets.dart`, sem `MaterialApp` e sem `Scaffold`; `pageRouteBuilder` continua a fornecer Navigator/Overlay/Directionality.
   - Compatibilidade: componentes já existentes ainda usam `TextField`, `DropdownButton`, `showDatePicker`, `showTimePicker`, `AlertDialog` e `MaterialLocalizations`. Manter **adaptador isolado e temporário** `ForgePreviewLegacyMaterialBridge` que fornece `Theme` com tokens Forge, `Material` transparente e localizações ao Navigator. Não usar `MaterialApp` nesse adaptador; removê-lo quando componentes forem migrados.
2. Tema: `ForgeThemeScope(tokens: ForgeThemeTokens.fromId(theme))` engloba o Navigator; cenário e mudanças via bridge continuam no mesmo State; background, texto, iconografia e espaçamento vêm exclusivamente da paleta Forge.
3. Fonte: `DefaultTextStyle` de marca com família ordenada da origem (`DM Sans`, fallback Segoe UI, Arial e sans-serif); remover override `Roboto` e declarações de fontes Roboto do `pubspec.yaml`. Um script verifica o texto contra o token canônico para evitar drift.
4. Portabilidade: manter a prévia Web embutida e todos os cenários de 221 contratos; não introduzir uma implementação Material/Cupertino nova, dependência de rede, download de fontes ou alterações nos consumidores.
5. Critérios de release: smoke test de temas, propriedades e widgets em `flutter test`; `flutter analyze`; Flutter Web build; verificação visual dos quatro temas; buildId/manifesto atualizados somente após build aprovado.

## Verificações executáveis

- `npm run test:native-showcase-shell`: gates estáticos Node + mutações negativas, sem se confundir com compilação Dart.
- `cd app/showcase_flutter && flutter analyze && flutter test` e `npm run build:flutter-preview` no checkout completo.

## Critérios de aceite

- [ ] `main.dart` compila sem imports Material e mantém as prévias navegáveis/interativas (inclusive widgets legados atrás do bridge temporário).
- [ ] O `ThemeScope` publica corretamente as quatro paletas e React/Flutter usam o mesmo token tipográfico.
- [ ] Assets DM Sans versionados/licenciados e correspondência tipográfica Web × Flutter verificada.
- [ ] Testes completos Flutter e publicação de build renovado, com revisão de screenshot nos quatro temas.

**Status PENDING:** correção de fonte/shell preparada, mas Flutter SDK e assets da marca ainda não homologados.
