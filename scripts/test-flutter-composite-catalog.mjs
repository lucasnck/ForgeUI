import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = process.cwd();
const base = 'showcase/portal/src/features/showcase-v2/components/FlutterPreview/';
const entries = JSON.parse(fs.readFileSync('showcase/portal/src/features/showcase-v2/model/flutter-composites.json', 'utf8'));
function load(p, loader) {
  const module = {exports: {}};
  const code = ts.transpileModule(fs.readFileSync(p, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;
  vm.runInNewContext(code, {module, exports: module.exports, require: loader, Object, Number, Map, Set});
  return module.exports;
}
const button = load(base+'flutter-button-properties.ts', () => {throw Error('Unexpected button runtime dependency');});
const api = load(base+'flutter-composite-configurations.tsx', name => {
  if (name.endsWith('flutter-composites.json')) return {default:entries};
  if (name.includes('flutter-button-properties')) return button;
  if (name.includes('flutter-native-properties')) return {flutterNativeProperties:()=>[]};
  if (name==='react/jsx-runtime') return {jsx:()=>null};
  return {};
});
assert.deepEqual(new Set(entries.map(x=>x.slug)), new Set(['breadcrumb','pagination','tag-group','page-header']));
assert.equal(Object.keys(api.compositeConfigurations).length, 4);
assert.equal(api.resolveComposite('pagination',{page:7,pageCount:3}).page, 3);
assert.equal(api.resolveComposite('pagination',{page:'6'}).page, 2);
assert.equal(api.resolveComposite('breadcrumb',{label:'  '}).label, 'Localização');
const cases = [
  ...entries.map(entry => ({entry,props:{}})),
  {entry:entries[0],props:{ancestorLabel:"Entrada ' com \\ barra e\nlinha",currentLabel:'Detalhes'}}
];
const classParts=[];
const tests=[];
for(const [index,{entry,props}] of cases.entries()) {
  const snippet=api.compositeCode(entry.slug,props);
  assert.ok(snippet.includes('Forge'+entry.name), 'Snippet missing native export: '+entry.slug);
  assert.ok(!snippet.includes('Composition unavailable'));
  const content=snippet.split(/\r?\n/).filter(line=>!line.startsWith('import ')).join('\n').trim();
  if(entry.slug==='pagination' || entry.slug==='tag-group') {
    if(index!==cases.findIndex(x=>x.entry.slug===entry.slug)) throw Error('Duplicate Dart sample class');
    classParts.push(content);
    const cname=entry.slug==='pagination'?'PaginationExample':'TagGroupExample';
    tests.push(`testWidgets('copyable ${entry.slug} ${index}', (t) async { await t.pumpWidget(host(const ${cname}())); await t.pump(); expect(t.takeException(), isNull); });`);
  } else {
    // Standalone Dart expressions: compile and render their real widgets.
    tests.push(`testWidgets('copyable ${entry.slug} ${index}', (t) async { await t.pumpWidget(host(${content})); await t.pump(); expect(t.takeException(), isNull); });`);
  }
}
const output = [
  '// Generated from real Showcase copyable Dart composition examples.',
  "import 'package:flutter/material.dart';",
  "import 'package:flutter_test/flutter_test.dart';",
  "import 'package:forge_ui/forge_ui.dart';",
  ...classParts,
  'Widget host(Widget child) => MaterialApp(theme: ForgeThemeData.light(), home: Scaffold(body: SingleChildScrollView(child: SizedBox(width: 480, child: child))));',
  'void main() {', ...tests, '}'
].join('\n')+'\n';
fs.writeFileSync('app/showcase_flutter/test/generated_composite_snippets_test.dart',output);
console.log(`PASS: ${entries.length} controlled compositional schemas and ${cases.length} real Dart snippets prepared for Flutter compilation.`);
