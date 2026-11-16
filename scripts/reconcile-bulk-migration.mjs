/** Audited follow-up to the non-destructive bulk copy. Keeps before-images. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(root, '../PraticarWorkspace/PraticarFront');
const slash = value => value.replaceAll(path.sep, '/');
const sha = value => createHash('sha256').update(value).digest('hex');
const records = [];
const supportSources = [];
const mappings = [
  ['src/lib/contracts/preferences.ts', 'web/library/src/support/contracts/preferences.ts'],
  ['src/lib/contracts/selection.ts', 'web/library/src/support/contracts/selection.ts'],
  ['src/lib/formatting', 'web/library/src/support/formatting'],
  ['src/lib/forms', 'web/library/src/support/forms'],
  ['src/infrastructure/theme', 'web/library/src/support/theme'],
  ['src/infrastructure/i18n', 'web/library/src/support/i18n'],
  ['src/app/design-system-v2/(demos)', 'showcase/portal/src/app/(demos)'],
  ['public/images/showcase', 'showcase/portal/public/images/showcase'],
];
for (const name of ['tech-brand-identity', 'tech-react-hook-form', 'tech-theming', 'tech-form-config', 'tech-preference-contracts', 'tech-form-config-types', 'core-catalog-ds', 'core-catalog-ds-template', 'core-template', 'core-catalog-template']) {
  mappings.push([`docs/sc/${name}.sc.md`, `docs/sc/${name}.sc.md`]);
}
async function* files(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(absolute);
    else if (entry.isFile()) yield absolute;
  }
}
async function write(relative, content, origin) {
  const target = path.join(root, relative);
  const before = await fs.readFile(target).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
  const after = Buffer.from(content);
  if (before?.equals(after)) return;
  if (before) {
    const archive = path.join(root, 'docs/migration/before-bulk-reconciliation', relative + '.txt');
    await fs.mkdir(path.dirname(archive), { recursive: true });
    await fs.writeFile(archive, before, { flag: 'wx' }).catch(error => { if (error.code !== 'EEXIST') throw error; });
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, after);
  records.push({ file: slash(relative), origin, beforeSha256: before && sha(before), afterSha256: sha(after) });
}
const aliases = {
  '@/lib/contracts/preferences': 'web/library/src/support/contracts/preferences',
  '@/lib/contracts/selection': 'web/library/src/support/contracts/selection',
  '@/lib/formatting/intl': 'web/library/src/support/formatting/intl',
  '@/lib/forms': 'web/library/src/support/forms',
  '@/infrastructure/theme': 'web/library/src/support/theme',
  '@/infrastructure/i18n': 'web/library/src/support/i18n',
};
function transform(content, target) {
  if (target.startsWith(path.join(root, 'showcase/portal'))) content = content.replaceAll('/design-system-v2/', '/');
  const formsTest = path.join(root, 'web/library/src/design-system/types/forms.test.ts');
  if (target === formsTest) content = content.replaceAll('"../../lib/forms"', '"../../support/forms"');
  if (target.startsWith(path.join(root, 'showcase/portal/src'))) {
    content = content.replace(/(['"])(\.\.[^'"\n]*)(['"])/g, (full, quote, specifier, end) => {
      const resolved = path.resolve(path.dirname(target), specifier);
      const oldBase = path.join(root, 'showcase/portal/src/design-system');
      if (!resolved.startsWith(oldBase + path.sep)) return full;
      const actual = path.join(root, 'web/library/src/design-system', path.relative(oldBase, resolved));
      return quote + slash(path.relative(path.dirname(target), actual)) + end;
    });
  }
  return content.replace(/((?:\bfrom\s*|\bimport\s*\(|\brequire\s*\(|\bimport\s*)['"])(@\/[^'"\n]+)(['"])/g, (full, before, specifier, after) => {
    if (target.startsWith(path.join(root, 'showcase/portal')) && specifier === '@/design-system') return before + '@forge-ui/web' + after;
    const destination = aliases[specifier] ?? (specifier === '@/features/showcase-v2' ? 'showcase/portal/src/features/showcase-v2' : specifier.startsWith('@/features/showcase-v2/') ? 'showcase/portal/src/features/showcase-v2/' + specifier.slice('@/features/showcase-v2/'.length) : null);
    if (!destination) return full;
    let relative = slash(path.relative(path.dirname(target), path.join(root, destination)));
    if (!relative.startsWith('.')) relative = './' + relative;
    return before + relative + after;
  });
}
for (const [from, to] of mappings) {
  const input = path.join(source, from);
  const stat = await fs.stat(input);
  const list = stat.isDirectory() ? files(input) : [input];
  for await (const file of list) {
    if (file.includes(`${path.sep}api-errors${path.sep}`)) continue;
    const relative = stat.isDirectory() ? path.join(to, path.relative(input, file)) : to;
    const sourceBytes = await fs.readFile(file);
    let content = sourceBytes.toString('utf8');
    if (slash(relative).endsWith('i18n/index.ts')) content = content.split('\n').filter(line => !line.includes('./api-errors/')).join('\n');
    // Namespace preference storage per consumer instead of sharing the Praticar keys.
    if (/[/\\](theme|locale)\.ts$/.test(relative)) content = content.replaceAll('"praticar-theme"', '"forge-ui-theme"').replaceAll('"praticar-locale"', '"forge-ui-locale"');
    const transformed = transform(content, path.join(root, relative));
    await write(relative, transformed, slash(path.relative(source, file)));
    supportSources.push({ source: slash(path.relative(source, file)), target: slash(relative), sourceSha256: sha(sourceBytes), targetSha256: sha(Buffer.from(transformed)) });
  }
}
// The reduced contracts from the earlier migration omitted types now needed by full families.
for (const [from, to] of [
  ['src/design-system/styles/globals.css', 'web/library/src/design-system/styles/globals.css'],
  ['src/features/showcase-v2/model/showcase-v2-control-options.ts', 'showcase/portal/src/features/showcase-v2/model/showcase-v2-control-options.ts'],
]) {
  await write(to, transform(await fs.readFile(path.join(source, from), 'utf8'), path.join(root, to)), from);
}
for (const name of ['collection-contracts', 'disclosure']) {
  const relative = `web/library/src/design-system/types/${name}.ts`;
  const original = `src/design-system/types/${name}.ts`;
  await write(relative, transform(await fs.readFile(path.join(source, original), 'utf8'), path.join(root, relative)), original);
}
for (const base of ['web/library/src', 'showcase/portal/src/features/showcase-v2']) {
  for await (const file of files(path.join(root, base))) {
    if (!/\.(tsx?|css)$/.test(file)) continue;
    const content = await fs.readFile(file, 'utf8');
    await write(path.relative(root, file), transform(content, file), 'classified generic support aliases');
  }
}
const barrel = 'web/library/src/index.ts';
let content = await fs.readFile(path.join(root, barrel), 'utf8');
if (!content.includes('export * from "./design-system"')) {
  content += '\n// Full source API; explicit earlier exports remain compatible.\nexport * from "./design-system";\nexport * from "./support/forms";\n';
  await write(barrel, content, 'source design-system/index.ts reconciled with existing public API');
}
await write('web/library/src/design-system/types/preferences.ts', 'export type { Theme, Locale } from "../../support/contracts/preferences";\n', 'canonical locale contract');
await write('showcase/portal/src/features/showcase-v2/preferences/ForgePreferences.tsx', `"use client";
import type { ReactNode } from "react";
import { I18nProvider, useLocale } from "@forge-ui/web/i18n";
import { ThemeProvider, useTheme } from "@forge-ui/web/theme";
export function ForgePreferencesProvider({children}: {children:ReactNode}) {
 return <I18nProvider storageKey="forge-ui-locale"><ThemeProvider storageKey="forge-ui-theme" defaultTheme="light">{children}</ThemeProvider></I18nProvider>;
}
export function useForgePreferences() {
 const {locale,setLocale} = useLocale();
 const {resolvedTheme:theme,setTheme} = useTheme();
 return {locale,setLocale,theme,setTheme};
}
`, 'shared theme and locale providers for all examples');
const prefPath = 'showcase/portal/src/features/showcase-v2/components/ShowcaseV2Preferences/ShowcaseV2Preferences.tsx';
for (const relative of [
  'showcase/portal/src/features/showcase-v2/components/ExamplePreview/ExamplePreview.tsx',
  'showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveComponentPage.tsx',
]) {
  await write(relative, (await fs.readFile(path.join(root,relative),'utf8')).replaceAll('copy.copy}', 'copy.copyCode}'), 'canonical copy-code label available in every locale');
}
await write(prefPath, (await fs.readFile(path.join(root, prefPath), 'utf8')).replace('{value:"en-US",label:"English"}', '{value:"en",label:"English"},{value:"es",label:"Español"}'), 'canonical language options');
for (const name of ['Button', 'DataGrid']) {
  const file = `showcase/portal/src/features/showcase-v2/components/${name}/use${name}Example.ts`;
  await write(file, (await fs.readFile(path.join(root, file), 'utf8')).replaceAll('"en-US"', '"en"'), 'canonical locale comparison');
}
const copyPath = 'showcase/portal/src/features/showcase-v2/messages/useShowcaseV2Copy.ts';
const currentCopy = await fs.readFile(path.join(root, copyPath), 'utf8');
if (!currentCopy.includes('useOriginalShowcaseV2Copy')) {
  const pt = currentCopy.match(/const pt = ([^\n]+)/)?.[1];
  const en = currentCopy.match(/const en = ([^\n]+)/)?.[1];
  if (!pt || !en) throw new Error('Review Forge copy before reconciliation');
  let original = await fs.readFile(path.join(source, 'src/features/showcase-v2/messages/useShowcaseV2Copy.ts'), 'utf8');
  original = transform(original, path.join(root, copyPath)).replace('export function useShowcaseV2Copy()', 'function useOriginalShowcaseV2Copy()');
  original += `\nconst forgePT = ${pt}\nconst forgeEN = ${en}\nexport function useShowcaseV2Copy() { const { locale, copy } = useOriginalShowcaseV2Copy(); return { locale, copy: { ...copy, ...(locale === "pt-BR" ? forgePT : locale === "en" ? forgeEN : {}), title: "Forge UI" } }; }\n`;
  await write(copyPath, original, 'full source dictionary with retained Forge branding');
}
const reportPath = path.join(root, 'docs/migration/bulk-reconciliation-report.json');
const catalog = await fs.readFile(path.join(root, 'showcase/portal/src/features/showcase-v2/model/showcase-v2-index.ts'), 'utf8');
for (const block of catalog.matchAll(/\{([^{}]+)\}/g)) {
  const name = block[1].match(/\bname:\s*"([^"]+)"/)?.[1];
  const specification = block[1].match(/\bspecification:\s*"([^"]+)"/)?.[1];
  if (!name || !specification) continue;
  const relative = `showcase/portal/src/features/showcase-v2/components/${name}/definition.ts`;
  const content = await fs.readFile(path.join(root, relative), 'utf8');
  await write(relative, content.replace(/\bspecification:\s*"[^"]+"/, `specification: "${specification}"`), 'canonical catalog specification path');
}
const prior = JSON.parse(await fs.readFile(reportPath, 'utf8').catch(() => '[]'));
await fs.writeFile(reportPath, JSON.stringify([...prior, ...records], null, 2) + '\n');
await fs.writeFile(path.join(root, 'docs/migration/bulk-support-source-manifest.json'), JSON.stringify(supportSources, null, 2) + '\n');
console.log(`Reconciled ${records.length} files; before-images preserved in docs/migration/before-bulk-reconciliation.`);
