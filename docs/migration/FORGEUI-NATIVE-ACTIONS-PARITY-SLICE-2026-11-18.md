# ForgeUI — Native Action e contrato de paridade Web × Flutter (18/11/2026)

## Escopo executado

Seguindo `sc-author → sc-implementer`, foi criada `docs/sc/app/tech-flutter-native-action-recipe.sc.md`, além da TECH transversal `tech-web-flutter-parity-gates.sc.md`. A SC Flutter `Button.sc.md` foi complementada, mantendo `PENDING`.

O motor compartilhado de `ForgeButton`/`ForgeIconButton` foi migrado para `Focus`, `GestureDetector`, `MouseRegion`, `AnimatedContainer`, `Semantics` e `ForgeTooltip`, sem importar controles Material/Cupertino diretamente. A migração foi propositalmente limitada ao motor de ações, para preservar o `ForgeSelect` ainda dependente de `ButtonStyle`, `InputDecorator`, `DropdownButton` e `CheckboxListTile`.

## Arquivos publicados

- `app/library/lib/src/components/internal/forge_action.dart`: implementação nativa preservando a API e comportamento de Button/IconButton.
- `app/library/lib/src/theme/forge_action_palette.dart`: cores, tones e precedência comuns migrados de `forge_control_style` para helper somente `widgets.dart`.
- `app/library/lib/src/theme/forge_native_action_recipe.dart`: receita visual por tokens Web (altura, padding, fonte, peso, linha, tons, aparência, radius, borda, feedback e motion).
- `app/library/lib/src/theme/forge_control_style.dart`: reexporta os helpers nativos e mantém temporariamente a receita Material exclusiva do Select; **não** é independente de Material ainda.
- `app/library/test/forge_button_test.dart`: teste existente atualizado para `WidgetsApp + ForgeThemeScope`, retirando asserts de `FilledButton`/`OutlinedButton` e testando cores, shape, temas e interação.
- `app/library/test/forge_icon_button_native_test.dart`: testes novos para IconButton, quatro temas, cores, touch targets e disabled/loading.
- `scripts/check-native-actions.mjs` / `scripts/test-native-actions.mjs`: verificador de imports/comportamentos/tokens e quatro testes de mutação negativa.
- `package.json`: `test:native-actions` integrado ao `check:cross-platform` sem remover scripts anteriores.

## Regras de paridade preservadas

- O Web ForgeUI e os tokens canônicos continuam definindo `ForgeSize` (xs–xl), `ForgeTone`, `ForgeAppearance`, `ForgeVariant`, `ForgeShape`, `--component-height-*`, `--component-padding-*`, `--font-size-*`, `fontWeightSemibold`, `lineHeightNormal`, paletas dos quatro temas, cores de foco e duração de movimento.
- Ordem `appearance > variant > outlined` e estados loading, disabled, focus, hover, pressed. Tooltip e label semântica usam widgets proprietários, não padrões visuais Material.
- Adaptação mobile: hit target mínimo 48 dp ao redor da superfície com dimensão visual por token. Nenhuma conversão não documentada de fonte, escala, peso ou cor foi introduzida.
- Shell `SafeArea` e navegação mobile pertencem ao projeto consumidor; a biblioteca preserva composições e callbacks.

## Evidências reais

- **PASS**: `node --check scripts/check-native-actions.mjs` e `node --check scripts/test-native-actions.mjs`.
- **PASS**: `npm run test:native-actions` executado em estrutura isolada com fontes reais extraídas do Drive; fronteira sem Material/Cupertino no novo motor, quatro regressões negativas rejeitadas (import Material, InkWell, tecla Enter removida e token de peso trocado), restauração aprovada.
- **NÃO EXECUTADO**: `dart format`, `flutter analyze`, `flutter test`, compilação das 221 prévias com este código, builds Android/iOS, inspeção visual, acessibilidade e auditoria global no checkout completo. Flutter SDK indisponível nesta execução.
- O último build das 221 prévias e testes Flutter é de um checkpoint anterior; **não** prova o código deste lote.

## Limitações e próximo lote

O `ForgeThemeTokens` ainda herda de `ThemeExtension`, `ForgeThemeData` ainda constrói `ThemeData` e `forge_control_style.dart` mantém `ButtonStyle` enquanto `ForgeSelect` depende dele. `ForgeModal` e outros componentes continuam usando Material, e `phone_numbers_parser` ainda consta como dependência externa. A independência global continua **PENDING**.

Próxima SC-first: remover o fallback Material do tema central com adaptador opcional compatível, migrar Select/Modal/inputs, revisar font family/escala e concluir auditoria estrita. Antes de novas marcações `DONE`, executar `dart format`, `flutter analyze`, `flutter test`, `npm run check:cross-platform` e comparar visualmente Web × Flutter em todos os temas, tamanhos e estados. Nenhum commit/push nem alteração no PraticarFront/PraticarApp/consumidores foi feita.

## Lacuna detectada ao comparar os tokens fonte

`shared/tokens/primitives.json` define `--font-family-brand` como `"DM Sans", "Segoe UI", Arial, sans-serif` e aliases para as famílias; entretanto `forge_tokens.g.dart` transporta apenas mapas de cores e números, **sem a família de fonte**. `shared/tokens/schema.json` também marca `rootFontSizeVerified:false` para o root 16px que o Dart pressupõe ao converter rem→dp. Assim, embora tamanho/peso/cores/padding das ações sigam o token Flutter já gerado, a identidade tipográfica e a paridade de rem **ainda não estão homologadas**. Exigir TECH de transporte de fontes/licenças/assets e teste visual antes do aceite definitivo.
