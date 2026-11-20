#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const temp = mkdtempSync(join(tmpdir(), 'forge-native-action-api-'));
const files = [
  'app/library/lib/src/components/internal/forge_action.dart',
  'app/library/lib/src/theme/forge_action_palette.dart',
  'app/library/lib/src/theme/forge_native_action_recipe.dart',
  'app/library/lib/src/theme/forge_control_style.dart',
];
try {
  for (const file of files) {
    mkdirSync(dirname(join(temp, file)), { recursive: true });
    writeFileSync(join(temp, file), readFileSync(join(root, file)));
  }
  mkdirSync(join(temp, 'scripts'), { recursive: true });
  const checker = join(temp, 'scripts/check-native-actions.mjs');
  writeFileSync(checker, readFileSync(join(root, 'scripts/check-native-actions.mjs')));
  const run = () => spawnSync(process.execPath, [checker], { cwd: temp, encoding: 'utf8' });
  const original = Object.fromEntries(files.map(file => [file, readFileSync(join(temp, file), 'utf8')]));
  const mutate = (file, oldValue, newValue, description) => {
    assert.ok(original[file].includes(oldValue), `${description}: fixture anchor exists`);
    writeFileSync(join(temp, file), original[file].replace(oldValue, newValue));
    const result = run();
    assert.notEqual(result.status, 0, `${description}: regression rejected`);
    writeFileSync(join(temp, file), original[file]);
  };
  assert.equal(run().status, 0, 'current contract passes');
  const a = files[0], r = files[2], l = files[3];
  mutate(a, "import 'package:flutter/services.dart';", "import 'package:flutter/material.dart';", 'Material import');
  mutate(a, 'GestureDetector(', 'InkWell(', 'Material ink');
  mutate(a, 'LogicalKeyboardKey.enter', 'LogicalKeyboardKey.f1', 'keyboard action parity');
  mutate(r, 'p.fontWeightSemibold', 'p.fontWeightNormal', 'font weight parity');
  mutate(a, 'recipe.duration', 'recipe.animationDuration', 'obsolete duration getter');
  mutate(a, 'recipe.height', 'recipe.tapTargetSize', 'obsolete tap-target getter');
  mutate(a, 'recipe.decoration(', 'recipe.side(', 'obsolete decoration getter');
  mutate(a, 'recipe.padding', 'recipe.backgroundColor', 'obsolete background getter');
  mutate(a, 'appearance: appearance,', 'appearance: widget.appearance,', 'nullable appearance');
  mutate(l, 'ForgeNativeActionRecipe forgeActionStyle(', 'ButtonStyle forgeActionStyle(', 'stale Material type');
  assert.equal(run().status, 0, 'restored sources pass');
  console.log('PASS: native action contract, 10 negative regressions, and restore');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
