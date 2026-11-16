#!/usr/bin/env node
/** Record documentation links without implying all components or linked SCs are migrated. */
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'node:fs';
import {join, dirname, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const base=join(root,'docs/sc');
function walk(dir){if(!existsSync(dir))return[];return readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(join(dir,x.name)):[join(dir,x.name)])}
const files=walk(base).filter(x=>x.endsWith('.sc.md') && (!x.includes('/ds/') || /\/ds\/(components|hooks|styles|types|helpers)\//.test(x)));
const unresolved=[];let links=0;
for(const file of files){
 const body=readFileSync(file,'utf8');
 for(const match of body.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)){
  const target=match[1].trim();
  if(target.startsWith('#') || /^(?:https?:|mailto:|tel:|data:)/i.test(target))continue;
  if(/\\d|\[\d/.test(target))continue; // prose regex/example accidentally formatted as markdown
  links++;
  if(!existsSync(join(dirname(file),target)))unresolved.push({from:relative(root,file).replace(/\\/g,'/'),link:target});
 }
}
const unique=[...new Set(unresolved.map(x=>`${x.from} → ${x.link}`))].sort();
const text=['# Forge UI — Auditoria de links internos das SCs','',
'> Gerado por `node scripts/audit-sc-links.mjs`. Documentação carregada não prova a implementação do componente e links pendentes podem apontar a SCs de componentes ainda não extraídos.','',
`- SCs inspecionadas: **${files.length}**.`,
`- Referências relativas inspecionadas: **${links}**.`,
`- Referências não resolvidas: **${unresolved.length}** (${unique.length} pares únicos).`,
'', '## Referências pendentes','',
...(unique.length?unique.map(x=>`- \`${x.replace(/`/g,'\\`')}\``):['Nenhuma referência pendente nesta seleção de documentos.']),
''];
writeFileSync(join(root,'docs/migration/SC-LINK-REPORT.md'),text.join('\n'));
console.log(`[SC] ${files.length} documentos, ${links} links relativos, ${unresolved.length} links pendentes (${unique.length} pares)`);
