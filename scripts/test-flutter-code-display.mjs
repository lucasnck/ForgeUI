#!/usr/bin/env node
/** Smoke-test display formatter against all generated Dart examples. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { formatDartForDisplay } = await import(pathToFileURL(path.join(base, 'showcase/portal/src/features/showcase-v2/components/ExampleCode/format-dart-for-display.mjs')).href);
const dir = path.join(base, 'showcase/portal/src/features/showcase-v2/model');
const models = ['flutter-inputs.json','flutter-interactions.json','flutter-forms.json','flutter-collections.json','flutter-transients.json','flutter-advanced.json','flutter-parts.json'];
const compact = (source) => {
  // Preserve the contents of quoted strings, including whitespace, and remove
  // only whitespace outside quotes/comments. Escape quotes are respected.
  let out = '', quote = null, escaped = false, triple = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      out += c;
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (triple && source.slice(i,i+3) === quote.repeat(3)) {out += quote.repeat(2);i+=2;quote=null;triple=false;}
      else if (!triple && c === quote) quote=null;
    } else if (c === '"' || c === "'") {
      quote=c;triple=source.slice(i,i+3)===c.repeat(3);out+=triple?c.repeat(3):c;if(triple)i+=2;
    } else if (!/\s/.test(c)) out+=c;
  }
  return out;
};
let checked=0, failures=[];
for (const file of models) {
  for (const e of JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'))) {
    const s=e.code;
    if (!s) continue;
    const f=formatDartForDisplay(s);
    checked++;
    if (compact(s)!==compact(f)) failures.push(`${file}:${e.slug} changed source tokens`);
    if (!f.includes('package:forge_ui/forge_ui.dart')) failures.push(`${file}:${e.slug} missing ForgeUI import`);
    if (f.length>1e6) failures.push(`${file}:${e.slug} output unexpectedly large`);
  }
}
if (formatDartForDisplay('const Widget = <Button />;')!=='const Widget = <Button />;') failures.push('React source changed');
console.log(JSON.stringify({checked,passed:failures.length===0,failures:failures.slice(0,25)}));
if(failures.length)process.exitCode=1;
