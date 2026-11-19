#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const components='avatar badge breadcrumb currency_input data_grid file_input form_field_input international_telephone_input layout list_box masked_input menu pagination password_input percentage_input query_input search_input skeleton spinner tabs textarea toast tree tree_grid'.split(' ');
const errors=[];
for(const name of components){
  const path=join(root, 'app/library/lib/src/components',`forge_${name}.dart`);
  const source=readFileSync(path,'utf8');
  if(!source.includes("import 'package:flutter/widgets.dart';"))errors.push(`${name}: no widgets.dart import`);
  if(/\b(?:import|export)\s*['"]package:flutter\/(material|cupertino)\.dart['"]/.test(source))errors.push(`${name}: Material/Cupertino import`);
  for(const keyword of ['MaterialLocalizations','LinearProgressIndicator(', 'CircularProgressIndicator(', 'InkWell(', 'InputDecoration(', 'TextField(', 'Checkbox(', 'Radio(', 'Switch(', 'ButtonStyle(', 'Theme.of(', 'Colors.', 'Icons.']){
   if(source.includes(keyword))errors.push(`${name}: not import-only; unsupported platform token ${keyword}`);
  }
}
if(errors.length){errors.forEach(x=>console.error('FAIL:',x));process.exitCode=1;}
else console.log(`PASS: ${components.length} ForgeUI widgets render through flutter/widgets.dart without Material/Cupertino imports or known platform symbols`);
