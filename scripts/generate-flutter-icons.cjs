
const fs=require('fs');
const ts=require('typescript'),vm=require('vm');
const m={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('web/library/src/design-system/helpers/icon-data.generated.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:m.exports,module:m});
const icons=m.exports.iconData;
const camel=s=>s.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
function pathCode(data){
 const ts=data.match(/[MmLlHhVvCcAaZz]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/gi)||[];
 let i=0,cmd='',x=0,y=0,sx=0,sy=0;const out=['final path = Path();'];
 const number=()=>{const n=Number(ts[i++]);if(!Number.isFinite(n))throw Error('Invalid path '+data);return n;};
 while(i<ts.length){if(/^[A-Za-z]$/.test(ts[i]))cmd=ts[i++];const relative=cmd===cmd.toLowerCase(),kind=cmd.toUpperCase();const ox=x,oy=y;
 if(kind==='Z'){out.push('path.close();');x=sx;y=sy;cmd='';continue;}
 if(kind==='M'||kind==='L'){x=number()+(relative?ox:0);y=number()+(relative?oy:0);out.push('path.'+(kind==='M'?'moveTo':'lineTo')+'('+x+','+y+');');if(kind==='M'){sx=x;sy=y;cmd=relative?'l':'L';}}
 else if(kind==='H'){x=number()+(relative?ox:0);out.push('path.lineTo('+x+','+y+');');}
 else if(kind==='V'){y=number()+(relative?oy:0);out.push('path.lineTo('+x+','+y+');');}
 else if(kind==='C'){const v=Array.from({length:6},number);for(let j=0;j<6;j++)if(relative)v[j]+=j%2?oy:ox;x=v[4];y=v[5];out.push('path.cubicTo('+v.join(',')+');');}
 else if(kind==='A'){const v=Array.from({length:7},number);x=v[5]+(relative?ox:0);y=v[6]+(relative?oy:0);out.push('path.arcToPoint(Offset('+x+','+y+'),radius:Radius.elliptical('+v[0]+','+v[1]+'),rotation:'+v[2]+',largeArc:'+(v[3]===1)+',clockwise:'+(v[4]===1)+');');}
 else throw Error('Unsupported command '+cmd);
 }
 return '(){'+out.join('')+'return path;}()';
}
const dart=["// Generated from the existing Tabler vector registry (MIT).","// License: app/library/LICENSE-icons.md; regenerate with scripts/generate-flutter-icons.cjs.","import 'package:flutter/painting.dart';","enum ForgeIconName {"+Object.keys(icons).map(k=>camel(k)+"('"+k+"')").join(',')+"; final String sourceName; const ForgeIconName(this.sourceName); }",
 "class ForgeIconGeometry { final List<Path> paths; final bool stroke; const ForgeIconGeometry(this.paths,this.stroke); }",
 "final Map<ForgeIconName,ForgeIconGeometry> forgeIconGeometry = {"];
for(const [name,g]of Object.entries(icons)){if(g.viewBox!=='0 0 24 24')throw Error('Unexpected viewBox');dart.push('ForgeIconName.'+camel(name)+':ForgeIconGeometry(['+g.paths.map(pathCode).join(',')+'],'+(g.drawing==='stroke')+'),');}
dart.push('};');fs.writeFileSync('app/library/lib/src/generated/forge_icons.g.dart',dart.join('\n')+'\n');
const license='web/library/src/design-system/assets/icons/LICENSE-upstream.md';if(!fs.existsSync(license))throw Error('Missing upstream icon license');
fs.copyFileSync(license,'app/library/LICENSE-icons.md');
console.log('Generated '+Object.keys(icons).length+' native vector geometries and retained MIT license.');
