# Forge UI

Design system independente extraído do PraticarFront, com biblioteca React/TypeScript e um showcase Next.js para explorar contratos, temas, componentes e exemplos. A implementação Flutter está reservada para uma fase posterior.

## Estrutura

- `web/library/`: biblioteca de componentes web e seus exports públicos.
- `shared/tokens/`: tokens compartilháveis entre plataformas (sem prometer geração Flutter ainda).
- `showcase/portal/`: portal web independente, com catálogo e demonstrações.
- `docs/sc/`: especificações e critérios de aceitação no fluxo SC-first.
- `.github/agents/`: contratos de autoria e implementação.
- `app/library/`: reserva de espaço para implementação Flutter futura.

## Fluxo

1. Elaborar ou atualizar a especificação da mudança em `docs/sc/` e marcar `PENDING`.
2. Implementar somente o escopo autorizado, priorizando dependências genéricas.
3. Verificar contratos, lint, tipos, build e, quando aplicável, cenários visuais/acessibilidade.
4. Marcar `DONE` apenas com evidências, sem transportar o status `DONE` do PraticarFront por suposição.

## Origem e limites

Fonte: `AiWorkzone/PraticarWorkspace/PraticarFront` (Google Drive). A origem permanece inalterada nesta extração. Nenhuma integração por submódulo ou publicação NPM é presumida. A biblioteca web é independente de regras de negócio, autenticação e endpoints do Praticar.

## Situação

A estrutura de pastas é estabelecida por etapas. Consulte `PLAN.md` para a lista completa e `docs/migration/` para o que foi efetivamente transportado e verificado. Este README não declara o showcase concluído ou validado sem build e inspeção.

## Git e execução local

Repositório de destino: `https://github.com/lucasnck/ForgeUI.git`.

Execute um único lançador na raiz do projeto. Não é necessário entrar nas pastas de cada aplicativo nem executar instalações individuais.

- **Windows:** duplo clique em `forge.cmd` ou execute `forge.cmd start`.
- **macOS:** abra `forge.command` ou execute `./forge.sh start`.
- **Linux:** execute `./forge.sh start`.

Os lançadores instalam automaticamente Node.js 22 (se necessário, no diretório local `.forge/tools/`) e as dependências npm de todos os workspaces **pela raiz**. É necessário acesso à internet na primeira execução. Nenhum passo exige `npm install` manual dentro de projetos filhos.

Também estão disponíveis `setup` (só instalação), `doctor` (inspeção), `check` (tipos e build), `build`, `typecheck` e `clean` (apaga apenas saídas e dependências geradas). Exemplos: `forge.cmd doctor` no Windows e `./forge.sh check` no macOS/Linux.

A execução do showcase exige que as dependências sejam obtidas do registro npm. Se o ambiente estiver offline, `doctor` informa a ausência de pacotes e a instalação relata o erro sem marcar a verificação como concluída.

## Migração em andamento — catálogo parcial e execução

A biblioteca possui 13 átomos oriundos do PraticarFront. Os sete componentes da segunda fase são `Textarea`, `Switch`, `Radio`, `Label`, `Divider`, `Heading` e `VisuallyHidden`, com cópias de origem rastreáveis por SHA-256 em `docs/migration/source-manifest.json`. O portal oferece exemplos interativos, mas a cobertura integral do Showcase V2 ainda está pendente.

Para executar, use **um launcher na raiz**: Windows `forge.cmd start` (ou PowerShell `./forge.ps1 start`); macOS `./forge.command`/`./forge.sh start`; Linux `./forge.sh start`. Os scripts verificam a estrutura, detectam dependências e executam `npm install` apenas na raiz quando necessário. Para uma verificação offline use `node scripts/verify-workspace.mjs`; para validar dependências, tipos e build com acesso à internet use `forge.cmd check` ou `./forge.sh check`.

**Limite:** esta versão passou na verificação estática local, mas não houve instalação de dependências/build/inspeção visual neste sandbox por falha de DNS no npm. Consulte `docs/migration/STATUS.md`.


## Showcase V2 do Forge UI (migração incremental)

A home `/` usa o `ShowcasePageTemplate` original do Design System, com `ShowcaseV2Page` e navegação da origem. Os caminhos `/components/<slug>`, `/templates/<slug>` e `/resources/<slug>` preservam o índice original (221 componentes, 33 recursos); **13 demos estão disponíveis**, os demais itens têm status pendente e não prometem comportamento não migrado. Nesta fatia o DS tem 27 exports de componentes (incluindo a família Card). Não execute `npm install` manualmente; os launchers na raiz gerenciam o ambiente.

Validação independente de dependências: `node scripts/verify-workspace.mjs`. Para validação completa no computador com Next/React instalados: `./forge.cmd check` no Windows ou `./forge.sh check` no macOS/Linux. O resultado deste último comando ainda não foi confirmado para a migração V2. Veja `docs/migration/STATUS.md`.

## Renderer V2 (marco 4)

A rota de cada um dos 13 componentes migrados passa pelo `ShowcaseV2Renderer`, com `ExampleScope`, `ExamplePreview`, `PropertyGrid`, `TechnicalGrid`, controles editáveis e reset. O preview usa `Card`, `CardHeader`, `CardBody`, `CardFooter` e `Surface` da biblioteca. A composição completa do Showcase V2 original ainda depende de `DataGrid`, `useCollapse`, `ScenarioControls`, `ExampleBoundary`, loaders e exemplos de componentes que ainda não foram migrados. Ver `docs/migration/STATUS.md`.

### Showcase V2 — marco 5
A home e o catálogo V2 incluem 16 demos de componentes reais; `DataGrid` suporta cenários com dados e vazios. A documentação de propriedades usa `DataGrid` público. `npm run verify:v2` audita a integridade da extração, mas não substitui `npm run typecheck` ou `npm run build`. Não confunda as 221 entradas de catálogo com demos ou componentes testados.

## Migração do Showcase V2 — estado auditável

O catálogo original contém 221 páginas de componentes e 33 recursos, mas isso não significa que todos estejam migrados. No marco 6 existem 43 componentes públicos e 21 demos, incluindo cinco definições V2 originais adaptadas. Execute `npm run coverage` para regenerar a matriz e consulte `docs/migration/COVERAGE.md` e `docs/migration/STATUS.md`. A validação de build/browser ainda é pendente.

## Marco 7 — cobertura consolidada do Showcase V2

A biblioteca possui **43 componentes públicos** e o portal oferece **28 demos em código** (12 com as definições originais V2 adaptadas; 16 ainda com adaptadores temporários) em um catálogo de 221 páginas de componentes e 33 páginas de recursos. Há **59 SCs** de componentes nos caminhos do índice, 29 arquivos únicos que cobrem as 33 SCs de recursos e 47 documentos de tipos/helpers. Esses valores não atestam compilação ou paridade visual.

Para a lista atual por item: `docs/migration/COVERAGE.md` (`node scripts/generate-migration-coverage.mjs`). Para auditabilidade documental: `npm run verify:docs` e `docs/migration/SC-LINK-REPORT.md`; 12 links ainda pendem de componentes não migrados. O `PLAN.md` e o `STATUS.md` foram conciliados mantendo o histórico. Não foi instalado nenhum pacote nem alterado o bootstrap Windows durante este marco.


## Migração integral a partir do PraticarFront

Quando o checkout integral do PraticarFront estiver disponível como pasta irmã de ForgeUI, a migração **em lote** substitui o fluxo manual por componente:

```bash
npm run test:migrate:bulk
npm run audit:migrate:bulk -- --source ../PraticarWorkspace/PraticarFront
npm run migrate:bulk -- --source ../PraticarWorkspace/PraticarFront
```

O comando recursa `src/design-system`, `src/features/showcase-v2` e `docs/sc/ds`; mantém imports relativos, adapta aliases dos projetos, conserva arquivos já adaptados no Forge UI e escreve `docs/migration/bulk-migration-report.json` com hashes e bloqueadores. Sem `--apply`, só inventaria; `migrate:bulk` inclui `--apply`. Ele nunca escreve no PraticarFront.

**Importante:** a cópia não comprova compilação, paridade nem publicação das 221 entradas do catálogo. Revise o relatório, resolva aliases externos e conflitos e execute os verificadores e build. O `ForgeUI-git-ready.zip` do Drive é um snapshot anterior; só o substitua depois de gerar um pacote a partir do checkout atualizado.
