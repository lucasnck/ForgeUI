#!/usr/bin/env node
/** Dependency-free structural/import graph and source-hash checks. Does not replace typecheck or build. */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'PLAN.md', 'README.md', 'AGENTS.md',
  'web/library/package.json', 'web/library/src/index.ts',
  'showcase/portal/package.json', 'showcase/portal/src/app/layout.tsx',
  'showcase/portal/src/app/(catalog)/page.tsx',
  'showcase/portal/src/features/showcase-v2/components/ShowcaseV2Page/ShowcaseV2Page.tsx',
  'showcase/portal/src/features/showcase-v2/components/ShowcaseV2Navigation/ShowcaseV2Navigation.tsx',
  'showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveExamples.tsx',
  'web/library/src/design-system/styles/tokens.css',
  'web/library/src/design-system/styles/globals.css',
  'docs/sc/core/architecture.sc.md', 'docs/sc/showcase/feature-showcase-portal.sc.md',
  'docs/sc/web/feature-foundational-atoms-phase2.sc.md',
  'docs/migration/source-manifest.json',
  'scripts/forge.mjs', 'forge.sh', 'forge.cmd', 'forge.ps1',
];
const atoms = [
  'Button', 'Badge', 'Input', 'Checkbox', 'Text', 'Spinner',
  'Textarea', 'Switch', 'Radio', 'Label', 'Divider', 'Heading', 'VisuallyHidden',
];
const sourceRoot = join(root, 'web/library/src');
let failed = 0;
function assert(label, ok) {
  console.log(`[forge] ${ok ? 'OK' : 'FALHA'} ${label}`);
  if (!ok) failed += 1;
}
function json(path) {
  try { return JSON.parse(readFileSync(join(root, path), 'utf8')); }
  catch { return {}; }
}
function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const path = join(dir, item.name);
    return item.isDirectory() ? walk(path) : [path];
  });
}
function existsRelativeFile(source, imported) {
  const candidate = resolve(dirname(source), imported);
  return ['', '.ts', '.tsx', '.css', '.json', '/index.ts', '/index.tsx'].some((ext) => existsSync(candidate + ext));
}

for (const p of required) assert(`arquivo ${p}`, existsSync(join(root, p)));
const workspace = json('package.json');
const library = json('web/library/package.json');
const portal = json('showcase/portal/package.json');
assert('npm workspaces na raiz', Array.isArray(workspace.workspaces)
  && workspace.workspaces.includes('web/library')
  && workspace.workspaces.includes('showcase/portal'));
assert('biblioteca web identificada', library.name === '@forge-ui/web');
assert('showcase identificado', portal.name === '@forge-ui/showcase');
assert('showcase usa workspace local', typeof portal.dependencies?.['@forge-ui/web'] === 'string'
  && portal.dependencies['@forge-ui/web'].startsWith('file:'));
assert('biblioteca não duplica React em dependencies', !library.dependencies?.react && !library.dependencies?.['react-dom']);
assert('exports públicos da biblioteca', Boolean(library.exports?.['.'] && library.exports?.['./styles']));
assert('scripts de verificação presentes', Boolean(workspace.scripts?.check && workspace.scripts?.typecheck));
const psBootstrap = readFileSync(join(root, 'forge.ps1'), 'utf8');
assert('bootstrap Windows verifica SHA-256 via .NET sem depender de Get-FileHash',
  psBootstrap.includes('[System.Security.Cryptography.SHA256]::Create()')
  && psBootstrap.includes('Get-Sha256 -Path $Archive')
  && !/^\s*\$Actual\s*=\s*\(?Get-FileHash\b/m.test(psBootstrap));
assert('bootstrap Windows usa ZipFile sem depender de Expand-Archive',
  psBootstrap.includes('[System.IO.Compression.ZipFile]::ExtractToDirectory')
  && !/^\s*Expand-Archive\b/m.test(psBootstrap));


const entry = readFileSync(join(root, 'web/library/src/index.ts'), 'utf8');
const showcase = readFileSync(join(root, 'showcase/portal/src/features/showcase-v2/components/LiveExamples/LiveExamples.tsx'), 'utf8');
for (const atom of atoms) {
  const dir = `web/library/src/design-system/components/atoms/${atom}`;
  assert(`átomo ${atom} (TSX, CSS, barrel e API pública)`,
    existsSync(join(root, dir, `${atom}.tsx`)) && existsSync(join(root, dir, `${atom}.module.css`))
    && existsSync(join(root, dir, 'index.ts'))
    && entry.includes(`export { ${atom} }`) && entry.includes(`export type { ${atom}Props }`));
  assert(`demo ${atom} usa @forge-ui/web`, showcase.includes(`key: "${atom}"`) && showcase.includes(`case "${atom}"`) && showcase.includes('from "@forge-ui/web"')); 
}

let checkedImports = 0;
for (const file of walk(sourceRoot).filter((x) => /\.(ts|tsx|css)$/.test(x))) {
  const body = readFileSync(file, 'utf8');
  const refs = [];
  if (extname(file) === '.css') {
    for (const match of body.matchAll(/(?:from\s+|@import\s+)["'](\.[^"']+)["']/g)) refs.push(match[1]);
  } else {
    for (const match of body.matchAll(/(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["'](\.[^"']+)["']/g)) refs.push(match[1]);
  }
  for (const imported of refs) {
    checkedImports += 1;
    if (!existsRelativeFile(file, imported)) {
      console.error(`[forge] FALHA import local ${file.replace(`${root}/`, '')} -> ${imported}`);
      failed += 1;
    }
  }
  if (/\.(ts|tsx)$/.test(file)) {
    assert(`sem import de Next/Praticar em ${file.replace(`${root}/`, '')}`,
      !/\bfrom\s+["'](?:next(?:\/|["'])|@\/|src\/features|src\/infra)/.test(body));
  }
}
console.log(`[forge] Imports relativos auditados: ${checkedImports}.`);
const manifest = json('docs/migration/source-manifest.json');
if (Array.isArray(manifest.files)) {
  for (const item of manifest.files) {
    const file = join(root, item.target);
    const hash = existsSync(file) ? createHash('sha256').update(readFileSync(file)).digest('hex') : null;
    assert(`hash da fonte ${item.target}`, hash === item.sha256);
  }
} else assert('manifesto de origem legível', false);


// Showcase V2 renderer migration: paths and public composition are mandatory.
for (const relative of [
  'components/ExampleScope/example-store.ts',
  'components/ExampleScope/ExampleScope.tsx',
  'components/ExampleScope/useExampleScope.ts',
  'components/ExamplePreview/ExamplePreview.tsx',
  'components/ExampleCode/ExampleCode.tsx',
  'components/PropertyGrid/PropertyEditor.tsx',
  'components/PropertyGrid/PropertyGrid.tsx',
  'components/TechnicalGrid/TechnicalGrid.tsx',
  'components/ShowcaseV2Template/ShowcaseV2Template.tsx',
  'components/ShowcaseV2Renderer/ShowcaseV2Renderer.tsx',
  'components/LiveExamples/LiveDefinitionPage.tsx',
  'model/showcase-v2-control-options.ts',
]) assert(`renderer V2 ${relative}`, existsSync(join(root, 'showcase/portal/src/features/showcase-v2', relative)));
const activeRoute = readFileSync(join(root,'showcase/portal/src/app/(catalog)/components/[slug]/page.tsx'),'utf8');
assert('rotas de componentes usam loader original V2',activeRoute.includes('<ShowcaseV2Entry') && !activeRoute.includes('<LiveComponentPage'));
const activePreview=readFileSync(join(root,'showcase/portal/src/features/showcase-v2/components/ExamplePreview/ExamplePreview.tsx'),'utf8');
assert('Preview V2 usa Card público do Forge UI',activePreview.includes('CardHeader') && activePreview.includes('CardBody') && activePreview.includes('CardFooter') && activePreview.includes('from "@forge-ui/web"'));
for(const name of ['Surface','Card','CardHeader','CardBody','CardFooter']){
 assert(`composição Card: export público ${name}`,entry.includes(`export { ${name} }`));
}
const v2Port = readFileSync(join(root,'showcase/portal/src/features/showcase-v2/components/ShowcaseV2Template/ShowcaseV2Template.tsx'),'utf8');
assert('template V2 usa store compartilhado e grids',v2Port.includes('<ExampleScope') && v2Port.includes('<ExamplePreview') && v2Port.includes('{props.children}'));

// Showcase V2 source baseline: original public index, resource index, DS-composed shell and real component demos.
const showcaseRoot = join(root, 'showcase/portal/src/features/showcase-v2');
const indexSource = readFileSync(join(showcaseRoot,'model/showcase-v2-index.ts'),'utf8');
const resourceSource = readFileSync(join(showcaseRoot,'model/showcase-v2-resources.ts'),'utf8');
const indexEntries = [...indexSource.matchAll(/^    name: /gm)].length;
const resourceEntries = [...resourceSource.matchAll(/^    name: /gm)].length;
assert('índice original preserva 221 páginas de componentes (não 221 demos migradas)', indexEntries === 221);
assert('índice original preserva 33 recursos', resourceEntries === 33);
assert('home importa ShowcaseV2Page original',readFileSync(join(root,'showcase/portal/src/app/(catalog)/page.tsx'),'utf8').includes('ShowcaseV2Page'));
assert('shell V2 reutiliza ShowcasePageTemplate público',readFileSync(join(showcaseRoot,'components/ShowcaseV2Page/ShowcaseV2Page.tsx'),'utf8').includes('<ShowcasePageTemplate'));
assert('nenhum ShowcaseClient antigo ativo',!walk(join(root,'showcase/portal/src/app')).some(f=>readFileSync(f,'utf8').includes('ShowcaseClient')));
for (const name of ['Select','Option','Container','Stack','Inline','Link','ThemeSelector','LocaleSelector','ShowcasePageTemplate']) {
 assert(`export V2 público ${name}`, entry.includes(`export { ${name} }`));
}
const portalSourceRoot = join(root,'showcase/portal/src');
let portalImports = 0;
for(const file of walk(portalSourceRoot).filter(x=>/\.(ts|tsx|css)$/.test(x))){
 const body=readFileSync(file,'utf8');
 const matches=extname(file)==='.css' ? body.matchAll(/@import\s+["'](\.[^"']+)["']/g) : body.matchAll(/(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["'](\.[^"']+)["']/g);
 for(const match of matches){portalImports+=1;if(!existsRelativeFile(file,match[1])){console.error(`[forge] FALHA import local portal ${file} -> ${match[1]}`);failed++}}
}
console.log(`[forge] Imports relativos do portal auditados: ${portalImports}.`);

if (failed) {
  console.error(`[forge] Verificação estrutural falhou: ${failed} item(ns).`);
  process.exitCode = 1;
} else {
  console.log('[forge] Verificação estrutural e hashes aprovada (não substitui typecheck, build ou inspeção visual).');
}
