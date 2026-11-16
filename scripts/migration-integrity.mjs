/** Validate historical hashes or an explicitly recorded reconciliation with its before-image. */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export function verifiedMigrationFile(root, target, expected) {
  const file = join(root, target);
  if (!existsSync(file)) return false;
  const bytes = readFileSync(file);
  const matches = input => hash(input) === expected || hash(input.toString('utf8').replace(/\r\n/g, '\n')) === expected;
  if (matches(bytes)) return true;
  const support = join(root, 'docs/migration/bulk-support-source-manifest.json');
  if (existsSync(support)) {
    const currentSource = JSON.parse(readFileSync(support, 'utf8')).find(item => item.target === target);
    if (currentSource?.targetSha256 === hash(bytes)) {
      console.log(`[forge-integrity] Current source revision verified for ${target}; historical snapshot retained.`);
      return true;
    }
  }
  const before = join(root, 'docs/migration/before-bulk-reconciliation', target + '.txt');
  const report = join(root, 'docs/migration/bulk-reconciliation-report.json');
  if (!existsSync(before) || !existsSync(report) || !matches(readFileSync(before))) return false;
  const records = JSON.parse(readFileSync(report, 'utf8')).filter(item => item.file === target);
  return records.at(-1)?.afterSha256 === hash(bytes);
}
