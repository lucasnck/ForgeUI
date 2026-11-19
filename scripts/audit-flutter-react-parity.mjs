#!/usr/bin/env node
/**
 * Forge UI cross-platform traceability gate.
 * A successful structural audit does NOT mean pixel/semantic/native parity.
 * --check: nonzero exit for missing source/API/preview/catalog entries.
 * --require-visual: additionally require an external evidence file with signed-off
 * evidence for each component/scenario; no automatic evidence is fabricated.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const models = [
  ['primitives', 'flutter-primitives.json'], ['inputs', 'flutter-inputs.json'],
  ['composites', 'flutter-composites.json'], ['feedback', 'flutter-feedback.json'],
  ['interactions', 'flutter-interactions.json'], ['forms', 'flutter-forms.json'],
  ['collections', 'flutter-collections.json'], ['transients', 'flutter-transients.json'],
  ['advanced', 'flutter-advanced.json'], ['parts', 'flutter-parts.json'],
];
const modelDir = 'showcase/portal/src/features/showcase-v2/model/';
const native = load(modelDir + 'flutter-native-api.json').entries;
const web = load('docs/sc/app/reference/component-contracts.json').components;
const manifest = load(modelDir + 'flutter-preview-manifest.json').entries;
const catalog = new Map([['button', 'actions'], ['button-group', 'actions'], ['spinner', 'actions']]);
const errors = [];
const count = { native: native.length, web: web.length, manifest: manifest.length };
for (const [family, file] of models) {
  const entries = load(modelDir + file);
  count[family] = entries.length;
  for (const entry of entries) {
    if (catalog.has(entry.slug)) errors.push(`Duplicate catalog slug: ${entry.slug}`);
    catalog.set(entry.slug, family);
  }
}
const maps = (items, field, label) => {
  const map = new Map();
  for (const item of items) {
    const key = item[field];
    if (!key) errors.push(`${label} entry without ${field}`);
    else if (map.has(key)) errors.push(`Duplicate ${label}: ${key}`);
    else map.set(key, item);
  }
  return map;
};
const byNative = maps(native, 'slug', 'Dart API');
const byWeb = maps(web, 'component', 'React traceability');
const byManifest = maps(manifest, 'componentSlug', 'Flutter preview');
const byName = maps(native, 'name', 'Dart component name');
const rows = [];
for (const entry of native) {
  const w = byWeb.get(entry.name);
  const p = byManifest.get(entry.slug);
  const family = catalog.get(entry.slug);
  if (!w) errors.push(`Missing React traceability: ${entry.name}`);
  if (!family) errors.push(`Missing showcase catalog: ${entry.slug}`);
  if (!p || p.available !== true || p.codeLanguage !== 'dart' || !p.previewPath) {
    errors.push(`Missing compiled preview manifest: ${entry.slug}`);
  }
  const targetFields = (w?.properties || []).filter((a) => a.target).map((a) => a.target);
  const nativeFields = new Set(entry.properties.map((a) => a.name));
  const unmatched = [...new Set(targetFields.filter((name) => !nativeFields.has(name)))];
  const scenarioIds = w?.scenarioIds || [];
  rows.push({
    component: entry.name, slug: entry.slug, family: family ?? 'unknown',
    level: w?.level ?? null,
    reactSource: w?.webSource ?? null,
    reactSourceSha256: w?.webSourceSha256 ?? null,
    reactSC: w?.webSpec ?? null,
    flutterSource: entry.sourceFile,
    flutterSC: w?.appSpec ?? null,
    flutterConstructor: entry.dartName,
    requiredFlutterFields: entry.properties.filter((a) => a.required).map((a) => `${a.name}: ${a.type}`),
    propertyMappingsToReview: unmatched,
    scenarioIds, requiredScenarios: scenarioIds.length,
    catalogRegistered: Boolean(family),
    previewRegistered: Boolean(p?.available),
    codeSnippetVerified: false,
    visualParity: 'unverified',
    interactionParity: 'unverified',
    a11yParity: 'unverified',
    nativeParity: 'unverified',
    acceptance: 'PENDING',
    evidence: [],
  });
}
// Persistent human/device/browser evidence lives separately from this GENERATED report.
// A regenerated inventory must never erase manually reviewed evidence.
const evidencePath = path.join(root, 'docs/migration/validation/flutter-react-parity-evidence.json');
const evidence = fs.existsSync(evidencePath)
  ? JSON.parse(fs.readFileSync(evidencePath, 'utf8'))
  : { schemaVersion: 1, entries: {} };
if (evidence.schemaVersion !== 1 || typeof evidence.entries !== 'object' || !evidence.entries || Array.isArray(evidence.entries)) {
  errors.push('Unsupported or malformed visual evidence schema');
} else {
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  for (const [slug, record] of Object.entries(evidence.entries)) {
    const row = bySlug.get(slug);
    if (!row) { errors.push(`Unknown evidence slug: ${slug}`); continue; }
    if (typeof record !== 'object' || !record || Array.isArray(record)) {
      errors.push(`Invalid evidence entry: ${slug}`); continue;
    }
    const approvals = ['visualParity', 'interactionParity', 'a11yParity', 'nativeParity'];
    const attempts = approvals.some((k) => record[k] === 'pass');
    if (!attempts) continue;
    const scenarios = new Set(record.scenarioIds || []);
    const complete = row.scenarioIds.every((id) => scenarios.has(id));
    const current = record.reactSourceSha256 === row.reactSourceSha256 && Boolean(row.reactSourceSha256);
    const proof = Array.isArray(record.evidence) && record.evidence.length > 0 &&
      record.evidence.every((item) => typeof item === 'string' && item.trim().length > 0);
    const reviewer = typeof record.reviewedBy === 'string' && record.reviewedBy.trim().length > 0;
    const date = typeof record.reviewedAt === 'string' && !Number.isNaN(Date.parse(record.reviewedAt));
    if (!complete || !current || !proof || !reviewer || !date) {
      errors.push(`Incomplete, stale or unreferenced visual signoff: ${slug}`);
      continue;
    }
    for (const prop of approvals) if (record[prop] === 'pass') row[prop] = 'pass';
    row.evidence = record.evidence;
  }
}

for (const w of web) if (!byName.has(w.component)) errors.push(`React component without native API: ${w.component}`);
for (const p of manifest) if (!byNative.has(p.componentSlug)) errors.push(`Preview without public Dart API: ${p.componentSlug}`);
for (const slug of catalog.keys()) if (!byNative.has(slug)) errors.push(`Catalog without public Dart API: ${slug}`);
if (native.length !== 221 || web.length !== 221 || manifest.length !== 221 || catalog.size !== 221) {
  errors.push(`Inventory expected 221: ${JSON.stringify({ ...count, catalog: catalog.size })}`);
}
const totalScenarios = rows.reduce((s, row) => s + row.requiredScenarios, 0);
const summary = {
  generatedAtUtc: new Date().toISOString(),
  inventoryCounts: { ...count, catalog: catalog.size, scenarios: totalScenarios },
  structuralErrors: errors,
  pendingVisualReviews: rows.filter((r) => r.visualParity !== 'pass').length,
  pendingNativeReviews: rows.filter((r) => r.nativeParity !== 'pass').length,
  incompleteApiMappingReview: rows.filter((r) => r.propertyMappingsToReview.length > 0).length,
  note: 'Structural existence checks do not prove visual, behavioral, accessibility or native parity. Unmatched props can be deliberate DOM-to-native adaptations; review their owning SC.',
};
const report = { ...summary, entries: rows };
const writeReport = process.argv.includes('--write-report');
const outDir = path.join(root, 'docs/migration/validation');
const jsonPath = path.join(outDir, 'flutter-react-parity-inventory.json');
if (writeReport) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2) + '\n');
}
const markdown = [
  '# Forge UI — React / Flutter Parity Inventory',
  '',
  `Generated from current Drive source inputs (UTC ${summary.generatedAtUtc}).`,
  '',
  `- API: ${native.length} / 221` ,
  `- React traceability: ${web.length} / 221`,
  `- Flutter showcase catalog: ${catalog.size} / 221`,
  `- Compiled preview registrations: ${manifest.length} / 221`,
  `- React scenarios recorded: ${totalScenarios}`, 
  `- Visual reviews with verified metadata: **${rows.length - summary.pendingVisualReviews} of ${rows.length}** (human-provided evidence, not a screenshot comparison performed by this script).`,
  `- Components with constructor mapping items to review: ${summary.incompleteApiMappingReview}`,
  '',
  '| Component | Family | React scenarios | Registered preview | Visual | Native | Owner spec |',
  '|---|---|---:|---|---|---|---|',
  ...rows.map((r) => `| ${r.component} | ${r.family} | ${r.requiredScenarios} | ${r.previewRegistered ? 'yes' : 'NO'} | ${r.visualParity} | ${r.nativeParity} | ${r.flutterSC ?? 'missing'} |`),
  '',
  '## Structural errors',
  ...(errors.length ? errors.map((e) => `- ${e}`) : ['None found.']),
  '',
  '## Required manual evidence',
  '',
  'Match React/Flutter screenshot pairs per theme, variant, state, viewport and scenario. Record actual native-device focus, semantics, contrast and motion results. Update each owning SC status only after its own criteria pass.',
  '',
];
if (writeReport) fs.writeFileSync(path.join(outDir, 'flutter-react-parity-inventory.md'), markdown.join('\n'));
console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
if (process.argv.includes('--require-visual') && summary.pendingVisualReviews > 0) {
  console.error(`Visual parity remains UNVERIFIED for ${summary.pendingVisualReviews} components.`);
  process.exitCode = 1;
}
