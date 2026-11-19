---
title: "ForgeUI — paridade de Design System Web e Flutter Mobile"
type: "tech"
platforms: [web, flutter]
status: "PENDING"
owner: "shared/tokens + docs/sc/app/ds/components"
---

# TECH — Contrato de paridade visual e de capacidades Web → Flutter

## Fonte de verdade

A biblioteca Web existente e os tokens canônicos (`shared/tokens`) definem o Design System. O Flutter consome os mesmos tokens gerados e **implementa um renderer mobile próprio**, nunca um segundo Design System com padrões Material/Cupertino. Não introduzir constantes substitutas para cores, tamanho, peso, raios, elevação ou movimento sem SC e revisão explícita. Onde a Web usa CSS/DOM, transportar o comportamento observável para Widgets/Semantics/Focus e APIs nativas.

## Requisitos por componente

1. **API e tipos**: preservar todas as propriedades semânticas, defaults, enums, valores aceitos, aliases, precedências e comportamentos controlados/não controlados da SC Web; mapear eventos DOM para callbacks Dart tipados documentados, sem aceitar parâmetros artificiais apenas para parecer compatível.
2. **Escalas**: manter `ForgeSize`, espaço, paddings, espessuras e raios conforme nomes e valores gerados (`--component-*`, `--space-*`, `--radius-*`). A área interativa de pelo menos 48 dp é uma camada externa à superfície visual quando a dimensão Web for menor.
3. **Tipografia**: usar font-family configurada pelo token/tema, `font-size`, `line-height`, `font-weight`, letter spacing e semântica (Heading/Label/Text) da Web. Adaptar a fonte escalada do SO sem alterar os valores base do DS.
4. **Cores e estados**: quatro temas (`light`, `dark`, `contrast`, `liquidGlass`), `tone`, `appearance`, `variant`, `shape`, `disabled`, `loading`, `invalid`, focus, hover, pressed, selected, contraste e feedback visual calculados pelos tokens existentes.
5. **Composição**: preservar owners/parts, variantes, preenchimento, ícones, pesos, feedback, sombra, bordas, clipping e motion. Respeitar `MediaQuery.disableAnimations` e RTL com `EdgeInsetsDirectional`, sem assumir Layout LTR.
6. **Mobile**: suporte a toque, teclado físico, foco, navegação de teclado, leitores de tela e escala de texto; `SafeArea` e navegação são responsabilidades do shell consumidor, não justificativa para alterar o DS globalmente.
7. **Independência**: a camada UI da biblioteca não pode usar controles Material/Cupertino nem dependências externas de apresentação. `widgets.dart`, `rendering.dart`, `painting.dart`, `gestures.dart`, `services.dart` são SDK Flutter permitido; transição de adapters legados deve ser rastreada.

## Evidências obrigatórias por SC

- Captura dos mesmos estados/variantes/tamanhos nos quatro temas Web × Flutter, com divergências justificadas no contrato mobile.
- Snapshot verificável dos tokens gerados e auditoria de divergências das propriedades/valores (inclusive defaults) antes de `DONE`.
- `dart format`, `flutter analyze`, `flutter test` e `npm run check:cross-platform`; teste de disabled/keyboard/a11y/RTL/textScaler e telas Android+iOS.
- `npm run audit:independence:strict` é gate final (também cobre Web; documentar separadamente o status Flutter).
- Todo item só muda para `DONE` após compilação, testes e paridade. Registro no catálogo, existência do source ou preview antigo não são aceite.

## Fases de migração

1. Primitivas e receitas compartilhadas (tokens, texto, ações, input/foco/semântica).
2. Compostos (Button/IconButton, Select, Modal, Menu, Popover, Form, Grid, tabelas e templates) por dependência e SC.
3. Adaptadores legados de tema e pacotes terceiros; remover `uses-material-design` apenas após auditoria dos assets.
4. Auditoria global estrita, testes visual/mobile e atualização dos consumidores por versão fixada.

**Status desta TECH: PENDING**. Este contrato vale para os 221 componentes, sem supor que todos foram revalidados em 18/11/2026.

## Lacunas específicas da fonte de tokens (verificação de 18/11/2026)

- `shared/tokens/primitives.json` define `--font-family-brand` com `"DM Sans", "Segoe UI", Arial, sans-serif` e os aliases sans/display/mono, mas o gerador Flutter atual (`app/library/lib/src/generated/forge_tokens.g.dart`) expõe apenas cores e números; **não há export Dart de famílias tipográficas**. A biblioteca Flutter ainda não pode afirmar paridade de font-family. Criar SC para transportar nomes, fontes/licenças/assets e aplicar ao texto do DS antes de marcar esta linha de aceite.
- `shared/tokens/schema.json` declara `rootFontSizePx:16` e `rootFontSizeVerified:false`; o próprio `forge_tokens.g.dart` registra a conversão CSS rem→dp assumindo root de 16px. Validar a escala do navegador e a adaptação a `MediaQuery.textScaler` antes da homologação pixel/escala.
- A receita de ação migrada mantém exatamente os **tokens numéricos e de cor existentes**; não representa ainda homologação de família de fonte e tipografia completa. Não substituir a ausência desses dados por `Roboto` ou fontes padrão Material.
