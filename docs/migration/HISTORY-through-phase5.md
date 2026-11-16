# Forge UI — status da migração Showcase V2

Atualizado em 2026-11-14. **MIGRAÇÃO PARCIAL: shell, registro e motor básico das páginas portados; build/browser ainda não validados.**

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
