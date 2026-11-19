---
title: "Flutter ForgeAction — receita visual nativa com paridade Web"
type: "tech"
platform: "flutter"
status: "PENDING"
owner: "app/library/lib/src/components/internal/forge_action.dart"
related_components: [Button, IconButton, ButtonGroup]
---

# TECH — ForgeAction nativo e paridade de design Web → Flutter

## Fonte de verdade e escopo

A fonte de verdade visual continua sendo o Design System Web do ForgeUI, seus tokens canônicos gerados e as SCs de Button/IconButton/typography. Flutter não deve reinterpretar aparência com `FilledButton`, `OutlinedButton`, `ThemeData` ou controles Cupertino. Esta etapa troca **apenas** o motor visual compartilhado de Button/IconButton, preservando a API pública e a família de tokens. `ForgeSelect`, que ainda usa a antiga receita Material, será migrado por SC própria. Não remover/alterar suas dependências como efeito colateral.

## Arquivos

- `app/library/lib/src/theme/forge_action_palette.dart` (C) — resolução de aparência/tom desacoplada do Material.
- `app/library/lib/src/theme/forge_native_action_recipe.dart` (C) — receita de aparência nativa em widgets.dart.
- `app/library/lib/src/theme/forge_control_style.dart` (M) — passa a reexportar a paleta/precedência comum; conserva temporariamente a receita Material exigida por ForgeSelect.
- `app/library/lib/src/components/internal/forge_action.dart` (M) — composição com `Focus`, `GestureDetector`, `MouseRegion`, `AnimatedContainer`, `Semantics` e ForgeTooltip.
- `app/library/test/forge_button_test.dart` (M) — verifica tokens, comportamento e propriedade sem exigir MaterialApp.
- `scripts/check-native-actions.mjs`, `scripts/test-native-actions.mjs` (C); `package.json` (M).

## Paridade visual e comportamental (Web é contrato)

- `size` [xs, sm, md, lg, xl]: mesma altura visual `--component-height-*`, `--component-padding-inline-*`, `--component-padding-block-*`, `--font-size-*`, `lineHeightNormal` e `fontWeightSemibold`. Suportar escalonamento de texto de sistema sem mudar a escala base.
- `tone`: resolver cores por `--color-action-${tone}-background`, foreground e tons semânticos existentes, nunca por defaults Material ou cores arbitrárias.
- `appearance`: solid/soft/ghost/outlined/bordered/none preservam mapeamento de fundo, borda e foreground; `appearance` explícita tem precedência sobre `variant`, que precede `outlined` legado.
- `shape`: mesma escala canônica `square`, `rounded`, `pill`, respeitando shape herdado do ForgeThemeScope/ForgeThemeTokens.
- Estados: disabled, loading, hover, press, focus, reduced motion, tooltip, loadingLabel, semanticLabel, autofocus, focusNode e onFocusChange. Um toque ou Enter/Espaço equivale a um callback. Nenhum callback ao atualizar estado desabilitado/carregando.
- `fullWidth` utiliza a largura disponível apenas se bounded, senão mantém conteúdo finito. `square` preserva a dimensão pintada por token.
- Mobile: alvo interativo **mínimo de 48 dp** envolve a área pintada com tamanho/cores canônicos; não alterar visual `size` para corresponder ao target nativo.
- `ForgeButton` e `ForgeIconButton` continuam a consumir o mesmo motor, sem exigência de `MaterialApp`. Evitar labels semânticos duplicados.

## Testes e critérios

- [ ] Inspecionar SC Web e tokens gerados antes de alterar implementação.
- [ ] Manter API pública, tons e precedência, com verificação de regressão do contrato.
- [ ] Remover imports/material widgets diretos de ForgeAction e da receita nativa (sem modificar ForgeSelect).
- [ ] `npm run test:native-actions` com casos positivos e mutações negativas.
- [ ] `dart format`, `flutter analyze`, `flutter test` e teste de integração com ambos Button/IconButton.
- [ ] Comparar estados visualmente com Web nos 4 temas, tamanho xs–xl, densidade e fonte escalada; validar leitores de tela, foco, teclado e interação Android/iOS.
- [ ] Preservar SCs PENDING até testes nativos e evidência de paridade visual. Não afirmar independência global.
