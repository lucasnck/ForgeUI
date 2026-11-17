#!/usr/bin/env node
/**
 * Evidence-preserving source inventory for ForgeUI Flutter.
 * Declared class + public export is NOT runtime validation or SC acceptance.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entry = path.join(root, 'app/library/lib/forge_ui.dart');
const progressFile = path.join(root, 'docs/migration/FLUTTER-IMPLEMENTATION-PROGRESS.json');
const outJson = path.join(root, 'docs/migration/FLUTTER-SOURCE-COVERAGE.json');
const outMarkdown = path.join(root, 'docs/migration/FLUTTER-SOURCE-COVERAGE.md');

function exportedClasses(file, visited = new Set()) {
  const target = path.resolve(file);
  if (visited.has(target)) return { names: new Set(), missing: [] };
  visited.add(target);
  if (!fs.existsSync(target)) return { names: new Set(), missing: [path.relative(root, target)] };
  const source = fs.readFileSync(target, 'utf8');
  const names = new Set();
  const missing = [];
  for (const match of source.matchAll(/\b(?:(?:abstract\s+)?class|typedef)\s+(Forge[A-Za-z0-9_]+)/g)) {
    names.add(match[1]);
  }
  for (const match of source.matchAll(/\bexport\s+['"]([^'"]+\.dart)['"]\s*(?:show\s+([^;]+))?;/g)) {
    // Public component exports are transitive; internal Dart import is not an export.
    const resolved = path.resolve(path.dirname(target), match[1]);
    if (!resolved.includes(`${path.sep}lib${path.sep}src${path.sep}components${path.sep}`)) continue;
    const nested = exportedClasses(resolved, new Set(visited));
    missing.push(...nested.missing);
    const visible = match[2] ? new Set(match[2].split(',').map(x => x.trim())) : null;
    for (const name of nested.names) if (visible === null || visible.has(name)) names.add(name);
  }
  return { names, missing };
}

const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const expected = [...progress.previousFunctionalDelivery, ...progress.groups.flatMap(g => g.names)];
if (expected.length !== progress.baseline || new Set(expected).size !== expected.length) {
  throw new Error(`Invalid baseline: ${expected.length} entries / ${new Set(expected).size} unique / ${progress.baseline} expected`);
}

const exports = exportedClasses(entry);
const sourceNames = exports.names;
const groups = [
  { id: 'first-delivery', names: progress.previousFunctionalDelivery },
  ...progress.groups.map(g => ({ id: g.id, names: g.names })),
].map(group => ({
  id: group.id,
  total: group.names.length,
  publiclyExportedSource: group.names.filter(name => sourceNames.has(`Forge${name}`)),
  noPublicExportedSource: group.names.filter(name => !sourceNames.has(`Forge${name}`)),
}));
const result = {
  label: 'Static Flutter public Dart source coverage — NOT acceptance or test evidence',
  baseline: progress.baseline,
  sourceDeclarationsWithPublicExport: groups.reduce((sum, g) => sum + g.publiclyExportedSource.length, 0),
  missingOrUnavailable: groups.reduce((sum, g) => sum + g.noPublicExportedSource.length, 0),
  unresolvedSourceExportFiles: [...new Set(exports.missing)].sort(),
  validationPolicy: 'Do not mark any SC DONE without actual flutter analyze/test, preview build and relevant native/visual evidence.',
  groups,
};
const summary = [
  '# Forge UI — Flutter source coverage (static)',
  '',
  '**These counts are public Dart source declarations, NOT verified implementations or DONE SCs.**',
  '',
  '| Group | Source + public export | No public export confirmed |',
  '| --- | ---: | ---: |',
  ...groups.map(g => `| ${g.id} | ${g.publiclyExportedSource.length}/${g.total} | ${g.noPublicExportedSource.length} |`),
  '',
  `Total: **${result.sourceDeclarationsWithPublicExport}/${progress.baseline}** declared and publicly exported in the inspected tree.`,
  '',
  ...groups.map(g => `## ${g.id}\n\nMissing or unconfirmed public source: ${g.noPublicExportedSource.join(', ') || 'none'}\n`),
  `\nUnresolved files during audit: ${result.unresolvedSourceExportFiles.join(', ') || 'none'}\n`,
  '## Acceptance',
  '',
  'Compilation, widget tests, Flutter Web preview build, Android/iOS and visual/semantic acceptance **were not executed by this script**. Review SC criteria and real test logs before updating `DONE`.',
].join('\n');
if (process.argv.includes('--write')) {
  fs.writeFileSync(outJson, JSON.stringify(result, null, 2) + '\n');
  fs.writeFileSync(outMarkdown, summary + '\n');
}
console.log(JSON.stringify({ baseline: result.baseline, publicSource: result.sourceDeclarationsWithPublicExport, missing: result.missingOrUnavailable, unresolvedExportFiles: result.unresolvedSourceExportFiles }, null, 2));
