import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const base='showcase/portal/src/features/showcase-v2/components/FlutterPreview/';
const entries=JSON.parse(fs.readFileSync('showcase/portal/src/features/showcase-v2/model/flutter-parts.json','utf8'));
function load(p,require){const module={exports:{}};const result=ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}});vm.runInNewContext(result.outputText,{module,exports:module.exports,require,Object,Number,Map});return module.exports;}
const button=load(base+'flutter-button-properties.ts',()=>{throw Error('Unexpected dependency');});
const api=load(base+'flutter-part-configurations.tsx',name=>{
if(name.endsWith('flutter-parts.json'))return {default:entries};
if(name.includes('flutter-button-properties'))return button;
if(name.includes('flutter-native-properties'))return {flutterNativeProperties:()=>[]};
if(name==='react/jsx-runtime')return {jsx:()=>null};return {};
});
assert.equal(entries.length,19);assert.equal(new Set(entries.map(e=>e.slug)).size,19);
const cases=[...entries.map(entry=>({entry,props:{}})),{entry:entries.find(e=>e.slug==='card-header'),props:{titleText:"Aspas ' barra \\ dólar $ e\nnova linha"}}];
const snippets=[],tests=[];
for(const [i,{entry,props}] of cases.entries()){
let code=api.partCode(entry.slug,props);
assert.ok(code.includes(entry.name));
code=code.replace(/^import .*;\r?\n/gm,'').replaceAll('ForgePartExample','PartSnippet'+i).replaceAll('_PartState','_PartSnippetState'+i).replaceAll('partContracts','snippetContracts'+i).replaceAll('partFamilies','snippetFamilies'+i).replaceAll('ForgeDemoProfile','SnippetProfile'+i);
snippets.push(code);
tests.push("testWidgets('copyable interaction "+entry.slug+" "+i+"',(t)async{await t.pumpWidget(host(const PartSnippet"+i+"()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});");
}
fs.writeFileSync('app/showcase_flutter/test/generated_part_snippets_test.dart',["// Generated from actual copyable native interaction snippets.","import 'package:flutter/material.dart';","import 'package:flutter_test/flutter_test.dart';","import 'package:forge_ui/forge_ui.dart';",...snippets,"Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));","void main(){",...tests,"}"].join('\n')+'\n');
console.log('PASS: 19 native part contexts and 20 copyable Dart samples prepared for compilation.');
