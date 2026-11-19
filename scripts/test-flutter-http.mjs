import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const origin=process.env.FORGE_TEST_ORIGIN??'http://localhost:3000';
const manifest=JSON.parse(fs.readFileSync('showcase/portal/src/features/showcase-v2/model/flutter-preview-manifest.json','utf8'));
const buildId=manifest.entries[0].buildId;
const paths=['/','/components/button/','/components/radio-group/','/components/form-field/','/components/combobox/','/components/modal/','/components/toast-region/','/components/data-grid/','/components/tree-grid/','/components/odata-filter/','/components/map-view/','/templates/application-layout-template/','/templates/home-page/','/flutter/index.html','/flutter/flutter_bootstrap.js','/flutter/main.dart.js','/flutter/canvaskit/canvaskit.wasm'];
const results=await Promise.all(paths.map(async path=>{const r=await fetch(origin+path,{signal:AbortSignal.timeout(60000)});assert.equal(r.status,200,path);const body=Buffer.from(await r.arrayBuffer());assert.ok(body.length>0,path);if(path.endsWith('/main.dart.js'))assert.equal(createHash('sha256').update(body).digest('hex').slice(0,16),buildId);if(path==='/flutter/index.html')assert.ok(body.toString().includes(buildId));return {path,status:r.status,bytes:body.length,type:r.headers.get('content-type')};}));
const out={origin,buildId,registeredPreviews:manifest.entries.length,status:'PASS',results,limitations:'HTTP and compiled artifact integrity only; no browser interaction or native visual acceptance.'};fs.writeFileSync('docs/migration/validation/flutter-wave8-http.json',JSON.stringify(out,null,2)+'\n');console.log('PASS: '+results.length+' HTTP checks, '+manifest.entries.length+' registered previews, served Flutter hash '+buildId);
