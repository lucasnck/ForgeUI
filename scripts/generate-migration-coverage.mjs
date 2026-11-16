#!/usr/bin/env node
/** Inventory of actual source exports, V2 routes, executable demos and local SCs. No build dependency. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(join(root, path), 'utf8');
const exists = path => existsSync(join(root, path));
const model = 'showcase/portal/src/features/showcase-v2/model/';
const source = 'web/library/src/design-system/components/';
const publicApi = read('web/library/src/index.ts');
const live = read('showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveExamples.tsx');
const index = read(model + 'showcase-v2-index.ts');
const resourceIndex = read(model + 'showcase-v2-resources.ts');
const catalogBlock = /\{([^{}]+)\}/g;
function field(block, name) { return block.match(new RegExp(`\\b${name}:\\s*"([^"]+)"`))?.[1]; }
const componentEntries = [...index.slice(index.indexOf('['), index.indexOf('];')+2).matchAll(catalogBlock)]
  .map(m => ({name:field(m[1],'name'),slug:field(m[1],'slug'),level:field(m[1],'level'),originalSpec:field(m[1],'specification')}))
  .filter(e => e.name && e.slug && e.level && e.originalSpec);
const resourcePattern = /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*kind:\s*"([^"]+)",\s*specification:\s*"([^"]+)",\s*source:\s*"([^"]+)"\s*,?\s*\}/g;
const adapterNames = new Set([...live.matchAll(/\{\s*key:\s*"([A-Za-z]+)",\s*description:/g)].map(m=>m[1]));
const originalNamesSource = read(model + 'showcase-v2-live-loaders.ts').match(/originalNames:[^=]+=\s*new Set\(\[([^\]]+)\]\)/)?.[1] ?? '';
const fullLoader = read(model + 'showcase-v2-loaders.ts');
const usesFullLoader = read('showcase/portal/src/app/(catalog)/components/[slug]/page.tsx').includes('<ShowcaseV2Entry');
const originalNames = new Set(usesFullLoader
  ? componentEntries.filter(entry => fullLoader.includes(`../components/${entry.name}/definition`)).map(entry => entry.name)
  : [...originalNamesSource.matchAll(/"([^"]+)"/g)].map(m=>m[1]));
const publicFile = join(root, 'web/library/src/index.ts');
const program = ts.createProgram([publicFile], { moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, skipLibCheck: true, noEmit: true });
const checker = program.getTypeChecker();
const symbol = checker.getSymbolAtLocation(program.getSourceFile(publicFile));
const exports = new Set(checker.getExportsOfModule(symbol).map(symbol => symbol.name));
const exportSymbols = new Map(checker.getExportsOfModule(symbol).map(symbol => [symbol.name, symbol]));
function implementation(name) {
  let exported = exportSymbols.get(name);
  if (!exported) return null;
  if (exported.flags & ts.SymbolFlags.Alias) exported = checker.getAliasedSymbol(exported);
  const file = exported.declarations?.map(declaration => declaration.getSourceFile().fileName)
    .find(file => file.replaceAll('\\', '/').includes('/web/library/src/'));
  return file ? relative(root, file).replaceAll('\\', '/') : null;
}
const components = componentEntries.map(({ name, slug, level, originalSpec }) => {
  const libraryFile = implementation(name) ?? `${source}${level}/${name}/${name}.tsx`;
  const scFile = originalSpec; // canonical Showcase V2 index path, not the old legacy docs folder
  const originalDefinitionFile = `showcase/portal/src/features/showcase-v2/components/${name}/definition.ts`;
  const exported = exports.has(name) && exists(libraryFile);
  const originalDemo = originalNames.has(name) && exists(originalDefinitionFile) && exported;
  const adapterDemo = !usesFullLoader && adapterNames.has(name) && exported;
  return {
    name, slug, level, originalSpec, libraryFile: exists(libraryFile) ? libraryFile : null,
    publicExport: exported, localSpec: exists(scFile) ? scFile : null,
    demo: originalDemo ? 'original-v2-adapted' : adapterDemo ? 'v2-adapter' : null,
    definitionFile: originalDemo ? originalDefinitionFile : null,
    status: originalDemo ? 'original-demo-adapted' : adapterDemo ? 'adapter-demo' : exported ? 'library-only' : 'catalog-only',
  };
});
const resourceFiles = new Map([
  ['useCollapse','web/library/src/design-system/hooks/collapse/useCollapse.ts'],
  ['Design tokens','web/library/src/design-system/styles/tokens.css'],
  ['Data Grid recipes','web/library/src/design-system/styles/data-grid-components.module.css'],
  ['Icon recipes','web/library/src/design-system/styles/icon-components.module.css'],
  ['Motion recipes','web/library/src/design-system/styles/motion-components.module.css'],
]);
const resources = [...resourceIndex.matchAll(resourcePattern)].map(([,slug,name,kind,originalSpec,originalSource])=>{
  const localFile = resourceFiles.get(name) ?? (kind === 'hook' ? implementation(name) : originalSource.replace(/^@\/design-system\//, 'web/library/src/design-system/').replace(/^src\/design-system\//, 'web/library/src/design-system/'));
  const scFile = originalSpec.replace('docs/sc/ds/','docs/sc/ds/');
  return {name,slug,kind,originalSpec,originalSource,localFile:localFile && exists(localFile) ? localFile : null,localSpec:exists(scFile)?scFile:null,
    demo:null,status:localFile&&exists(localFile)?'source-present-unverified':'catalog-only'};
});
const counts = {
  catalogComponents: components.length, catalogResources: resources.length,
  publicComponentExports: components.filter(x=>x.publicExport).length,
  componentDemos: components.filter(x=>x.demo).length,
  originalV2Demos: components.filter(x=>x.demo==='original-v2-adapted').length,
  adapterV2Demos: components.filter(x=>x.demo==='v2-adapter').length,
  componentsWithLocalSC: components.filter(x=>x.localSpec).length,
  libraryOnly: components.filter(x=>x.status==='library-only').length,
  catalogOnly: components.filter(x=>x.status==='catalog-only').length,
  resourcesWithLocalSource: resources.filter(x=>x.localFile).length,
  resourcesWithLocalSC: resources.filter(x=>x.localSpec).length,
};
if(counts.catalogComponents!==221 || counts.catalogResources!==33)throw new Error(`Unexpected source index size: ${JSON.stringify(counts)}`);
if(counts.publicComponentExports<43 || counts.componentDemos<21)throw new Error(`Unexpected migrated slice: ${JSON.stringify(counts)}`);
const result = {generatedFrom:'Forge UI source tree, not browser verification',source:'PraticarFront Showcase V2 indexes (preserved in Forge UI)',counts,components,resources};
writeFileSync(join(root,'docs/migration/coverage-matrix.json'),JSON.stringify(result,null,2)+'\n');
const lines = [
  '# Forge UI — matriz de cobertura da migração',
  '',
  '> Gerada automaticamente por `node scripts/generate-migration-coverage.mjs`. Não significa aceite visual ou build.',
  '',
  '| Métrica | Quantidade |','| --- | ---: |',
  `| Páginas de componentes catalogadas | ${counts.catalogComponents} |`,
  `| Recursos catalogados | ${counts.catalogResources} |`,
  `| Componentes públicos com arquivo + export | ${counts.publicComponentExports} |`,
  `| Páginas com demo integrada | ${counts.componentDemos} |`,
  `| Demos originais V2 adaptadas | ${counts.originalV2Demos} |`,
  `| Demos com adaptador temporário V2 | ${counts.adapterV2Demos} |`,
  `| Componentes com SC original copiada | ${counts.componentsWithLocalSC} |`,
  `| Biblioteca sem demo | ${counts.libraryOnly} |`,
  `| Apenas catálogo (sem biblioteca) | ${counts.catalogOnly} |`,
  `| Recursos com arquivo local conhecido | ${counts.resourcesWithLocalSource} |`,
  '',
  '## Componentes',
  '',
  '| Componente | Nível | Biblioteca | Demo | SC local |',
  '| --- | --- | --- | --- | --- |',
  ...components.map(x=>`| ${x.name} | ${x.level} | ${x.publicExport?'Sim':'Não'} | ${x.demo??'Pendente'} | ${x.localSpec?'Sim':'Não'} |`),
  '', '## Recursos', '',
  '| Recurso | Tipo | Arquivo local | SC local |',
  '| --- | --- | --- | --- |',
  ...resources.map(x=>`| ${x.name} | ${x.kind} | ${x.localFile?'Sim':'Não'} | ${x.localSpec?'Sim':'Não'} |`),
  '', '## Critérios', '',
  '- `original-v2-adapted`: definição, exemplo, hook e snippet portados da origem; requer validação de navegador.',
  '- `v2-adapter`: demo executável via adaptador simplificado; **não** possui paridade integral de metadados com a origem.',
  '- `library-only`: arquivo e export públicos, mas a página do catálogo ainda não tem demo.',
  '- `catalog-only`: slug original existe, porém biblioteca e exemplo não foram extraídos.',
  '- A contagem de componentes públicos não inclui hooks nem equivale ao número de páginas do catálogo.',
  '- SCs originais mantêm status histórico; presença do arquivo não comprova migração aceita.',
  '- Recursos `source-present-unverified` não equivalem a demonstração executável ou documentação concluída.',
  ''
];
writeFileSync(join(root,'docs/migration/COVERAGE.md'),lines.join('\n'));
console.log(JSON.stringify(counts,null,2));
