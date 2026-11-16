#!/usr/bin/env node
/** Source integrity + new original V2 integration. Does not certify React/Next runtime. */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { verifiedMigrationFile } from './migration-integrity.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
let fails=0;
function check(name,ok){console.log(`[forge-p6] ${ok?'OK':'FALHA'} ${name}`);if(!ok)fails++;}
const manifest=JSON.parse(read('docs/migration/v2-source-batch6-manifest.json'));
for(const item of manifest.files){
 const target=join(root,item.target);
 check(`hash ou reconciliação auditada ${item.target}`,verifiedMigrationFile(root,item.target,item.sha256));
}
const entry=read('web/library/src/index.ts');
for(const name of ['Avatar','Skeleton','IconButton','Tag','Alert','AlertHeader','AlertBody','AlertFooter']){
 check(`public API ${name}`,entry.includes(`export { ${name} }`)&&entry.includes(`export type { ${name}Props }`));
 const level=['Avatar','Skeleton','AlertHeader','AlertBody','AlertFooter'].includes(name)?'atoms':'molecules';
 check(`SC original ${name}`,existsSync(join(root,`docs/sc/ds/${level}/${name}.sc.md`)));
}
const loader=read('showcase/portal/src/features/showcase-v2/model/showcase-v2-live-loaders.ts');
for(const name of ['Avatar','Skeleton','IconButton','Tag','Alert']){
 const dir=`showcase/portal/src/features/showcase-v2/components/${name}`;
 for(const file of ['definition.ts',`${name}.example.tsx`,`use${name}Example.ts`,'usage-code.ts'])check(`V2 original ${name}/${file}`,existsSync(join(root,`${dir}/${file}`)));
 check(`loader ${name}`,loader.includes(`"${name}"`));
 check(`spec Forge ${name}`,read(`${dir}/definition.ts`).includes(`docs/sc/ds/`));
}
const boundary=read('showcase/portal/src/features/showcase-v2/components/ExampleState/ExampleBoundary.tsx');
check('boundary usa Alert público',boundary.includes('Alert, AlertBody')&&boundary.includes('<Alert announcement="assertive"'));
const coverage=JSON.parse(read('docs/migration/coverage-matrix.json'));
check('catálogo e matriz',coverage.counts.catalogComponents===221&&coverage.counts.catalogResources===33);
check('biblioteca 43 e demos 21',coverage.counts.publicComponentExports>=43&&coverage.counts.componentDemos>=21&&coverage.counts.originalV2Demos>=5);
check('fixture Avatar local',existsSync(join(root,'showcase/portal/public/images/showcase/accordion-landscape.svg')));
console.log(`[forge-p6] ${fails?'FALHA':'APROVADO'} verificações estruturais (não são build/browser)`);
if(fails)process.exitCode=1;
