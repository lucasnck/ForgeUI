#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  inspectRoot,
  parseFlutterRuntimeDependencies,
  parseReactRuntimeDependencies,
} from './audit-runtime-independence.mjs';

const parsed = parseFlutterRuntimeDependencies(`name: forge_ui\ndependencies:\n  flutter:\n    sdk: flutter\n  phone_numbers_parser: 9.0.29\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\n  flutter_lints: ^5.0.0\n`);
assert.deepEqual(parsed, ['phone_numbers_parser']);
assert.deepEqual(parseReactRuntimeDependencies('{"dependencies":{"zod":"3","react":"19","react-dom":"19","react-hook-form":"7"},"devDependencies":{"next":"16"}}'), ['react-hook-form', 'zod']);

const root = mkdtempSync(path.join(os.tmpdir(), 'forgeui-independent-'));
function file(relative, body) {
  const target = path.join(root, relative);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, body);
}
try {
  file('web/library/package.json', JSON.stringify({ dependencies: { zod: '^3' } }));
  file('app/library/pubspec.yaml', `name: forge_ui\ndependencies:\n  flutter:\n    sdk: flutter\n`);
  file('app/library/lib/forge_ui.dart', "import 'package:flutter/widgets.dart';\n");
  const baseline = {knownRuntimeDependencies: {react: ['zod'], flutter: []}};
  const allowed = inspectRoot(root, baseline);
  assert.deepEqual(allowed.baselineDrift, []);
  assert.equal(allowed.zeroThirdPartyRuntimeDependencies, false);
  assert.equal(allowed.zeroFlutterPlatformUIImports, true);
  file('app/library/lib/src/theme/forge_theme.dart', "import 'package:flutter/material.dart';\nexport 'package:flutter/cupertino.dart';\n");
  const material = inspectRoot(root, baseline);
  assert.equal(material.materialImportCount, 2);
  assert.deepEqual(material.flutterMaterialOrCupertinoImports.map(x => x.framework), ['material', 'cupertino']);
  assert.equal(inspectRoot(root, {knownRuntimeDependencies: {react: [], flutter: []}}).baselineDrift.length, 1);
  file('web/library/package.json', JSON.stringify({dependencies: {}}));
  file('app/library/lib/src/theme/forge_theme.dart', "import 'package:flutter/widgets.dart';\n");
  const strictReady = inspectRoot(root, {knownRuntimeDependencies: {react: [], flutter: []}});
  assert.equal(strictReady.zeroThirdPartyRuntimeDependencies, true);
  assert.equal(strictReady.zeroFlutterPlatformUIImports, true);
  assert.deepEqual(strictReady.baselineDrift, []);
  console.log('PASS: 7 runtime-dependency / material-boundary assertions');
} finally {
  rmSync(root, {recursive: true, force: true});
}
