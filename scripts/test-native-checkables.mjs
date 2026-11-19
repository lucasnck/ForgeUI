#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const script = join(root, 'scripts/check-native-checkables.mjs');
const source = join(root, 'app/library/lib/src/components/forge_checkable.dart');
const original = readFileSync(source, 'utf8');
const stage = mkdtempSync(join(tmpdir(), 'forge-native-checkables-'));
try {
  const target = join(stage, 'app/library/lib/src/components/forge_checkable.dart');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, original);
  const verify = () => spawnSync(process.execPath, [script, stage], { encoding: 'utf8' });
  assert.equal(verify().status, 0, 'source without Material passes');
  writeFileSync(target, `import 'package:flutter/material.dart';\n${original}`);
  assert.notEqual(verify().status, 0, 'Material import is rejected');
  writeFileSync(target, original.replace('child: GestureDetector(', 'child: InkWell('));
  assert.notEqual(verify().status, 0, 'Material InkWell is rejected');
  writeFileSync(target, original.replace('LogicalKeyboardKey.enter', 'LogicalKeyboardKey.tab'));
  assert.notEqual(verify().status, 0, 'keyboard shortcut regression is rejected');
  writeFileSync(target, original);
  assert.equal(verify().status, 0, 'restored source passes');
  console.log('PASS native checkables source checks and three negative regressions');
} finally {
  rmSync(stage, { recursive: true, force: true });
}
