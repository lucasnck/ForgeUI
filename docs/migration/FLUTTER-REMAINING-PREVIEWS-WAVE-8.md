# Camadas transitórias, organismos e partes — etapa 8

## Implementação

- 25 entradas de Modal, Dialog, AlertDialog, ConfirmationModal, Popover, Tooltip, OverlayPortal e ToastRegion, incluindo partes.
- 30 entradas de DataGrid, TreeGrid, templates de aplicação/página, PageTransition, SharedElement, MapView e ODataFilter.
- 19 partes canônicas de Card, Alert, EmptyState, ErrorState, LoadingState, Breadcrumb, Pagination e TagGroup.

Os exemplos usam componentes públicos. Tabelas são roláveis, a ordenação pertence ao consumidor, hierarquias usam expansão e teclado nativos. Templates preservam conteúdo; SharedElement usa o Navigator do consumidor. O mapa usa explicitamente o renderizador esquemático, sem localização ou navegação real. OData preserva decimais exatos e serializa a expressão controlada. Partes são apresentadas no proprietário correto; as entradas não representam implementações independentes adicionais.

## Correções na biblioteca

Presença/animação mantém a pintura de saída, retirando interação, foco e semântica ao fechar; aceita interrupções, opt-out e redução de movimento. A curva padrão é gerada do CSS canônico, sem alterar os 185 tokens portáveis. Modal restaura foco antes do término da animação e calcula cliques externos nos limites transformados da superfície. onClose pode atualizar o consumidor sem setState durante a construção.

PopupListbox e Toast têm animação de entrada. A remoção de seus itens continua imediata; animação de saída retida desses itens não foi implementada nesta etapa.

## Validação

Pipeline integral aprovado: **125 testes da biblioteca, 1.174 do showcase, análise Dart e compilação Flutter Web**. **221 prévias registradas**, build `0d5f6c48442ac45e`. [Log integral](validation/flutter-wave8-build.log). O manifesto foi publicado somente após aprovação de todas essas etapas.

Testes focados: 114 de camadas transitórias + 26 snippets; 126 de organismos/templates + 31 snippets; partes com 20 snippets e testes de contexto. Incluem quatro temas, composição com largura 320, recusa de mudanças controladas, cancelamento, retenção de valores, fila de notificações, ordenação, teclado, navegação e decimal exato. A largura da composição não equivale a aceite em aparelho.

A validação automatizada não substitui comparação visual Web/app, testes Android/iOS nem auditoria assistiva. As SCs permanecem PENDING nos critérios não demonstrados. [Relatório consolidado](FLUTTER-IMPLEMENTATION-REPORT.md).

## Portal e serviço local

Build do portal aprovado com 297 rotas. Typecheck Web/portal, tokens e documentação aprovados. [17 verificações HTTP](validation/flutter-wave8-http.json) passaram, incluindo artefatos Flutter/CanvasKit e integridade SHA-256 do JavaScript servido. `forge.cmd start` deixou o portal disponível em http://localhost:3000.

O primeiro lote simultâneo durante a compilação de desenvolvimento apresentou erros transitórios de parse JSON em TreeGrid e ODataFilter. Ambas as rotas responderam 200 na repetição individual e o lote completo posterior passou. Não foi identificado erro de JSON nos arquivos-fonte; a causa interna do servidor não foi determinada.
