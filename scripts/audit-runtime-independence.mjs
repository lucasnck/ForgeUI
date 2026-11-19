#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const canonicalRoot = path.resolve(path.dirname(scriptPath), '..');

const sort = (values) => [...new Set(values)].sort();

/** Reads production pubspec dependencies, not dev_dependencies or SDK entries. */
export function parseFlutterRuntimeDependencies(contents) {
  const result = [];
  let inDependencies = false;
  const lines = contents.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^dependencies:\s*(?:#.*)?$/.test(line)) { inDependencies = true; continue; }
    if (inDependencies && /^[A-Za-z_][\w-]*:/.test(line)) break;
    if (!inDependencies || /^\s*#/.test(line) || /^\s*$/.test(line)) continue;
    const match = line.match(/^  ([\w-]+):\s*(.*)$/);
    if (!match) continue;
    const [, name, value] = match;
    const nextLine = lines[i + 1] ?? '';
    if (name === 'flutter' && (/sdk:\s*flutter/.test(value) || /^    sdk:\s*flutter\b/.test(nextLine))) continue;
    if (/^sdk:\s*/.test(value) || /^    sdk:\s*(flutter|dart)\b/.test(nextLine)) continue;
    result.push(name);
  }
  return sort(result);
}

/** The UI library may peer-depend on React, but not ship another UI framework. */
export function parseReactRuntimeDependencies(contents) {
  const data = JSON.parse(contents);
  return sort(Object.keys(data.dependencies ?? {}).filter(name =>
    name !== 'react' && name !== 'react-dom'));
}

function listSourceFiles(directory, extensions) {
  if (!fs.existsSync(directory)) throw new Error(`Missing source directory: ${directory}`);
  const output = [];
  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const item = path.join(current, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) visit(item);
      else if (entry.isFile() && extensions.some(ext => item.endsWith(ext))) output.push(item);
    }
  }
  visit(directory);
  return output.sort();
}

export function findFlutterPlatformImports(root) {
  const directory = path.join(root, 'app/library/lib');
  return listSourceFiles(directory, ['.dart']).flatMap(file => {
    const contents = fs.readFileSync(file, 'utf8');
    const offenders = [];
    for (const [index, line] of contents.split(/\r?\n/).entries()) {
      const match = line.match(/^\s*(?:import|export)\s+['"]package:flutter\/(material|cupertino)\.dart['"]/);
      if (match) offenders.push({ path: path.relative(root, file).replaceAll('\\', '/'), line: index + 1, framework: match[1] });
    }
    return offenders;
  });
}

export function inspectRoot(root, baseline) {
  const reactFile = path.join(root, 'web/library/package.json');
  const flutterFile = path.join(root, 'app/library/pubspec.yaml');
  const react = parseReactRuntimeDependencies(fs.readFileSync(reactFile, 'utf8'));
  const flutter = parseFlutterRuntimeDependencies(fs.readFileSync(flutterFile, 'utf8'));
  const materialImports = findFlutterPlatformImports(root);
  const exceptions = baseline.knownRuntimeDependencies ?? {};
  const drift = [];
  for (const [name, actual] of [['react', react], ['flutter', flutter]]) {
    const approved = sort(exceptions[name] ?? []);
    for (const extra of actual.filter(x => !approved.includes(x))) drift.push(`${name}: new runtime dependency ${extra}`);
    for (const missing of approved.filter(x => !actual.includes(x))) drift.push(`${name}: baseline dependency removed; update and review baseline: ${missing}`);
  }
  return {
    schemaVersion: 1,
    productionRuntimeDependencies: {react, flutter},
    flutterMaterialOrCupertinoImports: materialImports,
    materialImportCount: materialImports.length,
    baselineDrift: drift,
    zeroThirdPartyRuntimeDependencies: react.length === 0 && flutter.length === 0,
    zeroFlutterPlatformUIImports: materialImports.length === 0,
    note: 'Material/Cupertino are Flutter SDK modules, not third-party packages. All production runtime dependencies and Material/Cupertino imports must be eliminated before claiming native design-system independence.'
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  const args = new Set(process.argv.slice(2));
  const rootArg = process.argv.find(arg => arg.startsWith('--root='));
  const root = rootArg ? path.resolve(rootArg.slice('--root='.length)) : canonicalRoot;
  const baselinePath = path.join(root, 'docs/migration/validation/runtime-independence-baseline.json');
  try {
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    const report = inspectRoot(root, baseline);
    if (args.has('--write-report')) {
      const target = path.join(root, 'docs/migration/validation/runtime-independence-report.json');
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n');
    }
    console.log(JSON.stringify(report, null, 2));
    if (report.baselineDrift.length > 0 && args.has('--check')) process.exitCode = 1;
    if (args.has('--strict') && (!report.zeroThirdPartyRuntimeDependencies || !report.zeroFlutterPlatformUIImports)) process.exitCode = 1;
  } catch (error) {
    console.error(`Independence audit failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
