import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { checkNativeSlider } from './check-native-slider.mjs';

const file = resolve(process.cwd(), 'app/library/lib/src/components/forge_slider.dart');
const source = readFileSync(file, 'utf8');
assert.deepEqual(checkNativeSlider(source), []);
const injected = [
  source.replace("import 'package:flutter/widgets.dart';", "import 'package:flutter/material.dart';"),
  source.replace('onIncrease: _enabled', 'onIncrease: null'),
  source.replace('onHorizontalDragUpdate: _enabled', 'onHorizontalDragUpdate: null'),
  source.replace('widget.max <= widget.min', 'widget.max < widget.min'),
];
for (const broken of injected) {
  assert.ok(checkNativeSlider(broken).length > 0, 'injected regression should be rejected');
}
console.log('PASS: native Slider static contract + 4 negative regressions');
