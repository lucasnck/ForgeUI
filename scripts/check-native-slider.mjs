import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function checkNativeSlider(source) {
  const errors = [];
  const forbidden = [
    /package:flutter\/(?:material|cupertino)\.dart/,
    /\bSliderTheme\s*\(/,
    /\bSliderThemeData\s*\(/,
    /\bSlider\s*\(/,
    /\bMaterialLocalizations\b/,
    /\bColorScheme\b/,
  ];
  for (const pattern of forbidden) if (pattern.test(source)) errors.push(`forbidden ${pattern}`);
  for (const [name, pattern] of Object.entries({
    nativeWidgets: /package:flutter\/widgets\.dart/,
    tokenScope: /ForgeThemeTokens\.of\(context\)\.palette/,
    tokenColors: /forgeActionColors\(p, widget\.tone\)/,
    rangeSteps: /widget\.step \* delta/,
    semanticsIncrease: /onIncrease: _enabled/,
    semanticsDecrease: /onDecrease: _enabled/,
    touch: /onTapUp: _enabled/,
    drag: /onHorizontalDragUpdate: _enabled/,
    keyboard: /LogicalKeyboardKey\.home/,
    rtl: /TextDirection\.rtl/,
    focusOwnership: /if \(_ownsFocus\) _focus\.dispose\(\)/,
    formIntegration: /ForgeFieldRegistration\(/,
    reducedTransparency: /p\.opacityDisabled/,
    paint: /class _ForgeSliderPainter extends CustomPainter/,
    accessibility: /Semantics\(/,
    rangeValidation: /widget\.max <= widget\.min/,
  })) if (!pattern.test(source)) errors.push(`missing ${name}`);
  return errors;
}

if (process.argv[1] && process.argv[1].endsWith('check-native-slider.mjs')) {
  const file = resolve(process.cwd(), 'app/library/lib/src/components/forge_slider.dart');
  const errors = checkNativeSlider(readFileSync(file, 'utf8'));
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('PASS: Flutter Slider platform boundary & core native contracts');
}
