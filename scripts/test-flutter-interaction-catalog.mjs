import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const base='showcase/portal/src/features/showcase-v2/components/FlutterPreview/';
const entries=JSON.parse(fs.readFileSync('showcase/portal/src/features/showcase-v2/model/flutter-interactions.json','utf8'));
function load(p,require){const module={exports:{}};const result=ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}});vm.runInNewContext(result.outputText,{module,exports:module.exports,require,Object,Number,Map});return module.exports;}
const button=load(base+'flutter-button-properties.ts',()=>{throw Error('Unexpected dependency');});
const api=load(base+'flutter-interaction-configurations.tsx',name=>{
if(name.endsWith('flutter-interactions.json'))return {default:entries};
if(name.includes('flutter-button-properties'))return button;
if(name.includes('flutter-native-properties'))return {flutterNativeProperties:()=>[]};
if(name==='react/jsx-runtime')return {jsx:()=>null};return {};
});
assert.equal(entries.length,26);assert.equal(new Set(entries.map(e=>e.slug)).size,26);
assert.equal(api.resolveInteraction('tabs',{direction:'bad'}).direction,'ltr');
assert.equal(api.resolveInteraction('accordion',{level:8}).level,2);
assert.equal(api.resolveInteraction('accordion',{expanded:'both',multiple:false}).expanded,'first');
assert.equal(api.resolveInteraction('accordion',{expanded:'both',multiple:true}).expanded,'both');
assert.equal(api.resolveInteraction('checkbox-group',{acceptChanges:'yes'}).acceptChanges,true);
const cases=[...entries.map(entry=>({entry,props:{}})),{entry:entries.find(e=>e.slug==='tabs'),props:{label:"Aspas ' barra \\ dólar $ e\nnova linha"}}];
const snippets=[],tests=[];
for(const [i,{entry,props}] of cases.entries()){
let code=api.interactionCode(entry.slug,props);
assert.match(code,new RegExp('\\bForge'+entry.name+'\\('));
code=code.replace(/^import .*;\r?\n/gm,'').replaceAll('ForgeInteractionExample','InteractionSnippet'+i).replaceAll('_InteractionState','_InteractionSnippetState'+i).replaceAll('interactionContracts','snippetContracts'+i).replaceAll('interactionFamilies','snippetFamilies'+i);
snippets.push(code);
tests.push("testWidgets('copyable interaction "+entry.slug+" "+i+"',(t)async{await t.pumpWidget(host(const InteractionSnippet"+i+"()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});");
}
fs.writeFileSync('app/showcase_flutter/test/generated_interaction_snippets_test.dart',["// Generated from actual copyable native interaction snippets.","import 'package:flutter/material.dart';","import 'package:flutter_test/flutter_test.dart';","import 'package:forge_ui/forge_ui.dart';",...snippets,"Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));","void main(){",...tests,"}"].join('\n')+'\n');
console.log('PASS: 26 finite contextual APIs and 27 copyable Dart interaction samples prepared for compilation.');
