#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = mkdtempSync(join(tmpdir(), 'forge-native-actions-'));
const files = [
  'app/library/lib/src/components/internal/forge_action.dart',
  'app/library/lib/src/theme/forge_action_palette.dart',
  'app/library/lib/src/theme/forge_native_action_recipe.dart',
  'app/library/lib/src/theme/forge_control_style.dart',
];
try {
  for (const file of files) {
    mkdirSync(dirname(join(dir, file)), { recursive: true });
    writeFileSync(join(dir, file), readFileSync(join(root, file)));
  }
  mkdirSync(join(dir, 'scripts'), { recursive: true });
  const checker = join(dir, 'scripts/check-native-actions.mjs');
  writeFileSync(checker, readFileSync(join(root, 'scripts/check-native-actions.mjs')));
  const run = () => spawnSync('node', [checker], { cwd: dir, encoding: 'utf8' });
  assert.equal(run().status, 0, 'clean source passes');
  const actionPath = join(dir, files[0]);
  const cleanAction = readFileSync(actionPath, 'utf8');
  writeFileSync(actionPath, "import 'package:flutter/material.dart';\n" + cleanAction);
  assert.notEqual(run().status, 0, 'Material import rejected');
  writeFileSync(actionPath, cleanAction.replace('GestureDetector(', 'InkWell('));
  assert.notEqual(run().status, 0, 'Material ink rejected');
  writeFileSync(actionPath, cleanAction.replace('LogicalKeyboardKey.enter', 'LogicalKeyboardKey.f1'));
  assert.notEqual(run().status, 0, 'keyboard parity regression rejected');
  writeFileSync(actionPath, cleanAction);
  const recipePath = join(dir, files[2]);
  const cleanRecipe = readFileSync(recipePath, 'utf8');
  writeFileSync(recipePath, cleanRecipe.replace('p.fontWeightSemibold', 'p.fontWeightNormal'));
  assert.notEqual(run().status, 0, 'weight token regression rejected');
  writeFileSync(recipePath, cleanRecipe);
  assert.equal(run().status, 0, 'restored sources pass');
  console.log('PASS: native ForgeAction source, 4 negative injections and restore');
} finally { rmSync(dir, { recursive: true, force: true }); }
