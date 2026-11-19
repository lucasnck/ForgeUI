// Generated from actual copyable native interaction snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
const snippetContracts0=<String,Map<String,Map<String,Object?>>>{"modal":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies0=<String,String>{"modal":"modal"};
class TransientSnippet0 extends StatefulWidget{final String slug='modal';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet0({super.key});@override State<TransientSnippet0> createState()=>_TransientSnippetState0();}
class _TransientSnippetState0 extends State<TransientSnippet0>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies0[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts0[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet0 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeModal(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeModalHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeModalBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeModalFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts1=<String,Map<String,Map<String,Object?>>>{"modal-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies1=<String,String>{"modal-header":"modal"};
class TransientSnippet1 extends StatefulWidget{final String slug='modal-header';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet1({super.key});@override State<TransientSnippet1> createState()=>_TransientSnippetState1();}
class _TransientSnippetState1 extends State<TransientSnippet1>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies1[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts1[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet1 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeModal(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeModalHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeModalBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeModalFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts2=<String,Map<String,Map<String,Object?>>>{"modal-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies2=<String,String>{"modal-body":"modal"};
class TransientSnippet2 extends StatefulWidget{final String slug='modal-body';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet2({super.key});@override State<TransientSnippet2> createState()=>_TransientSnippetState2();}
class _TransientSnippetState2 extends State<TransientSnippet2>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies2[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts2[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet2 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeModal(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeModalHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeModalBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeModalFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts3=<String,Map<String,Map<String,Object?>>>{"modal-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies3=<String,String>{"modal-footer":"modal"};
class TransientSnippet3 extends StatefulWidget{final String slug='modal-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet3({super.key});@override State<TransientSnippet3> createState()=>_TransientSnippetState3();}
class _TransientSnippetState3 extends State<TransientSnippet3>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies3[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts3[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet3 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeModal(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeModalHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeModalBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeModalFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts4=<String,Map<String,Map<String,Object?>>>{"dialog":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies4=<String,String>{"dialog":"dialog"};
class TransientSnippet4 extends StatefulWidget{final String slug='dialog';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet4({super.key});@override State<TransientSnippet4> createState()=>_TransientSnippetState4();}
class _TransientSnippetState4 extends State<TransientSnippet4>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies4[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts4[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet4 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts5=<String,Map<String,Map<String,Object?>>>{"dialog-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies5=<String,String>{"dialog-header":"dialog"};
class TransientSnippet5 extends StatefulWidget{final String slug='dialog-header';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet5({super.key});@override State<TransientSnippet5> createState()=>_TransientSnippetState5();}
class _TransientSnippetState5 extends State<TransientSnippet5>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies5[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts5[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet5 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts6=<String,Map<String,Map<String,Object?>>>{"dialog-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies6=<String,String>{"dialog-body":"dialog"};
class TransientSnippet6 extends StatefulWidget{final String slug='dialog-body';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet6({super.key});@override State<TransientSnippet6> createState()=>_TransientSnippetState6();}
class _TransientSnippetState6 extends State<TransientSnippet6>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies6[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts6[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet6 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts7=<String,Map<String,Map<String,Object?>>>{"dialog-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies7=<String,String>{"dialog-footer":"dialog"};
class TransientSnippet7 extends StatefulWidget{final String slug='dialog-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet7({super.key});@override State<TransientSnippet7> createState()=>_TransientSnippetState7();}
class _TransientSnippetState7 extends State<TransientSnippet7>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies7[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts7[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet7 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts8=<String,Map<String,Map<String,Object?>>>{"dialog-close":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies8=<String,String>{"dialog-close":"dialog"};
class TransientSnippet8 extends StatefulWidget{final String slug='dialog-close';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet8({super.key});@override State<TransientSnippet8> createState()=>_TransientSnippetState8();}
class _TransientSnippetState8 extends State<TransientSnippet8>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies8[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts8[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet8 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts9=<String,Map<String,Map<String,Object?>>>{"alert-dialog":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"description":{"kind":"text","defaultValue":"Atenção à ação solicitada","nonblank":true},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies9=<String,String>{"alert-dialog":"alert-dialog"};
class TransientSnippet9 extends StatefulWidget{final String slug='alert-dialog';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "description": "Atenção à ação solicitada", "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet9({super.key});@override State<TransientSnippet9> createState()=>_TransientSnippetState9();}
class _TransientSnippetState9 extends State<TransientSnippet9>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies9[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts9[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet9 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeAlertDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:leastFocus,description:text('description'),animated:flag('animated'),animationEffect:effect,children:[ForgeAlertDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeAlertDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeAlertDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts10=<String,Map<String,Map<String,Object?>>>{"alert-dialog-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"description":{"kind":"text","defaultValue":"Atenção à ação solicitada","nonblank":true},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies10=<String,String>{"alert-dialog-header":"alert-dialog"};
class TransientSnippet10 extends StatefulWidget{final String slug='alert-dialog-header';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "description": "Atenção à ação solicitada", "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet10({super.key});@override State<TransientSnippet10> createState()=>_TransientSnippetState10();}
class _TransientSnippetState10 extends State<TransientSnippet10>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies10[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts10[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet10 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeAlertDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:leastFocus,description:text('description'),animated:flag('animated'),animationEffect:effect,children:[ForgeAlertDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeAlertDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeAlertDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts11=<String,Map<String,Map<String,Object?>>>{"alert-dialog-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"description":{"kind":"text","defaultValue":"Atenção à ação solicitada","nonblank":true},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies11=<String,String>{"alert-dialog-body":"alert-dialog"};
class TransientSnippet11 extends StatefulWidget{final String slug='alert-dialog-body';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "description": "Atenção à ação solicitada", "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet11({super.key});@override State<TransientSnippet11> createState()=>_TransientSnippetState11();}
class _TransientSnippetState11 extends State<TransientSnippet11>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies11[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts11[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet11 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeAlertDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:leastFocus,description:text('description'),animated:flag('animated'),animationEffect:effect,children:[ForgeAlertDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeAlertDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeAlertDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts12=<String,Map<String,Map<String,Object?>>>{"alert-dialog-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"description":{"kind":"text","defaultValue":"Atenção à ação solicitada","nonblank":true},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies12=<String,String>{"alert-dialog-footer":"alert-dialog"};
class TransientSnippet12 extends StatefulWidget{final String slug='alert-dialog-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "description": "Atenção à ação solicitada", "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet12({super.key});@override State<TransientSnippet12> createState()=>_TransientSnippetState12();}
class _TransientSnippetState12 extends State<TransientSnippet12>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies12[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts12[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet12 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeAlertDialog(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:leastFocus,description:text('description'),animated:flag('animated'),animationEffect:effect,children:[ForgeAlertDialogHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeAlertDialogBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeAlertDialogFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts13=<String,Map<String,Map<String,Object?>>>{"confirmation-modal":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"confirmLabel":{"kind":"text","defaultValue":"Confirmar","nonblank":true},"loading":{"kind":"boolean","defaultValue":false},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"closeOnConfirm":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies13=<String,String>{"confirmation-modal":"confirmation-modal"};
class TransientSnippet13 extends StatefulWidget{final String slug='confirmation-modal';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "confirmLabel": "Confirmar", "loading": false, "closeOnOutsideClick": false, "closeOnConfirm": false};const TransientSnippet13({super.key});@override State<TransientSnippet13> createState()=>_TransientSnippetState13();}
class _TransientSnippetState13 extends State<TransientSnippet13>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies13[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts13[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet13 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeConfirmationModal(open:opened,onOpenChange:requestOpen,returnFocusNode:origin,title:text('titleText'),closeLabel:text('closeLabel'),cancelLabel:text('cancelLabel'),confirmLabel:text('confirmLabel'),loading:flag('loading'),loadingLabel:'Confirmando',animated:flag('animated'),closeOnOutsideClick:flag('closeOnOutsideClick'),onConfirm:(){recordAction('confirmed');if(flag('closeOnConfirm'))requestOpen(false);},child:Text(text('bodyText'))),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts14=<String,Map<String,Map<String,Object?>>>{"popover":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"label":{"kind":"text","defaultValue":"Painel de opções","nonblank":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies14=<String,String>{"popover":"popover"};
class TransientSnippet14 extends StatefulWidget{final String slug='popover';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "label": "Painel de opções", "animationEffect": "fade"};const TransientSnippet14({super.key});@override State<TransientSnippet14> createState()=>_TransientSnippetState14();}
class _TransientSnippetState14 extends State<TransientSnippet14>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies14[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts14[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet14 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgePopover(open:opened,onOpenChange:requestOpen,triggerLabel:text('triggerLabel'),label:text('label'),animated:flag('animated'),animationEffect:effect,children:[ForgePopoverHeader(child:Text(text('titleText'))),ForgePopoverBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgePopoverFooter(child:ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel'))))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts15=<String,Map<String,Map<String,Object?>>>{"popover-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"label":{"kind":"text","defaultValue":"Painel de opções","nonblank":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies15=<String,String>{"popover-header":"popover"};
class TransientSnippet15 extends StatefulWidget{final String slug='popover-header';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "label": "Painel de opções", "animationEffect": "fade"};const TransientSnippet15({super.key});@override State<TransientSnippet15> createState()=>_TransientSnippetState15();}
class _TransientSnippetState15 extends State<TransientSnippet15>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies15[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts15[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet15 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgePopover(open:opened,onOpenChange:requestOpen,triggerLabel:text('triggerLabel'),label:text('label'),animated:flag('animated'),animationEffect:effect,children:[ForgePopoverHeader(child:Text(text('titleText'))),ForgePopoverBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgePopoverFooter(child:ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel'))))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts16=<String,Map<String,Map<String,Object?>>>{"popover-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"label":{"kind":"text","defaultValue":"Painel de opções","nonblank":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies16=<String,String>{"popover-body":"popover"};
class TransientSnippet16 extends StatefulWidget{final String slug='popover-body';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "label": "Painel de opções", "animationEffect": "fade"};const TransientSnippet16({super.key});@override State<TransientSnippet16> createState()=>_TransientSnippetState16();}
class _TransientSnippetState16 extends State<TransientSnippet16>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies16[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts16[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet16 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgePopover(open:opened,onOpenChange:requestOpen,triggerLabel:text('triggerLabel'),label:text('label'),animated:flag('animated'),animationEffect:effect,children:[ForgePopoverHeader(child:Text(text('titleText'))),ForgePopoverBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgePopoverFooter(child:ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel'))))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts17=<String,Map<String,Map<String,Object?>>>{"popover-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"label":{"kind":"text","defaultValue":"Painel de opções","nonblank":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies17=<String,String>{"popover-footer":"popover"};
class TransientSnippet17 extends StatefulWidget{final String slug='popover-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "label": "Painel de opções", "animationEffect": "fade"};const TransientSnippet17({super.key});@override State<TransientSnippet17> createState()=>_TransientSnippetState17();}
class _TransientSnippetState17 extends State<TransientSnippet17>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies17[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts17[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet17 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgePopover(open:opened,onOpenChange:requestOpen,triggerLabel:text('triggerLabel'),label:text('label'),animated:flag('animated'),animationEffect:effect,children:[ForgePopoverHeader(child:Text(text('titleText'))),ForgePopoverBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgePopoverFooter(child:ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel'))))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts18=<String,Map<String,Map<String,Object?>>>{"tooltip":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"content":{"kind":"text","defaultValue":"Informação complementar","nonblank":true},"triggerLabel":{"kind":"text","defaultValue":"Ajuda","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies18=<String,String>{"tooltip":"tooltip"};
class TransientSnippet18 extends StatefulWidget{final String slug='tooltip';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "content": "Informação complementar", "triggerLabel": "Ajuda", "disabled": false};const TransientSnippet18({super.key});@override State<TransientSnippet18> createState()=>_TransientSnippetState18();}
class _TransientSnippetState18 extends State<TransientSnippet18>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies18[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts18[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet18 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeTooltip(content:text('content'),open:opened,onOpenChange:requestOpen,animated:flag('animated'),child:ForgeButton(focusNode:origin,disabled:flag('disabled'),onPressed:()=>recordAction('tooltip'),child:Text(text('triggerLabel')))),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts19=<String,Map<String,Map<String,Object?>>>{"overlay-portal":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true}}};
const snippetFamilies19=<String,String>{"overlay-portal":"overlay-portal"};
class TransientSnippet19 extends StatefulWidget{final String slug='overlay-portal';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar"};const TransientSnippet19({super.key});@override State<TransientSnippet19> createState()=>_TransientSnippetState19();}
class _TransientSnippetState19 extends State<TransientSnippet19>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies19[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts19[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet19 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),opened?ForgeOverlayPortal(anchor:const Text('Âncora do portal'),children:[SafeArea(child:Align(alignment:Alignment.topRight,child:Padding(padding:EdgeInsets.all(ForgeThemeTokens.of(context).palette.space4),child:ConstrainedBox(constraints:BoxConstraints(maxWidth:ForgeThemeTokens.of(context).palette.layoutContainerNarrow),child:ForgeSurface(padding:ForgeSpace.s4,children:[Text(text('bodyText')),ForgeButton(onPressed:()=>requestOpen(false),child:Text(text('closeLabel')))])))))]):const SizedBox.shrink(),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts20=<String,Map<String,Map<String,Object?>>>{"toast-region":{"label":{"kind":"text","defaultValue":"Notificações","nonblank":true},"titleText":{"kind":"text","defaultValue":"Atualização","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Operação demonstrativa concluída","nonblank":true},"dismissLabel":{"kind":"text","defaultValue":"Dispensar","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Revisar","nonblank":true},"duration":{"kind":"select","options":["persistent","short","long"],"defaultValue":"persistent"},"urgency":{"kind":"select","options":["normal","urgent"],"defaultValue":"normal"},"withAction":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"},"acceptChanges":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies20=<String,String>{"toast-region":"toast-region"};
class TransientSnippet20 extends StatefulWidget{final String slug='toast-region';final Map<String,Object?> properties=const {"label": "Notificações", "titleText": "Atualização", "bodyText": "Operação demonstrativa concluída", "dismissLabel": "Dispensar", "actionLabel": "Revisar", "duration": "persistent", "urgency": "normal", "withAction": false, "animated": true, "animationEffect": "fade", "acceptChanges": true};const TransientSnippet20({super.key});@override State<TransientSnippet20> createState()=>_TransientSnippetState20();}
class _TransientSnippetState20 extends State<TransientSnippet20>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies20[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts20[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet20 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),Column(children:[ForgeButton(focusNode:origin,onPressed:()=>queue!.add(makeRecord('toast-'+(++sequence).toString())),child:const Text('Adicionar notificação')),ForgeToastRegion(label:text('label'),controller:queue,renderToast:(record)=>ForgeToast(record:record,animated:flag('animated'),animationEffect:effect,children:[ForgeToastHeader(child:Text(record.title)),ForgeToastBody(child:Text(record.message)),ForgeToastFooter(child:ForgeInline(children:[if(record.action!=null)record.action!,ForgeButton(onPressed:()=>queue!.dismiss(record.id),child:Text(record.dismissLabel))]))]))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts21=<String,Map<String,Map<String,Object?>>>{"toast":{"label":{"kind":"text","defaultValue":"Notificações","nonblank":true},"titleText":{"kind":"text","defaultValue":"Atualização","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Operação demonstrativa concluída","nonblank":true},"dismissLabel":{"kind":"text","defaultValue":"Dispensar","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Revisar","nonblank":true},"duration":{"kind":"select","options":["persistent","short","long"],"defaultValue":"persistent"},"urgency":{"kind":"select","options":["normal","urgent"],"defaultValue":"normal"},"withAction":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"},"acceptChanges":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies21=<String,String>{"toast":"toast-region"};
class TransientSnippet21 extends StatefulWidget{final String slug='toast';final Map<String,Object?> properties=const {"label": "Notificações", "titleText": "Atualização", "bodyText": "Operação demonstrativa concluída", "dismissLabel": "Dispensar", "actionLabel": "Revisar", "duration": "persistent", "urgency": "normal", "withAction": false, "animated": true, "animationEffect": "fade", "acceptChanges": true};const TransientSnippet21({super.key});@override State<TransientSnippet21> createState()=>_TransientSnippetState21();}
class _TransientSnippetState21 extends State<TransientSnippet21>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies21[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts21[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet21 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),Column(children:[ForgeButton(focusNode:origin,onPressed:()=>queue!.add(makeRecord('toast-'+(++sequence).toString())),child:const Text('Adicionar notificação')),ForgeToastRegion(label:text('label'),controller:queue,renderToast:(record)=>ForgeToast(record:record,animated:flag('animated'),animationEffect:effect,children:[ForgeToastHeader(child:Text(record.title)),ForgeToastBody(child:Text(record.message)),ForgeToastFooter(child:ForgeInline(children:[if(record.action!=null)record.action!,ForgeButton(onPressed:()=>queue!.dismiss(record.id),child:Text(record.dismissLabel))]))]))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts22=<String,Map<String,Map<String,Object?>>>{"toast-header":{"label":{"kind":"text","defaultValue":"Notificações","nonblank":true},"titleText":{"kind":"text","defaultValue":"Atualização","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Operação demonstrativa concluída","nonblank":true},"dismissLabel":{"kind":"text","defaultValue":"Dispensar","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Revisar","nonblank":true},"duration":{"kind":"select","options":["persistent","short","long"],"defaultValue":"persistent"},"urgency":{"kind":"select","options":["normal","urgent"],"defaultValue":"normal"},"withAction":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"},"acceptChanges":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies22=<String,String>{"toast-header":"toast-region"};
class TransientSnippet22 extends StatefulWidget{final String slug='toast-header';final Map<String,Object?> properties=const {"label": "Notificações", "titleText": "Atualização", "bodyText": "Operação demonstrativa concluída", "dismissLabel": "Dispensar", "actionLabel": "Revisar", "duration": "persistent", "urgency": "normal", "withAction": false, "animated": true, "animationEffect": "fade", "acceptChanges": true};const TransientSnippet22({super.key});@override State<TransientSnippet22> createState()=>_TransientSnippetState22();}
class _TransientSnippetState22 extends State<TransientSnippet22>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies22[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts22[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet22 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),Column(children:[ForgeButton(focusNode:origin,onPressed:()=>queue!.add(makeRecord('toast-'+(++sequence).toString())),child:const Text('Adicionar notificação')),ForgeToastRegion(label:text('label'),controller:queue,renderToast:(record)=>ForgeToast(record:record,animated:flag('animated'),animationEffect:effect,children:[ForgeToastHeader(child:Text(record.title)),ForgeToastBody(child:Text(record.message)),ForgeToastFooter(child:ForgeInline(children:[if(record.action!=null)record.action!,ForgeButton(onPressed:()=>queue!.dismiss(record.id),child:Text(record.dismissLabel))]))]))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts23=<String,Map<String,Map<String,Object?>>>{"toast-body":{"label":{"kind":"text","defaultValue":"Notificações","nonblank":true},"titleText":{"kind":"text","defaultValue":"Atualização","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Operação demonstrativa concluída","nonblank":true},"dismissLabel":{"kind":"text","defaultValue":"Dispensar","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Revisar","nonblank":true},"duration":{"kind":"select","options":["persistent","short","long"],"defaultValue":"persistent"},"urgency":{"kind":"select","options":["normal","urgent"],"defaultValue":"normal"},"withAction":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"},"acceptChanges":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies23=<String,String>{"toast-body":"toast-region"};
class TransientSnippet23 extends StatefulWidget{final String slug='toast-body';final Map<String,Object?> properties=const {"label": "Notificações", "titleText": "Atualização", "bodyText": "Operação demonstrativa concluída", "dismissLabel": "Dispensar", "actionLabel": "Revisar", "duration": "persistent", "urgency": "normal", "withAction": false, "animated": true, "animationEffect": "fade", "acceptChanges": true};const TransientSnippet23({super.key});@override State<TransientSnippet23> createState()=>_TransientSnippetState23();}
class _TransientSnippetState23 extends State<TransientSnippet23>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies23[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts23[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet23 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),Column(children:[ForgeButton(focusNode:origin,onPressed:()=>queue!.add(makeRecord('toast-'+(++sequence).toString())),child:const Text('Adicionar notificação')),ForgeToastRegion(label:text('label'),controller:queue,renderToast:(record)=>ForgeToast(record:record,animated:flag('animated'),animationEffect:effect,children:[ForgeToastHeader(child:Text(record.title)),ForgeToastBody(child:Text(record.message)),ForgeToastFooter(child:ForgeInline(children:[if(record.action!=null)record.action!,ForgeButton(onPressed:()=>queue!.dismiss(record.id),child:Text(record.dismissLabel))]))]))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts24=<String,Map<String,Map<String,Object?>>>{"toast-footer":{"label":{"kind":"text","defaultValue":"Notificações","nonblank":true},"titleText":{"kind":"text","defaultValue":"Atualização","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Operação demonstrativa concluída","nonblank":true},"dismissLabel":{"kind":"text","defaultValue":"Dispensar","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Revisar","nonblank":true},"duration":{"kind":"select","options":["persistent","short","long"],"defaultValue":"persistent"},"urgency":{"kind":"select","options":["normal","urgent"],"defaultValue":"normal"},"withAction":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"},"acceptChanges":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies24=<String,String>{"toast-footer":"toast-region"};
class TransientSnippet24 extends StatefulWidget{final String slug='toast-footer';final Map<String,Object?> properties=const {"label": "Notificações", "titleText": "Atualização", "bodyText": "Operação demonstrativa concluída", "dismissLabel": "Dispensar", "actionLabel": "Revisar", "duration": "persistent", "urgency": "normal", "withAction": false, "animated": true, "animationEffect": "fade", "acceptChanges": true};const TransientSnippet24({super.key});@override State<TransientSnippet24> createState()=>_TransientSnippetState24();}
class _TransientSnippetState24 extends State<TransientSnippet24>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies24[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts24[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet24 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),Column(children:[ForgeButton(focusNode:origin,onPressed:()=>queue!.add(makeRecord('toast-'+(++sequence).toString())),child:const Text('Adicionar notificação')),ForgeToastRegion(label:text('label'),controller:queue,renderToast:(record)=>ForgeToast(record:record,animated:flag('animated'),animationEffect:effect,children:[ForgeToastHeader(child:Text(record.title)),ForgeToastBody(child:Text(record.message)),ForgeToastFooter(child:ForgeInline(children:[if(record.action!=null)record.action!,ForgeButton(onPressed:()=>queue!.dismiss(record.id),child:Text(record.dismissLabel))]))]))]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts25=<String,Map<String,Map<String,Object?>>>{"modal":{"acceptChanges":{"kind":"boolean","defaultValue":true},"animated":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"triggerLabel":{"kind":"text","defaultValue":"Abrir","nonblank":true},"titleText":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo da apresentação","nonblank":true},"footerText":{"kind":"text","defaultValue":"Ações do consumidor","nonblank":true},"closeLabel":{"kind":"text","defaultValue":"Fechar","nonblank":true},"cancelLabel":{"kind":"text","defaultValue":"Cancelar","nonblank":true},"closeOnOutsideClick":{"kind":"boolean","defaultValue":false},"preventDismiss":{"kind":"boolean","defaultValue":false},"animationEffect":{"kind":"select","options":["none","fade","scale"],"defaultValue":"fade"}}};
const snippetFamilies25=<String,String>{"modal":"modal"};
class TransientSnippet25 extends StatefulWidget{final String slug='modal';final Map<String,Object?> properties=const {"acceptChanges": true, "animated": true, "open": false, "triggerLabel": "Abrir", "titleText": "Detalhes", "bodyText": "Conteúdo da apresentação", "footerText": "Ações do consumidor", "closeLabel": "Fechar", "cancelLabel": "Cancelar", "closeOnOutsideClick": false, "preventDismiss": false, "animationEffect": "fade"};const TransientSnippet25({super.key});@override State<TransientSnippet25> createState()=>_TransientSnippetState25();}
class _TransientSnippetState25 extends State<TransientSnippet25>{
bool opened=false;int requests=0,actions=0,closures=0,sequence=0;String feedback='';
final origin=FocusNode(),fieldFocus=FocusNode(),leastFocus=FocusNode();
ForgeToastQueue? queue;List<ForgeToastRecord> records=[];
String get family=>snippetFamilies25[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts25[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant TransientSnippet25 old){
 super.didUpdateWidget(old);
 if(old.properties['open']!=widget.properties['open'])opened=flag('open');
 if(family=='toast-region'&&['titleText','bodyText','dismissLabel','duration','urgency','withAction','actionLabel'].any((key)=>old.properties[key]!=widget.properties[key])){
 records=records.map((r)=>makeRecord(r.id)).toList();queue!.update(records:records,onRecordsChange:requestRecords);
 }
}
@override void dispose(){queue?.dispose();origin.dispose();fieldFocus.dispose();leastFocus.dispose();super.dispose();}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[if(['modal','dialog','alert-dialog','confirmation-modal','overlay-portal'].contains(family))ForgeButton(focusNode:origin,onPressed:()=>requestOpen(!opened),child:Text(text('triggerLabel'))),ForgeModal(open:opened,onOpenChange:requestOpen,onCancel:intercept,onClose:closed,returnFocusNode:origin,initialFocusNode:fieldFocus,animated:flag('animated'),animationEffect:effect,closeOnOutsideClick:flag('closeOnOutsideClick'),children:[ForgeModalHeader(title:text('titleText'),child:ForgeDialogClose(child:Text(text('closeLabel')))),ForgeModalBody(child:Column(children:[Text(text('bodyText')),ForgeInput(focusNode:fieldFocus,semanticLabel:'Campo preservado')])),ForgeModalFooter(children:[Text(text('footerText')),ForgeDialogClose(focusNode:leastFocus,child:Text(text('cancelLabel')))])]),Text('Ações: $actions · Solicitações: $requests · Fechamentos: $closures'),if(feedback.isNotEmpty)Text(feedback)]);
}

Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));
void main(){
testWidgets('copyable interaction modal 0',(t)async{await t.pumpWidget(host(const TransientSnippet0()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction modal-header 1',(t)async{await t.pumpWidget(host(const TransientSnippet1()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction modal-body 2',(t)async{await t.pumpWidget(host(const TransientSnippet2()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction modal-footer 3',(t)async{await t.pumpWidget(host(const TransientSnippet3()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction dialog 4',(t)async{await t.pumpWidget(host(const TransientSnippet4()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction dialog-header 5',(t)async{await t.pumpWidget(host(const TransientSnippet5()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction dialog-body 6',(t)async{await t.pumpWidget(host(const TransientSnippet6()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction dialog-footer 7',(t)async{await t.pumpWidget(host(const TransientSnippet7()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction dialog-close 8',(t)async{await t.pumpWidget(host(const TransientSnippet8()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-dialog 9',(t)async{await t.pumpWidget(host(const TransientSnippet9()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-dialog-header 10',(t)async{await t.pumpWidget(host(const TransientSnippet10()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-dialog-body 11',(t)async{await t.pumpWidget(host(const TransientSnippet11()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction alert-dialog-footer 12',(t)async{await t.pumpWidget(host(const TransientSnippet12()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction confirmation-modal 13',(t)async{await t.pumpWidget(host(const TransientSnippet13()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction popover 14',(t)async{await t.pumpWidget(host(const TransientSnippet14()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction popover-header 15',(t)async{await t.pumpWidget(host(const TransientSnippet15()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction popover-body 16',(t)async{await t.pumpWidget(host(const TransientSnippet16()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction popover-footer 17',(t)async{await t.pumpWidget(host(const TransientSnippet17()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tooltip 18',(t)async{await t.pumpWidget(host(const TransientSnippet18()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction overlay-portal 19',(t)async{await t.pumpWidget(host(const TransientSnippet19()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toast-region 20',(t)async{await t.pumpWidget(host(const TransientSnippet20()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toast 21',(t)async{await t.pumpWidget(host(const TransientSnippet21()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toast-header 22',(t)async{await t.pumpWidget(host(const TransientSnippet22()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toast-body 23',(t)async{await t.pumpWidget(host(const TransientSnippet23()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toast-footer 24',(t)async{await t.pumpWidget(host(const TransientSnippet24()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction modal 25',(t)async{await t.pumpWidget(host(const TransientSnippet25()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
}
