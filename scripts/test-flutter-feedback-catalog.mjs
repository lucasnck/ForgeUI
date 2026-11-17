import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const base = 'showcase/portal/src/features/showcase-v2/components/FlutterPreview/';
const entries = JSON.parse(fs.readFileSync('showcase/portal/src/features/showcase-v2/model/flutter-feedback.json','utf8'));
function load(p,loader) {
  const module = {exports:{}};
  const output = ts.transpileModule(fs.readFileSync(p,'utf8'),{
    compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}
  });
  if(output.diagnostics?.length) throw Error(`TypeScript transpile diagnostics in ${p}`);
  vm.runInNewContext(output.outputText,{module,exports:module.exports,require:loader,Object,Map,Set,Number});
  return module.exports;
}
const button = load(base+'flutter-button-properties.ts',()=>{throw Error('Unexpected dependency in Dart escape helper');});
const api = load(base+'flutter-feedback-configurations.tsx',name=>{
  if(name.endsWith('flutter-feedback.json'))return {default:entries};
  if(name.includes('flutter-button-properties'))return button;
  if(name.includes('flutter-native-properties'))return {flutterNativeProperties:()=>[]};
  if(name==='react/jsx-runtime')return {jsx:()=>null};
  return {};
});
assert.deepEqual([...entries.map(e=>e.slug)].sort(),
  ['card','alert','empty-state','error-state','loading-state'].sort());
assert.equal(Object.keys(api.feedbackConfigurations).length,5);
assert.equal(api.resolveFeedback('card',{elevation:'broken'}).elevation,'raised');
assert.equal(api.resolveFeedback('alert',{announcement:'broken'}).announcement,'polite');
assert.equal(api.resolveFeedback('empty-state',{showAction:'yes'}).showAction,true);
assert.equal(api.resolveFeedback('loading-state',{label:'   '}).label,'Carregando registros');
const cases=[...entries.map(entry=>({entry,props:{}})),
  {entry:entries[0],props:{titleText:"Aspas ' dólar $ barra \\ e\nlinha"}}];
const tests=[];
for(const [index,{entry,props}] of cases.entries()){
  const code=api.feedbackCode(entry.slug,props);
  assert.ok(code.includes('Forge'+entry.name+'('),entry.slug);
  assert.ok(!code.includes('unavailable'));
  const expr=code.split(/\r?\n/).filter(line=>!line.startsWith('import ')&&!line.startsWith('//')).join('\n').trim();
  tests.push(`testWidgets('copyable feedback ${entry.slug} ${index}',(t)async{await t.pumpWidget(host(${expr}));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});`);
}
const output=[
  '// Generated from real Showcase copyable feedback snippets.',
  "import 'package:flutter/material.dart';",
  "import 'package:flutter_test/flutter_test.dart';",
  "import 'package:forge_ui/forge_ui.dart';",
  'Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:480,child:child))));',
  'void main(){',...tests,'}'
].join('\n')+'\n';
fs.writeFileSync('app/showcase_flutter/test/generated_feedback_snippets_test.dart',output);
console.log(`PASS: ${entries.length} feedback schemas and ${cases.length} copyable Dart samples generated.`);
