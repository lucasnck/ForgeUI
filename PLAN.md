# Forge UI — plano de criação e extração

## Checkpoint de implementação — 18/11/2026 — Slider Flutter nativo (Wave 10)

Seguindo `sc-author → sc-implementer`, a SC do Slider e a TECH nativa foram
registradas antes do código: o Slider deixa de renderizar Material e mantém
a API Flutter publicada, pintura/geométrica/token Forge, toque, foco, teclado
com RTL, semântica ajustável e formulário. Auditorias Node: PASS isolado,
com quatro regressões negativas rejeitadas. O gate final continua bloqueado
sem SDK Flutter, testes Android/iOS, acesso por leitor de tela e paridade
visual Web × Flutter; incompatibilidade de canal `double` vs. valores
string do Web está explícita na SC. Estimativa estática após a alteração:
6 imports diretos Material/Cupertino, pendente de auditoria integral.
Documento: `docs/migration/FORGEUI-NATIVE-SLIDER-WAVE10-2026-11-18.md`.
Nenhuma SC alterada para `DONE`; sem modificação de consumidores ou Git remoto.

## Checkpoint de independência nativa — 18/11/2026 — auditoria dos 221 contratos e onda de importações

A auditoria reproduzível `npm run audit:native-independence` analisou **221 contratos** e **128 arquivos Dart** no recorte de biblioteca disponível no Drive, com **zero fontes ou nomes de construtores ausentes** e **zero imports relativos quebrados** nesse recorte. Foram eliminados quatro imports Material/Cupertino de produção: `configured_input.dart`, `schematic_map_renderer.dart`, `forge_o_data_filter.dart`, e wrapper `Material` transparente de `forge_modal.dart` substituído por `Builder`, sem modificar API de componentes, receitas de estilo ou tokens. Os imports diretos Material/Cupertino da biblioteca passaram de **12 para 7** neste recorte. Os testes Node da auditoria e mutações negativas passaram; **Flutter SDK, Dart format/analyze/test, Android/iOS, inspeção visual e acessibilidade não foram executados**.

Continuam com import Material direto: `ForgeInput`, `ForgeSelect`, `ForgeSlider`, `ForgeColorInput`, `ForgeTemporalInput`, `ForgeThemeTokens` e `ForgeThemeData` (adaptador legado). O helper `forge_control_style.dart` agora delega à receita nativa compartilhada; `ForgeSelect` consome `style.background`, sem mudar sua implementação pública ainda Material. `phone_numbers_parser` continua em produção. A auditoria identifica **146 contratos com dependência transitiva Material/Cupertino**, não 146 componentes a reimplementar: depende de retirar essa dependência compartilhada, inclusive de tokens. Famílias Web × Flutter mantêm 221 SCs `PENDING` até evidências reais. Problemas de paridade Web ainda registrados: família DM Sans não gerada para Dart e `rootFontSizeVerified=false` na escala de rem.

Artefatos: `docs/sc/app/tech-native-platform-boundary-wave9.sc.md`, `docs/sc/app/tech-native-select-recipe.sc.md`, `scripts/audit-native-independence.mjs`, `scripts/test-native-independence.mjs`, `docs/migration/validation/native-independence-matrix.json`, `docs/migration/FORGEUI-NATIVE-INDEPENDENCE-WAVE9-2026-11-18.md`. Nada foi publicado em Git nem alterado nos consumidores.


## Checkpoint de implementação — 18/11/2026 — ForgeAction nativo e paridade Web × Flutter

O fluxo `sc-author → sc-implementer` atualizou a SC Flutter Button e criou `docs/sc/app/tech-flutter-native-action-recipe.sc.md` e `docs/sc/app/tech-web-flutter-parity-gates.sc.md`. `ForgeAction` (motor compartilhado de `ForgeButton` e `ForgeIconButton`) deixou de usar `FilledButton`, `OutlinedButton` e `Tooltip` do Material: renderização por widgets Flutter + `ForgeTooltip`, preservando tokens originais do Web para tamanhos, tons, formas, pesos, cores, radius, motion e estados, além da precedência `appearance > variant > outlined`. O alvo de toque mobile é pelo menos 48 dp e **não muda o tamanho visual definido pelo token**. `ForgeSelect` continua usando a receita Material legada, preservada separadamente.

Publicados no Drive: `forge_action.dart`, `forge_action_palette.dart`, `forge_native_action_recipe.dart`, reconciliação do `forge_control_style.dart`, testes de `Button` e `IconButton`, scripts `check-native-actions.mjs` e `test-native-actions.mjs` e integração `test:native-actions` no `check:cross-platform`. `npm run test:native-actions` passou em estrutura isolada com quatro regressões negativas rejeitadas; **Dart/Flutter analyze, tests, builds, mobile, acessibilidade e paridade visual não foram executados**. SCs permanecem `PENDING` e nenhum consumidor ou Git remoto foi alterado. Relatório: [recorte de ações nativas](docs/migration/FORGEUI-NATIVE-ACTIONS-PARITY-SLICE-2026-11-18.md).

**Lacuna de paridade identificada:** O motor de ação já migrou, mas a fonte tipográfica exata e a escala de rem permanecem sem aceite: `--font-family-brand` existe em `shared/tokens/primitives.json`, porém não é emitido em Dart; `schema.json` marca `rootFontSizeVerified:false`. Sem supor que o default Flutter equivale à Web. Detalhes na TECH transversal e no relatório do recorte.

## Checkpoint de implementação — 18/11/2026 — checkables Flutter nativos

**Aplicado ao Google Drive, ainda não homologado pelo Flutter SDK.** Após o recorte de tipografia, o fluxo `sc-author` → `sc-implementer` atualizou as SCs de `Checkbox`, `Radio` e `Switch`, criou `docs/sc/app/tech-native-checkables.sc.md` e substituiu a implementação compartilhada em `app/library/lib/src/components/forge_checkable.dart` por `Focus`/`GestureDetector`/`Semantics` de `widgets.dart` (sem import direto Material/Cupertino). Foram adicionados `scripts/check-native-checkables.mjs`, `scripts/test-native-checkables.mjs` e `app/library/test/forge_native_checkables_test.dart`; `npm run test:native-checkables` foi ligado ao `check:cross-platform`.

**Verificado:** `git apply --check` sobre fonte original e testes Node da fronteira nativa, inclusive três regressões injetadas. **Não executados:** Dart format, Flutter analyze/widget tests/build, acessibilidade e paridade visual. As três SCs continuam `PENDING`, a independência global do Material não está concluída, e o build anterior das 221 prévias não comprova este recorte. Nenhuma publicação Git nem modificação dos consumidores. Evidências: [relatório do recorte](docs/migration/FORGEUI-NATIVE-CHECKABLES-SLICE-2026-11-18.md).

## Checkpoint de implementação — 18/11/2026 — tipografia Flutter nativa

O fluxo `sc-author` → `sc-implementer` prosseguiu em `AiWorkspace/ForgeUI`: uma TECH de tipografia nativa (`docs/sc/app/tech-flutter-typography-recipe.sc.md`) e seis SCs de componentes atualizadas antes do código. As implementações de `ForgeText`, `ForgeHeading` e `ForgeLabel`, mais o helper `forge_primitive_style.dart`, deixaram de importar Material diretamente; `ForgeDivider` agora desenha a linha com `SizedBox`/`ColoredBox` e tokens ForgeUI. `ForgeFieldHint` e `ForgeFieldError` já usavam Flutter nativo e foram incluídos nos testes.

Foram adicionados `scripts/check-native-typography.mjs`, `app/library/test/forge_native_typography_test.dart` e `npm run test:native-typography`, incorporado a `check:cross-platform`. O teste estrutural Node passou no conjunto de arquivos atualizados, inclusive com rejeição de import Material injetado. O teste de widget **ainda não foi executado**, porque Flutter/Dart não estão instalados no ambiente desta entrega. O repositório completo, análise Dart, builds nativos e comparação visual Web × Flutter ainda exigem homologação local. Nenhuma SC foi marcada `DONE` por este lote. Material continua no adaptador legado e em outros widgets; a independência global não está concluída.

Relatório: `docs/migration/FORGEUI-NATIVE-TYPOGRAPHY-SLICE-2026-11-18.md` (cópia no diretório de relatórios do Drive). Nenhuma alteração foi publicada por Git ou sincronizada com a revisão do ForgeUI consumida pelo PraticarApp.


## Checkpoint atual — etapas 6 a 8 — 17/11/2026

**221 APIs públicas e 221 prévias Flutter compiladas e registradas**, incluindo partes canônicas demonstradas no proprietário correto. **125 testes da biblioteca e 1.174 do showcase passaram**; análise Dart sem problemas. Build Flutter `0d5f6c48442ac45e`. Tokens (185 em quatro temas), curva de movimento canônica e typecheck Web/portal aprovados. Não há entrada de catálogo sem prévia registrada. Build do portal aprovado com 297 rotas; [17 verificações HTTP](docs/migration/validation/flutter-wave8-http.json) passaram, incluindo correspondência do hash Flutter servido ao manifesto.

Entregues os grupos de interação/formulários, coleções/navegação, modais/notificações, tabelas, templates, transições, mapa e OData. Corrigidos teclado/RTL de RadioGroup, semântica de FormField, geometria dos popups e presença/animações com restauração de foco. Os snippets copiáveis são compilados nos testes.

Evidências: [etapa 6](docs/migration/FLUTTER-INTERACTION-FORMS-WAVE-6.md), [etapa 7](docs/migration/FLUTTER-COLLECTIONS-WAVE-7.md), [etapa 8](docs/migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md), [pipeline integral](docs/migration/validation/flutter-wave8-build.log) e [acompanhamento estruturado](docs/migration/FLUTTER-IMPLEMENTATION-PROGRESS.json).

**Pendências de aceite:** comparação visual e funcional completa por SC entre Web/app; validação Android/iOS e tecnologias assistivas. Semântica e foco têm testes automatizados, mas isso não representa auditoria em aparelho. APIs nativas e os controles de cenário são distintos; o editor não oferece alteração de todos os parâmetros construtores/objetos tipados. PopupListbox e Toast ainda removem itens imediatamente, sem pintura de saída retida. As SCs continuam PENDING nos critérios não comprovados.

Os registros seguintes são históricos e suas contagens/bloqueios são substituídos pelo checkpoint acima. PraticarFront permanece intacto.


## Desenvolvimento Flutter — primeira entrega funcional

Button, Spinner e ButtonGroup têm implementação e exemplos reais na prévia Flutter. O Button expõe tamanhos, tons, aparências, formatos, largura, loading, loadingLabel, disabled, foco e semântica; outlined permanece como alias legado. Capacidades e receitas de estilo são compartilhadas. O manifesto só registra os três widgets após análise, testes e build reais.

Evidências e limites: [primeira entrega Flutter](docs/migration/FLUTTER-COMPONENTS-PHASE-1.md). A aceitação visual/native e as partes ainda propostas dos contratos permanecem PENDING. Os outros 218 componentes ainda não têm implementação Flutter registrada.

## Specs de paridade Web / app — catálogo completo

Os **221 componentes atuais da Web têm specs app** em docs/sc/app/ds/components, preservando propriedades, funcionalidades e estados com adaptações nativas explícitas. Foram acrescentadas 217 specs e enriquecidas as quatro iniciais. Todas permanecem **PENDING para implementação e aceite Flutter**.

- [Inventário completo](docs/sc/app/core-app-parity-catalog.sc.md), [regras de paridade](docs/sc/app/core-web-app-parity.sc.md) e [mapeamento nativo](docs/sc/app/core-native-api-mapping.sc.md).
- Cada spec registra tipos/presença das propriedades, defaults locais, comportamento nativo, critérios de aceite e cenários equivalentes; 254 exemplos reais do catálogo são referenciados.
- Contratos compartilhados cobrem modelos tipados, composição, formulários, semântica, aliases e portas injetadas de arquivos/mapas/navegação/overlays/transições.
- [Rastreabilidade das fontes](docs/sc/app/reference/component-contracts.json) e [auditoria documental](docs/sc/app/reference/spec-authoring-audit.json) distinguem autoria de validação funcional.
- Próxima fase: implementar os contratos e validar biblioteca/showcase por dependências. Documentação não anuncia widgets disponíveis.
- Esta etapa altera documentação, sem implementar widgets, integrar consumidores ou publicar commits.

## Validação multiplataforma inicial — 2026-11-16

Os tokens compartilhados, adaptadores de tema e o primeiro Button Flutter estão implementados. Os quatro comandos de validação solicitados foram executados localmente com Flutter 3.38.7 / Dart 3.10.7; os resultados e limites estão no [relatório multiplataforma](docs/migration/MULTIPLATFORM-IMPLEMENTATION.md). A compilação registra somente Button; não representa a migração dos 221 componentes para Flutter. Os critérios visuais, Android/iOS e de acessibilidade permanecem pendentes. As referências abaixo a Flutter como etapa futura são históricas para a biblioteca completa.

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

Evidências: [cobertura](docs/migration/COVERAGE.md), [auditoria de fontes](docs/migration/bulk-migration-audit.json), [reconciliações](docs/migration/bulk-reconciliation-report.json), [contrato](docs/migration/SC-BULK-MIGRATION.md) e [validação](docs/migration/VALIDATION.md).

---



## Marco 9 — mudança de estratégia autorizada (15/11/2026)

**Decisão do usuário:** substituir migração manual componente a componente por **cópia integral em lote** das árvores de código já existentes no PraticarFront, seguida de adaptação automatizada de aliases/imports e verificação. Não criar implementações falsas para itens que só existem como SC/catálogo. Continuar a extração até que toda a fonte existente e pertinente esteja migrada, registrando explicitamente lacunas e validações não executadas.

### Ordem obrigatória — bulk migration (SC-first preservado)

- [x] Registrar estratégia e critérios no plano de Forge UI.
- [ ] Inventariar completamente `PraticarFront/src/design-system/**`, `PraticarFront/src/features/showcase-v2/**` e `PraticarFront/docs/sc/ds/**`; separar **arquivos de código existentes** das **221 entradas do catálogo** — não presumir que todas as entradas têm implementação funcional.
- [ ] Copiar **árvores completas** para `web/library/src/design-system/**`, `showcase/portal/src/features/showcase-v2/**` e `docs/sc/ds/**` mantendo subpastas, arquivos `.tsx/.ts`, CSS Modules, assets, hooks, helpers, exemplos, definições, fixtures e SCs; preservar alterações adaptadas do Forge como conflitos revisáveis.
- [ ] Executar codemod automatizado dos imports entre pacotes e aliases do PraticarFront, sem reescrever imports relativos que continuam válidos; resolver dependências externas e side effects individualmente.
- [ ] Separar e reportar dependências de negócio/infra/autenticação do PraticarFront, sem puxá-las para a biblioteca pública.
- [ ] Reconciliar `index.ts`, API pública `@forge-ui/web`, loader/renderizador do Showcase V2 e referências de SC, sem duplicar export ou degradar as demos originais existentes.
- [ ] Gerar um manifesto de migração por caminho/hash com `copied`, `preserved`, `rewritten`, `blocked`; atualizar `COVERAGE.md` e `STATUS.md` com métricas reais.
- [ ] Executar checks sintáticos, TypeScript, lint, testes, build Next, inspeção browser/visual, acessibilidade e paridade quando dependências/toolchain estiverem disponíveis; **não marcar concluído por cópia sem teste**.
- [ ] Atualizar o workspace íntegro e o artefato ZIP no Drive; só publicar Git ou integrar consumidores mediante autorização específica.

**Script de repetição local:** `node scripts/migrate-from-praticarfront.mjs --source ../PraticarWorkspace/PraticarFront --apply` com relatório em `docs/migration/bulk-migration-report.json`. Sem `--apply`, o comando apenas inventaria. O Drive contém fonte fragmentada em arquivos/pastas; se não houver checkout integral, transferir arquivos via conector e registrar limitações da operação.

---

## Estado consolidado — marco 7 (14/11/2026)


**Referência atual:** `docs/migration/STATUS.md` e a única matriz gerada `docs/migration/COVERAGE.md` / `coverage-matrix.json`. Os marcos anteriores permanecem registrados como histórico, não como números correntes.


- **43 exports públicos** (incluindo famílias e partes), **28 demos em código**: 12 definições originais V2 adaptadas e 16 demos por adaptador. Catálogo: **221 componentes e 33 recursos**; **178 páginas** sem export, **15** com export mas sem demo.
- **59 SCs de componentes** nos caminhos canônicos do catálogo (43 para exports, 16 documentação-only), **33 referências de SCs de recursos** cobertas por 29 arquivos únicos, **47 SCs de tipos/helpers** e contratos gerais portados com proveniência/hash.
- Sete novas páginas originais adaptadas: Select, Option, Container, Stack, Inline, Link e Surface. Combinadas com os cinco originais do marco 6 (Avatar, Skeleton, IconButton, Tag, Alert), sem trocar o shell V2 nem recriar os componentes do DS.
- **Sem typecheck/build/browser** nesta etapa. Scripts offline: `npm run coverage`, `npm run verify:docs`, `npm run verify:v2` (dependências são necessárias apenas aos comandos que as exigem).
- **Sem alterações** no PraticarFront, no script PowerShell ajustado, no repositório Git remoto ou no fluxo de integração dos consumidores.


**Prioridade seguinte:** finalizar 15 demos dos componentes públicos restantes, migrar famílias que desbloqueiam outras páginas, completar 162 SCs ainda ausentes e páginas de recursos (14 hooks ainda não públicos); depois validar paridade e integrar consumidores somente com autorização.


## Histórico consolidado — marco 6 (14/11/2026)


**Fonte de verdade atual:** `docs/migration/STATUS.md` e a matriz gerada `docs/migration/COVERAGE.md` / `coverage-matrix.json`. Os números abaixo substituem os resumos históricos das fases anteriores; não apagar os marcos para preservar a rastreabilidade.


- **43 componentes públicos** exportados da biblioteca React/TypeScript; 21 páginas com demonstrações integradas no Showcase V2 (16 por adaptador temporário + 5 com definição, hook, exemplo e snippet originais adaptados).
- O catálogo original contém **221 páginas de componentes** e **33 recursos**; não equivale a 221 componentes implementados. **178 páginas** continuam apenas catalogadas, **22** têm biblioteca mas ainda não possuem demo.
- 16 SCs originais de componentes copiadas, além de 2 catálogos/SCs históricos de referência; o status `DONE` nelas se refere ao PraticarFront, não ao aceite no Forge UI.
- A biblioteca continua independente do PraticarFront. Sem push ao GitHub, sem modificação do PraticarFront e sem alteração do bootstrap Windows do usuário.
- Verificações estruturais, de contratos e de sintaxe podem ser executadas offline. **Typecheck completo, build Next.js, teste visual e acessibilidade no browser permanecem sem aceite.**


**Ordem de execução:** (1) migrar famílias de componentes por dependência e, no mesmo lote, SC, definição V2, fixture, hook e snippet; (2) completar SCs, helpers e recursos e eliminar adaptadores temporários; (3) incorporar marca aprovada e fechar layout/idioma/temas; (4) typecheck, build, navegador, E2E/a11y; (5) integrar consumidores mediante autorização; (6) Flutter em etapa futura.


## Objetivo


Criar um design system independente a partir do PraticarFront, preservando componentes, especificações, catálogo, templates, instruções de agentes e showcase. Atender projetos web e aplicativos por meio de submódulos Git, sem exigir publicação no NPM. Os projetos consumidores continuam em repositórios separados.


## Histórico do escopo e autorização posterior


Na criação deste plano, o escopo se limitava à pasta e à documentação. Em conversas posteriores, o usuário autorizou expressamente a implementação local, a extração da biblioteca, o showcase, a configuração Git (sem push) e a atualização dos arquivos no Drive. Portanto, a restrição inicial de não copiar componentes ou inicializar Git **não se aplica às fases autorizadas posteriormente**. Continua proibido alterar o PraticarFront, publicar no GitHub ou integrar consumidores sem autorização específica.


**Marco histórico anterior em 14/11/2026 (migração Showcase V2):** 13 átomos anteriores + 8 novos componentes públicos e o ShowcasePageTemplate do DS original (27 exports de componentes após a família Card). A home, o shell de navegação, os estilos do template e os índices do Showcase V2 foram portados da origem para o Forge UI. Existem 221 entradas de componentes e 33 de recursos catalogadas, mas **somente 13 demos estão efetivamente renderizadas no portal**. Os demais exemplos, SCs e dependências continuam pendentes. Não houve build completo nem inspeção visual. Consulte `docs/migration/STATUS.md` e `docs/migration/v2-source-manifest.json`. Consulte `docs/migration/STATUS.md` e `docs/migration/source-manifest.json`.


## Fontes verificadas


- `../PraticarWorkspace/PraticarFront/src/design-system/`: componentes, assets, helpers, hooks, estilos, tipos e exports.
- `../PraticarWorkspace/PraticarFront/docs/sc/ds/`: especificações do design system.
- `../PraticarWorkspace/PraticarFront/docs/sc/`: arquitetura, start-here, catálogos, templates e especificações do showcase.
- `../PraticarWorkspace/PraticarFront/.github/agents/`: contratos dos agentes sc-author e sc-implementer.
- `../PraticarWorkspace/docs/sc/core/`: protocolo central de especificação referenciado pelo workspace; verificar conteúdo e dependências antes de transportar.
- `../PraticarWorkspace/PraticarFront/src/features/showcase-v2/`: fonte a inspecionar para a migração do showcase, incluindo rotas e dependências externas.


## Estrutura proposta


```text
ForgeUI/
|-- PLAN.md
|-- README.md
|-- AGENTS.md
|-- .gitignore
|-- .github/
|   `-- agents/
|-- docs/
|   |-- sc/
|   |   |-- core/
|   |   |-- ds/
|   |   |-- web/
|   |   |-- app/
|   |   `-- showcase/
|   `-- integration/
|-- shared/
|   |-- tokens/
|   `-- assets/
|       `-- brand/
|-- web/
|   `-- library/
|-- app/
|   `-- library/
`-- showcase/
    |-- portal/
    |-- demos-web/
    `-- demos-app/
```


Nomes de pastas representam plataformas, sem fixar frameworks. A implementação inicial web será React/TypeScript; o portal partirá do showcase Next existente. Flutter é a tecnologia prevista para app, cuja implementação fica para uma etapa posterior. Organização de pacotes e comandos será definida durante a preparação técnica, sem exigir registro NPM.


## Etapa 1 — criar a estrutura base


- [x] Inspecionar os contratos e instruções da origem antes de copiar material.
- [x] Criar README e AGENTS próprios do Forge UI, com propósito, limites e fluxo de trabalho pelo chat.
- [x] Documentar a arquitetura e a extração nas SCs aplicáveis antes de alterar código ou configuração de implementação.
- [x] Criar a estrutura mínima necessária às próximas etapas, com separação entre biblioteca, documentação, recursos compartilhados e showcase.
- [x] Definir configurações e comandos locais de acordo com a implementação real, sem copiar configurações de negócio do Praticar.


## Etapa 2 — transportar e adaptar as documentações


- [ ] Preservar o formato atual de especificações do PraticarFront e o protocolo SC-first.
- [ ] Trazer os catálogos de recursos e DS, templates, start-here e partes pertinentes da arquitetura.
- [x] Adaptar sc-author e sc-implementer e incluir as dependências documentais necessárias para operarem no novo projeto.
- [ ] Transportar as especificações de componentes, helpers, hooks, estilos e tipos pertinentes à biblioteca.
- [ ] Preservar as especificações e guias do showcase e o fluxo existente de criação, validação, registro e publicação de componentes, após inspecioná-lo. Distinguir registro no catálogo/showcase de distribuição da biblioteca.
- [ ] Registrar a origem do material e corrigir links e caminhos para o Forge UI funcionar sem depender da documentação externa do Praticar.
- [ ] Revisar os status: implementação existente na origem não significa migração concluída no Forge UI. Manter critérios da extração pendentes até haver evidência.
- [ ] Separar contratos comuns das particularidades web; não apresentar contratos React como contratos já implementados para app.


## Etapa 3 — organizar as pastas e preparar a biblioteca


- [ ] Mapear imports externos a `src/design-system`, incluindo contratos de preferências e seleção, formatação, formulários e infraestrutura de temas.
- [ ] Classificar o que pertence à biblioteca, aos recursos compartilhados, aos adaptadores web e ao negócio do Praticar.
- [ ] Extrair por cópia os componentes e dependências genéricas necessários para executar o showcase independente, mantendo a origem intacta.
- [ ] Estabelecer exports públicos, tratamento de CSS Modules, tokens, assets, tipos e dependências compartilhadas, evitando duplicação de React. (API e base CSS presentes; build pendente.)
- [ ] Definir a fronteira e o formato dos tokens compartilhados antes de introduzir geração para plataformas diferentes.
- [x] Reservar `app/` para a futura implementação, sem inventar widgets ou exigir toolchain Flutter nesta fase.
- [ ] Adaptar verificações e scripts pertinentes, preservando evidências reais de funcionamento.


## Etapa 4 — migrar o showcase do PraticarFront


- [ ] Inspecionar rotas, catálogo, navegação, renderizadores, exemplos, templates e dependências do showcase existente.
- [ ] Copiar e adaptar o showcase para `showcase/portal/`, preservando a cobertura e os exemplos úteis existentes.
- [ ] Remover dependências de autenticação, serviços e regras de negócio que impeçam a execução independente, usando exemplos locais quando necessário.
- [x] Fazer as demonstrações web consumirem a biblioteca do Forge UI (13 átomos extraídos).
- [ ] Centralizar a navegação, o catálogo e o acesso às especificações em um portal único.
- [ ] Reaproveitar exemplos executáveis entre a documentação de uso e o showcase quando possível.
- [ ] Documentar os comandos reais de instalação, desenvolvimento e build após validá-los.
- [ ] Validar componentes, navegação, temas, assets, acessibilidade e estados relevantes com as verificações apropriadas e inspeção visual.


### Evolução do portal para app


- [ ] Implementar demonstrações próprias dos componentes do app, com Flutter Web como opção inicial de incorporação ao portal.
- [ ] Permitir visualizar e comparar implementações web e app pelo mesmo catálogo, sem compartilhar código de componentes entre React e Flutter.
- [ ] Definir o protocolo de incorporação, seleção de exemplos e sincronização de tema quando essa integração for implementada.
- [ ] Validar comportamentos específicos de Android/iOS em emulador ou dispositivo; a demonstração no navegador não substitui essa verificação.


## Etapa 5 — integrar projetos consumidores posteriormente


- [x] Criar o repositório independente quando solicitado (criado pelo usuário; Git local configurado, sem push).
- [ ] Integrar primeiro o PraticarFront por submódulo Git, consumindo a biblioteca web pela interface pública definida.
- [ ] Validar o PraticarFront antes de retirar sua implementação local redundante.
- [ ] Integrar os demais projetos web e, quando houver biblioteca app, os aplicativos.
- [ ] Documentar inicialização, acesso no CI e atualização dos submódulos.
- [ ] Incluir no fluxo pelo chat a atualização coordenada dos commits referenciados e as verificações dos consumidores. Submódulos não propagam alterações automaticamente.


## Identidade visual


O projeto se chama **Forge UI**. O usuário adicionará posteriormente o último logo aprovado na Library. Não gerar, substituir ou selecionar outro logo por suposição.


- [ ] Guardar o arquivo aprovado em `shared/assets/brand/`, registrando formato e variações disponíveis.
- [ ] Usar esse logo no portal/showcase, na documentação e nos demais pontos de identidade aplicáveis ao projeto.
- [ ] Preparar favicon ou variantes de tamanho/tema somente a partir do material aprovado, preservando legibilidade e proporções.
- [ ] Manter a identidade do portal separada dos temas que os projetos consumidores poderão utilizar.


## Critérios de conclusão da primeira extração


- [ ] Forge UI executa a biblioteca web e o showcase sem depender do checkout do PraticarFront.
- [ ] Documentação, catálogo, templates e agentes têm caminhos válidos e correspondem ao que foi efetivamente migrado.
- [ ] Cobertura do showcase foi comparada com a origem e lacunas estão explícitas.
- [ ] Verificações adequadas à extração passaram e suas evidências foram registradas.
- [ ] PraticarFront permanece preservado até a etapa específica de integração.
- [ ] Estrutura permite acrescentar a implementação app e suas demonstrações sem renomear as pastas por tecnologia.


## Histórico: situação da extração inicial


Execução **parcial** das Etapas 1–4; primeiro conjunto de 13 átomos disponível no Drive. Os scripts de um comando verificam estrutura e instalam dependências na raiz do workspace quando há acesso ao npm. A validação estrutural offline da fase 2 passou, mas **não** prova build ou comportamento no navegador. A migração integral dos átomos restantes, moléculas, organismos, templates e catálogo do Showcase V2 não foi concluída. O logotipo aprovado ainda não foi incorporado. Flutter e integração de consumidores continuam fases futuras.




## Migração da home a partir do Showcase V2 — marco implementado (14/11/2026)


A fonte principal agora é `PraticarFront/src/features/showcase-v2/` + o `ShowcasePageTemplate` do DS. **Não criar outra home ou documentação visual em paralelo.** A home em `/` e as rotas `/components/[slug]`, `/templates/[slug]` e `/resources/[slug]` usam o índice real do Showcase V2. O layout estrutural e a navegação foram copiados/adaptados do original; o seletor de tema/idioma consome implementações da própria biblioteca. O layout customizado da fase 2 deixou de ser a página ativa e foi preservado somente como arquivo `.backup.txt`.


- [x] Portar shell público `ShowcasePageTemplate` (código/CSS de origem) e integrá-lo à home.
- [x] Portar `ShowcaseV2Page`, `ShowcaseV2Navigation` e índices originais 221/33 com slugs únicos e links.
- [x] Migrar 8 primitivas (`Select`, `Option`, `Container`, `Stack`, `Inline`, `Link`, `ThemeSelector`, `LocaleSelector`) + CSS de layout/preferências.
- [x] Conectar 13 demos de componentes reais da biblioteca à nova estrutura, sem renderizar clones das primitives.
- [x] Criar páginas pendentes explícitas para componentes, templates e recursos que ainda não foram migrados em runtime.
- [x] Atualizar verificador estrutural e rastreabilidade de origem.
- [x] Portar o store/ExampleScope, ExamplePreview, PropertyGrid, TechnicalGrid e integração de edição/reset/cópia nos 13 exemplos ativos, com Card do DS.
- [ ] Concluir a paridade integral do renderer original: DataGrid, useCollapse, ScenarioControls, ExampleBoundary, loaders, cenários e control-options das 221 páginas.
- [ ] Migrar e testar as demais páginas/exemplos da matriz 221/33.
- [ ] Migrar todas as SCs e garantir paridade de links, idioma e temas da origem.
- [ ] Rodar typecheck, build Next.js e inspeção visual nos viewports e estados do Showcase V2 original.


**Gate de aceite:** não confundir catálogos registrados com demos concluídas. Só alterar os checkboxes pendentes após evidência de execução real. Preservar as alterações do usuário no instalador `forge.ps1`.


## Marco 4 — motor Showcase V2 (parcial)


Os originais `ExampleScope`, store, grids/editors e `ShowcaseV2Template` foram portados para o portal com adaptações explicitadas em `docs/migration/STATUS.md`. O preview usa a implementação real do `Card`/partes/`Surface` de `@forge-ui/web`, preservando a base do DS. Até a migração do DataGrid, PropertyGrid/TechnicalGrid apresentam tabelas semânticas provisórias. **27** exports de componentes disponíveis, **13** demos integradas, **221/33** entradas catalogadas. Build, typecheck e comparação visual continuam pendentes.


### Marco 5 (2026-11-14) — executado parcialmente
Portados `DataGrid` e seus componentes públicos, `Icon`, `useCollapse`, SCs de origem, cenário/estado/boundary. As páginas de propriedades/métodos agora usam componentes reais do DS. Demos no renderer: 16/221. Continuam pendentes os demais componentes, loaders originais integrais, fixtures, validações de browser e integração de consumidores. Detalhes: `docs/migration/STATUS.md`.


## Marco 6 — matriz e componentes de feedback/identidade


- [x] Criar matriz de cobertura 221/33 com cruzamento entre export público, arquivo TSX, SC local, demo V2 e status (`docs/migration/COVERAGE.md`).
- [x] Portar Avatar, Skeleton, IconButton, Tag e família Alert (Alert, AlertHeader, AlertBody, AlertFooter), com CSS Modules, hooks, contexto, tipos e exports.
- [x] Portar as 5 definições e demos V2 originais com controle, código copiável, fixtures e SCs de origem; preservar adaptações e hashes no manifesto.
- [x] Usar Alert público no fallback do ExampleBoundary; manter o catálogo incompleto explicitamente marcado.
- [ ] Migrar as demais 200 páginas sem demo, inclusive 22 componentes já exportados sem demonstração, e os 33 recursos conforme cobertura.
- [ ] Consolidar todos os links de SCs, guias, templates e catálogos; executar a suíte real e comparar visualmente.


## Marco 7 — conciliação de duas linhas de migração e documentação


- [x] Integrar o commit `91ab08f` do Drive como base: preservar 8 componentes e 5 demos novos, sem reverter código ou manifestos.
- [x] Adaptar mais 7 definições V2 originais e conectá-las ao mesmo `OriginalDefinitionPage` / loader já existente, para 28 demos totais (12 originais + 16 adaptadores).
- [x] Copiar 59 SCs de componentes em caminhos canônicos, 29 SCs únicas de recursos, 47 contratos de tipos/helpers e SCs técnicas gerais; conservar o status da origem e registrar SHA-256.
- [x] Reconciliar a matriz única `docs/migration/COVERAGE.md`, que separa catálogo/export/demo/SC; incorporar auditoria de links e integridade dos manifestos sem npm.
- [ ] Completar as 15 demos de componentes já exportados; substituir 16 adaptadores por definições originais, migrar 178 páginas sem export e 162 SCs ausentes.
- [ ] Completar as páginas de recurso, hooks restantes, guias, catálogos e demais dependências documentais.
- [ ] Concluir typecheck, build, navegador, acessibilidade, paridade com o Showcase V2, logo e organização de duplicatas no Drive.
- [ ] Integração por submódulo e biblioteca app/Flutter em etapas futuras condicionadas a autorização.


## Marco 8 — continuação incremental em 14/11/2026


- [x] Especificar no Drive o próximo recorte de migração em `docs/migration/STEP8-SC.md` (SC-first).
- [x] Copiar 10 SCs canônicas faltantes, com referência aos arquivos originais. A presença documental não significa código concluído.
- [x] Extrair o componente `AspectRatio` do DS de origem e portar sua definição, hook e exemplo para o Showcase V2, com fixture adaptada e uso de API pública.
- [ ] Regenerar a matriz `COVERAGE.md` / `coverage-matrix.json` a partir da árvore íntegra e atualizar manifestos SHA por script, sem alterar números antigos retroativamente.
- [ ] Typecheck e build Next/React, inspeção de browser, paridade de temas/imagens, testes de acessibilidade e aceite funcional.
- [ ] Substituir as 16 demos adaptadoras restantes; portar os exports e SCs ainda ausentes pelas ondas por dependência.


**Após este marco (contagem por edição em código, ainda não validada):** 44 exports, 29 demos, 69 SCs de componentes; 177 entradas sem export e 152 SCs pendentes. Manter o quadro do marco 7 como último snapshot de cobertura gerada até que a matriz seja regenerada.






### Lote 2 — SimpleGrid, FieldHint e FieldError (15/11/2026)


- [x] Reutilizar as SCs canônicas já copiadas no marco 8, preservando seu estado histórico.
- [x] Publicar `SimpleGrid`, `FieldHint` e `FieldError` e seus tipos em `@forge-ui/web`; `SimpleGrid` usa a implementação que já estava copiada e os dois campos tiveram fontes/CSS Modules extraídos da origem.
- [x] Transportar os exemplos, hooks, snippets e definições V2 correspondentes; adaptar o alias de import e conectar as três páginas ao renderer e loader originais.
- [x] Registrar fontes, hashes SHA-256 e adaptações em `docs/migration/phase8-wave2-source-manifest.json`.
- [x] Executar verificação sintática local dos arquivos TS/TSX examinados e checagem de duplicatas no índice público. Essa verificação não substitui typecheck nem build.
- [ ] Regenerar a matriz de cobertura com `npm run coverage` em checkout íntegro; enquanto isso, manter último snapshot gerado do marco 7.
- [ ] Executar `npm run verify:docs`, `npm run verify:v2`, typecheck e build; então avaliar comportamento no browser, responsividade, acessibilidade, E2E e paridade.
- [ ] Substituir os 16 adaptadores temporários restantes, garantindo fixtures, cenários, eventos, reset, código e edição de propriedades.


**Após o lote 2, contagem provisória por inspeção:** 47 exports públicos únicos, 32 demos (16 V2 originais adaptadas e 16 adaptadores), 174 páginas sem export, 15 exports sem demo, 189 páginas sem demo, 69 SCs de componentes presentes. Esses números dependem da regeneração da matriz oficial.


**Escopo preservado:** PraticarFront, `forge.ps1`, Git remoto e consumidores não foram alterados.


## Implementação nativa por grupos

Plano detalhado e evidências em [FLUTTER-IMPLEMENTATION-REPORT.md](docs/migration/FLUTTER-IMPLEMENTATION-REPORT.md). Inventário em [FLUTTER-IMPLEMENTATION-PROGRESS.json](docs/migration/FLUTTER-IMPLEMENTATION-PROGRESS.json). Classes presentes não equivalem a aceite ou disponibilidade compilada no showcase.

### Validação das prévias nativas — 17/11/2026

- [x] Reexecutar análise Flutter, 113 testes da biblioteca e 353 do showcase, incluindo Option e as composições/feedback preparados nas etapas 4 e 5.
- [x] Compilar e registrar 68 prévias; verificar concordância entre catálogo, bootstrap e índice do portal.
- [x] Disponibilizar controles dos cenários e manter propriedades Dart documentadas mesmo sem prévia compilada.
- [x] Validar tokens, typecheck, documentação, build do portal e 10 rotas/artefatos HTTP.
- [ ] Completar exemplos dos demais componentes e critérios de paridade, acessibilidade e revisão visual em navegador/dispositivos.

Evidências e limites: [relatório consolidado](docs/migration/FLUTTER-IMPLEMENTATION-REPORT.md). As 221 APIs exportadas não são 221 SCs aceitas.
