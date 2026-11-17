import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../..');
const read=(name)=>JSON.parse(fs.readFileSync(path.join(here,name),'utf8'));
const primitives=read('primitives.json').tokens;
const semantic=read('semantic.json').tokens;
const themeData=read('themes.json').themes;
const browserRules=read('web-only.json').overrides;
const schema=read('schema.json');
const base={...primitives,...semantic};
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
assert(Object.keys(base).length>100,'Missing canonical token source');
assert(!Object.keys(primitives).some(k=>Object.hasOwn(semantic,k)),'Duplicate primitive/semantic names');
assert(JSON.stringify(Object.keys(themeData))===JSON.stringify(schema.supportedThemes),'Theme identifiers differ from schema');
for(const [n,token] of Object.entries(base))assert(n.startsWith('--')&&typeof token.$value==='string',`Invalid token ${n}`);
for(const [theme,overrides] of Object.entries(themeData))for(const n of Object.keys(overrides))assert(Object.hasOwn(base,n),`Theme ${theme} references unknown token: ${n}`);

let web=fs.readFileSync(path.join(here,'web-template.css'),'utf8');
web=web.replace(/\{\{([pstw]):([^{}]+)\}\}/g,(match,bucket,key)=>{
 let value;
 if(bucket==='p')value=primitives[key]?.$value;
 if(bucket==='s')value=semantic[key]?.$value;
 if(bucket==='t'){const sep=key.indexOf(':');value=themeData[key.slice(0,sep)]?.[key.slice(sep+1)]?.$value;}
 if(bucket==='w')value=browserRules[key]?.$value;
 assert(typeof value==='string',`Unresolved CSS placeholder ${match}`);
 return value;
});
assert(!web.includes('{{'),'Unresolved CSS placeholders remain');

// The generator never tries to force Web-only CSS (media queries, gradients,
// system colors, viewport units, fractional layout) into a Flutter Color/dp.
function parseHex(raw){
 const r=raw.toLowerCase();
 if(r==='transparent')return '0x00000000';
 if(!/^#[0-9a-f]{3,8}$/.test(r))return null;
 let s=r.slice(1);
 if(s.length===3)s=s.split('').map(x=>x+x).join('');
 if(s.length===4)s=s.split('').map(x=>x+x).join('');
 if(s.length===6)s='ff'+s;
 if(s.length!==8)return null;
 return '0x'+s.toUpperCase();
}
function convertedValue(tokenName,raw,stack,values){
 assert(!stack.includes(tokenName),`Circular token alias: ${[...stack,tokenName].join(' -> ')}`);
 const next=[...stack,tokenName];
 const alias=raw.match(/^var\((--[a-z0-9-]+)\)$/i);
 if(alias){const x=values[alias[1]];assert(x,`Missing alias ${alias[1]} used by ${tokenName}`);return convertedValue(alias[1],x.$value,next,values);}
 const calc=raw.match(/^calc\(\s*var\((--[a-z0-9-]+)\)\s*\*\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
 if(calc){const x=values[calc[1]];assert(x,`Missing calc alias ${calc[1]} used by ${tokenName}`);const v=convertedValue(calc[1],x.$value,next,values);if(v.kind!=='number')return {kind:'webOnly',reason:'calc operand not numeric'};return {kind:'number',unit:v.unit,value:v.value*Number(calc[2])};}
 const mix=raw.match(/^color-mix\(\s*in srgb,\s*var\((--[a-z0-9-]+)\)\s+(\d+(?:\.\d+)?)%,\s*var\((--[a-z0-9-]+)\)\s*\)$/i);
 if(mix){
  const a=convertedValue(mix[1],values[mix[1]].$value,next,values);
  const b=convertedValue(mix[3],values[mix[3]].$value,next,values);
  const weight=Number(mix[2])/100;
  assert(weight>=0&&weight<=1&&a.kind==='color'&&b.kind==='color','Invalid sRGB mix');
  const av=parseInt(a.value.slice(2),16),bv=parseInt(b.value.slice(2),16);
  assert((av>>>24)===255&&(bv>>>24)===255,'Only opaque canonical sRGB mixes are supported');
  const bytes=[24,16,8,0].map(shift=>Math.round(((av>>>shift)&255)*weight+((bv>>>shift)&255)*(1-weight)));
  return {kind:'color',value:'0x'+bytes.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase()};
 }
 const color=parseHex(raw);
 if(color)return {kind:'color',value:color};
 const n=raw.match(/^(-?\d+(?:\.\d+)?)(rem|px|ms|s)?$/);
 if(n){const number=Number(n[1]);const unit=n[2]||'scalar';return {kind:'number',unit:unit==='rem'?'dp':unit==='px'?'dp':unit==='ms'?'milliseconds':unit==='s'?'milliseconds':'scalar',value:unit==='rem'?number*schema.rootFontSizePx:unit==='s'?number*1000:number};}
 return {kind:'webOnly',reason:`Unsupported CSS expression (${raw})`};
}
const themes={};const unsupported={};
for(const theme of schema.supportedThemes){
 const values={...base,...themeData[theme]},available={},skipped={};
 for(const [tokenName,entry] of Object.entries(values)){
  const c=convertedValue(tokenName,entry.$value,[],values);
  if(c.kind==='webOnly')skipped[tokenName]={reason:c.reason,css:entry.$value};else available[tokenName]=c;
 }
 themes[theme]=available;unsupported[theme]=skipped;
}
// Type stability across themes must hold for every shared Dart API field.
const stableKeys=Object.keys(themes.light).filter(n=>schema.supportedThemes.every(t=>themes[t][n]&&themes[t][n].kind===themes.light[n].kind&&themes[t][n].unit===themes.light[n].unit));
assert(stableKeys.length>100,`Too few portable tokens: ${stableKeys.length}`);
const camel=name=>name.slice(2).replace(/-([a-z0-9])/g,(_,c)=>c.toUpperCase());
const getters=[];const seen=new Set();
for(const token of stableKeys){const name=camel(token);assert(!seen.has(name),`Dart name collision ${name}`);seen.add(name);const example=themes.light[token];const kind=example.kind==='color'?'Color':'double';const method=example.kind==='color'?'color':'number';getters.push(`  ${kind} get ${name} => ${method}('${token}');`);}
const series=[];for(const t of schema.supportedThemes){
 const x=themes[t];const colorEntries=stableKeys.filter(k=>x[k].kind==='color').map(k=>`      '${k}': ${x[k].value},`);
 const numberEntries=stableKeys.filter(k=>x[k].kind==='number').map(k=>`      '${k}': ${Number(x[k].value).toString()},`);
 const toDart=t==='liquid-glass'?'liquidGlass':t;
 series.push(`  static const ForgeTokenSet ${toDart} = ForgeTokenSet(\n    colors: <String, int>{\n${colorEntries.join('\n')}\n    },\n    numbers: <String, double>{\n${numberEntries.join('\n')}\n    },\n  );`);
}
const dart=`// GENERATED FILE — do not edit. Source: shared/tokens/*.json.\n// CSS rem -> Flutter logical px assumes ${schema.rootFontSizePx}px/root rem; browser root-size parity is not yet verified.\n// Browser-only gradients, media queries, forced-colors, backdrop filters, viewport units are not exported.\nimport 'package:flutter/painting.dart';\n\nclass ForgeTokenSet {\n  final Map<String, int> _colors;\n  final Map<String, double> _numbers;\n  const ForgeTokenSet({required Map<String, int> colors, required Map<String, double> numbers})\n      : _colors = colors, _numbers = numbers;\n  Color color(String cssName) {\n    final value = _colors[cssName];\n    if (value == null) throw ArgumentError.value(cssName, 'cssName', 'Not a portable color token');\n    return Color(value);\n  }\n  double number(String cssName) {\n    final value = _numbers[cssName];\n    if (value == null) throw ArgumentError.value(cssName, 'cssName', 'Not a portable numeric token');\n    return value;\n  }\n${getters.join('\n')}\n}\n\nclass ForgeTokens {\n  const ForgeTokens._();\n${series.join('\n\n')}\n}\n`;
const report={schemaVersion:schema.schemaVersion,webCssSha256:crypto.createHash('sha256').update(web).digest('hex'),portableCount:stableKeys.length,themeCounts:Object.fromEntries(schema.supportedThemes.map(t=>[t,Object.keys(themes[t]).length])),unmapped:unsupported,conditionalWebRules:Object.entries(browserRules).map(([id,x])=>({id,token:x.token,selector:x.selector,conditions:x.conditions,reason:'Browser-specific selector or feature; not exported to Flutter'})),conversion:{remBasePx:schema.rootFontSizePx,verified:schema.rootFontSizeVerified,px:'Flutter logical pixel; visual device-density equivalence requires runtime tests',ms:'milliseconds',textScale:'managed by Flutter MediaQuery, not baked into tokens'}};
const outputs=[
 ['web/library/src/design-system/styles/tokens.css',web],
 ['app/library/lib/src/generated/forge_tokens.g.dart',dart],
 ['shared/tokens/parity-report.json',JSON.stringify(report,null,2)+'\n'],
];
const check=process.argv.includes('--check');
for(const [name,value] of outputs){const dest=path.join(root,name);if(check){assert(fs.existsSync(dest),`Missing generated file ${name}`);assert(fs.readFileSync(dest,'utf8')===value,`Stale generated file ${name}`);}else{fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,value);}}
console.log(`${check?'Verified':'Generated'} CSS + Dart: ${stableKeys.length} portable tokens across ${schema.supportedThemes.length} themes; web SHA-256 ${report.webCssSha256}`);
