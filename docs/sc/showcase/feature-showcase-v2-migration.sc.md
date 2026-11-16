---
title: "Forge UI — Showcase V2 source-preserving migration"
status: "PARTIAL"
type: "feature"
---

# Showcase V2 (migração preservando a origem)

## Contrato

O Showcase V2 do `PraticarFront/src/features/showcase-v2` é a implementação de referência para shell, navegação, catálogos, exemplos, documentação e exibição de estados. A home Forge UI adapta marca e rotas, não recria o shell visual. Todos os componentes renderizados pertencem à biblioteca pública `@forge-ui/web`.

## Files

- `web/library/src/design-system/components/templates/ShowcasePageTemplate/*` (migrado; código original)
- `web/library/src/design-system/components/{atoms,molecules}/*` (fatia migrada)
- `showcase/portal/src/features/showcase-v2/components/ShowcaseV2Page/*` (migrado/adaptado)
- `showcase/portal/src/features/showcase-v2/components/ShowcaseV2Navigation/*` (migrado/adaptado)
- `showcase/portal/src/features/showcase-v2/components/{ExampleScope,ExampleCode,ExamplePreview,PropertyGrid,TechnicalGrid,ShowcaseV2Renderer,ShowcaseV2Template}/*` (motor V2 migrado com adaptações controladas)
- `showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveDefinitionPage.tsx` (integra as 13 demos existentes ao store e renderer V2)
- `showcase/portal/src/features/showcase-v2/model/*` (índices originais; loader completo pendente)
- `showcase/portal/src/app/(catalog)/*` (rotas)

## Acceptance

- [x] Home do Forge UI usa `ShowcasePageTemplate` da biblioteca, preservando estrutura da origem.
- [x] Navegação e visão geral seguem arquivos originais do Showcase V2 (com marca e rotas adaptadas).
- [x] Registro estático original contém 221 componentes e 33 recursos, com páginas pendentes explícitas.
- [x] Pelo menos 13 demos do portal importam a API pública da biblioteca, não clones HTML/CSS.
- [x] Seletores de preferências são componentes do próprio DS.
- [x] Store, edição de propriedades, tabela contratual, reset e snippets de código conectados ao renderer V2 para as 13 demos atuais; validação estrutural e teste isolado do store.
- [ ] Composição integral da origem (`DataGrid`, `useCollapse`, `ScenarioControls`, `ExampleBoundary`), fixtures e todos os cenários nomeados ainda pendentes.
- [ ] Propriedades, eventos, métodos e snippets de cada uma das 221 páginas devem ser trazidos de seus contratos SC originais; os 13 exemplos têm metadados reduzidos e explícitos.
- [ ] Todas as páginas de componentes/recursos originais usam renderizador original adaptado e funcionam.
- [ ] Paridade de temas, tipografia, logo oficial e locale comprovada no navegador.
- [ ] TypeScript/build/testes/browser aceitos em Windows/Linux.

## Regras

Manter o PraticarFront intocado. Não considerar registro de um slug como uma demo migrada. Nunca usar `ShowcaseClient` simplificado como home. Executar SC Author para especificar alterações e SC Implementer somente após aprovação. Os scripts de bootstrap devem manter instalação automática; não reverter o patch de PowerShell do usuário.

## Marco 5 — DataGrid / controles de cenários / disclosure

- [x] DataGrid/parts e Icon extraídos do DS original, com CSS Modules, hooks, contexto, validação de partes e exports públicos.
- [x] `PropertyGrid` e `TechnicalGrid` substituem as tabelas locais pelo `DataGrid` do Forge UI.
- [x] `ExampleState`, `ScenarioControls`, `ExampleControls` e `ExampleBoundary` portados, com adaptação do fallback de Alert enquanto o Alert público não é migrado.
- [x] Hook `useCollapse` do DS original com contrato standalone; usado pelo preview.
- [x] Loader dinâmico somente para demos disponíveis, sem afirmar que o loader completo foi migrado.
- [x] Demos Icon, Card e DataGrid; DataGrid inclui dois cenários distintos.
- [ ] Validar typecheck, build Next e fluxo de foco/erros/ordenacao em navegador real.
- [ ] Transportar as definições SC e fixtures originais para todas as 221 páginas, incluindo a camada de loaders completa.

## Marco 6 — extração incremental conforme SCs originais

- [x] Inventário auditável do catálogo 221/33 com export, demo, SC e caminho de biblioteca (`docs/migration/COVERAGE.md`).
- [x] Alert, AlertHeader, AlertBody, AlertFooter, Avatar, Skeleton, IconButton e Tag extraídos com os arquivos e contratos de origem.
- [x] Definições, exemplos, hooks e snippets originais V2 de Avatar, Skeleton, IconButton, Tag e Alert adaptados para `@forge-ui/web` e o provider local.
- [x] Boundary de erro utiliza o Alert público; fixture SVG do Avatar é substituto documentado, não asset de origem.
- [ ] Substituir os 16 adaptadores anteriores pelas definições originais e transportar as demais 200 páginas de componentes sem demo, além dos 33 recursos.
- [ ] Testes de tipos/build/browser, acessibilidade, responsividade e paridade com a origem.

## Marco 7 — inclusão de sete páginas V2 originais e SCs canônicas

- [x] As cinco definições do marco 6 continuam no mesmo renderer; adicionar Select, Option, Container, Stack, Inline, Link e Surface por definição + exemplo + hook + snippet originais adaptados.
- [x] `OriginalDefinitionPage` e loader dinâmico lidam com as 12 definições sem passar `ComponentType` por props serializadas do Next Server Component.
- [x] SCs originais de 59 páginas de componente disponíveis no caminho `docs/sc/ds/components/...`; 29 SCs únicas de recurso, 47 SCs de tipos/helpers e documentos técnicos de apoio com manifestos SHA-256.
- [x] Uma única matriz de cobertura gerada, sem confundir 43 exports com 221 entradas e 28 demos com aceitação visual.
- [ ] Revisar as 12 definições e snippets em navegador real; nenhum build/typecheck foi aprovado nesta etapa.
- [ ] Concluir 193 páginas sem demo e 162 SCs ausentes, sem alterar o estado histórico das SCs originais.
