import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const tab = read('app/library/lib/src/components/forge_tabs.dart');
const scene = read('app/showcase_flutter/lib/main.dart');
const preview = read('showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.tsx');
const examples = read('showcase/portal/src/features/showcase-v2/components/FlutterPreview/flutter-interaction-configurations.tsx');
const tokens = read('showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.module.css');

assert.match(tab, /selected\s*\?\s*ForgeAppearance\.solid\s*:\s*ForgeAppearance\.ghost/);
assert.match(tab, /appearance:\s*appearance\s*\?\?/);
assert.match(tab, /child:\s*attached\s*\?/); // underline is explicit opt-in, not default
assert.match(scene, /AlignmentDirectional\.topStart/);
assert.doesNotMatch(scene, /return Center\(/);
assert.match(scene, /backgroundColor:\s*theme\.colorScheme\.surface/);
assert.match(scene, /BoxConstraints\(maxWidth:\s*560\)/);
assert.doesNotMatch(scene, /SizedBox\(\s*width:\s*560/);
assert.match(tokens, /background:\s*var\(--color-surface-default\)/);
assert.match(preview, /<iframe/);
assert.doesNotMatch(preview, /Abrir prévia Flutter em outra aba|target="_blank"/);
assert.match(examples, /function tabsConsumerCode/);
assert.match(examples, /entry\.family === "tabs"/);
assert.match(examples, /"Widget buildTabs\(\) => ForgeTabs\("/);
assert.match(examples, /"    ForgeTabsHeader\(tabs: \["/);
assert.match(examples, /"    ForgeTabsBody\(panels: \["/);
assert.match(examples, /"  \],"/);

console.log('Showcase source parity checks: passed (NOT visual/browser acceptance).');
