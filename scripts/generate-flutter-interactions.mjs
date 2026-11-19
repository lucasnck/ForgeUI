import fs from 'node:fs';
const boolean=(v=false)=>({kind:'boolean',defaultValue:v});
const text=(v,nonblank=true)=>({kind:'text',defaultValue:v,nonblank});
const select=(options,v)=>({kind:'select',options,defaultValue:v});
const shared={acceptChanges:boolean(true),firstLabel:text('Primeiro'),secondLabel:text('Segundo'),bodyText:text('Conteúdo preservado'),footerText:text('Informações complementares')};
const groups={...shared,label:text('Preferências'),disabled:boolean(),invalid:boolean(),gap:select(['s0','s1','s2','s3','s4','s6'],'s2'),padding:select(['s0','s1','s2','s3','s4'],'s0'),disableSecond:boolean(),selection:select(['none','first','second','both'],'none')};
const definitions={
'choice-group':{names:['ChoiceGroup','ChoiceGroupHeader','ChoiceGroupBody','ChoiceGroupFooter'],schema:groups,
expression:`ForgeChoiceGroup(disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckbox(checked:values.contains('first'),disabled:flag('disabled'),semanticLabel:text('firstLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='first'),'first']:values.where((v)=>v!='first').toList())),
Text(text('firstLabel')),
ForgeCheckbox(checked:values.contains('second'),disabled:flag('disabled')||flag('disableSecond'),semanticLabel:text('secondLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='second'),'second']:values.where((v)=>v!='second').toList())),
Text(text('secondLabel'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))])`},
'checkbox-group':{names:['CheckboxGroup','CheckboxGroupItem'],schema:{...groups,name:text('preferences')},
expression:`ForgeCheckboxGroup(name:text('name'),disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),value:values,onValueChange:requestValues,children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckboxGroupItem(value:'first',label:text('firstLabel')),
ForgeCheckboxGroupItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))])`},
'radio-group':{names:['RadioGroup','RadioGroupItem'],schema:{...groups,name:text('delivery'),selection:select(['none','first','second','third'],'none')},
expression:`ForgeRadioGroup(name:text('name'),disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),value:current,onValueChange:requestScalar,children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeRadioGroupItem(value:'first',label:text('firstLabel')),
ForgeRadioGroupItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond')),
const ForgeRadioGroupItem(value:'third',label:'Terceiro')])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))])`},
'tabs':{names:['Tabs','TabsHeader','TabsBody','TabsFooter','Tab','TabPanel'],schema:{...shared,label:text('Seções'),direction:select(['ltr','rtl'],'ltr'),animated:boolean(true),disableSecond:boolean(),activeTab:select(['first','second'],'first')},
expression:`ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))])`},
'toolbar':{names:['Toolbar','ToolbarItem'],schema:{...shared,label:text('Ações'),direction:select(['ltr','rtl'],'ltr'),orientation:select(['horizontal','vertical'],'horizontal'),disableSecond:boolean()},
expression:`ForgeToolbar(label:text('label'),direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),orientation:enumValue('orientation',ForgeNavigationOrientation.values,ForgeNavigationOrientation.horizontal),children:[
ForgeToolbarItem(itemKey:'first',onPressed:()=>record('first'),child:Text(text('firstLabel'))),
ForgeToolbarItem(itemKey:'second',disabled:flag('disableSecond'),onPressed:()=>record('second'),child:Text(text('secondLabel'))),
ForgeToolbarItem(itemKey:'third',onPressed:()=>record('third'),child:const Text('Terceiro'))])`},
'disclosure':{names:['Disclosure'],schema:{...shared,label:text('Detalhes'),open:boolean(),disabled:boolean(),animated:boolean(true)},
expression:`ForgeDisclosure(label:text('label'),open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')]))`},
'collapse':{names:['Collapse','CollapseHeader','CollapseBody','CollapseFooter'],schema:{...shared,label:text('Detalhes'),open:boolean(),disabled:boolean(),animated:boolean(true)},
expression:`ForgeCollapse(open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeCollapseHeader(child:Text(text('label'))),
ForgeCollapseBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),
ForgeCollapseFooter(child:Text(text('footerText')))])`},
'accordion':{names:['Accordion','AccordionItem','AccordionHeader','AccordionBody','AccordionFooter'],schema:{...shared,disabled:boolean(),animated:boolean(true),disableSecond:boolean(),multiple:boolean(),collapsible:boolean(true),level:{kind:'number',defaultValue:2,min:1,max:6},expanded:select(['none','first','second','both'],'none')},
expression:`ForgeAccordion(value:flag('multiple')?values:values.take(1).toList(),onValueChange:requestValues,multiple:flag('multiple'),collapsible:flag('collapsible'),level:((prop('level') as num?)??2).toInt(),disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeAccordionItem(value:'first',children:[ForgeAccordionHeader(child:Text(text('firstLabel'))),ForgeAccordionBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),ForgeAccordionFooter(child:Text(text('footerText')))]),
ForgeAccordionItem(value:'second',disabled:flag('disableSecond'),children:[ForgeAccordionHeader(child:Text(text('secondLabel'))),const ForgeAccordionBody(child:Text('Conteúdo secundário')),ForgeAccordionFooter(child:Text(text('footerText')))])])`}
};
const api=JSON.parse(fs.readFileSync('docs/sc/app/reference/native-component-api.json','utf8'));
const entries=[];
for(const [family,def]of Object.entries(definitions))for(const name of def.names){
 const c=api.components.find(c=>c.name===name);if(!c)throw Error(name);
 entries.push({name,owner:def.names[0],slug:c.slug,family,schema:def.schema,expression:def.expression});
}
const state=`
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>interactionContracts[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>interactionFamilies[widget.slug]!;
List<String> decode(String v)=>switch(v){'first'=>['first'],'second'=>['second'],'both'=>['first','second'],_=>[]};
void sync(){
 current=family=='tabs'?text('activeTab'):text('selection')=='none'?'':text('selection');
 values=decode(text(family=='accordion'?'expanded':'selection'));opened=flag('open');
}
void record(String value)=>setState((){events++;feedback='Solicitado: $value';});
void requestScalar(String next)=>setState((){events++;feedback='Solicitado: $next';if(flag('acceptChanges'))current=next;});
void requestValues(List<String> next)=>setState((){events++;feedback='Solicitado: '+next.join(', ');if(flag('acceptChanges'))values=List.of(next);});
void requestOpen(bool next)=>setState((){events++;feedback='Solicitado: $next';if(flag('acceptChanges'))opened=next;});
@override void initState(){super.initState();sync();}
@override void didUpdateWidget(covariant ForgeInteractionExample old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
`;
for(const [family,definition] of Object.entries(definitions)){
 const keys=new Set([...definition.expression.matchAll(/(?:flag|text|prop|enumValue)\('([^']+)'/g)].map(match=>match[1]));
 if(family!=='toolbar')keys.add('acceptChanges');
 if(['choice-group','checkbox-group','radio-group'].includes(family))keys.add('selection');
 if(family==='tabs')keys.add('activeTab');
 if(family==='accordion')keys.add('expanded');
 if(['disclosure','collapse'].includes(family))keys.add('open');
 definition.schema=Object.fromEntries(Object.entries(definition.schema).filter(([key])=>keys.has(key)));
 for(const entry of entries.filter(entry=>entry.family===family))entry.schema=definition.schema;
}
const contracts=Object.fromEntries(entries.map(e=>[e.slug,e.schema])),families=Object.fromEntries(entries.map(e=>[e.slug,e.family]));
const header="import 'package:flutter/material.dart';\nimport 'package:forge_ui/forge_ui.dart';\n";
const model="class ForgeInteractionExample extends StatefulWidget {final String slug;final Map<String,Object?> properties;const ForgeInteractionExample({super.key,required this.slug,this.properties=const {}});@override State<ForgeInteractionExample> createState()=>_InteractionState();}\n";
const build=expression=>"@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:["+expression+",Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);\n";
const widgetSource="// Generated by scripts/generate-flutter-interactions.mjs.\n"+header+"import 'interaction_contracts.dart';\n"+model+"class _InteractionState extends State<ForgeInteractionExample>{"+state+build("switch(family){"+Object.entries(definitions).map(([f,d])=>"'"+f+"' => "+d.expression+",").join('\n')+"_=>throw ArgumentError.value(family)}")+"}\n";
fs.writeFileSync('app/showcase_flutter/lib/examples/interactions_generated.dart',widgetSource);
const constMaps="const interactionContracts=<String,Map<String,Map<String,Object?>>>"+JSON.stringify(contracts)+";\nconst interactionFamilies=<String,String>"+JSON.stringify(families)+";\n";
const validate=`bool validInteractionProperties(String slug,Map properties){
 final schema=interactionContracts[slug];if(schema==null)return false;
 for(final e in properties.entries){if(e.key=='theme'||e.key=='scenario')continue;
 final f=schema[e.key],v=e.value;if(f==null)return false;
 switch(f['kind']){
 case 'boolean':if(v is! bool)return false;
 case 'text':if(v is! String||v.length>200||(f['nonblank']==true&&v.trim().isEmpty))return false;
 case 'select':if(!(f['options'] as List).contains(v))return false;
 case 'number':if(v is! int||v<(f['min'] as int)||v>(f['max'] as int))return false;
 }
 }
 if(interactionFamilies[slug]=='accordion'&&properties['expanded']=='both'&&(properties['multiple']??false)!=true)return false;
 return true;
}
`;
fs.writeFileSync('app/showcase_flutter/lib/examples/interaction_contracts.dart',"// Generated finite native contracts.\n"+constMaps+validate);
for(const e of entries){
 const defaults=Object.fromEntries(Object.entries(e.schema).map(([k,v])=>[k,v.defaultValue]));
 e.code=header+"const interactionContracts=<String,Map<String,Map<String,Object?>>>"+JSON.stringify({[e.slug]:e.schema})+";\nconst interactionFamilies=<String,String>"+JSON.stringify({[e.slug]:e.family})+";\n"+model.replace("final String slug;final Map<String,Object?> properties;const ForgeInteractionExample({super.key,required this.slug,this.properties=const {}});","final String slug='"+e.slug+"';final Map<String,Object?> properties=const "+JSON.stringify(defaults)+";const ForgeInteractionExample({super.key});")+"class _InteractionState extends State<ForgeInteractionExample>{"+state+build(e.expression)+"}\n";
}
fs.writeFileSync('showcase/portal/src/features/showcase-v2/model/flutter-interactions.json',JSON.stringify(entries,null,2)+'\n');
console.log('Generated '+entries.length+' real contextual fixtures across 8 interaction families.');
