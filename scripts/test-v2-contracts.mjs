#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { verifiedMigrationFile } from './migration-integrity.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const content=path=>readFileSync(join(root,path),'utf8');
const exists=path=>existsSync(join(root,path));
let failed=0;
function check(label,ok){ console.log(`[forge-v2] ${ok?'OK':'FAIL'} ${label}`);if(!ok)failed++; }
const manifest=JSON.parse(content('docs/migration/v2-datagrid-source-manifest.json'));
for(const r of manifest.files){
  const actual=exists(r.target)?createHash('sha256').update(content(r.target)).digest('hex'):null;
  check(`fonte ou reconciliação ${r.target}`,verifiedMigrationFile(root,r.target,r.sha256));
}
const entry=content('web/library/src/index.ts');
for(const component of ['Icon','DataGrid','DataGridHeader','DataGridBody','DataGridRow','DataGridCell','DataGridColumnHeader','DataGridFooter'])
 check(`export público ${component}`,entry.includes(`export { ${component} }`));
check('hook público useCollapse',entry.includes('export { useCollapse }'));
for(const route of ['PropertyGrid/PropertyGrid.tsx','TechnicalGrid/TechnicalGrid.tsx','ExampleState/ScenarioControls.tsx','ExampleState/ExampleState.tsx']){
 const f=content('showcase/portal/src/features/showcase-v2/components/'+route);
 check(`${route} compõe DataGrid original`,f.includes('<DataGrid')&&f.includes('<DataGridHeader')&&f.includes('<DataGridBody')&&f.includes('from "@forge-ui/web"')&&!f.includes('<table'));
}
const preview=content('showcase/portal/src/features/showcase-v2/components/ExamplePreview/ExamplePreview.tsx');
check('preview com useCollapse e boundary',preview.includes('useCollapse')&&preview.includes('<ExampleBoundary')&&preview.includes('collapse.bodyProps'));
const template=content('showcase/portal/src/features/showcase-v2/components/ShowcaseV2Template/ShowcaseV2Template.tsx');
check('controls ativos no template',template.includes('<ScenarioControls'));
const loader=content('showcase/portal/src/features/showcase-v2/model/showcase-v2-live-loaders.ts');
check('loader V2 usa import dinâmico',loader.includes('await import(')&&loader.includes('adapterNames.has(name)')&&loader.includes('originalNames.has(name)'));
const demos=content('showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveExamples.tsx');
const count=[...demos.matchAll(/\{ key: "[A-Za-z]+", description:/g)].length;
check('16 demos reais registradas',count===16&&demos.includes('case "DataGrid"')&&demos.includes('case "Icon"')&&demos.includes('case "Card"'));
const def=content('showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveDefinitionPage.tsx');
check('DataGrid com dois cenários',def.includes('name === "DataGrid"')&&def.includes('emptyGrid'));
console.log(`[forge-v2] ${failed?'FALHA':'APROVADO'} contratos estáticos; typecheck/build/visual não inclusos.`);
if(failed)process.exitCode=1;
