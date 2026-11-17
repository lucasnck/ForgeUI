import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, 'shared/tokens', file), 'utf8'));
const schema = read('schema.json');
const primitive = read('primitives.json').tokens;
const semantic = read('semantic.json').tokens;
const themes = read('themes.json').themes;
const report = read('parity-report.json');
assert.deepEqual(Object.keys(themes), schema.supportedThemes);
assert.equal(semantic['--color-brand-primary'].$value, '#2d66ee');
assert.equal(semantic['--color-brand-deep'].$value, '#212d6b');
assert.equal(semantic['--color-brand-night'].$value, '#161e47');
assert.equal(semantic['--color-brand-gray'].$value, '#d9d9d9');
assert.ok(Object.hasOwn(semantic, '--color-text-default'));
assert.ok(report.portableCount > 150);
const css = fs.readFileSync(path.join(root, 'web/library/src/design-system/styles/tokens.css'));
assert.equal(crypto.createHash('sha256').update(css).digest('hex'), schema.approvedCssSha256);
assert.equal(report.webCssSha256, schema.approvedCssSha256);
for (const t of schema.supportedThemes) {
  assert.ok(themes[t]['--color-surface-default'], `Missing ${t} surface`);
}
execFileSync(process.execPath, [path.join(root, 'shared/tokens/generate.mjs'), '--check'], { cwd: root, stdio: 'inherit' });
execFileSync(process.execPath, [path.join(root, 'shared/tokens/generate.mjs'), '--check'], { cwd: root, stdio: 'inherit' });
console.log('PASS token source, brand constants, 4 themes, baseline hash, deterministic CSS/Dart');
