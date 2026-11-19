#!/usr/bin/env node
/** Shared preview shell guard covering every registered Flutter component. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const src=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const flutter=src('app/showcase_flutter/lib/main.dart');
const css=src('showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.module.css');
const preview=src('showcase/portal/src/features/showcase-v2/components/ExamplePreview/ExamplePreview.tsx');
const tests=[
  ['alignment', flutter.includes('AlignmentDirectional.topStart')],
  ['theme background', flutter.includes('colorSurfaceSubtle')],
  ['no fixed 560px width', !/maxWidth:\s*560|width:\s*560/.test(flutter)],
  ['portal background token', css.includes('background: var(--color-surface-subtle)')],
  ['shared Dart formatter in example card', preview.includes('formatDartForDisplay(rawCode)')],
];
const failed=tests.filter(([,passed])=>!passed).map(([name])=>name);
console.log(JSON.stringify({checked:tests.length,passed:failed.length===0,failed}));
if(failed.length) process.exitCode=1;
