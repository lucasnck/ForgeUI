#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {inspectNative,parsePubspecRuntime} from './audit-native-independence.mjs';

const initial=process.argv.find(x=>x.startsWith('--root='));
const root=initial?path.resolve(initial.slice(7)):path.resolve(import.meta.dirname,'..');
const make=()=>fs.mkdtempSync(path.join(os.tmpdir(),'forge-native-audit-'));
assert.deepEqual(parsePubspecRuntime('dependencies:\n  flutter:\n    sdk: flutter\n  foo: ^1.0.0\ndev_dependencies:\n  bar: ^2.0.0\n'),['foo']);
const report=inspectNative(root);
assert.equal(report.components.length,221);
assert.equal(report.summary.sourceFilesMissing.length,0);
assert.equal(report.summary.missingRelativeImports,0);
assert.equal(report.summary.allVisualParityPending,true);
assert.ok(report.summary.directMaterialOrCupertinoImportCount<=7);
assert.equal(report.summary.constructorSymbolsMissing.length,0);
for (const relative of [
  'src/components/internal/configured_input.dart',
  'src/helpers/schematic_map_renderer.dart',
  'src/components/forge_o_data_filter.dart',
  'src/components/forge_modal.dart',
]) {
  const content=fs.readFileSync(path.join(root,'app/library/lib',relative),'utf8');
  assert.doesNotMatch(content,/package:flutter\/(?:material|cupertino)\.dart/);
}
assert.match(fs.readFileSync(path.join(root,'app/library/lib/src/components/forge_modal.dart'),'utf8'),/ForgePresence\(/);
const styleSource=fs.readFileSync(path.join(root,'app/library/lib/src/theme/forge_control_style.dart'),'utf8');
assert.match(styleSource,/forgeNativeActionRecipe\(/);
assert.doesNotMatch(styleSource,/ButtonStyle|package:flutter\/material.dart/);
assert.match(fs.readFileSync(path.join(root,'app/library/lib/src/components/forge_select.dart'),'utf8'),/fillColor:\s*style\.background/);
const temp=make();
try {
  const fresh=path.join(temp,'fake');
  fs.mkdirSync(path.join(fresh,'app/library/lib/src/components'),{recursive:true});
  fs.mkdirSync(path.join(fresh,'docs/sc/app/reference'),{recursive:true});
  fs.mkdirSync(path.join(fresh,'shared/tokens'),{recursive:true});
  fs.mkdirSync(path.join(fresh,'app/library/lib/src/generated'),{recursive:true});
  fs.writeFileSync(path.join(fresh,'app/library/pubspec.yaml'),'dependencies:\n  flutter:\n    sdk: flutter\n');
  fs.writeFileSync(path.join(fresh,'app/library/lib/src/generated/forge_tokens.g.dart'),'class ForgeTokens {}\n');
  fs.writeFileSync(path.join(fresh,'shared/tokens/schema.json'),'{}');
  const component={name:'Test',level:'atoms',dartName:'ForgeTest',sourceFile:'app/library/lib/src/components/forge_test.dart',parameters:[]};
  fs.writeFileSync(path.join(fresh,'docs/sc/app/reference/native-component-api.json'),JSON.stringify({components:[component]}));
  fs.writeFileSync(path.join(fresh,'docs/sc/app/reference/component-contracts.json'),JSON.stringify({components:[{component:'Test',status:'PENDING',properties:[]}]}));
  const source=path.join(fresh,'app/library/lib/src/components/forge_test.dart');
  fs.writeFileSync(source,"import 'package:flutter/widgets.dart';\nclass ForgeTest {}\n");
  assert.equal(inspectNative(fresh,{expected:1}).summary.strictIndependent,true);
  fs.writeFileSync(source,"import 'package:flutter/material.dart';\nclass ForgeTest {}\n");
  assert.equal(inspectNative(fresh,{expected:1}).summary.strictIndependent,false);
  assert.equal(inspectNative(fresh,{expected:1}).summary.directMaterialOrCupertinoImportCount,1);
  fs.writeFileSync(source,"import 'package:flutter/cupertino.dart';\nclass ForgeTest {}\n");
  assert.equal(inspectNative(fresh,{expected:1}).summary.directMaterialOrCupertinoImportCount,1);
  fs.writeFileSync(source,"import './missing.dart';\nclass ForgeTest {}\n");
  assert.equal(inspectNative(fresh,{expected:1}).summary.missingRelativeImports,1);
  console.log('PASS: 221 canonical entries; source graph; Material/Cupertino and missing imports regressions.');
} finally{fs.rmSync(temp,{recursive:true,force:true});}
