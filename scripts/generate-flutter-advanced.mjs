import fs from 'node:fs';
const text=v=>({kind:'text',defaultValue:v,nonblank:true}),bool=(v=false)=>({kind:'boolean',defaultValue:v}),select=(options,defaultValue)=>({kind:'select',options,defaultValue});
const common={label:text('Registros'),acceptChanges:bool(true)};
const template={titleText:text('Página Forge'),bodyText:text('Conteúdo da página'),actionLabel:text('Executar ação'),showSlots:bool(true)};
const defs={
'data-grid':{names:['DataGrid','DataGridHeader','DataGridBody','DataGridRow','DataGridColumnHeader','DataGridCell','DataGridFooter'],schema:{...common,empty:bool(),fullWidth:bool(true),showBorders:bool(true),showColumnLines:bool(),showRowLines:bool(true),rowAlternationEnabled:bool(true),size:select(['sm','md','lg'],'md')}},
'tree-grid':{names:['TreeGrid','TreeGridHeader','TreeGridBody','TreeGridRow','TreeGridColumnHeader','TreeGridCell','TreeGridFooter'],schema:{...common,expanded:bool(),direction:select(['ltr','rtl'],'ltr'),animated:bool(true)}},
'application-layout-template':{names:['ApplicationLayoutTemplate','ApplicationLayoutHeader','ApplicationLayoutBody','ApplicationLayoutFooter'],schema:template},
'showcase-page-template':{names:['ShowcasePageTemplate'],schema:template},
'home-page':{names:['HomePageTemplate'],schema:template},'list-page':{names:['ListPageTemplate'],schema:template},'detail-page':{names:['DetailPageTemplate'],schema:template},'form-page':{names:['FormPageTemplate'],schema:template},
'page-transition':{names:['PageTransition'],schema:{animated:bool(true),intent:select(['forward','back','replace','reveal','none'],'forward')}},
'shared-element':{names:['SharedElement'],schema:{animated:bool(true),titleText:text('Elemento compartilhado')}},
'map-view':{names:['MapView'],schema:{label:text('Mapa de demonstração'),status:select(['loading','ready','empty','unavailable'],'ready')}},
'o-data-filter':{names:['ODataFilter','ODataFilterCondition','ODataFilterGroup','ODataFilterValue'],schema:{acceptChanges:bool(true),disabled:bool(),mode:select(['simple','advanced'],'advanced'),actionsLayout:select(['inline','stack'],'inline')}}
};
const api=JSON.parse(fs.readFileSync('docs/sc/app/reference/native-component-api.json')),entries=[];
for(const[family,d]of Object.entries(defs))for(const name of d.names){const c=api.components.find(c=>c.name===name);if(!c)throw Error(name);entries.push({name,owner:d.names[0],slug:c.slug,family,schema:d.schema});}
const contracts=Object.fromEntries(entries.map(e=>[e.slug,e.schema])),families=Object.fromEntries(entries.map(e=>[e.slug,e.family]));
const validate=fs.readFileSync('app/showcase_flutter/lib/examples/transient_contracts.dart','utf8').slice(fs.readFileSync('app/showcase_flutter/lib/examples/transient_contracts.dart','utf8').indexOf('bool validTransientProperties')).replaceAll('Transient','Advanced').replaceAll('transient','advanced');
fs.writeFileSync('app/showcase_flutter/lib/examples/advanced_contracts.dart','// Generated finite advanced native contracts.\nconst advancedContracts=<String,Map<String,Map<String,Object?>>>'+JSON.stringify(contracts)+';\nconst advancedFamilies=<String,String>'+JSON.stringify(families)+';\n'+validate);
const state=fs.readFileSync('app/showcase_flutter/lib/examples/advanced_examples.dart','utf8').split('class _AdvancedState')[1];
for(const e of entries){const defaults=Object.fromEntries(Object.entries(e.schema).map(([k,v])=>[k,v.defaultValue]));e.code="import 'package:flutter/material.dart';\nimport 'package:forge_ui/forge_ui.dart';\n// Canonical parts are created by their native owner, not duplicated focus owners: "+e.name+".\nconst advancedContracts=<String,Map<String,Map<String,Object?>>>"+JSON.stringify({[e.slug]:e.schema})+";\nconst advancedFamilies=<String,String>"+JSON.stringify({[e.slug]:e.family})+";\nclass ForgeAdvancedExample extends StatefulWidget {final String slug='"+e.slug+"';final Map<String,Object?> properties=const "+JSON.stringify(defaults)+";const ForgeAdvancedExample({super.key});@override State<ForgeAdvancedExample> createState()=>_AdvancedState();}\nclass _AdvancedState"+state;}
fs.writeFileSync('showcase/portal/src/features/showcase-v2/model/flutter-advanced.json',JSON.stringify(entries,null,2)+'\n');console.log('Generated '+entries.length+' advanced contexts.');
