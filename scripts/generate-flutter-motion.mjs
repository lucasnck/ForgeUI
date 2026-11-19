import fs from 'node:fs';
const source=fs.readFileSync(new URL('../web/library/src/design-system/styles/tokens.css',import.meta.url),'utf8');
const curves=[...source.matchAll(/--ease-standard:\s*cubic-bezier\(([^)]+)\)/g)].map(m=>m[1].split(',').map(Number));
if(!curves.length||curves.some(c=>c.length!==4||c.some(v=>!Number.isFinite(v)))||new Set(curves.map(c=>JSON.stringify(c))).size!==1)throw Error('Expected one canonical standard cubic curve');
const output="// Generated from canonical --ease-standard; no local motion palette.\nimport 'package:flutter/animation.dart';\nconst forgeStandardCurve = Cubic("+curves[0].join(', ')+");\n";
const target=new URL('../app/library/lib/src/generated/forge_motion.g.dart',import.meta.url);
if(process.argv.includes('--check')){if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==output)throw Error('Stale native motion curve; run node scripts/generate-flutter-motion.mjs');}else fs.writeFileSync(target,output);
console.log('Verified native standard curve from canonical CSS.');
