#!/usr/bin/env node
/** Verifies only copied source provenance and the client-side original V2 slice. Not a React build. */
import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {verifiedMigrationFile} from './migration-integrity.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
let failures=0,count=0;
function verify(name,condition){if(!condition){console.error('[forge-sc] FALHA',name);failures++}}
for(const source of [
 'docs/migration/sc-wave1-manifest.json',
 'docs/migration/sc-support-manifest.json',
 'docs/migration/sc-dependency-manifest.json',
 'docs/migration/v2-wave6-source-manifest.json',
]){
 const entries=JSON.parse(read(source)).files;
 for(const item of entries){
  const file=join(root,item.target),actual=existsSync(file)?createHash('sha256').update(readFileSync(file,'utf8').replace(/\r\n/g,'\n')).digest('hex'):'missing';
  verify(`${source}: ${item.target}`,verifiedMigrationFile(root,item.target,item.sha256));
  count++;
 }
}
const names=['Select','Option','Container','Stack','Inline','Link','Surface'];
const client=read('showcase/portal/src/features/showcase-v2/components/OriginalDefinitions/OriginalDefinitionPage.tsx');
const loader=read('showcase/portal/src/features/showcase-v2/model/showcase-v2-live-loaders.ts');
for(const name of names){
 const base=`showcase/portal/src/features/showcase-v2/components/${name}`;
 verify(`original client ${name}`,client.includes(`../${name}/definition`)&&loader.includes(`"${name}"`));
 for(const file of ['definition.ts',`${name}.example.tsx`,`use${name}Example.ts`,'usage-code.ts']){
  const path=`${base}/${file}`;
  verify(`source ${path}`,existsSync(join(root,path)));
  const s=read(path);
  verify(`sem @/ imports ${path}`,!/from\s+["']@\//.test(s)&&!s.includes('import("@/design-system")'));
  if(file==='usage-code.ts'){
   verify(`snippet usa API pública ${name}`,s.includes('@forge-ui/web')&&!s.includes('FormField'));
  }
 }
}
console.log(`[forge-sc] ${count} arquivos de manifesto e ${names.length} definições originais auditados; ${failures} falhas (sem typecheck/build)`);
if(failures)process.exitCode=1;
