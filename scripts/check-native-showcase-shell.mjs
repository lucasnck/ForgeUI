import fs from 'node:fs';
import path from 'node:path';

const index = process.argv.indexOf('--root');
const root = index >= 0 ? path.resolve(process.argv[index + 1]) : path.resolve(import.meta.dirname, '..');
const get = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const source = get('app/showcase_flutter/lib/main.dart');
const pubspec = get('app/showcase_flutter/pubspec.yaml');
const legacy = get('app/showcase_flutter/lib/legacy_material_bridge.dart');
const tests = get('app/showcase_flutter/test/preview_test.dart');
const tokens = JSON.parse(get('shared/tokens/primitives.json')).tokens;
const requireThat = (condition, msg) => { if (!condition) throw new Error(`Native showcase shell: ${msg}`); };
const match = (regex, input, label) => {
  const found = input.match(regex);
  requireThat(Boolean(found), `${label} missing`);
  return found;
};

// Refuse drift from the canonical Web font-family token.
const brandToken = tokens['--font-family-brand']?.$value;
requireThat(typeof brandToken === 'string', 'canonical --font-family-brand missing');
const families = brandToken.split(',').map(value => value.trim().replace(/^['"]|['"]$/g, ''));
requireThat(families.length >= 2, 'font token must have fallback families');
const configured = match(/fontFamily:\s*'([^']+)'/, source, 'fontFamily')[1];
const declaredFallbacks = [...match(/fontFamilyFallback:\s*const\s*\[([^\]]+)\]/, source, 'fontFamilyFallback')[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
requireThat(configured === families[0], `fontFamily=${configured} differs from Web ${families[0]}`);
requireThat(JSON.stringify(declaredFallbacks) === JSON.stringify(families.slice(1)), 'Flutter fallback order differs from Web');

requireThat(/import\s+'package:flutter\/widgets.dart';/.test(source), 'widgets.dart import missing');
requireThat(!/import\s+['"]package:flutter\/(?:material|cupertino)\.dart['"]/.test(source), 'Material/Cupertino import present');
requireThat(!/\b(?:MaterialApp|CupertinoApp|Scaffold)\s*\(/.test(source), 'framework app shell still used');
requireThat(/return\s+WidgetsApp\s*\(/.test(source), 'WidgetsApp shell missing');
requireThat(/pageRouteBuilder:\s*<T>/.test(source), 'route builder/navigation missing');
requireThat(/builder:\s*\(context,\s*child\)\s*=>\s*ForgeThemeScope\s*\(/.test(source), 'Forge theme not wrapping navigator');
requireThat(/tokens:\s*tokens/.test(source) && /ForgeThemeTokens\.fromId\(settings\.theme\)/.test(source), 'four-theme token selection missing');
requireThat(/ForgePreviewLegacyMaterialBridge\s*\(/.test(source) && /import 'legacy_material_bridge\.dart';/.test(source), 'legacy compatibility boundary not wired');
requireThat(/DefaultTextStyle\s*\(/.test(source), 'token text style missing');
requireThat(/IconTheme\s*\(/.test(source), 'token icon theme missing');
requireThat(/color:\s*palette\.colorTextDefault/.test(source), 'text color token missing');
requireThat(/fontSize:\s*palette\.fontSizeMd/.test(source), 'font size token missing');
requireThat(/home:\s*ColoredBox\s*\(/.test(source) && /color:\s*palette\.colorSurfaceSubtle/.test(source), 'preview surface token missing');
requireThat(/Uri\.base\.fragment/.test(source) && /widget\.connect\(/.test(source), 'preview bridge or slug routing missing');
requireThat(!/Roboto|roboto/.test(source) && !/Roboto|roboto/.test(pubspec) && !/Roboto|roboto/.test(legacy), 'Roboto still imposed or bundled');
requireThat(/import 'package:flutter\/material\.dart';/.test(legacy), 'legacy adapter must own transitional Material import');
requireThat(!/\bMaterialApp\s*\(/.test(legacy), 'legacy adapter reintroduces MaterialApp');
requireThat(/DefaultMaterialLocalizations\.delegate/.test(legacy) && /Material\s*\(/.test(legacy) && /Theme\s*\(/.test(legacy), 'legacy picker/input dependencies missing');
requireThat(/forge_ui:\s*\n\s*path:\s*\.\.\/library/.test(pubspec), 'native ForgeUI package link missing');
requireThat(/find\.byType\(WidgetsApp\)/.test(tests) && /find\.byType\(MaterialApp\)/.test(tests), 'widget tests do not assert app boundary');
requireThat(/find\.byType\(ForgeButton\)/.test(tests), 'widget tests still assert Material control internals');
console.log(`PASS ForgeUI Showcase shell: WidgetsApp + ForgeThemeScope, font ${families.join(' / ')}, no forced Roboto`);
