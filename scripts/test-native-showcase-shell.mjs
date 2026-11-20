import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const files = [
  'app/showcase_flutter/lib/main.dart',
  'app/showcase_flutter/lib/legacy_material_bridge.dart',
  'app/showcase_flutter/pubspec.yaml',
  'app/showcase_flutter/test/preview_test.dart',
  'shared/tokens/primitives.json',
];
const check = path.join(root, 'scripts/check-native-showcase-shell.mjs');
const run = (dir) => spawnSync(process.execPath, [check, '--root', dir], {encoding: 'utf8'});
const original = Object.fromEntries(files.map(f => [f, fs.readFileSync(path.join(root, f), 'utf8')]));
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'forgeui-showcase-shell-'));
const write = (f, value) => {
  const dest = path.join(stage, f);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  fs.writeFileSync(dest, value);
};
try {
  for (const [f,c] of Object.entries(original)) write(f,c);
  const valid = run(stage);
  if (valid.status !== 0) throw Error(`Clean shell rejected:\n${valid.stderr}\n${valid.stdout}`);
  const rejects = [
    ['MaterialApp', 'app/showcase_flutter/lib/main.dart', /return WidgetsApp\(/, 'return MaterialApp('],
    ['Material import', 'app/showcase_flutter/lib/main.dart', /import 'package:flutter\/widgets.dart';/, "import 'package:flutter/material.dart';"],
    ['Roboto', 'app/showcase_flutter/lib/main.dart', /fontFamily: 'DM Sans'/, "fontFamily: 'Roboto'"],
    ['incorrect fallback order', 'app/showcase_flutter/lib/main.dart', /'Segoe UI', 'Arial', 'sans-serif'/, "'Arial', 'Segoe UI', 'sans-serif'"],
    ['missing theme scope', 'app/showcase_flutter/lib/main.dart', /=> ForgeThemeScope\(/, '=> ColoredBox('],
    ['lost legacy localizations', 'app/showcase_flutter/lib/legacy_material_bridge.dart', /DefaultMaterialLocalizations\.delegate/, 'DefaultWidgetsLocalizations.delegate'],
  ];
  for (const [label,file,find,replace] of rejects) {
    const modified = original[file].replace(find,replace);
    if (modified === original[file]) throw Error(`Mutation not applied: ${label}`);
    write(file,modified);
    const result=run(stage);
    if (result.status===0) throw Error(`Mutation unexpectedly accepted: ${label}`);
    write(file,original[file]);
  }
  console.log(`PASS native showcase shell: clean source + ${rejects.length} negative mutations rejected`);
} finally {
  fs.rmSync(stage,{recursive:true,force:true});
}
