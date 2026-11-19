#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const sources=['icon','icon_button','tooltip','popover','popup_listbox','email_input'];
const errors=[];
for (const n of sources) {
  const filename=join(root,'app/library/lib/src/components',`forge_${n}.dart`);
  const text=readFileSync(filename,'utf8');
  if(/(?:import|export)\s+['"]package:flutter\/(?:material|cupertino)\.dart/.test(text))errors.push(`${n}: Material/Cupertino import`);
  for (const token of ['Material(', 'MaterialType.', 'ListTile('])if(text.includes(token))errors.push(`${n}: Material widget ${token}`);
}
const tooltip=readFileSync(join(root,'app/library/lib/src/components/forge_tooltip.dart'),'utf8');
if(!tooltip.includes('ForgeSurface(') || !tooltip.includes('onLongPress:') || !tooltip.includes('LogicalKeyboardKey.escape'))errors.push('Tooltip lost anchored semantics or keyboard behavior');
const pop=readFileSync(join(root,'app/library/lib/src/components/forge_popup_listbox.dart'),'utf8');
if(!pop.includes('ForgeSurface(') || !pop.includes('popup.acceptOption(index)'))errors.push('PopupListbox lost Forge surface / acceptance controller');
const email=readFileSync(join(root,'app/library/lib/src/components/forge_email_input.dart'),'utf8');
if(!email.includes('RawAutocomplete<String>(') || !email.includes('onSelected:') || !email.includes('AutocompleteHighlightedOption'))errors.push('EmailInput lost native autocomplete behaviors');
if(errors.length){errors.forEach(s=>console.error('FAIL:',s));process.exitCode=1;}
else console.log('PASS: 6 native surfaces use ForgeUI/Flutter widgets without Material controls');
