import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targetOnly = process.argv.includes('--target-only');
const read = relative => fs.readFile(path.join(root,relative));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const report = JSON.parse(await read('docs/migration/bulk-migration-report.json'));
const changes = JSON.parse(await read('docs/migration/bulk-reconciliation-report.json'));
const support = JSON.parse(await read('docs/migration/bulk-support-source-manifest.json'));
const items = [], unresolved = [], sourceChanges = [];
for (const item of report.items) {
  if (!targetOnly) {
    const source = await fs.readFile(path.join(report.source,item.from));
    if (hash(source) !== item.sourceSha256) sourceChanges.push(item.from);
  }
  const target = await read(item.to);
  const latest = changes.filter(change => change.file === item.to).at(-1);
  items.push({...item, finalSha256:hash(target), reconciliation:latest ? latest.afterSha256 === hash(target) ? 'recorded-adaptation' : 'changed-after-recording' : item.status === 'preserved' ? 'preserved-existing-adaptation' : 'source-copy-with-codemod'});
}
for (const item of targetOnly ? [] : support) {
  if (hash(await fs.readFile(path.join(report.source,item.source))) !== item.sourceSha256) sourceChanges.push(item.source);
}
async function* files(directory) {
  for (const entry of await fs.readdir(directory,{withFileTypes:true})) {
    const file = path.join(directory,entry.name);
    if(entry.isDirectory()) yield* files(file); else if(entry.isFile()) yield file;
  }
}
for (const tree of ['web/library/src','showcase/portal/src']) {
  for await (const file of files(path.join(root,tree))) {
    if(!/\.tsx?$/.test(file)) continue;
    const syntax = ts.createSourceFile(file,await fs.readFile(file,'utf8'),ts.ScriptTarget.Latest,true);
    function visit(node) {
      let specifier;
      if((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) specifier = node.moduleSpecifier.text;
      if(ts.isCallExpression(node) && node.arguments.length && ts.isStringLiteral(node.arguments[0]) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(syntax) === 'require')) specifier = node.arguments[0].text;
      if(specifier?.startsWith('@/')) unresolved.push({file:path.relative(root,file).replaceAll('\\','/'),specifier});
      ts.forEachChild(node,visit);
    }
    visit(syntax);
  }
}
const audit = {source:report.source, sourceVerification:targetOnly?'not-run-target-only':'verified', sourceFilesVerified:targetOnly?0:report.items.length + support.length, sourceChanges, missingTargets:0, unresolvedApplicationImports:unresolved, counts:{sourceTreeFiles:items.length, copiedInitially:report.counts.copied,preservedInitially:report.counts.preserved,reconciliationRecords:changes.length},items};
await fs.writeFile(path.join(root,targetOnly?'docs/migration/bulk-target-audit.json':'docs/migration/bulk-migration-audit.json'),JSON.stringify(audit,null,2)+'\n');
console.log(JSON.stringify({...audit,items:undefined},null,2));
if(sourceChanges.length || unresolved.length || items.some(item => item.reconciliation === 'changed-after-recording')) process.exitCode=1;
