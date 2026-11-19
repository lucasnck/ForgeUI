import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const root = new URL('../',import.meta.url);
const read = name => fs.readFileSync(new URL(name,root),'utf8');
const module = {exports:{}};
const code = ts.transpileModule(read('showcase/portal/src/features/showcase-v2/components/FlutterPreview/flutter-button-properties.ts'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(code,{exports:module.exports,module});
const api = module.exports;
assert.equal(api.resolveFlutterButtonProperties({}).child,'Salvar alterações');
assert.match(api.flutterButtonCode({child:'$name',onPressed:false,loading:true,outlined:true}),/\\\$name/);
assert.match(api.flutterButtonCode({onPressed:false}),/onPressed: null/);
assert.equal(api.resolveFlutterButtonProperties({child:'x'.repeat(250)}).child.length,200);
assert.equal(api.flutterButtonSchema.size.options.length, 5);
assert.equal(api.flutterButtonSchema.tone.options.length, 11);
assert.equal(api.resolveFlutterButtonProperties({size:'unknown'}).size, 'md');
assert.equal(api.resolveFlutterButtonProperties({appearance:'unknown'}).appearance, 'inherit');
assert.match(api.flutterButtonCode({size:'xl',tone:'forest',appearance:'bordered',shape:'pill',disabled:true}), /ForgeAppearance.bordered/);
assert.match(api.flutterButtonCode({loadingLabel:'$state'}), /\\\$state/);
assert.doesNotMatch(api.flutterButtonCode({}), /ForgeShape.inherit|ForgeVariant.inherit/);
const componentModule = {exports:{}};
const componentCode = ts.transpileModule(read('showcase/portal/src/features/showcase-v2/components/FlutterPreview/flutter-component-properties.ts'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(componentCode,{exports:componentModule.exports,module:componentModule,require:()=>api});
assert.equal(componentModule.exports.resolveSpinner({decorative:false,label:' '}).label, 'Carregando conteúdo');
assert.equal(componentModule.exports.resolveGroup({gap:'invalid'}).gap, 's2');
assert.match(componentModule.exports.spinnerCode({size:'xl',animated:false}), /ForgeSize.xl/);
assert.match(componentModule.exports.groupCode({padding:'s4'}), /ForgeSpace.s4/);
const listeners = new Set(), sent = [];
const parent = {postMessage:(...message)=>sent.push(message)};
let config;
let removedPreviewWorker = 0, removedOtherWorker = 0;
const navigator = {serviceWorker:{getRegistrations:async()=>[
  {scope:'http://localhost:3000/flutter/',unregister:async()=>{removedPreviewWorker++;}},
  {scope:'http://localhost:3000/',unregister:async()=>{removedOtherWorker++;}},
]}};
const buildConfig = {builds:[{mainJsPath:'main.dart.js'}]};
const window = {parent,location:{origin:'http://localhost:3000'},addEventListener:(_,fn)=>listeners.add(fn),removeEventListener:(_,fn)=>listeners.delete(fn)};
vm.runInNewContext(read('app/showcase_flutter/web/flutter_bootstrap.js').replace(/^\{\{[^\n]+\}\}\r?\n/gm,''),{
  window, document:{baseURI:'http://localhost:3000/flutter/',currentScript:{src:'http://localhost:3000/flutter/flutter_bootstrap.js?build=0123456789abcdef'}}, navigator, URL, console,
  _flutter:{buildConfig,loader:{load:options=>{config=options;return Promise.resolve();}}},
});
assert.equal(config.config.canvasKitBaseUrl,'http://localhost:3000/flutter/canvaskit/');
assert.equal(config.serviceWorkerSettings,undefined);
assert.equal(buildConfig.builds[0].mainJsPath,'main.dart.js?build=0123456789abcdef');
let received = 0;
const callback = () => received++;
window.forgePreview.subscribe(callback);
const send = event => [...listeners].forEach(listener=>listener(event));
send({origin:'https://elsewhere.example',source:parent,data:'{}'});
send({origin:window.location.origin,source:{},data:'{}'});
send({origin:window.location.origin,source:parent,data:{}});
assert.equal(received,0);
send({origin:window.location.origin,source:parent,data:'{}'});
assert.equal(received,1);
window.forgePreview.ready();
assert.equal(JSON.parse(sent[0][0]).type,'forge-ui:flutter-ready');
assert.equal(sent[0][1],window.location.origin);
window.forgePreview.unsubscribe(callback);
assert.equal(listeners.size,0);
await new Promise(setImmediate);
assert.equal(removedPreviewWorker,1);
assert.equal(removedOtherWorker,0);
console.log('PASS: real Flutter property schema/snippets, local bootstrap and origin/source-validated bridge');

const catalogFiles = ['flutter-primitives','flutter-inputs','flutter-composites','flutter-feedback','flutter-interactions','flutter-forms','flutter-collections','flutter-transients','flutter-advanced','flutter-parts'];
const expectedSlugs = ['button','spinner','button-group', ...catalogFiles.flatMap(name => JSON.parse(read('showcase/portal/src/features/showcase-v2/model/'+name+'.json')).map(entry => entry.slug))];
assert.equal(new Set(expectedSlugs).size, expectedSlugs.length, 'Duplicate native preview identities');
const resolvedApiSlugs = JSON.parse(read('docs/sc/app/reference/native-component-api.json')).components.map(entry=>entry.slug);
assert.deepEqual([...expectedSlugs].sort(), [...resolvedApiSlugs].sort(), 'Every resolved native API must have exactly one preview identity');
const bootstrap = read('app/showcase_flutter/web/flutter_bootstrap.js').replace(/^\{\{[^\n]+\}\}\r?\n/gm,'');
for (const slug of expectedSlugs) {
 const replies = [];
 const windowForSlug = {parent:{postMessage:message=>replies.push(JSON.parse(message))}, location:{origin:'http://localhost:3000',hash:'#/'+slug},addEventListener:()=>{},removeEventListener:()=>{}};
 vm.runInNewContext(bootstrap, {window:windowForSlug,document:{baseURI:'http://localhost:3000/flutter/'},navigator:{},URL,console,_flutter:{buildConfig:{builds:[]},loader:{load:()=>Promise.resolve()}}});
 windowForSlug.forgePreview.ready();
 assert.equal(replies[0].component, slug, 'Bootstrap handshake must preserve '+slug);
}
const registryFixture = {schemaVersion:2, entries:expectedSlugs.map(componentSlug=>({componentSlug,platform:'flutter',available:true,codeLanguage:'dart',previewPath:'/flutter/index.html',buildId:'0123456789abcdef'}))};
const indexModule = {exports:{}};
vm.runInNewContext(ts.transpileModule(read('showcase/portal/src/features/showcase-v2/model/flutter-preview-index.ts'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{
 module:indexModule,exports:indexModule.exports,Set,Object,
 require:name=>({default:name.endsWith('flutter-preview-manifest.json')?registryFixture:JSON.parse(read('showcase/portal/src/features/showcase-v2/model/'+name.replace('./','')))})
});
for(const slug of expectedSlugs)assert.equal(indexModule.exports.findFlutterPreview(slug)?.componentSlug,slug,'Portal must recognize '+slug);
assert.equal(indexModule.exports.findFlutterPreview('unknown-widget'),null);
console.log('PASS: '+expectedSlugs.length+' finite native identities, bootstrap handshakes and portal index guards');
