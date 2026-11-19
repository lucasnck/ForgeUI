#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(process.argv[2] || '.');
const text = readFileSync(resolve(root, 'app/library/lib/src/components/forge_checkable.dart'),'utf8');
const checks = [
  ['no Material/Cupertino import', !/package:flutter\/(material|cupertino)\.dart/.test(text)],
  ['no Material rendering', !/\bMaterial\s*\(|\bInkWell\s*\(/.test(text)],
  ['native Focus', text.includes('child: Focus(')],
  ['native GestureDetector', text.includes('child: GestureDetector(')],
  ['Enter', text.includes('LogicalKeyboardKey.enter')],
  ['Space', text.includes('LogicalKeyboardKey.space')],
  ['key down only', text.includes('event is! KeyDownEvent')],
  ['focus semantics', text.includes('focused: _focused')],
  ['checked semantics', text.includes('checked:')],
  ['toggled semantics', text.includes('toggled:')],
  ['form binding preserved', text.includes('ForgeFormScope.maybeOf')],
];
for(const [name,pass] of checks) console.log(`${pass?'PASS':'FAIL'} ${name}`);
if(checks.some(([,pass])=>!pass))process.exitCode=1;
