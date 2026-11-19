#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const link = readFileSync(join(root, 'app/library/lib/src/components/forge_link.dart'), 'utf8');
const progress = readFileSync(join(root, 'app/library/lib/src/components/forge_progress.dart'), 'utf8');
const errors = [];
for (const [name, source] of [['ForgeLink', link], ['ForgeProgress', progress]]) {
  if (/\b(?:import|export)\s*['"]package:flutter\/(material|cupertino)\.dart['"]/.test(source))
    errors.push(`${name} imports a platform component library`);
}
if (/\b(?:InkWell|InkResponse|Material\s*\()/.test(link)) errors.push('ForgeLink delegates to Material ink');
if (/\bLinearProgressIndicator\s*\(/.test(progress)) errors.push('ForgeProgress delegates to Material indicator');
for (const [name, source, checks] of [
  ['ForgeLink', link, ['FocusableActionDetector(', 'GestureDetector(', 'Semantics(', 'ForgeLaunchRequest(', 'LogicalKeyboardKey.enter', 'LogicalKeyboardKey.space']],
  ['ForgeProgress', progress, ['normalizeForgeProgress(', 'TweenAnimationBuilder<double>(', 'AnimationController(', 'Semantics(', 'MediaQuery.maybeOf(context)?.disableAnimations']],
]) {
  for (const token of checks) if (!source.includes(token)) errors.push(`${name} missing ${token}`);
}
if (errors.length) { errors.forEach(e => console.error('FAIL:', e)); process.exitCode = 1; }
else console.log('PASS: native Link and Progress dependency boundaries and required behaviors');
