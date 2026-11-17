import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// One-time importer for the approved CSS baseline. The generated JSON is canonical after import.
// Use the project's existing PostCSS dependency when available; the generator itself uses only Node.
let postcss;
try { postcss = require('postcss'); }
catch { throw new Error('PostCSS is required only for importing a legacy CSS baseline'); }
const repo = path.resolve(import.meta.dirname, '../..');
const input = process.argv[2] || path.join(repo, 'web/library/src/design-system/styles/tokens.css');
const css = fs.readFileSync(input, 'utf8');
const root = postcss.parse(css);
const primitives = {}, semantic = {}, themes = {light:{},dark:{},contrast:{},'liquid-glass':{}}, webOnly={};
let sequence=0;
const replacements=[];
const classify=(prop,value)=> {
 if(prop.startsWith('--color-')||prop.startsWith('--surface-')||prop.startsWith('--page-')||prop.startsWith('--text-')||prop.startsWith('--scrollbar-')||prop.startsWith('--shape-')) return 'semantic';
 return 'primitive';
};
const type=(prop,value)=>{
 if (/^--(?:color|surface|page|text)-/.test(prop)||/^#[0-9a-f]{3,8}$/i.test(value)) return 'color';
 if (/^(?:--(?:font-family))/.test(prop)) return 'fontFamily';
 if (/^(?:--(?:shadow))/.test(prop)) return 'shadow';
 if (/^--(?:ease)/.test(prop)) return 'cubicBezier';
 if (/^--(?:motion|rotation|translation)/.test(prop)) return 'duration';
 if (/^--(?:opacity|z-index|line-height|font-weight)/.test(prop)) return 'number';
 return 'dimension';
};
root.walkDecls((decl)=>{
 if(!decl.prop.startsWith('--')) return;
 const ancestors=[];let p=decl.parent;
 while(p){ancestors.push(p);p=p.parent;}
 const rule=ancestors.find(x=>x.type==='rule');
 const atRules=ancestors.filter(x=>x.type==='atrule');
 const name=decl.prop;
 const raw=css.slice(decl.source.start.offset,decl.source.end.offset+1);
 const colon=raw.indexOf(':');const semi=raw.lastIndexOf(';');
 if(colon===-1||semi===-1) throw Error(`Cannot import ${name}`);
 const gap=raw.slice(colon+1,semi);const leading=(gap.match(/^\s*/)||[''])[0].length;const trailing=(gap.match(/\s*$/)||[''])[0].length;
 const value=gap.slice(leading,trailing?gap.length-trailing:undefined);
 if(!value.trim()) throw Error(`Empty ${name}`);
 let bucket,ref;
 const sel=rule?.selector?.trim()||'';
 if (atRules.length===0&&sel===':root') {bucket=classify(name,value)==='primitive'?primitives:semantic;ref=`${bucket===primitives?'p':'s'}:${name}`;if(bucket[name]&&bucket[name].$value!==value) throw Error(`Duplicate base ${name}`);bucket[name]={$type:type(name,value),$value:value};}
 else if(atRules.length===0&&sel.startsWith(':root')&&/data-theme/.test(sel)|| atRules.length===0&&sel.startsWith(':root:not(')){
   const id=sel.match(/data-theme="([^"]+)"/)?.[1];if(!id||!(id in themes)) throw Error(`Unknown theme: ${sel}`);
   bucket=themes[id];ref=`t:${id}:${name}`;if(bucket[name]&&bucket[name].$value!==value) throw Error(`Duplicate themed ${ref}`);bucket[name]={$type:type(name,value),$value:value};
 } else {
   const id=`w${sequence++}`;webOnly[id]={selector:sel,conditions:atRules.map(a=>`@${a.name} ${a.params}`),token:name,$type:type(name,value),$value:value};ref=`w:${id}`;
 }
 const valueStart=decl.source.start.offset+colon+1+leading;
 const valueEnd=decl.source.start.offset+semi-trailing;
 if(css.slice(valueStart,valueEnd)!==value) throw Error(`Bad offsets for ${ref}`);
 replacements.push({start:valueStart,end:valueEnd,value,ref});
});
if(!Object.keys(primitives).length||!Object.keys(semantic).length)throw Error('Missing baselines');
let output=css;
for(const {start,end,value,ref} of replacements.sort((a,b)=>b.start-a.start)){
 output=output.slice(0,start)+`{{${ref}}}`+output.slice(end);
}
const write=(file,data)=>fs.writeFileSync(path.join(import.meta.dirname,file),JSON.stringify(data,null,2)+'\n');
write('primitives.json',{tokens:primitives});write('semantic.json',{tokens:semantic});write('themes.json',{themes});write('web-only.json',{overrides:webOnly});
write('schema.json', {schemaVersion:1,baseline:'Approved Forge UI Web tokens.css',rootFontSizePx:16,rootFontSizeVerified:false, supportedThemes:['light','dark','contrast','liquid-glass'],platformRules:'web-only.json is intentionally excluded from Dart; browser-specific media/supports rules are emitted only in CSS'});
fs.writeFileSync(path.join(import.meta.dirname,'web-template.css'),output);
console.log(`Imported ${replacements.length} declarations: ${Object.keys(primitives).length} primitives, ${Object.keys(semantic).length} semantic, ${Object.values(themes).reduce((n,t)=>n+Object.keys(t).length,0)} themed, ${Object.keys(webOnly).length} web-only`);
