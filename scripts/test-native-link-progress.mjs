#!/usr/bin/env node
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const root = join(dir, '..');
const checker = join(dir, 'check-native-link-progress.mjs');
const src = ['forge_link.dart', 'forge_progress.dart'];
function run(root) {
  return spawnSync('node', [checker], { cwd: root, encoding: 'utf8' });
}
const stage = mkdtempSync(join(tmpdir(), 'forge-ui-native-check-'));
try {
  const testScript = readFileSync(checker, 'utf8').replace(
    "resolve(dirname(fileURLToPath(import.meta.url)), '..')",
    "resolve(process.cwd())"
  );
  mkdirSync(join(stage, 'scripts'), { recursive: true });
  const stagedChecker = join(stage, 'scripts/check-native-link-progress.mjs');
  writeFileSync(stagedChecker, testScript);
  mkdirSync(join(stage, 'app/library/lib/src/components'), { recursive: true });
  for (const name of src) {
    const file = join(stage, 'app/library/lib/src/components', name);
    writeFileSync(file, readFileSync(join(root, 'app/library/lib/src/components', name)));
  }
  function check() {
    const outcome = spawnSync('node', [stagedChecker], { encoding: 'utf8', cwd: stage });
    return outcome;
  }
  assert.equal(check().status, 0, 'clean source passes');
  const linkFile = join(stage, 'app/library/lib/src/components/forge_link.dart');
  const progressFile = join(stage, 'app/library/lib/src/components/forge_progress.dart');
  const link = readFileSync(linkFile, 'utf8');
  const progress = readFileSync(progressFile, 'utf8');
  writeFileSync(linkFile, "import 'package:flutter/material.dart';\n" + link);
  assert.notEqual(check().status, 0, 'material import fails');
  writeFileSync(linkFile, link.replace('FocusableActionDetector(', 'InkWell('));
  assert.notEqual(check().status, 0, 'Material ink fails');
  writeFileSync(linkFile, link);
  writeFileSync(progressFile, progress.replace('AnimationController(', 'LinearProgressIndicator('));
  assert.notEqual(check().status, 0, 'Material indicator fails');
  writeFileSync(progressFile, progress);
  assert.equal(check().status, 0, 'restored source passes');
  console.log('PASS: native Link/Progress boundary, negative injection tests and restore');
} finally {
  rmSync(stage, { recursive: true, force: true });
}
