# Forge UI — status da migração Showcase V2

## Marco 10 — extração em lote executada localmente

Este quadro substitui as contagens e os bloqueios dos marcos anteriores; eles permanecem abaixo como histórico.

- Checkout completo disponível em `PraticarWorkspace/PraticarFront`; as três árvores foram inventariadas: **2550 arquivos**. Foram adicionados **1787 arquivos** e preservados inicialmente **68 destinos adaptados**, antes da reconciliação auditada.
- **221/221 componentes** com implementação e export público, **221 definições originais conectadas** nas rotas de componentes/templates; nenhum adaptador simplificado está no fluxo ativo. As **33 páginas de recursos** usam o carregador original. Isso não equivale a teste interativo de cada componente.
- Todas as **221 SCs de componentes** e referências dos 33 recursos estão presentes. Catálogo Forge separado das funcionalidades de negócio; caminhos antigos redirecionam às SCs canônicas. Auditoria: **zero links internos pendentes**.
- Dependências genéricas de preferências, temas, formatação e formulários passaram à biblioteca. Exportação por `@forge-ui/web` e subpaths de i18n/tema/forms. Nenhum alias de aplicação pendente; a biblioteca tem typecheck independente de Next.
- O controle de propriedades completo e as rotas de demonstração dos templates foram migrados; CSS global voltou a incluir bloqueio de scroll e redução de movimento.
- **PASS:** testes da migração (preservação de conflitos, hashes e rejeição de árvores sobrepostas), store de exemplos, verificações estruturais/V2/documentais, auditoria de origem, tipos da biblioteca e portal e build estático, via `npm run check`.
- Hashes de **2594 arquivos de origem** conferidos, sem alterações. PraticarFront, `forge.ps1`, consumidores e Git remoto não foram alterados por esta execução.
- Portal atualizado para **Next.js 16.4.6**, após alerta concreto no 16.4.0. A auditoria também identificou um alerta alto no Zod 3; a correção indicada exige Zod 4 e não foi aplicada por alterar o contrato dos formulários. Requer uma migração própria, com critérios e testes.
- **PENDENTE:** interação e paridade visual/responsiva, acessibilidade em navegador e logo aprovado. O navegador local não está acessível pelas ferramentas desta conversa; build/SSR/HTTP não substituem essa validação.
- Flutter e integração dos consumidores por submódulo continuam etapas futuras. ZIP e evidências preparados **localmente**; nenhuma atualização do Drive ou publicação remota é alegada nesta execução.

Evidências: [cobertura](COVERAGE.md), [auditoria de fontes](bulk-migration-audit.json), [reconciliações](bulk-reconciliation-report.json), [contrato](SC-BULK-MIGRATION.md) e [validação](VALIDATION.md).

---

## Histórico anterior à extração local



Atualizado em 2026-11-15. **MIGRAÇÃO PARCIAL: shell, registro e motor básico das páginas portados; build/browser ainda não validados.**


## Marco 9 — estratégia de cópia integral adotada (15/11/2026)

**Status: infraestrutura da migração em lote implementada; cópia de toda a origem AINDA NÃO concluída.** O plano foi atualizado no Drive e a especificação `docs/migration/SC-BULK-MIGRATION.md` foi criada.

- Script executável/idempotente `scripts/migrate-from-praticarfront.mjs` e teste `scripts/test-bulk-migration.mjs` publicados no Drive; comandos no `package.json`: `npm run migrate:bulk`, `npm run audit:migrate:bulk`, `npm run test:migrate:bulk`.
- Script realiza travessia recursiva das três árvores de origem, preserva estrutura e imports relativos, reescreve aliases próprios das árvores, mantém conflitos existentes sem sobrescrevê-los, gera relatório com hashes e aliases ainda não resolvidos.
- **Teste funcional com fixtures PASS**: cópia TSX/SC, conversão de `@/design-system` e `@/features/showcase-v2`, import relativo preservado e conflito de destino conservado.
- **Checagem do pacote local pré-migração**: `npm run verify:v2` e `npm run verify:workspace` passaram como verificações estruturais. Não significam build validado nem cobertura integral.
- **Inspeção do Drive**: a origem possui 116 diretórios de atoms, 86 molecules, 13 organisms e 6 templates (221 diretórios de componentes); o Showcase V2 possui diretórios adicionais de exemplos. O catálogo não prova que todos os diretórios possuem código funcional.
- Cópia adicional DIRETA no Drive de arquivos de helpers, tipos e estilos, da origem do `design-system/index.ts` e de alguns organismos, sem sobrepor a implementação adaptada existente no Forge. O trabalho anterior de SCs permanece preservado. Essa cópia parcial não significa que os arquivos novos já estejam ajustados/typechecked.

**Bloqueador de execução integral neste ambiente:** o Drive conectado permite cópia de *arquivos individuais*, mas rejeita a cópia de *pastas* pela API; não existe um checkout completo do PraticarFront disponível no ambiente local para executar o novo script. A origem só está disponível como árvore remota de arquivos. O conector GitHub desta conversa também não expôs o repositório PraticarFront. Não afirmar que a migração acabou ou que todos os 221 componentes estão publicados.

**Para concluir:** disponibilizar o checkout local integral do PraticarFront, executar `npm run migrate:bulk -- --source <caminho>` a partir de ForgeUI, reconciliar conflitos e imports bloqueados, gerar cobertura, typecheck/build/browser e reempacotar o workspace atualizado antes de substituir `ForgeUI-git-ready.zip`.

---

## Marco 8 — lote 2 (15/11/2026)


**Arquivos atualizados no Drive:**
- Três componentes publicados em `@forge-ui/web`: `SimpleGrid` (já possuía source de biblioteca, mas faltava o export), `FieldHint` e `FieldError` (copiados da origem com TSX, index e CSS Modules). SCs canônicas já presentes no marco anterior.
- Três definições V2 originais portadas e adaptadas (`definition.ts`, exemplo, hook e snippet), ligadas ao `OriginalDefinitionPage` e ao loader; os exemplos consomem `@forge-ui/web`. O hook de `SimpleGrid` deixou de importar tipo de coluna pela alias do PraticarFront.
- Trilha de proveniência com SHA-256: `docs/migration/phase8-wave2-source-manifest.json`.


**Contagem provisória por inspeção dos arquivos** (não substitui a matriz gerada): **47 exports públicos únicos**, **32 demos registradas** (16 definições originais adaptadas + 16 adaptadores anteriores), 221 páginas de componentes e 33 recursos no catálogo, **174 páginas sem export**, **15 exports sem demo** e **189 páginas sem demo**. As 69 SCs canônicas de componente permanecem presentes. `COVERAGE.md` / `coverage-matrix.json` continuam representando o snapshot gerado do marco 7 até execução do gerador na árvore completa.


**Checagens executadas:** parser TypeScript/TSX sem erros nos 12 arquivos TS/TSX examinados; nenhum alias `@/design-system` nesses arquivos; 47 exports sem nomes duplicados; `SimpleGrid`, `FieldHint` e `FieldError` registrados no loader e no renderer. São checagens estáticas, não aceite de compilação/execução.


**Pendente:** `npm run coverage`, `npm run verify:v2`, `npm run verify:docs`, typecheck e build Next, navegador, acessibilidade, E2E e paridade visual, além dos 16 adaptadores e dos componentes/SCs/hooks ainda faltantes. Não foi alterado o PraticarFront, `forge.ps1`, Git remoto nem os consumidores.


## Continuação — marco 8 (2026-11-14, execução incremental no Drive)


**Não é um aceite de compilação:** a migração continua parcial; os números abaixo são contagem de arquivos/export/demos em código quando os arquivos desta etapa estão presentes, e a matriz gerada permanece snapshot do marco 7 até a execução de `node scripts/generate-migration-coverage.mjs` no checkout íntegro.


- Portada a primitiva original **AspectRatio** com TSX/CSS Modules e pasta de componentes do Forge UI, reutilizando `types/layout.ts` e `styles/layout-components.module.css` já presentes. Sua API pública foi incluída em `@forge-ui/web`, inclusive `ComponentAspectRatio`.
- Portada a definição V2 de **AspectRatio**, hook, exemplo e snippet, conectados ao renderer original e ao loader; o exemplo substitui a imagem da origem por fixture visual local sem asset externo, e importa `@forge-ui/web`. Essa adaptação não demonstra paridade visual com PraticarFront.
- Copiadas mais **10 SCs originais** para caminhos canônicos: InputBase, FieldHint, FieldError, Progress, Slider, AspectRatio, Accordion, Tabs, List e FormField. Preservado o status histórico da origem (não representa aceite no Forge UI).
- **Cobertura esperada após esta alteração de arquivos:** 44 exports públicos, 29 demos em código (13 originais adaptadas + 16 adaptadores), 69 SCs/221, 177 páginas catalogadas sem export, 15 exports sem demo; 152 SCs ainda ausentes. **Contagens não regeneradas/validadas nesta sessão.** `COVERAGE.md` e `coverage-matrix.json` ainda refletem o marco 7 até `npm run coverage` ser executado.
- Documentação de rastreabilidade: `docs/migration/STEP8-SC.md` e `docs/migration/phase8-source-manifest.json`.
- **Pendente:** `npm run coverage`, `npm run verify:docs`, `npm run verify:v2`, `npm run typecheck`, `npm run build`, navegador e acessibilidade. Sem alteração do PraticarFront, `forge.ps1`, Git remoto, consumidores ou Flutter.


## Estado anterior — marco 7 (consolidado)


| Item | Estado auditável |
|---|---:|
| Catálogo original do Showcase V2 | 221 páginas de componentes / 33 recursos |
| Exports públicos `@forge-ui/web` | **43** |
| Demos conectadas em código | **28** (12 originais V2 adaptadas + 16 adaptadores anteriores) |
| SCs de componentes nos caminhos originais | **59/221** (43 exports + 16 documentação apenas) |
| SCs únicas que cobrem as páginas de recursos | **29 arquivos / 33 páginas** |
| SCs de tipos/helpers portadas | **47** |
| Componentes sem export | **178** |
| Exports ainda sem demo própria | **15** |
| Páginas sem demo em código | **193** |
| Hooks do catálogo publicados | **1/15** (`useCollapse`) |


A matriz autoritativa é `COVERAGE.md` / `coverage-matrix.json`, gerada por `node scripts/generate-migration-coverage.mjs`. As SCs continuam com o status histórico original e sua presença **não** valida execução, build ou correspondência visual.


**Novidades integradas sem sobrescrever o marco 6:** as 7 definições originais de `Select`, `Option`, `Container`, `Stack`, `Inline`, `Link`, `Surface` foram portadas/adaptadas para `@forge-ui/web` e integradas ao mesmo renderer original usado por `Avatar`, `Skeleton`, `IconButton`, `Tag` e `Alert`. O helper de seleção usa as preferências locais e `Select` substitui o FormField ainda não migrado por uma composição pública `Stack`/`Label` no exemplo e no snippet; o componente `Select` em si não foi reimplementado.


**Documentos importados:** 35 SCs de componentes já publicados + SCs do lote Alert/Avatar/Skeleton/Tag/IconButton e SCs de dependências (59 páginas canônicas ao todo); 29 SCs únicas de hooks/estilos; 31 de tipos, 16 de helpers e documentos técnicos gerais. Manifestos `sc-wave1`, `sc-support`, `sc-dependency`, `v2-wave6-source` registram SHA-256 e adaptação de fonte. `SC-LINK-REPORT.md` audita 148 SCs e registra 12 referências ainda pendentes, sem afirmar que todos os links dos 221 componentes estão resolvidos.


**Verificações:** verificador de imports/hashes, testes estáticos anteriores e teste do store continuam disponíveis; `node scripts/verify-sc-manifests.mjs` aprovou a integridade dos novos arquivos portados. **Typecheck Next/React, build de produção, browser, E2E, acessibilidade e paridade visual ainda NÃO foram executados/aprovados.** Não fizemos push, não alteramos o PraticarFront nem o `forge.ps1` corrigido pelo usuário.


**A fazer:** migrar 178 páginas sem biblioteca, 15 demos de componentes já publicados e substituir 16 adaptadores por cenários originais completos; concluir 162 SCs de componentes e documentação de recursos; publicar hooks restantes, corrigir links documentais, reconciliar pastas duplicadas; validar tudo antes de integração dos consumidores ou Flutter. 


## Histórico anterior (marco 6)


- **43 exports de componentes** da biblioteca; **21 demos V2** (16 via adaptador reduzido e 5 com definição original adaptada); **221 componentes e 33 recursos** continuam no catálogo estático.
- **16 SCs originais copiadas**; os status históricos não representam aceite do Forge UI.
- **178 páginas** ainda só possuem registro; **22 componentes** possuem biblioteca mas não têm demo.
- Matriz completa e reproduzível: `COVERAGE.md`, `coverage-matrix.json`, `node scripts/generate-migration-coverage.mjs`.
- Novo lote: Avatar, Skeleton, IconButton, Tag e Alert/AlertHeader/AlertBody/AlertFooter; definições V2, hooks, exemplos e snippets originais adaptados.
- `ExampleBoundary` usa o `Alert` público do DS. O SVG local do Avatar substitui um asset de origem indisponível no Drive; adaptação explicitada no manifesto.
- **Validações pendentes:** typecheck real, build Next.js, inspeção visual, comportamento no navegador e testes de acessibilidade.
- **Sem alterações** no PraticarFront, no bootstrap PowerShell do usuário ou no Git remoto.


## Fontes


PraticarFront (Drive): `src/design-system/` e `src/features/showcase-v2/`, além de `docs/sc/` e seu índice público de contratos. A fonte permaneceu intacta. O documento "Forge UI — Plano de migração do DS e Showcase V2" está na raiz da pasta Forge UI do Drive.


## Entregas deste marco


- `@forge-ui/web`: 13 átomos já extraídos + 8 primitivas/componentes adicionais portadas do código original (`Select`, `Option`, `Container`, `Stack`, `Inline`, `Link`, `ThemeSelector`, `LocaleSelector`) + template público `ShowcasePageTemplate`, com CSS Modules compartilhados e contratos de layout/preferência. **27 componentes exportados na fatia atual** após mais cinco componentes públicos da família `Card` (`Surface`, `Card`, `CardHeader`, `CardBody`, `CardFooter`).
- Portal: `ShowcaseV2Page.tsx`, `ShowcaseV2Page.module.css`, `ShowcaseV2Navigation.tsx`, `ShowcaseV2Navigation.module.css`, `ShowcasePageTemplate.tsx` e CSS preservados/adaptados da origem; catálogo original importado, com **221 itens de componentes e 33 de recursos**.
- Rotas funcionais de código: `/` (home original reidentificada Forge UI), `/components/[slug]`, `/templates/[slug]`, `/resources/[slug]`.
- **13 demos atualmente registradas no renderer V2**, com exemplos que consomem diretamente `@forge-ui/web`. Componentes/recursos restantes exibem status pendente em vez de uma demonstração falsa.
- Seletores de idioma e tema do DS, em provider local do portal; sem infraestrutura de autenticação do PraticarFront.
- O layout customizado da fase 2 não é mais usado como home; cópia conservada em arquivos `.backup.txt` para comparação/rollback.
- Verificador estrutural atualizado para auditar imports locais do portal e da biblioteca, exports, o shell, o registro 221/33 e os hashes das 13 cópias originais.


## Verificações


| Verificação | Situação | Evidência |
| --- | --- | --- |
| Integridade/hash das 13 cópias anteriores | PASS | `node scripts/verify-workspace.mjs` |
| API `Card` e renderizador V2 (imports/estrutura) | PASS | `node scripts/verify-workspace.mjs` |
| Edição/reset/subscrição de `example-store` | PASS | `node scripts/test-example-store.mjs` com TypeScript global do sandbox |
| Imports relativos do portal e DS (arquivos existentes) | PASS | `node scripts/verify-workspace.mjs` |
| Registro original (221 componentes, 33 recursos) | PASS | `node scripts/verify-workspace.mjs` |
| Source TypeScript/TSX parse | PASS (sintaxe apenas) | `typescript.createSourceFile` global |
| TypeScript typecheck | BLOQUEADO | pacotes Next/React não disponíveis no sandbox Linux |
| Build Next.js | NÃO EXECUTADO | dependências compatíveis com Linux não instaladas |
| Teste de navegador/visual/paridade V2 | NÃO EXECUTADO | requer servidor Next.js funcional |
| Testes end-to-end / acessibilidade | NÃO EXECUTADO | dependem do browser |


Esses PASS **não garantem** compilação nem fidelidade visual. O npm no sandbox não consegue baixar dependências. `node_modules` Windows no Drive não substitui dependências Linux. O usuário informou que seu script Windows corrigido funcionou; não sobrescrevemos alterações locais.


## Pendências priorizadas


1. **Parcialmente realizado:** `ShowcaseV2Template`, `ExampleScope`, `ExamplePreview`, `PropertyGrid`, `TechnicalGrid`, `PropertyEditor`, `ExampleCode` e `ShowcaseV2Renderer` portados com o store original. Restam os loaders e opções completas, `DataGrid`, `useCollapse`, `ScenarioControls` e `ExampleBoundary`; tabelas semânticas temporárias são usadas nas áreas documentais até a chegada do `DataGrid`.
2. Migrar e testar as demais primitivas, moléculas, organismos, templates, hooks, recursos de estilos e helpers com seus contratos originais.
3. Adaptar a íntegra de SCs, guias de autoria, catálogos e automações de validação; manter trilha de proveniência e contagem de entregas.
4. Restaurar todas as demos nomeadas, incluindo composições dos organismos, reset e snippets TSX com o comportamento original.
5. Rodar a suíte completa e comparar visualmente desktop/mobile com a origem antes de dar aceite à nova home.


Sem alterações no PraticarFront, sem integração de consumidores e sem push ao GitHub.


## Marco 4 — renderer e controles (2026-11-14)


- Preservados da origem `example-store.ts`, `ExampleScope`, `useExampleScope`, `usePropertyGrid`, `PropertyEditor`, `ExampleCode`, `useExampleCode`, `ShowcaseV2Template` e o hook de seleção de cenários, com correções de import para `@forge-ui/web`.
- Migrado o componente composto público `Card` com `CardHeader`, `CardBody`, `CardFooter`, `Surface`, helper `collectCompoundParts` e `CardContext`; sem depender do PraticarFront em runtime.
- O preview usa Card do DS, incluindo código, copiar, reset e disclosure temporário. A tabela de edição de propriedades usa store original e editores do DS; a tabela técnica usa os contratos de métodos/eventos/recursos.
- Os 13 exemplos usam um adaptador `LiveDefinitionPage` (dados simplificados e explicitamente incompletos); o catálogo completo 221/33 continua uma meta de migração, não cobertura de execução.
- Testes disponíveis: `node scripts/verify-workspace.mjs`, `node scripts/test-example-store.mjs` (requer TypeScript) e parser TS/TSX global no sandbox. **Typecheck completo, build Next e visual/browser NÃO executados** por indisponibilidade de dependências Linux.
- Origem, hashes e adaptações desse marco: `docs/migration/v2-renderer-source-manifest.json`.


## Marco 5 — DataGrid original e cenários (2026-11-14)


- **35 componentes públicos na fatia atual** (27 anteriores + 8 novos: `Icon`, `DataGrid`, `DataGridHeader`, `DataGridBody`, `DataGridRow`, `DataGridCell`, `DataGridColumnHeader`, `DataGridFooter`) e hook público `useCollapse`.
- **16 demos de componentes reais** no renderer (13 anteriores + `Icon`, `Card` e `DataGrid`), com dois exemplos para `DataGrid`. O catálogo estático continua 221 componentes / 33 recursos; a maioria não está implementada.
- `PropertyGrid`, `TechnicalGrid`, `ScenarioControls` e `ExampleState` agora utilizam o `DataGrid` público do DS. `ExampleControls` registra controles dinâmicos e o `ExampleBoundary` recupera de erros ao mudar os overrides do store.
- `ExamplePreview` usa hook original `useCollapse` com atributos de foco/expansão, não o disclosure temporário da fase 4.
- Os componentes DataGrid e Icon foram portados do PraticarFront com arquivo-fonte e CSS Modules, mais adaptações explícitas de contratos para não importar `@/` do app. As 8 SCs de origem foram copiadas para `docs/sc/ds/` sem alterar o status histórico.
- Um loader V2 dinâmico **apenas para as 16 demos migradas** foi incluído; o loader original integral continua pendente por depender das centenas de definições ainda ausentes.
- PASS estrutural: `node scripts/verify-workspace.mjs`; PASS contratos estáticos e manifest: `node scripts/test-v2-contracts.mjs`; PASS store isolado: `node scripts/test-example-store.mjs`; PASS parser sintático TS/TSX. **Typecheck completo, build/browser/visual NÃO aprovados no sandbox Linux sem React/Next instalados.**
- Preservados PraticarFront, Git remoto e bootstrap Windows do usuário. Não foi feito push ao GitHub.


## Marco 6 — matriz e V2 original por componente


- Verificação estrutural e de integridade: `node scripts/verify-workspace.mjs`, `node scripts/test-v2-contracts.mjs`, `node scripts/test-phase6-contracts.mjs`.
- Matriz atualizada: `node scripts/generate-migration-coverage.mjs`; nunca usar número de slugs como prova de componentes migrados.
- Manifesto de 65 registros: `v2-source-batch6-manifest.json`. Dois catálogos/SCs originais adicionais foram preservados como snapshots de referência, ainda não reconciliados.
- Os 5 exemplos novos utilizam `definition.ts`, `*.example.tsx`, `use*Example.ts` e `usage-code.ts` da origem com imports e caminhos locais adaptados; os 16 anteriores continuam usando metadados reduzidos.
- Restam 200 páginas sem demo, além da documentação e dos recursos originais, validação integral, logo, integração de consumidores e futura biblioteca app.