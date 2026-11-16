#!/usr/bin/env node
/**
 * ForgeUI source-first bulk migration (idempotent; never mutates PraticarFront).
 * Usage: node scripts/migrate-from-praticarfront.mjs --source ../PraticarWorkspace/PraticarFront --apply
 * Dry-run without --apply; --overwrite-source only for explicit audited refresh.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const defaultTarget = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const value = (key, fallback) => { const i = args.indexOf(key); return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback; };
const opts = {
  source: path.resolve(value('--source', path.resolve(defaultTarget, '../PraticarWorkspace/PraticarFront'))),
  target: path.resolve(value('--target', defaultTarget)),
  apply: args.includes('--apply'),
  overwrite: args.includes('--overwrite-source'),
};
const mappings = [
  ['src/design-system', 'web/library/src/design-system', 'library'],
  ['src/features/showcase-v2', 'showcase/portal/src/features/showcase-v2', 'showcase'],
  ['docs/sc/ds', 'docs/sc/ds', 'specifications'],
];
const textExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.scss', '.json', '.md', '.mdx']);
const hash = b => createHash('sha256').update(b).digest('hex');
const toSlash = x => x.replaceAll(path.sep, '/');
const relativeSpec = (file, absolute) => { let rel = toSlash(path.relative(path.dirname(file), absolute)); if (!rel.startsWith('.')) rel = './' + rel; return rel; };
const report = {strategy:'copy-directory-then-codemod',source:opts.source,target:opts.target,apply:opts.apply,overwrite:opts.overwrite,items:[],unresolved:[],counts:{found:0,copied:0,unchanged:0,preserved:0,rewritten:0,blocked:0}};
function rewriteImport(spec, dst, role) {
  if (role === 'specifications') return spec;
  if (role === 'library' && (spec === '@/design-system' || spec.startsWith('@/design-system/'))) {
    const tail = spec.slice('@/design-system'.length).replace(/^\//,'');
    return relativeSpec(dst, path.join(opts.target,'web/library/src/design-system',tail));
  }
  if (role === 'showcase' && (spec === '@/design-system' || spec.startsWith('@/design-system/'))) {
    // Source-relative references are intentionally resolved into the library; public usage
    // is then reconciled through @forge-ui/web exports rather than hiding a fake API.
    if (spec === '@/design-system') return '@forge-ui/web';
    const tail = spec.slice('@/design-system/'.length);
    return relativeSpec(dst, path.join(opts.target,'web/library/src/design-system',tail));
  }
  if (role === 'showcase' && (spec === '@/features/showcase-v2' || spec.startsWith('@/features/showcase-v2/'))) {
    const tail = spec.slice('@/features/showcase-v2'.length).replace(/^\//,'');
    return relativeSpec(dst, path.join(opts.target,'showcase/portal/src/features/showcase-v2',tail));
  }
  return spec;
}
function transform(code,dst,role) {
  let changes=[];
  // Only transform module specifiers; do not replace arbitrary strings/comments.
  const pattern = /((?:\bfrom\s*|\bimport\s*\(|\brequire\s*\(|\bimport\s*|\bexport\s+[^;]*?\bfrom\s*)['"])(@\/[^'"\n]+)(['"])/g;
  let output = code.replace(pattern, (full,before,imp,after)=>{
    const newImp=rewriteImport(imp,dst,role);
    if(newImp !== imp){changes.push({before:imp,after:newImp});return before+newImp+after;}
    return full;
  });
  return {output,changes};
}
async function* walk(dir) {
  let entries; try{entries=await fs.readdir(dir,{withFileTypes:true});}catch(e){if(e.code==='ENOENT')return;throw e;}
  for(const e of entries.sort((a,b)=>a.name.localeCompare(b.name))){
    if(e.name==='.git'||e.name==='node_modules'||e.name==='.next')continue;
    const absolute=path.join(dir,e.name);
    if(e.isDirectory()) yield* walk(absolute);
    else if(e.isFile()) yield absolute;
  }
}
async function ensureSource() {
  const relation = path.relative(opts.source, opts.target);
  const reverse = path.relative(opts.target, opts.source);
  const nested = rel => rel === '' || (!rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel));
  if (nested(relation) || nested(reverse)) throw new Error('Source and target trees must not overlap');
  const exists=await Promise.all(mappings.map(async ([src])=>fs.stat(path.join(opts.source,src)).then(x=>x.isDirectory()).catch(()=>false)));
  if(!exists.every(Boolean))throw new Error('Source checkout incomplete; missing: '+mappings.filter((_,i)=>!exists[i]).map(x=>x[0]).join(', '));
  if(path.resolve(opts.source)===path.resolve(opts.target))throw new Error('Source cannot equal target');
}
await ensureSource();
for(const [sourceRel,destRel,role] of mappings){
  for await (const src of walk(path.join(opts.source,sourceRel))){
    const sub=path.relative(path.join(opts.source,sourceRel),src);
    const dst=path.join(opts.target,destRel,sub);
    const initial=await fs.readFile(src);
    const textual=textExtensions.has(path.extname(src)) && !initial.includes(0);
    let output=initial,changes=[];
    if(textual && ['.ts','.tsx','.js','.jsx','.mjs'].includes(path.extname(src))){
      const transformed=transform(initial.toString('utf8'),dst,role);output=Buffer.from(transformed.output);changes=transformed.changes;
    }
    const existing=await fs.readFile(dst).catch(e=>e.code==='ENOENT'?null:Promise.reject(e));
    const status=!existing?'copied':hash(existing)===hash(output)?'unchanged':opts.overwrite?'replaced':'preserved';
    report.counts.found++;report.counts[status==='replaced'?'copied':status]++;
    if(changes.length)report.counts.rewritten++;
    if(opts.apply && (status==='copied'||status==='replaced')){await fs.mkdir(path.dirname(dst),{recursive:true});await fs.writeFile(dst,output);}
    const actual = status === 'preserved' ? existing : output;
    const item={from:toSlash(path.relative(opts.source,src)),to:toSlash(path.relative(opts.target,dst)),status,sourceSha256:hash(initial),targetSha256:hash(actual),proposedSha256:hash(output)};
    if(changes.length)item.importRewrites=changes;
    report.items.push(item);
    if(textual && ['.ts','.tsx','.js','.jsx','.mjs'].includes(path.extname(src))){
      const content=actual.toString('utf8');
      const unresolved=[...content.matchAll(/(?:from\s*|import\s*\(|require\s*\()['"](@\/[^'"\n]+)['"]/g)].map(x=>x[1]);
      for(const alias of [...new Set(unresolved)]){report.unresolved.push({file:item.to,alias,reason:'App-level alias still requires explicit ownership classification'});report.counts.blocked++;}
    }
  }
}
const out=path.join(opts.target,'docs/migration/bulk-migration-report.json');
if(opts.apply){await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify({mode:opts.apply?'applied':'dry-run',...report.counts,unresolved:report.unresolved.slice(0,30),report:toSlash(path.relative(opts.target,out))},null,2));
if(report.counts.blocked)process.exitCode=2;
