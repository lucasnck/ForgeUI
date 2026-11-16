import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = value => createHash('sha256').update(value).digest('hex');
const reportFile = path.join(root, 'docs/migration/bulk-reconciliation-report.json');
const records = JSON.parse(await fs.readFile(reportFile, 'utf8'));
async function write(file, content, origin) {
  const target = path.join(root, file);
  const before = await fs.readFile(target).catch(error => { if (error.code === 'ENOENT') return null; throw error; });
  const after = Buffer.from(content);
  if (before?.equals(after)) return;
  if (before) {
    const archive = path.join(root, 'docs/migration/before-bulk-reconciliation', file + '.txt');
    await fs.mkdir(path.dirname(archive), {recursive:true});
    await fs.writeFile(archive, before, {flag:'wx'}).catch(error => {if(error.code !== 'EEXIST') throw error;});
  }
  await fs.mkdir(path.dirname(target), {recursive:true});
  await fs.writeFile(target, after);
  records.push({file, origin, beforeSha256:before && hash(before), afterSha256:hash(after)});
}
for (const level of ['atoms', 'molecules', 'organisms', 'templates']) {
  const directory = path.join(root, 'docs/sc/ds', level);
  const files = await fs.readdir(directory).catch(error => {if(error.code === 'ENOENT') return [];throw error;});
  for (const name of files.filter(name => name.endsWith('.sc.md'))) {
    const canonical = `docs/sc/ds/components/${level}/${name}`;
    await fs.access(path.join(root, canonical));
    await write(`docs/sc/ds/${level}/${name}`, `---\ntitle: "${name.replace('.sc.md','')} — canonical specification reference"\nscope: "Legacy path redirect to the canonical component contract"\n---\n\n# ${name.replace('.sc.md','')} — canonical specification\n\nThis legacy path is retained for earlier migration references. Read the [canonical specification](../components/${level}/${name}). Source status belongs to PraticarFront; Forge acceptance is tracked in the migration status.\n`, 'legacy specification redirect');
  }
}
const matrix = JSON.parse(await fs.readFile(path.join(root,'docs/migration/coverage-matrix.json'),'utf8'));
async function* documents(directory) {
  for (const entry of await fs.readdir(directory,{withFileTypes:true})) {
    const file = path.join(directory,entry.name);
    if(entry.isDirectory()) yield* documents(file); else if(entry.isFile() && entry.name.endsWith('.md')) yield file;
  }
}
for await (const file of documents(path.join(root,'docs/sc/ds'))) {
  const before = await fs.readFile(file,'utf8');
  const content = before.replaceAll('"@/design-system"','"@forge-ui/web"').replaceAll("'@/design-system'","'@forge-ui/web'").replaceAll('@/design-system/styles/', '@forge-ui/web/styles/');
  await write(path.relative(root,file).replaceAll('\\','/'),content,'public package imports in specification usage examples');
}
const lines = ['---', 'title: "Forge UI — Component Catalog"', 'scope: "Canonical specifications and showcase routes for extracted components"', '---', '', '# Forge UI — component catalog', '', 'Generated from the actual migration matrix. Source SC status is historical; runtime and visual acceptance are tracked separately in [migration status](../migration/STATUS.md).', ''];
for (const level of ['atoms','molecules','organisms','templates']) {
  lines.push(`## ${level}`, '', ...matrix.components.filter(entry => entry.level === level).map(entry => `- [${entry.name}](${entry.localSpec.replace('docs/sc/','')}) — [showcase](http://localhost:3000/${level === 'templates' ? 'templates' : 'components'}/${entry.slug}/)`), '');
}
await write('docs/sc/core-catalog-ds.sc.md', lines.join('\n'), 'Forge-only component catalog; source mixed catalog preserved in before-image');
await write('docs/sc/core-catalog.sc.md', '---\ntitle: "Forge UI — Technical Catalog"\nscope: "Canonical specifications for extracted hooks and styles"\n---\n\n# Forge UI — technical catalog\n\n' + matrix.resources.map(entry => `- [${entry.name}](${entry.localSpec.replace('docs/sc/','')}) — ${entry.kind}`).join('\n') + '\n', 'resource catalog from actual matrix');
const template = 'docs/sc/core-template.sc.md';
await write(template, (await fs.readFile(path.join(root,template),'utf8')).replaceAll('](core-architecture.sc.md)', '](core/architecture.sc.md)').replaceAll('](core-start-here.sc.md)', '](core/start-here.sc.md)'), 'local Forge architecture and authoring entry point');
await write('docs/sc/ds/README.md', '# Design system specifications\n\nCanonical component specifications live in `components/`. They were copied from PraticarFront and retain their historical source status. This does not certify Forge UI behavior. See [coverage](../../migration/COVERAGE.md), [status](../../migration/STATUS.md), and [bulk migration contract](../../migration/SC-BULK-MIGRATION.md). Earlier short component paths are redirects, not separate contracts.\n', 'canonical specification ownership');
await fs.writeFile(reportFile, JSON.stringify(records,null,2)+'\n');
console.log('Migration documentation reconciled; historical content preserved.');
