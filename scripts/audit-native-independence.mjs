#!/usr/bin/env node
/**
 * ForgeUI native independence audit. Reads real Dart files plus the authored 221
 * component contracts. No 'DONE' status follows from syntax or file presence.
 * Does not require Flutter SDK or npm dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uniform = value => value.replaceAll('\\', '/');
const sortedUnique = array => [...new Set(array)].sort();

export function parsePubspecRuntime(source) {
  const names = [];
  let inDeps = false;
  const lines = source.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^dependencies:\s*(?:#.*)?$/.test(line)) { inDeps = true; continue; }
    if (inDeps && /^[A-Za-z_][\w-]*:/.test(line)) break;
    if (!inDeps || /^\s*(?:#|$)/.test(line)) continue;
    const found = /^  ([\w-]+):\s*(.*)$/.exec(line);
    if (!found) continue;
    const [, name, value] = found;
    const following = lines[i + 1] ?? '';
    if (name === 'flutter' || /^sdk:\s*\w+/.test(value) || /^    sdk:\s*(flutter|dart)\b/.test(following)) continue;
    names.push(name);
  }
  return sortedUnique(names);
}

function scanDir(root) {
  const files = [];
  function visit(dir) {
    if (!fs.existsSync(dir)) throw new Error(`Missing Dart tree: ${dir}`);
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const file = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && file.endsWith('.dart')) files.push(file);
    }
  }
  visit(root);
  return files.sort();
}

function importInfo(src) {
  const edges = [], platform = [], external = [];
  for (const [i, line] of src.split(/\r?\n/).entries()) {
    const match = /^\s*(?:import|export|part)\s+['"]([^'"]+)['"]/.exec(line);
    if (!match) continue;
    const specifier = match[1];
    if (/^package:flutter\/(material|cupertino)\.dart$/.test(specifier)) {
      platform.push({framework: specifier.includes('material') ? 'material' : 'cupertino', line: i + 1});
    } else if (specifier.startsWith('package:') && !specifier.startsWith('package:flutter/') && !specifier.startsWith('package:forge_ui/')) {
      external.push({package: specifier.slice(8).split('/')[0], line: i + 1});
    } else if (specifier.startsWith('.') || specifier.startsWith('package:forge_ui/')) {
      edges.push(specifier);
    }
  }
  return {edges, platform, external};
}

export function inspectNative(root, {expected = 221} = {}) {
  const library = path.join(root, 'app/library/lib');
  const files = scanDir(library);
  const graph = new Map();
  const fileSet = new Set(files);
  const platformImports = [], thirdPartyImports = [], missingImports = [];
  const apiPath = path.join(root,'docs/sc/app/reference/native-component-api.json');
  const contractsPath = path.join(root,'docs/sc/app/reference/component-contracts.json');
  const api = JSON.parse(fs.readFileSync(apiPath,'utf8'));
  const contracts = JSON.parse(fs.readFileSync(contractsPath,'utf8'));
  if (api.components.length !== expected || contracts.components.length !== expected)
    throw new Error(`Expected ${expected} native and Web contracts, found ${api.components.length}/${contracts.components.length}`);
  for (const file of files) {
    const name = uniform(path.relative(root, file));
    const content = fs.readFileSync(file, 'utf8');
    const scan = importInfo(content);
    const resolves = [];
    for (const spec of scan.edges) {
      const next = spec.startsWith('package:forge_ui/')
        ? path.resolve(library, spec.slice('package:forge_ui/'.length))
        : path.resolve(path.dirname(file), spec);
      if (fileSet.has(next)) resolves.push(next);
      else missingImports.push({file: name, import: spec});
    }
    graph.set(file, {name, resolves, direct: scan.platform.length > 0});
    for (const hit of scan.platform) platformImports.push({path: name, ...hit});
    for (const hit of scan.external) thirdPartyImports.push({path: name, ...hit});
  }
  platformImports.sort((a,b)=>a.path.localeCompare(b.path)||a.line-b.line);
  thirdPartyImports.sort((a,b)=>a.path.localeCompare(b.path)||a.line-b.line);
  const memo=new Map();
  function ancestry(file, trail=new Set()) {
    if (memo.has(file)) return memo.get(file);
    if (trail.has(file) || !graph.has(file)) return false;
    trail.add(file);
    const node=graph.get(file);
    const yes=node.direct || node.resolves.some(child=>ancestry(child,trail));
    trail.delete(file);
    memo.set(file,yes);
    return yes;
  }
  const webByName = new Map(contracts.components.map(c=>[c.component,c]));
  const components = api.components.map(c=>{
    const fullPath = path.join(root,c.sourceFile);
    const exists = fs.existsSync(fullPath);
    const web = webByName.get(c.name);
    const publicClassSymbolSeen = exists && fs.readFileSync(fullPath,'utf8').includes(c.dartName);
    const supplied = new Set((c.parameters||[]).map(p=>p.name));
    const candidateMissingProps = (web?.properties||[])
      .map(p=>p.target)
      .filter(p=>typeof p==='string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(p) && !supplied.has(p));
    return {
      component:c.name,
      level:c.level,
      dartName:c.dartName,
      sourceFile:c.sourceFile,
      sourceExists: exists,
      publicClassSymbolSeen,
      directlyMaterialDependent: exists && (graph.get(fullPath)?.direct ?? false),
      transitivelyMaterialDependent: exists && ancestry(fullPath),
      candidateMissingMappedProperties:sortedUnique(candidateMissingProps),
      specStatus:web?.status ?? 'NOT_FOUND',
      visualParity:'NOT_VERIFIED',
      flutterRuntimeAcceptance:'NOT_VERIFIED'
    };
  });
  const deps = parsePubspecRuntime(fs.readFileSync(path.join(root,'app/library/pubspec.yaml'),'utf8'));
  const tokenFile=path.join(root,'app/library/lib/src/generated/forge_tokens.g.dart');
  const tokens=fs.readFileSync(tokenFile,'utf8');
  const schemaFile=path.join(root,'shared/tokens/schema.json');
  const tokenSchema=fs.existsSync(schemaFile) ? JSON.parse(fs.readFileSync(schemaFile,'utf8')) : null;
  const summary = {
    documentedContracts: api.components.length,
    webContracts: contracts.components.length,
    distinctDartFiles: files.length,
    sourceFilesMissing: components.filter(c=>!c.sourceExists).map(c=>c.sourceFile),
    constructorSymbolsMissing:components.filter(c=>!c.publicClassSymbolSeen).map(c=>c.dartName),
    directMaterialOrCupertinoImportCount: platformImports.length,
    directMaterialOrCupertinoFiles: sortedUnique(platformImports.map(x=>x.path)),
    contractsWithDirectMaterialDependency: components.filter(x=>x.directlyMaterialDependent).length,
    contractsWithTransitiveMaterialDependency: components.filter(x=>x.transitivelyMaterialDependent).length,
    thirdPartyRuntimeDependencies: deps,
    thirdPartyImportCount: thirdPartyImports.length,
    missingRelativeImports: missingImports.length,
    fontFamilyGenerated: tokens.includes('fontFamilyBrand'),
    rootFontSizeVerified: tokenSchema?.rootFontSizeVerified ?? null,
    allVisualParityPending:components.every(x=>x.visualParity === 'NOT_VERIFIED'),
    strictIndependent: platformImports.length===0 && deps.length===0 && components.every(x=>x.sourceExists&&x.publicClassSymbolSeen) && missingImports.length===0,
  };
  return {
    schemaVersion:1,
    source:'native-component-api.json + component-contracts.json + Dart source graph + pubspec.yaml',
    evidenceScope:'static source/inventory; does not demonstrate Flutter compilation, accessibility or visual parity',
    summary,platformImports,thirdPartyImports,missingImports,
    components,
    inputFingerprint:crypto.createHash('sha256').update(JSON.stringify({apiCount:api.components.length,contractsCount:contracts.components.length,platformImports,deps,missingImports})).digest('hex')
  };
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const args=process.argv.slice(2);
    const rootArg=args.find(a=>a.startsWith('--root='));
    const root=rootArg?path.resolve(rootArg.slice(7)):defaultRoot;
    const maxArg=args.find(a=>a.startsWith('--max-platform-imports='));
    const max=maxArg?Number(maxArg.split('=')[1]):Infinity;
    const result=inspectNative(root);
    const target=path.join(root,'docs/migration/validation/native-independence-matrix.json');
    if(args.includes('--write-report')){fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify(result,null,2)+'\n');}
    console.log(JSON.stringify({summary:result.summary,inputFingerprint:result.inputFingerprint},null,2));
    if(args.includes('--check')&&(result.summary.sourceFilesMissing.length||result.summary.constructorSymbolsMissing.length||result.summary.missingRelativeImports||result.summary.directMaterialOrCupertinoImportCount>max))process.exitCode=1;
    if(args.includes('--strict')&&!result.summary.strictIndependent)process.exitCode=1;
  } catch(e) {console.error(`Native independence audit: ${e.message}`);process.exitCode=1;}
}
