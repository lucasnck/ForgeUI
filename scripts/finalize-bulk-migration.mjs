/** Publish local migration evidence after the integrated check has completed. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFile(path.join(root,file),'utf8');
const matrix = JSON.parse(await read('docs/migration/coverage-matrix.json'));
const audit = JSON.parse(await read('docs/migration/bulk-migration-audit.json'));
const check = await read('.forge/bulk-check.log');
const portal = JSON.parse(await read('showcase/portal/package.json'));
if (!check.includes('Generating static pages using') || !check.includes('Finalizing page optimization') || /npm error|SecurityFatalError/.test(check) || !check.includes(`Next.js ${portal.dependencies.next}`)) throw new Error('Run the complete check successfully against the current portal version before finalizing.');
if (audit.sourceChanges.length || audit.unresolvedApplicationImports.length) throw new Error('Resolve source integrity or application imports before finalizing.');
const counts = matrix.counts;
const summary = `## Marco 10 — extração em lote executada localmente

Este quadro substitui as contagens e os bloqueios dos marcos anteriores; eles permanecem abaixo como histórico.

- Checkout completo disponível em \`PraticarWorkspace/PraticarFront\`; as três árvores foram inventariadas: **${audit.counts.sourceTreeFiles} arquivos**. Foram adicionados **${audit.counts.copiedInitially} arquivos** e preservados inicialmente **${audit.counts.preservedInitially} destinos adaptados**, antes da reconciliação auditada.
- **${counts.publicComponentExports}/${counts.catalogComponents} componentes** com implementação e export público, **${counts.componentDemos} definições originais conectadas** nas rotas de componentes/templates; nenhum adaptador simplificado está no fluxo ativo. As **33 páginas de recursos** usam o carregador original. Isso não equivale a teste interativo de cada componente.
- Todas as **${counts.componentsWithLocalSC} SCs de componentes** e referências dos 33 recursos estão presentes. Catálogo Forge separado das funcionalidades de negócio; caminhos antigos redirecionam às SCs canônicas. Auditoria: **zero links internos pendentes**.
- Dependências genéricas de preferências, temas, formatação e formulários passaram à biblioteca. Exportação por \`@forge-ui/web\` e subpaths de i18n/tema/forms. Nenhum alias de aplicação pendente; a biblioteca tem typecheck independente de Next.
- O controle de propriedades completo e as rotas de demonstração dos templates foram migrados; CSS global voltou a incluir bloqueio de scroll e redução de movimento.
- **PASS:** testes da migração (preservação de conflitos, hashes e rejeição de árvores sobrepostas), store de exemplos, verificações estruturais/V2/documentais, auditoria de origem, tipos da biblioteca e portal e build estático, via \`npm run check\`.
- Hashes de **${audit.sourceFilesVerified} arquivos de origem** conferidos, sem alterações. PraticarFront, \`forge.ps1\`, consumidores e Git remoto não foram alterados por esta execução.
- Portal atualizado para **Next.js ${portal.dependencies.next}**, após alerta concreto no 16.4.0. A auditoria também identificou um alerta alto no Zod 3; a correção indicada exige Zod 4 e não foi aplicada por alterar o contrato dos formulários. Requer uma migração própria, com critérios e testes.
- **PENDENTE:** interação e paridade visual/responsiva, acessibilidade em navegador e logo aprovado. O navegador local não está acessível pelas ferramentas desta conversa; build/SSR/HTTP não substituem essa validação.
- Flutter e integração dos consumidores por submódulo continuam etapas futuras. ZIP e evidências preparados **localmente**; nenhuma atualização do Drive ou publicação remota é alegada nesta execução.

Evidências: [cobertura](COVERAGE.md), [auditoria de fontes](bulk-migration-audit.json), [reconciliações](bulk-reconciliation-report.json), [contrato](SC-BULK-MIGRATION.md) e [validação](VALIDATION.md).

`;
const statusFile = 'docs/migration/STATUS.md';
let status = await read(statusFile);
if (!status.includes('## Marco 10 —')) {
  status = '# Forge UI — status da migração Showcase V2\n\n' + summary + '---\n\n## Histórico anterior à extração local\n\n' + status.replace(/^# Forge UI[^\n]*\r?\n/,'');
  await fs.writeFile(path.join(root,statusFile),status);
}
let plan = await read('PLAN.md');
if (!plan.includes('## Marco 10 —')) await fs.writeFile(path.join(root,'PLAN.md'),'# Forge UI — plano de criação e extração\n\n' + summary.replaceAll('(COVERAGE.md)','(docs/migration/COVERAGE.md)').replaceAll('(bulk-migration-audit.json)','(docs/migration/bulk-migration-audit.json)').replaceAll('(bulk-reconciliation-report.json)','(docs/migration/bulk-reconciliation-report.json)').replaceAll('(SC-BULK-MIGRATION.md)','(docs/migration/SC-BULK-MIGRATION.md)').replaceAll('(VALIDATION.md)','(docs/migration/VALIDATION.md)') + '---\n\n' + plan.replace(/^# Forge UI[^\n]*\r?\n/,''));
const priorReadme = path.join(root,'docs/migration/README-before-bulk.md');
await fs.copyFile(path.join(root,'README.md'),priorReadme,fs.constants.COPYFILE_EXCL).catch(error => {if(error.code !== 'EEXIST')throw error;});
await fs.writeFile(path.join(root,'README.md'), `# Forge UI

Design system extraído do PraticarFront, com biblioteca React/TypeScript independente de Next e um portal de Showcase V2. Aplicativos permanecem reservados para uma etapa futura.

## Executar

- Windows: \`forge.cmd start\`.
- macOS: \`./forge.command start\` ou \`./forge.sh start\`.
- Linux: \`./forge.sh start\`.

O launcher prepara Node.js e dependências pela raiz. Portal: http://localhost:3000. \`npm run check\` executa testes de migração/store, auditorias, tipos da biblioteca/portal e build. Consulte [execução local](docs/integration/local-setup.md).

## Estado atual

- ${counts.publicComponentExports} componentes com implementação, export público e definições originais ligadas ao portal.
- 33 páginas de recursos, incluindo hooks e estilos, e demonstrações completas de templates.
- ${counts.componentsWithLocalSC} especificações de componentes e auditoria documental sem links internos quebrados.
- Tipos e build estático verificados; **paridade visual, testes interativos e acessibilidade ainda pendentes**.
- Next.js ${portal.dependencies.next}; permanece um alerta alto do npm no Zod 3, cuja correção requer migração para Zod 4.

Veja [status atual](docs/migration/STATUS.md), [cobertura por item](docs/migration/COVERAGE.md), [evidências](docs/migration/VALIDATION.md) e [plano](PLAN.md). O histórico anterior do README está preservado em [arquivo de migração](docs/migration/README-before-bulk.md).

## Organização

- \`web/library/\`: componentes, hooks, estilos, tipos e suporte genérico; API \`@forge-ui/web\`.
- \`showcase/portal/\`: catálogo, exemplos originais e fluxos de demonstração.
- \`docs/sc/\`: contratos, catálogos e templates; fluxo SC-first e agentes em \`.github/agents/\`.
- \`docs/migration/\`: proveniência, hashes, cobertura, reconciliações e conteúdo histórico preservado.
- \`shared/\` e \`app/library/\`: fronteiras previstas para expansão; sem widgets Flutter implementados.

## Limites

A extração usa o checkout local do PraticarFront e não o modifica. SCs da origem conservam seu status histórico; não certificam o aceite no Forge. Não houve publicação NPM, push Git ou integração de consumidores. O logo aprovado será fornecido pelo usuário. A integração por submódulo terá atualização deliberada das referências dos consumidores.
`);
await fs.mkdir(path.join(root,'docs/migration/validation'),{recursive:true});
await fs.writeFile(path.join(root,'docs/migration/validation/bulk-check.log'),check);
await fs.writeFile(path.join(root,'docs/migration/VALIDATION.md'), `# Validação da extração local

- Comando integrado: \`npm run check\` — PASS. Saída: [log completo](validation/bulk-check.log).
- Biblioteca React isolada: TypeScript com todos os arquivos TS/TSX, incluindo testes de contratos de tipos e declarações CSS próprias; sem dependência de Next.
- Portal: TypeScript e Next.js ${portal.dependencies.next} build estático — PASS. Inclui todas as rotas do catálogo, recursos e demonstrações completas de templates.
- Migração: ${audit.sourceFilesVerified} hashes da origem preservados; ${audit.counts.sourceTreeFiles} destinos das árvores principais presentes; zero imports \`@/\` de aplicação na AST. [Relatório](bulk-migration-audit.json).
- Documentação: [auditoria de links](SC-LINK-REPORT.md), zero referências relativas pendentes na seleção de SCs.
- Idempotência: inventário posterior encontrou zero arquivos a copiar e zero aliases bloqueados. Arquivos adaptados permanecem preservados; o teste de fixtures verifica conflitos e rejeição de origem/destino sobrepostos.
- Origem, bootstrap Windows, consumidores e Git remoto preservados.
- Browser/visual/interação/a11y: **não executados**, pois o acesso ao navegador local não está disponível nesta conversa. Não inferir paridade a partir de build, SSR ou resposta HTTP.
- Não há script de lint configurado neste workspace; lint não é apresentado como aprovado.
- Segurança: Next 16.4.0 substituído pelo patch ${portal.dependencies.next}. O alerta alto do Zod 3 continua pendente; a correção reportada pelo npm exige uma atualização maior. Não aplicar migração silenciosa de schemas.
- Drive e publicação remota: não executados nesta continuação local.
`);
console.log('Updated PLAN, STATUS, README and local validation evidence.');
