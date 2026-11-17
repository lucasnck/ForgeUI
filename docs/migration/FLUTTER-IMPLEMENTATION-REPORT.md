# Implementação Flutter por grupos

## Validação no checkout com SDK — 17/11/2026

- Flutter 3.38.7 / Dart 3.10.7 disponíveis; análise da biblioteca e do showcase sem problemas.
- **113 testes da biblioteca e 353 testes do showcase passaram**, incluindo a repetição do contrato de Option, as novas composições e os snippets Dart reais.
- **68 prévias compiladas e registradas**, build `13099cb03e02cedd`. Bootstrap e índice do portal reconhecem os mesmos 68 identificadores.
- Corrigidas as listas finitas que omitiam as nove novas prévias; o pipeline agora compara o bootstrap compilado ao catálogo antes de escrever o manifesto.
- Controles de conteúdo do consumidor aparecem separados das propriedades públicas Dart. A documentação das APIs também permanece visível quando a prévia ainda está indisponível.
- Typecheck web/portal, tokens e documentação passaram. Build do portal passou com 297 rotas exportadas. As 10 verificações HTTP passaram, incluindo os arquivos Flutter/CanvasKit e a correspondência do hash servido ao manifesto.

Evidência: [pipeline Flutter](validation/flutter-preview.log), [relatório consolidado](FLUTTER-IMPLEMENTATION-REPORT.md). Aceite visual em navegador/dispositivos nativos permanece pendente; nenhuma SC foi elevada a DONE por contagem de exports ou de testes.


Objetivo: implementar as 221 especificações atuais do catálogo Web com adaptações nativas, mantendo capacidades, propriedade de estado e independência de infraestrutura.

## Continuação do Showcase — feedback e estados (16/11/2026)

Adicionadas cinco prévias Flutter **PENDING** (Card, Alert, EmptyState, ErrorState, LoadingState) sobre componentes públicos já existentes. O editor v2 conhece as propriedades reais e a composição de partes canônicas. As ações dos footers pertencem ao consumidor; Loader preserva rótulo localizado e Spinner decorativo. Foram gerados seis exemplos Dart copiáveis.

A etapa também corrige `ForgePagination`: alvos de página duplicados são rejeitados e o exemplo não cria mais ações Anterior/Próxima com alvos já representados.

**Evidência histórica da preparação:** geração Node 5 schemas/6 snippets e transpile TS passaram. Flutter analyze/test/build **não foram executados** (SDK ausente), e as cinco prévias não estavam no manifesto na preparação. Falha histórica de `Option` precisa de repetição real. Nenhuma SC foi elevada a DONE; as 221 APIs são inventário de exportação, não aceite visual ou funcional pleno. Veja [Wave 5](FLUTTER-FEEDBACK-PREVIEWS-WAVE-5.md).

## Continuação do Showcase — composições nativas (16/11/2026)

A biblioteca Flutter e o inventário anterior permanecem preservados. Acrescentado código de preview **PENDING** para Breadcrumb, Pagination, TagGroup e PageHeader (incluindo filhos canônicos), com configurações reais de propriedades, callbacks sob controle do consumidor, validação no bridge v2, testes de widgets e cinco exemplos Dart gerados a partir dos snippets de cópia do Showcase.

**Evidência nesta execução:** geração `node scripts/test-flutter-composite-catalog.mjs` passou para 4 contratos/5 snippets; parser/transpilação TypeScript e readback SHA-256 no Drive passaram. **Pendentes na preparação histórica:** Flutter analyze/test/build deste novo lote, typecheck completo do portal, inspeção browser/dispositivo. As validações automatizadas foram concluídas no registro de 17/11 acima. O `flutter-preview-manifest.json` não foi alterado; as quatro novas prévias serão expostas somente após build real. Nenhuma SC foi marcada DONE por esse incremento.

O log posterior `flutter-input-previews.log` registrou uma falha de contrato para `option`; os arquivos de input foram regenerados depois desse log, mas **não havia uma repetição aprovada registrada na preparação** na evidência aqui inspecionada. O pipeline de 17/11 reexecutou e aprovou também `flutter test test/inputs_preview_test.dart`.

Documentação: [etapa de composições](FLUTTER-COMPOSITIONS-PREVIEW-WAVE-4.md) e [acompanhamento de implementação](FLUTTER-IMPLEMENTATION-PROGRESS.json).

## Plano de execução

1. Base compartilhada: tokens, temas, contratos, helpers puros, foco e formulários.
2. Átomos independentes: tipografia, ícones, layout, feedback e controles individuais.
3. Campos especializados: máscaras, sugestões, moeda, telefone e seletores nativos.
4. Composições: partes canônicas, formulário, grupos de escolha, abas, toolbar e expansão.
5. Coleções e navegação: listas selecionáveis, menus, árvores, stepper e grades.
6. Camadas transitórias: popup, popover, tooltip, modal, diálogo e notificações.
7. Organismos e templates: filtros OData, mapa com adaptador explícito, transições, campos registrados e layouts.
8. Showcase: exemplos equivalentes, propriedades reais, snippets Dart e registro somente após compilação.
9. Aceite: análise Dart, testes comportamentais e comparação com Web; build Flutter Web; tokens, TypeScript e build do portal.

## Evidências verificadas nesta execução

A biblioteca agora exporta APIs Dart para os 221 componentes atuais, confirmadas por resolução do namespace público com o analyzer. Esse total inclui partes canônicas e aliases; não significa 221 previews compilados nem 221 SCs aceitas. O showcase apresenta a tabela de propriedades de cada construtor real, sem copiar propriedades React inexistentes.

| Grupo | Verificação | Resultado |
| --- | --- | --- |
| Primitivos | `flutter test test/primitives_test.dart` | 6 testes passaram |
| Campos | `flutter test test/inputs_test.dart` | 10 testes passaram |
| Moeda | `flutter test test/money_test.dart` | 3.888 casos comparados com o helper Web passaram |
| Composições e formulário | `flutter test test/compositions_test.dart` | 8 testes passaram |
| Navegação e expansão | `flutter test test/navigation_test.dart` | 8 testes passaram |
| Biblioteca completa | `flutter test` | 113 testes passaram, incluindo regressões IME e falhas iniciais do renderer do mapa |
| Contratos públicos | `npm run catalog:flutter-api` | 221 APIs e 53 enums resolvidos pelo analyzer |
| Telefone | Comparação com helper Web | 1.225 casos passaram |
| OData | Comparação com helper Web | 1.149 casos passaram |
| Showcase | Testes de previews e snippets reais | 353 testes passaram no pipeline completo |
| TypeScript | `npm run typecheck` | Web e portal passaram |
| Documentação | `npm run verify:docs` | Passou; repetição após adicionar referências de API em andamento |
| Análise estática | `flutter analyze` | Passou no último conjunto analisado; será repetida no fechamento |
| Tokens | Geração CSS + Dart | 185 tokens portáveis nos 4 temas; CSS Web preservado |

## Comportamentos cobertos

- Valores controlados podem ser recusados pelo consumidor; não há callbacks duplicados na reconciliação.
- Formulários validam, coletam valores repetidos, incluem submitter e respeitam cancelamento de submit/reset.
- Foco e controllers fornecidos pelo consumidor não são descartados pela biblioteca.
- Seletores de arquivo diferenciam cancelamento de seleção vazia e delegam filtros/capture a adaptador injetado.
- Valores monetários usam strings decimais exatas, sem conversão de quantias para double.
- Abas preservam estado dos painéis; foco sai do painel ocultado e retorna ao controle correto.
- Toolbar segue direção e orientação, ignora controles desabilitados e repara foco após remoção.
- Collapse/Accordion preservam conteúdo montado; desativação de animação evita controlador de duração zero.
- Partes Header/Body/Footer exigem o contexto correto e rejeitam duplicatas.

## Limites e próximos passos

O inventário de classes presentes é apenas uma evidência de código, não uma declaração de aceite das 221 SCs. Ainda faltam critérios de paridade e a integração completa dos exemplos interativos no showcase. As tabelas de propriedades dos 221 componentes já usam as assinaturas Dart reais. As SCs permanecem PENDING enquanto esses critérios estiverem em aberto. O manifesto compilado do showcase é atualizado somente após o build real. O grupo de 20 primitivas tem fixtures nativas e controles tipados; o manifesto atual registra 68 prévias compiladas.

A comparação visual em navegador e dispositivos nativos das novas implementações ainda não foi realizada. Não houve publicação, commit/push nem alteração do PraticarFront.

Inventário detalhado: [FLUTTER-IMPLEMENTATION-PROGRESS.json](FLUTTER-IMPLEMENTATION-PROGRESS.json).

## Arquivos de validação

- [Pipeline Flutter completo](validation/flutter-preview.log): análise, testes da biblioteca, testes do showcase e build Web.
- [TypeScript](validation/multiplatform-typecheck.log) e [build do portal](validation/multiplatform-build.log).
- [Documentação e links](validation/flutter-docs-check.log).
- [API Dart resolvida](../sc/app/reference/native-component-api.json) e [cobertura pública](FLUTTER-SOURCE-COVERAGE.md).

A geração de snippets é verificada por `npm run test:flutter-catalog`; o pipeline Flutter compila e executa esses próprios snippets em testes de widgets. Campos não representáveis por controles JSON (widgets, callbacks, controllers e modelos tipados) permanecem documentados e não ganham controles fictícios.

[Validação HTTP](validation/flutter-wave5-http.json): portal em `http://localhost:3000`, bootstrap com 68 identificadores e JS servido com build `13099cb03e02cedd`.
