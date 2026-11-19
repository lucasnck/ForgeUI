#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const paths = {
  action: 'app/library/lib/src/components/internal/forge_action.dart',
  palette: 'app/library/lib/src/theme/forge_action_palette.dart',
  recipe: 'app/library/lib/src/theme/forge_native_action_recipe.dart',
  legacy: 'app/library/lib/src/theme/forge_control_style.dart',
};
const sources = Object.fromEntries(Object.entries(paths).map(([k, p]) =>
  [k, readFileSync(join(root, p), 'utf8')]));
const errors = [];
for (const [key, src] of Object.entries(sources)) {
  if (key === 'legacy') continue; // ForgeSelect still consumes legacy ButtonStyle.
  if (/\b(?:import|export)\s+['"]package:flutter\/(?:material|cupertino)\.dart['"]/.test(src))
    errors.push(`${key}: platform design system import`);
  for (const banned of ['FilledButton(', 'OutlinedButton(', 'InkWell(', 'Material(', 'WidgetStatePropertyAll(', 'Theme.of(']) {
    if (src.includes(banned)) errors.push(`${key}: forbidden UI dependency ${banned}`);
  }
}
const checks = {
  action: ['Focus(', 'GestureDetector(', 'MouseRegion(', 'Semantics(', 'AnimatedContainer(',
    'LogicalKeyboardKey.enter', 'LogicalKeyboardKey.space', 'ForgeTooltip(',
    'forgeMobileActionTarget(recipe.height)', 'widget.focusNode', 'widget.onFocusChange?.call(value)'],
  palette: ['appearance ??', 'ForgeVariant.outline => ForgeAppearance.outlined',
    "p.color('--color-action-${tone.name}-background')", 'p.colorActionBrandForeground'],
  recipe: ["p.number('--component-height-${size.name}')",
    "p.number('--component-padding-inline-${size.name}')",
    "p.number('--component-padding-block-${size.name}')",
    "p.number('--font-size-${size.name}')", 'p.fontWeightSemibold',
    'p.lineHeightNormal', 'p.colorFocusRing', 'p.motionFast', 'math.max(48.0, visualHeight)'],
  legacy: ["export 'forge_action_palette.dart'", 'ButtonStyle forgeActionStyle(']
};
for (const [key, tokens] of Object.entries(checks)) {
  for (const token of tokens) {
    if (!sources[key].includes(token)) errors.push(`${key}: missing ${token}`);
  }
}
if (errors.length) { for (const e of errors) console.error(`FAIL: ${e}`); process.exitCode = 1; }
else console.log('PASS: native ForgeAction parity recipe and Material boundary');
