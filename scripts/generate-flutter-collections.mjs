import fs from 'node:fs';
const text=(v,nonblank=true)=>({kind:'text',defaultValue:v,nonblank});
const bool=(v=false)=>({kind:'boolean',defaultValue:v});
const select=(options,v)=>({kind:'select',options,defaultValue:v});
const common={label:text('Opções'),firstLabel:text('Alpha'),secondLabel:text('Beta'),footerText:text('Informações da coleção'),disableSecond:bool(),animated:bool(true)};
const selection={...common,acceptChanges:bool(true),selection:select(['none','first','second'],'none')};
const query={...selection,query:text('',false),readOnly:bool(),disabled:bool(),listboxLabel:text('Sugestões'),placeholder:text('Digite para buscar',false)};
const definitions={
'list-box':{names:['ListBox','ListBoxHeader','ListBoxBody','ListBoxFooter','ListBoxItem'],schema:{...selection,disabled:bool(),invalid:bool(),selectionMode:select(['single','multiple'],'single')},
expression:`ForgeListBox(label:text('label'),options:options,value:values,onValueChange:requestValues,selectionMode:enumValue('selectionMode',ForgeSelectionMode.values,ForgeSelectionMode.single),disabled:flag('disabled'),invalid:flag('invalid'),animated:flag('animated'),children:[const ForgeListBoxHeader(child:Text('Coleção')),const ForgeListBoxBody(),ForgeListBoxFooter(child:Text(text('footerText')))])`},
'autocomplete':{names:['Autocomplete','AutocompleteHeader','AutocompleteBody','AutocompleteFooter'],schema:query,
expression:`ForgeAutocomplete(label:text('label'),query:query,onQueryChange:requestQuery,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeAutocompleteHeader(child:Text('Busca local')),const ForgeAutocompleteBody(),ForgeAutocompleteFooter(child:Text(text('footerText')))])`},
'combobox':{names:['Combobox','ComboboxHeader','ComboboxBody','ComboboxFooter'],schema:query,
expression:`ForgeCombobox(label:text('label'),query:query,onQueryChange:requestQuery,selectedValue:current.isEmpty?null:current,onSelectionChange:requestScalar,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeComboboxHeader(child:Text('Busca com seleção')),const ForgeComboboxBody(),ForgeComboboxFooter(child:Text(text('footerText')))])`},
'popup-listbox':{names:['PopupListbox','PopupListboxItem'],schema:{...query,open:bool()},
expression:`Column(children:[Focus(onKeyEvent:(context,event)=>popup.handle(event),child:ForgeInput(focusNode:editorFocus,value:query,onChanged:requestQuery,semanticLabel:text('label'),placeholder:text('placeholder'),disabled:flag('disabled'),readOnly:flag('readOnly'),onFocusChange:(v)=>popup.setFocused(v))),ForgePopupListbox<ForgeChoiceOption>(popup:popup,items:popupOptions,getOptionLabel:(v)=>v.label,getOptionKey:(v,i)=>v.value,listboxLabel:text('listboxLabel'),animated:flag('animated'))])`},
'menu':{names:['Menu','MenuHeader','MenuBody','MenuFooter','MenuItem'],schema:common,expression:`menu()`},
'dropdown-menu':{names:['DropdownMenu'],schema:{...common,label:text('Abrir ações'),menuLabel:text('Comandos'),acceptChanges:bool(true),open:bool(),disabled:bool()},
expression:`ForgeDropdownMenu(label:text('label'),open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),child:menu())`},
'navigation-menu':{names:['NavigationMenu','NavigationMenuHeader','NavigationMenuBody','NavigationMenuFooter','NavigationMenuItem','NavigationMenuSublist'],schema:{...common,acceptChanges:bool(true),open:bool(),current:bool()},
expression:`ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))])`},
'tree':{names:['Tree','TreeHeader','TreeBody','TreeFooter','TreeItem','TreeGroup'],schema:{...common,acceptChanges:bool(true),selection:select(['none','root','child','other'],'none'),expanded:select(['none','root'],'root')},
expression:`ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))])`},
'stepper':{names:['Stepper','StepperHeader','StepperBody','StepperFooter','StepperItem','StepperPanel'],schema:{...common,acceptChanges:bool(true),selection:select(['first','second'],'first'),status:select(['pending','complete','error'],'pending')},
expression:`ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))])`}
};
const api=JSON.parse(fs.readFileSync('docs/sc/app/reference/native-component-api.json','utf8'));
const entries=[];for(const [family,def]of Object.entries(definitions))for(const name of def.names){const c=api.components.find(c=>c.name===name);if(!c)throw Error(name);entries.push({name,owner:def.names[0],slug:c.slug,family,schema:def.schema,expression:def.expression});}
const state=`
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>collectionFamilies[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??collectionContracts[widget.slug]?[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
List<ForgeChoiceOption> get options=>[ForgeChoiceOption(value:'first',label:text('firstLabel')),ForgeChoiceOption(value:'second',label:text('secondLabel'),disabled:flag('disableSecond')),const ForgeChoiceOption(value:'third',label:'Gamma')];
List<ForgeChoiceOption> get popupOptions=>options.where((o)=>!o.disabled).toList();
List<ForgeChoiceOption> get filtered=>options.where((v)=>v.label.toLowerCase().contains(query.toLowerCase())).toList();
void record(String value)=>setState((){events++;lastAction=value;feedback='Solicitado: $value';});
void requestScalar(String? next)=>setState((){events++;feedback='Seleção: '+(next??'');if(flag('acceptChanges'))current=next??'';});
void requestQuery(String next)=>setState((){events++;feedback='Busca: $next';if(flag('acceptChanges')){query=next;popup.configure(count:popupOptions.length,queryKey:query);}});
void requestValues(List<String> next)=>setState((){events++;feedback='Seleção: '+next.join(', ');if(flag('acceptChanges'))values=List.of(next);});
void requestExpanded(List<String> next)=>setState((){events++;feedback='Expansão: '+next.join(', ');if(flag('acceptChanges'))expanded=List.of(next);});
void requestOpen(bool next)=>setState((){events++;feedback='Aberto: $next';if(flag('acceptChanges'))opened=next;});
void sync(){
 query=text('query');current=text('selection')=='none'?'':text('selection');values=current.isEmpty?[]:[current];expanded=text('expanded')=='root'?['root']:[];opened=flag('open');
 popup.configure(count:flag('disabled')||flag('readOnly')?0:popupOptions.length,queryKey:query);popup.setFocused(family=='popup-listbox'&&opened&&!flag('disabled')&&!flag('readOnly'));
 if(family=='popup-listbox'&&opened&&!flag('disabled')&&!flag('readOnly'))WidgetsBinding.instance.addPostFrameCallback((_){if(mounted)editorFocus.requestFocus();});
}
@override void initState(){super.initState();sync();}
@override void didUpdateWidget(covariant ForgeCollectionExample old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;dismissals=0;feedback='';sync();return;}
 if(old.properties['selection']!=widget.properties['selection']){current=text('selection')=='none'?'':text('selection');values=current.isEmpty?[]:[current];}
 if(old.properties['query']!=widget.properties['query'])query=text('query');
 if(old.properties['expanded']!=widget.properties['expanded'])expanded=text('expanded')=='root'?['root']:[];
 if(old.properties['open']!=widget.properties['open']){
 opened=flag('open');
 if(family=='popup-listbox')WidgetsBinding.instance.addPostFrameCallback((_){if(!mounted)return;if(opened&&!flag('disabled')&&!flag('readOnly'))editorFocus.requestFocus();else editorFocus.unfocus();});
 }
 if(family=='popup-listbox')popup.configure(count:flag('disabled')||flag('readOnly')?0:popupOptions.length,queryKey:query);
}
@override void dispose(){popup.dispose();editorFocus.dispose();super.dispose();}
ForgeMenu menu()=>ForgeMenu(label:family=='dropdown-menu'?text('menuLabel'):text('label'),animated:flag('animated'),onAction:record,onDismiss:()=>setState(()=>dismissals++),children:[const ForgeMenuHeader(child:Text('Ações disponíveis')),ForgeMenuBody(items:[ForgeMenuItem(value:'first',label:text('firstLabel')),ForgeMenuItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond')),const ForgeMenuItem(value:'third',label:'Gamma')]),ForgeMenuFooter(child:Text(text('footerText')))]);
`;
const contracts=Object.fromEntries(entries.map(e=>[e.slug,e.schema])),families=Object.fromEntries(entries.map(e=>[e.slug,e.family]));
const validator=`bool validCollectionProperties(String slug,Map p){
 final schema=collectionContracts[slug];if(schema==null)return false;
 for(final e in p.entries){if(e.key=='theme'||e.key=='scenario')continue;final f=schema[e.key],v=e.value;if(f==null)return false;
 switch(f['kind']){case 'boolean':if(v is! bool)return false;case 'text':if(v is! String||v.length>200||(f['nonblank']==true&&v.trim().isEmpty))return false;case 'select':if(!(f['options'] as List).contains(v))return false;}
 }return true;
}`;
fs.writeFileSync('app/showcase_flutter/lib/examples/collection_contracts.dart','// Generated finite contracts.\nconst collectionContracts=<String,Map<String,Map<String,Object?>>>'+JSON.stringify(contracts)+';\nconst collectionFamilies=<String,String>'+JSON.stringify(families)+';\n'+validator+'\n');
const header="import 'package:flutter/material.dart';\nimport 'package:forge_ui/forge_ui.dart';\n";
const model="class ForgeCollectionExample extends StatefulWidget{final String slug;final Map<String,Object?> properties;const ForgeCollectionExample({super.key,required this.slug,this.properties=const {}});@override State<ForgeCollectionExample> createState()=>_CollectionState();}\n";
const build=e=>"@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:["+e+",Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);\n";
fs.writeFileSync('app/showcase_flutter/lib/examples/collections_generated.dart','// Generated by scripts/generate-flutter-collections.mjs.\n'+header+"import 'collection_contracts.dart';\n"+model+"class _CollectionState extends State<ForgeCollectionExample>{"+state+build("switch(family){"+Object.entries(definitions).map(([f,d])=>"'"+f+"' => "+d.expression+",").join('\n')+"_=>throw ArgumentError.value(family)}")+"}\n");
for(const e of entries){
const defaults=Object.fromEntries(Object.entries(e.schema).map(([k,v])=>[k,v.defaultValue]));
const note="// "+e.name+" is rendered in its canonical "+e.owner+" composition; data-driven items are constructed by the public Body from the supplied descriptors.\n";
e.code=header+note+"const collectionContracts=<String,Map<String,Map<String,Object?>>>"+JSON.stringify({[e.slug]:e.schema})+";\nconst collectionFamilies=<String,String>"+JSON.stringify({[e.slug]:e.family})+";\n"+model.replace("final String slug;final Map<String,Object?> properties;const ForgeCollectionExample({super.key,required this.slug,this.properties=const {}});","final String slug='"+e.slug+"';final Map<String,Object?> properties=const "+JSON.stringify(defaults)+";const ForgeCollectionExample({super.key});")+"class _CollectionState extends State<ForgeCollectionExample>{"+state+build(e.expression)+"}\n";
}
fs.writeFileSync('showcase/portal/src/features/showcase-v2/model/flutter-collections.json',JSON.stringify(entries,null,2)+'\n');
console.log('Generated '+entries.length+' real collection/navigation contexts.');
