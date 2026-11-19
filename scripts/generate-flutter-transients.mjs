import fs from 'node:fs';
const text=(v,nonblank=true)=>({kind:'text',defaultValue:v,nonblank});
const bool=(v=false)=>({kind:'boolean',defaultValue:v});
const select=(options,v)=>({kind:'select',options,defaultValue:v});
const common={acceptChanges:bool(true),animated:bool(true),open:bool(),triggerLabel:text('Abrir'),titleText:text('Detalhes'),bodyText:text('Conteúdo da apresentação'),footerText:text('Ações do consumidor'),closeLabel:text('Fechar'),cancelLabel:text('Cancelar')};
const modal={...common,closeOnOutsideClick:bool(),preventDismiss:bool(),animationEffect:select(['none','fade','scale'],'fade')};
const parts=prefix=>"["+prefix+"Header(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),"+prefix+"Body(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),"+prefix+"Footer(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]";
const toast={label:text('Notificações'),titleText:text('Atualização'),bodyText:text('Operação demonstrativa concluída'),dismissLabel:text('Dispensar'),actionLabel:text('Revisar'),duration:select(['persistent','short','long'],'persistent'),urgency:select(['normal','urgent'],'normal'),withAction:bool(),animated:bool(true),animationEffect:select(['none','fade','scale'],'fade'),acceptChanges:bool(true)};
const definitions={
modal:{names:['Modal','ModalHeader','ModalBody','ModalFooter'],schema:modal,expression:"ForgeModal(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:"+parts('ForgeModal')+")"},
dialog:{names:['Dialog','DialogHeader','DialogBody','DialogFooter','DialogClose'],schema:modal,expression:"ForgeDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:"+parts('ForgeDialog')+")"},
'alert-dialog':{names:['AlertDialog','AlertDialogHeader','AlertDialogBody','AlertDialogFooter'],schema:{...common,description:text('Atenção à ação solicitada'),preventDismiss:bool(),animationEffect:select(['none','fade','scale'],'fade')},expression:"ForgeAlertDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:leastFocus,description:text('description'),animated:flag('animated'),animationEffect:effect,children:"+parts('ForgeAlertDialog')+")"},
'confirmation-modal':{names:['ConfirmationModal'],schema:{...common,confirmLabel:text('Confirmar'),loading:bool(),closeOnOutsideClick:bool(),closeOnConfirm:bool()},
expression:`ForgeConfirmationModal(open:opened,onOpenChange:requestOpen,returnFocusNode:origin,title:text('titleText'),closeLabel:text('closeLabel'),cancelLabel:text('cancelLabel'),confirmLabel:text('confirmLabel'),loading:flag('loading'),loadingLabel:'Confirmando',animated:flag('animated'),closeOnOutsideClick:flag('closeOnOutsideClick'),onConfirm:(){recordAction('confirmed');if(flag('closeOnConfirm'))requestOpen(false);},child:Text(text('bodyText')))`},
popover:{names:['Popover','PopoverHeader','PopoverBody','PopoverFooter'],schema:{...common,label:text('Painel de opções'),animationEffect:select(['none','fade','scale'],'fade')},
expression:`ForgePopover(open:opened,onOpenChange:requestOpen,triggerLabel:text('triggerLabel'),label:text('label'),animated:flag('animated'),animationEffect:effect,children:[ForgePopoverHeader(child:Text(text('titleText'))),ForgePopoverBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgePopoverFooter(child:ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel'))))])`},
tooltip:{names:['Tooltip'],schema:{acceptChanges:bool(true),animated:bool(true),open:bool(),content:text('Informação complementar'),triggerLabel:text('Ajuda'),disabled:bool()},
expression:`ForgeTooltip(content:text('content'),open:opened,onOpenChange:requestOpen,animated:flag('animated'),child:ForgeButton(focusNode:origin,disabled:flag('disabled'),onPressed:()=>recordAction('tooltip'),child:Text(text('triggerLabel'))))`},
'overlay-portal':{names:['OverlayPortal'],schema:{...common},expression:`opened?ForgeOverlayPortal(anchor:const Text('Âncora do portal'),children:[SafeArea(child:Align(alignment:Alignment.topRight,child:Padding(padding:EdgeInsets.all(ForgeThemeTokens.of(context).palette.space4),child:ConstrainedBox(constraints:BoxConstraints(maxWidth:ForgeThemeTokens.of(context).palette.layoutContainerNarrow),child:ForgeSurface(padding:ForgeSpace.s4,children:[Text(text('bodyText')),ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel')))])))))]):const SizedBox.shrink()`},
'toast-region':{names:['ToastRegion','Toast','ToastHeader','ToastBody','ToastFooter'],schema:toast,
expression:`Column(children:[ForgeButton(focusNode:origin,onPressed:()=>queue!.add(makeRecord('toast-'+(++sequence).toString())),child:const Text('Adicionar notificação')),ForgeToastRegion(label:text('label'),controller:queue,renderToast:(record)=>ForgeToast(record:record,animated:flag('animated'),animationEffect:effect,children:[ForgeToastHeader(child:Text(record.title)),ForgeToastBody(child:Text(record.message)),ForgeToastFooter(child:ForgeInline(children:[if(record.action!=null)record.action!,ForgeButton(onPressed:()=>queue!.dismiss(record.id),child:Text(record.dismissLabel))]))]))])`}
};
const api=JSON.parse(fs.readFileSync('docs/sc/app/reference/native-component-api.json','utf8')),entries=[];
for(const [family,d]of Object.entries(definitions))for(const name of d.names){const c=api.components.find(c=>c.name===name);if(!c)throw Error(name);entries.push({name,owner:d.names[0],slug:c.slug,family,schema:d.schema,expression:d.expression});}
const state=`
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>transientFamilies[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??transientContracts[widget.slug]?[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> values,T fallback)=>values.where((v)=>v.name==prop(key)).firstOrNull??fallback;
ForgeAnimationEffect get effect=>enumValue('animationEffect',ForgeAnimationEffect.values,ForgeAnimationEffect.fade);
ForgeToastRecord makeRecord(String id)=>ForgeToastRecord(id:id,title:text('titleText'),message:text('bodyText'),dismissLabel:text('dismissLabel'),duration:enumValue('duration',ForgeToastDuration.values,ForgeToastDuration.persistent),urgency:enumValue('urgency',ForgeNotificationUrgency.values,ForgeNotificationUrgency.normal),action:flag('withAction')?ForgeButton(onPressed:()=>recordAction('toast-action'),child:Text(text('actionLabel'))):null);
void requestRecords(List<ForgeToastRecord> next){setState((){requests++;feedback='Notificações solicitadas: '+next.length.toString();if(flag('acceptChanges'))records=List.of(next);});if(flag('acceptChanges'))queue!.update(records:records,onRecordsChange:requestRecords);}
void recordAction(String value)=>setState((){actions++;feedback='Ação: $value';});
void requestOpen(bool next){
 setState((){requests++;if(flag('acceptChanges'))opened=next;});
 if(family=='overlay-portal'&&!next&&flag('acceptChanges'))WidgetsBinding.instance.addPostFrameCallback((_){if(mounted)origin.requestFocus();});
}
void intercept(ForgeModalDismissContext event){if(flag('preventDismiss'))event.cancel();}
void closed(){if(mounted)setState(()=>closures++);}
@override void initState(){super.initState();opened=flag('open');if(family=='toast-region'){records=[makeRecord('initial')];queue=ForgeToastQueue(records:records,onRecordsChange:requestRecords);}}
@override void didUpdateWidget(covariant ForgeTransientExample old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
`;
const contracts=Object.fromEntries(entries.map(e=>[e.slug,e.schema])),families=Object.fromEntries(entries.map(e=>[e.slug,e.family]));
const validator=`bool validTransientProperties(String slug,Map p){final schema=transientContracts[slug];if(schema==null)return false;for(final e in p.entries){if(e.key=='theme'||e.key=='scenario')continue;final f=schema[e.key],v=e.value;if(f==null)return false;switch(f['kind']){case 'boolean':if(v is! bool)return false;case 'text':if(v is! String||v.length>200||(f['nonblank']==true&&v.trim().isEmpty))return false;case 'select':if(!(f['options'] as List).contains(v))return false;}}return true;}`;
fs.writeFileSync('app/showcase_flutter/lib/examples/transient_contracts.dart','// Generated finite native contracts.\nconst transientContracts=<String,Map<String,Map<String,Object?>>>'+JSON.stringify(contracts)+';\nconst transientFamilies=<String,String>'+JSON.stringify(families)+';\n'+validator+'\n');
const header="import 'package:flutter/material.dart';\nimport 'package:forge_ui/forge_ui.dart';\n";
const model="class ForgeTransientExample extends StatefulWidget{final String slug;final Map<String,Object?> properties;const ForgeTransientExample({super.key,required this.slug,this.properties=const {}});@override State<ForgeTransientExample> createState()=>_TransientState();}\n";
const build=e=>"@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),"+e+",Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);\n";
fs.writeFileSync('app/showcase_flutter/lib/examples/transients_generated.dart','// Generated by scripts/generate-flutter-transients.mjs.\n'+header+"import 'transient_contracts.dart';\n"+model+"class _TransientState extends State<ForgeTransientExample>{"+state+build("switch(family){"+Object.entries(definitions).map(([f,d])=>"'"+f+"' => "+d.expression+",").join('\n')+"_=>throw ArgumentError.value(family)}")+"}\n");
for(const e of entries){const defaults=Object.fromEntries(Object.entries(e.schema).map(([k,v])=>[k,v.defaultValue]));e.code=header+"const transientContracts=<String,Map<String,Map<String,Object?>>>"+JSON.stringify({[e.slug]:e.schema})+";\nconst transientFamilies=<String,String>"+JSON.stringify({[e.slug]:e.family})+";\n"+model.replace("final String slug;final Map<String,Object?> properties;const ForgeTransientExample({super.key,required this.slug,this.properties=const {}});","final String slug='"+e.slug+"';final Map<String,Object?> properties=const "+JSON.stringify(defaults)+";const ForgeTransientExample({super.key});")+"class _TransientState extends State<ForgeTransientExample>{"+state+build(e.expression)+"}\n";}
fs.writeFileSync('showcase/portal/src/features/showcase-v2/model/flutter-transients.json',JSON.stringify(entries,null,2)+'\n');
console.log('Generated '+entries.length+' real modal/overlay/notification contexts.');
