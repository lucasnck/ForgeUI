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
const sources = Object.fromEntries(Object.entries(paths).map(([name, p]) => [
  name, readFileSync(join(root, p), 'utf8'),
]));
const errors = [];
const fail = message => errors.push(message);

for (const [name, src] of Object.entries(sources)) {
  if (/\b(?:import|export)\s+['"]package:flutter\/(?:material|cupertino)\.dart['"]/.test(src)) {
    fail(`${name}: must not depend on Material/Cupertino`);
  }
  for (const banned of ['FilledButton(', 'OutlinedButton(', 'InkWell(', 'Material(', 'WidgetStatePropertyAll(', 'Theme.of(']) {
    if (src.includes(banned)) fail(`${name}: forbidden dependency ${banned}`);
  }
}

const required = {
  action: ['Focus(', 'GestureDetector(', 'MouseRegion(', 'Semantics(',
    'AnimatedContainer(', 'LogicalKeyboardKey.enter', 'LogicalKeyboardKey.space',
    'ForgeTooltip(', 'forgeMobileActionTarget(recipe.height)', 'widget.focusNode',
    'widget.onFocusChange?.call(value)', 'resolveForgeAppearance(',
    'appearance: appearance'],
  palette: ['appearance ??', 'ForgeVariant.outline => ForgeAppearance.outlined',
    "p.color('--color-action-${tone.name}-background')", 'p.colorActionBrandForeground'],
  recipe: ["p.number('--component-height-${size.name}')",
    "p.number('--component-padding-inline-${size.name}')",
    "p.number('--component-padding-block-${size.name}')",
    "p.number('--font-size-${size.name}')", 'p.fontWeightSemibold',
    'p.lineHeightNormal', 'p.colorFocusRing', 'p.motionFast',
    'math.max(48.0, visualHeight)'],
  legacy: ["export 'forge_action_palette.dart'",
    'ForgeNativeActionRecipe forgeActionStyle(', 'forgeNativeActionRecipe('],
};
for (const [name, parts] of Object.entries(required)) {
  for (const part of parts) {
    if (!sources[name].includes(part)) fail(`${name}: missing ${part}`);
  }
}

// Check *both* sides of the recipe API: old action/widget code referencing
// renamed recipe fields must not pass a text-only visual/token regression gate.
const recipeFields = new Set(Array.from(sources.recipe.matchAll(
  /\bfinal\s+(?:Color|double|EdgeInsetsGeometry|TextStyle|Duration)\s+(\w+)\s*;/g,
), x => x[1]));
const recipeMethods = new Set(Array.from(sources.recipe.matchAll(
  /^\s*(?:Color|BoxDecoration)\s+(\w+)\s*\(/gm,
), x => x[1]));
const allowed = new Set([...recipeFields, ...recipeMethods]);
for (const name of ['action', 'legacy']) {
  for (const match of sources[name].matchAll(/\b(?:recipe|style)\.(\w+)\b/g)) {
    if (!allowed.has(match[1])) fail(`${name}: ForgeNativeActionRecipe has no member ${match[1]}`);
  }
}
const recipeCall = sources.action.match(/final\s+recipe\s*=\s*forgeNativeActionRecipe\(([\s\S]*?)\);/);
if (!recipeCall || !/\bappearance\s*:\s*appearance\s*[,\n]/.test(recipeCall[1])) {
  fail('action: pass resolved non-null ForgeAppearance to forgeNativeActionRecipe');
}
if (!/\bForgeAppearance\s+resolveForgeAppearance\s*\(/.test(sources.palette)) {
  fail('palette: resolveForgeAppearance must return non-null ForgeAppearance');
}
if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  process.exitCode = 1;
} else {
  console.log('PASS: action/recipe typed contract, resolved appearance and native style tokens');
}
