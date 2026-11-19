#!/usr/bin/env node
/** Native Flutter typography source boundary; runtime widget behavior is tested by Flutter. */
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'app/library/lib/src/theme/forge_primitive_style.dart',
  'app/library/lib/src/components/forge_text.dart',
  'app/library/lib/src/components/forge_heading.dart',
  'app/library/lib/src/components/forge_label.dart',
  'app/library/lib/src/components/forge_field_hint.dart',
  'app/library/lib/src/components/forge_field_error.dart',
  'app/library/lib/src/components/forge_divider.dart',
];
const errors = [];
for (const relative of files) {
  let source;
  try { source = readFileSync(join(root, relative), 'utf8'); }
  catch (error) { errors.push(`${relative}: cannot read (${error.message})`); continue; }
  if (/\b(?:import|export)\s*['"]package:flutter\/(?:material|cupertino)\.dart['"]/.test(source)) {
    errors.push(`${relative}: Material/Cupertino import in native ForgeUI component`);
  }
}
const divider = readFileSync(join(root, 'app/library/lib/src/components/forge_divider.dart'), 'utf8');
if (/\bchild:\s*Divider\s*\(/.test(divider) || !divider.includes('ColoredBox(')) {
  errors.push('ForgeDivider must paint its line using Flutter native widgets, not Material Divider');
}
const recipe = readFileSync(join(root, 'app/library/lib/src/theme/forge_primitive_style.dart'), 'utf8');
for (const symbol of ['forgeTextStyle(', 'forgeSpace(', 'forgeRadius(']) {
  if (!recipe.includes(symbol)) errors.push(`Native typography recipe lost ${symbol}`);
}
if (errors.length) {
  console.error(`FAIL: ${errors.length} native typography boundary checks`);
  errors.forEach(e => console.error(`- ${e}`));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${files.length} native typography sources are Material/Cupertino free; ForgeDivider uses ColoredBox`);
}
