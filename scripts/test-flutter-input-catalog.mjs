import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const base='showcase/portal/src/features/showcase-v2/components/FlutterPreview/';
const read=p=>fs.readFileSync(p,'utf8');
function load(p,require){const module={exports:{}};vm.runInNewContext(ts.transpileModule(read(p),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,{module,exports:module.exports,require,Object,Number,Map});return module.exports;}
const entries=JSON.parse(read('showcase/portal/src/features/showcase-v2/model/flutter-inputs.json'));
const button=load(base+'flutter-button-properties.ts',()=>{throw Error('Unexpected import');});
const api=load(base+'flutter-input-configurations.tsx',name=>{
 if(name.endsWith('flutter-inputs.json'))return {default:entries};
 if(name.includes('flutter-button-properties'))return button;
 if(name.includes('flutter-native-properties'))return {flutterNativeProperties:()=>[]};
 if(name==='react/jsx-runtime')return {jsx:()=>null};
 return {};
});
assert.equal(Object.keys(api.inputConfigurations).length,36);
assert.equal(api.resolveInput('input',{disabled:'false'}).disabled,false);
assert.equal(api.resolveInput('slider',{value:Infinity}).value,50);
assert.equal(api.resolveInput('currency-input',{currency:'invalid'}).currency,'BRL');
const cases=[...entries.map(entry=>({entry,props:{}})),{entry:entries.find(e=>e.slug==='input'),props:{value:"Apóstrofo ' barra \\ dólar $ e\nnova linha"}}];
const definitions=[],tests=[];
for(const [i,{entry,props}]of cases.entries()){
 let code=api.inputCode(entry,props).replace(/^import .*;\r?\n/gm,'');
 code=code.replaceAll('ForgeInputCatalogExample','InputSnippet'+i).replaceAll('_InputCatalogState','_InputSnippetState'+i).replaceAll('inputInitialValues','inputInitialValues'+i).replaceAll('enumValue','snippetEnum'+i);
 definitions.push(code);
 tests.push("testWidgets('copyable input "+entry.slug+" "+i+"',(t)async{await t.pumpWidget(host(const InputSnippet"+i+"()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});");
}
const output=["// Generated from the real Showcase copyable input examples.","import 'package:flutter/material.dart';","import 'package:flutter_test/flutter_test.dart';","import 'package:forge_ui/forge_ui.dart';",...definitions,
"Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:560,child:child))));","void main(){",...tests,"}"].join('\n')+'\n';
fs.writeFileSync('app/showcase_flutter/test/generated_input_snippets_test.dart',output);
console.log('PASS: 36 native input schemas; 37 real snippets generated for Flutter compilation.');
