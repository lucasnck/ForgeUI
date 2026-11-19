// Generated from actual copyable native interaction snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
// ListBox is rendered in its canonical ListBox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts0=<String,Map<String,Map<String,Object?>>>{"list-box":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"selectionMode":{"kind":"select","options":["single","multiple"],"defaultValue":"single"}}};
const snippetFamilies0=<String,String>{"list-box":"list-box"};
class CollectionSnippet0 extends StatefulWidget{final String slug='list-box';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "disabled": false, "invalid": false, "selectionMode": "single"};const CollectionSnippet0({super.key});@override State<CollectionSnippet0> createState()=>_CollectionSnippetState0();}
class _CollectionSnippetState0 extends State<CollectionSnippet0>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies0[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts0[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet0 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeListBox(label:text('label'),options:options,value:values,onValueChange:requestValues,selectionMode:enumValue('selectionMode',ForgeSelectionMode.values,ForgeSelectionMode.single),disabled:flag('disabled'),invalid:flag('invalid'),animated:flag('animated'),children:[const ForgeListBoxHeader(child:Text('Coleção')),const ForgeListBoxBody(),ForgeListBoxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ListBoxHeader is rendered in its canonical ListBox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts1=<String,Map<String,Map<String,Object?>>>{"list-box-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"selectionMode":{"kind":"select","options":["single","multiple"],"defaultValue":"single"}}};
const snippetFamilies1=<String,String>{"list-box-header":"list-box"};
class CollectionSnippet1 extends StatefulWidget{final String slug='list-box-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "disabled": false, "invalid": false, "selectionMode": "single"};const CollectionSnippet1({super.key});@override State<CollectionSnippet1> createState()=>_CollectionSnippetState1();}
class _CollectionSnippetState1 extends State<CollectionSnippet1>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies1[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts1[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet1 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeListBox(label:text('label'),options:options,value:values,onValueChange:requestValues,selectionMode:enumValue('selectionMode',ForgeSelectionMode.values,ForgeSelectionMode.single),disabled:flag('disabled'),invalid:flag('invalid'),animated:flag('animated'),children:[const ForgeListBoxHeader(child:Text('Coleção')),const ForgeListBoxBody(),ForgeListBoxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ListBoxBody is rendered in its canonical ListBox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts2=<String,Map<String,Map<String,Object?>>>{"list-box-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"selectionMode":{"kind":"select","options":["single","multiple"],"defaultValue":"single"}}};
const snippetFamilies2=<String,String>{"list-box-body":"list-box"};
class CollectionSnippet2 extends StatefulWidget{final String slug='list-box-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "disabled": false, "invalid": false, "selectionMode": "single"};const CollectionSnippet2({super.key});@override State<CollectionSnippet2> createState()=>_CollectionSnippetState2();}
class _CollectionSnippetState2 extends State<CollectionSnippet2>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies2[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts2[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet2 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeListBox(label:text('label'),options:options,value:values,onValueChange:requestValues,selectionMode:enumValue('selectionMode',ForgeSelectionMode.values,ForgeSelectionMode.single),disabled:flag('disabled'),invalid:flag('invalid'),animated:flag('animated'),children:[const ForgeListBoxHeader(child:Text('Coleção')),const ForgeListBoxBody(),ForgeListBoxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ListBoxFooter is rendered in its canonical ListBox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts3=<String,Map<String,Map<String,Object?>>>{"list-box-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"selectionMode":{"kind":"select","options":["single","multiple"],"defaultValue":"single"}}};
const snippetFamilies3=<String,String>{"list-box-footer":"list-box"};
class CollectionSnippet3 extends StatefulWidget{final String slug='list-box-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "disabled": false, "invalid": false, "selectionMode": "single"};const CollectionSnippet3({super.key});@override State<CollectionSnippet3> createState()=>_CollectionSnippetState3();}
class _CollectionSnippetState3 extends State<CollectionSnippet3>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies3[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts3[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet3 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeListBox(label:text('label'),options:options,value:values,onValueChange:requestValues,selectionMode:enumValue('selectionMode',ForgeSelectionMode.values,ForgeSelectionMode.single),disabled:flag('disabled'),invalid:flag('invalid'),animated:flag('animated'),children:[const ForgeListBoxHeader(child:Text('Coleção')),const ForgeListBoxBody(),ForgeListBoxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ListBoxItem is rendered in its canonical ListBox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts4=<String,Map<String,Map<String,Object?>>>{"list-box-item":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"selectionMode":{"kind":"select","options":["single","multiple"],"defaultValue":"single"}}};
const snippetFamilies4=<String,String>{"list-box-item":"list-box"};
class CollectionSnippet4 extends StatefulWidget{final String slug='list-box-item';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "disabled": false, "invalid": false, "selectionMode": "single"};const CollectionSnippet4({super.key});@override State<CollectionSnippet4> createState()=>_CollectionSnippetState4();}
class _CollectionSnippetState4 extends State<CollectionSnippet4>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies4[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts4[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet4 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeListBox(label:text('label'),options:options,value:values,onValueChange:requestValues,selectionMode:enumValue('selectionMode',ForgeSelectionMode.values,ForgeSelectionMode.single),disabled:flag('disabled'),invalid:flag('invalid'),animated:flag('animated'),children:[const ForgeListBoxHeader(child:Text('Coleção')),const ForgeListBoxBody(),ForgeListBoxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// Autocomplete is rendered in its canonical Autocomplete composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts5=<String,Map<String,Map<String,Object?>>>{"autocomplete":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies5=<String,String>{"autocomplete":"autocomplete"};
class CollectionSnippet5 extends StatefulWidget{final String slug='autocomplete';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet5({super.key});@override State<CollectionSnippet5> createState()=>_CollectionSnippetState5();}
class _CollectionSnippetState5 extends State<CollectionSnippet5>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies5[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts5[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet5 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAutocomplete(label:text('label'),query:query,onQueryChange:requestQuery,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeAutocompleteHeader(child:Text('Busca local')),const ForgeAutocompleteBody(),ForgeAutocompleteFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// AutocompleteHeader is rendered in its canonical Autocomplete composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts6=<String,Map<String,Map<String,Object?>>>{"autocomplete-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies6=<String,String>{"autocomplete-header":"autocomplete"};
class CollectionSnippet6 extends StatefulWidget{final String slug='autocomplete-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet6({super.key});@override State<CollectionSnippet6> createState()=>_CollectionSnippetState6();}
class _CollectionSnippetState6 extends State<CollectionSnippet6>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies6[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts6[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet6 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAutocomplete(label:text('label'),query:query,onQueryChange:requestQuery,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeAutocompleteHeader(child:Text('Busca local')),const ForgeAutocompleteBody(),ForgeAutocompleteFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// AutocompleteBody is rendered in its canonical Autocomplete composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts7=<String,Map<String,Map<String,Object?>>>{"autocomplete-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies7=<String,String>{"autocomplete-body":"autocomplete"};
class CollectionSnippet7 extends StatefulWidget{final String slug='autocomplete-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet7({super.key});@override State<CollectionSnippet7> createState()=>_CollectionSnippetState7();}
class _CollectionSnippetState7 extends State<CollectionSnippet7>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies7[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts7[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet7 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAutocomplete(label:text('label'),query:query,onQueryChange:requestQuery,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeAutocompleteHeader(child:Text('Busca local')),const ForgeAutocompleteBody(),ForgeAutocompleteFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// AutocompleteFooter is rendered in its canonical Autocomplete composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts8=<String,Map<String,Map<String,Object?>>>{"autocomplete-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies8=<String,String>{"autocomplete-footer":"autocomplete"};
class CollectionSnippet8 extends StatefulWidget{final String slug='autocomplete-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet8({super.key});@override State<CollectionSnippet8> createState()=>_CollectionSnippetState8();}
class _CollectionSnippetState8 extends State<CollectionSnippet8>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies8[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts8[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet8 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAutocomplete(label:text('label'),query:query,onQueryChange:requestQuery,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeAutocompleteHeader(child:Text('Busca local')),const ForgeAutocompleteBody(),ForgeAutocompleteFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// Combobox is rendered in its canonical Combobox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts9=<String,Map<String,Map<String,Object?>>>{"combobox":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies9=<String,String>{"combobox":"combobox"};
class CollectionSnippet9 extends StatefulWidget{final String slug='combobox';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet9({super.key});@override State<CollectionSnippet9> createState()=>_CollectionSnippetState9();}
class _CollectionSnippetState9 extends State<CollectionSnippet9>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies9[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts9[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet9 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCombobox(label:text('label'),query:query,onQueryChange:requestQuery,selectedValue:current.isEmpty?null:current,onSelectionChange:requestScalar,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeComboboxHeader(child:Text('Busca com seleção')),const ForgeComboboxBody(),ForgeComboboxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ComboboxHeader is rendered in its canonical Combobox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts10=<String,Map<String,Map<String,Object?>>>{"combobox-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies10=<String,String>{"combobox-header":"combobox"};
class CollectionSnippet10 extends StatefulWidget{final String slug='combobox-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet10({super.key});@override State<CollectionSnippet10> createState()=>_CollectionSnippetState10();}
class _CollectionSnippetState10 extends State<CollectionSnippet10>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies10[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts10[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet10 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCombobox(label:text('label'),query:query,onQueryChange:requestQuery,selectedValue:current.isEmpty?null:current,onSelectionChange:requestScalar,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeComboboxHeader(child:Text('Busca com seleção')),const ForgeComboboxBody(),ForgeComboboxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ComboboxBody is rendered in its canonical Combobox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts11=<String,Map<String,Map<String,Object?>>>{"combobox-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies11=<String,String>{"combobox-body":"combobox"};
class CollectionSnippet11 extends StatefulWidget{final String slug='combobox-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet11({super.key});@override State<CollectionSnippet11> createState()=>_CollectionSnippetState11();}
class _CollectionSnippetState11 extends State<CollectionSnippet11>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies11[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts11[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet11 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCombobox(label:text('label'),query:query,onQueryChange:requestQuery,selectedValue:current.isEmpty?null:current,onSelectionChange:requestScalar,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeComboboxHeader(child:Text('Busca com seleção')),const ForgeComboboxBody(),ForgeComboboxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// ComboboxFooter is rendered in its canonical Combobox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts12=<String,Map<String,Map<String,Object?>>>{"combobox-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies12=<String,String>{"combobox-footer":"combobox"};
class CollectionSnippet12 extends StatefulWidget{final String slug='combobox-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet12({super.key});@override State<CollectionSnippet12> createState()=>_CollectionSnippetState12();}
class _CollectionSnippetState12 extends State<CollectionSnippet12>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies12[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts12[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet12 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCombobox(label:text('label'),query:query,onQueryChange:requestQuery,selectedValue:current.isEmpty?null:current,onSelectionChange:requestScalar,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeComboboxHeader(child:Text('Busca com seleção')),const ForgeComboboxBody(),ForgeComboboxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// PopupListbox is rendered in its canonical PopupListbox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts13=<String,Map<String,Map<String,Object?>>>{"popup-listbox":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false},"open":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies13=<String,String>{"popup-listbox":"popup-listbox"};
class CollectionSnippet13 extends StatefulWidget{final String slug='popup-listbox';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar", "open": false};const CollectionSnippet13({super.key});@override State<CollectionSnippet13> createState()=>_CollectionSnippetState13();}
class _CollectionSnippetState13 extends State<CollectionSnippet13>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies13[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts13[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet13 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Column(children:[Focus(onKeyEvent:(context,event)=>popup.handle(event),child:ForgeInput(focusNode:editorFocus,value:query,onChanged:requestQuery,semanticLabel:text('label'),placeholder:text('placeholder'),disabled:flag('disabled'),readOnly:flag('readOnly'),onFocusChange:(v)=>popup.setFocused(v))),ForgePopupListbox<ForgeChoiceOption>(popup:popup,items:popupOptions,getOptionLabel:(v)=>v.label,getOptionKey:(v,i)=>v.value,listboxLabel:text('listboxLabel'),animated:flag('animated'))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// PopupListboxItem is rendered in its canonical PopupListbox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts14=<String,Map<String,Map<String,Object?>>>{"popup-listbox-item":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false},"open":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies14=<String,String>{"popup-listbox-item":"popup-listbox"};
class CollectionSnippet14 extends StatefulWidget{final String slug='popup-listbox-item';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar", "open": false};const CollectionSnippet14({super.key});@override State<CollectionSnippet14> createState()=>_CollectionSnippetState14();}
class _CollectionSnippetState14 extends State<CollectionSnippet14>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies14[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts14[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet14 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Column(children:[Focus(onKeyEvent:(context,event)=>popup.handle(event),child:ForgeInput(focusNode:editorFocus,value:query,onChanged:requestQuery,semanticLabel:text('label'),placeholder:text('placeholder'),disabled:flag('disabled'),readOnly:flag('readOnly'),onFocusChange:(v)=>popup.setFocused(v))),ForgePopupListbox<ForgeChoiceOption>(popup:popup,items:popupOptions,getOptionLabel:(v)=>v.label,getOptionKey:(v,i)=>v.value,listboxLabel:text('listboxLabel'),animated:flag('animated'))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// Menu is rendered in its canonical Menu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts15=<String,Map<String,Map<String,Object?>>>{"menu":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies15=<String,String>{"menu":"menu"};
class CollectionSnippet15 extends StatefulWidget{final String slug='menu';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true};const CollectionSnippet15({super.key});@override State<CollectionSnippet15> createState()=>_CollectionSnippetState15();}
class _CollectionSnippetState15 extends State<CollectionSnippet15>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies15[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts15[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet15 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[menu(),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// MenuHeader is rendered in its canonical Menu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts16=<String,Map<String,Map<String,Object?>>>{"menu-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies16=<String,String>{"menu-header":"menu"};
class CollectionSnippet16 extends StatefulWidget{final String slug='menu-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true};const CollectionSnippet16({super.key});@override State<CollectionSnippet16> createState()=>_CollectionSnippetState16();}
class _CollectionSnippetState16 extends State<CollectionSnippet16>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies16[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts16[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet16 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[menu(),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// MenuBody is rendered in its canonical Menu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts17=<String,Map<String,Map<String,Object?>>>{"menu-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies17=<String,String>{"menu-body":"menu"};
class CollectionSnippet17 extends StatefulWidget{final String slug='menu-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true};const CollectionSnippet17({super.key});@override State<CollectionSnippet17> createState()=>_CollectionSnippetState17();}
class _CollectionSnippetState17 extends State<CollectionSnippet17>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies17[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts17[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet17 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[menu(),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// MenuFooter is rendered in its canonical Menu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts18=<String,Map<String,Map<String,Object?>>>{"menu-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies18=<String,String>{"menu-footer":"menu"};
class CollectionSnippet18 extends StatefulWidget{final String slug='menu-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true};const CollectionSnippet18({super.key});@override State<CollectionSnippet18> createState()=>_CollectionSnippetState18();}
class _CollectionSnippetState18 extends State<CollectionSnippet18>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies18[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts18[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet18 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[menu(),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// MenuItem is rendered in its canonical Menu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts19=<String,Map<String,Map<String,Object?>>>{"menu-item":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies19=<String,String>{"menu-item":"menu"};
class CollectionSnippet19 extends StatefulWidget{final String slug='menu-item';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true};const CollectionSnippet19({super.key});@override State<CollectionSnippet19> createState()=>_CollectionSnippetState19();}
class _CollectionSnippetState19 extends State<CollectionSnippet19>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies19[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts19[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet19 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[menu(),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// DropdownMenu is rendered in its canonical DropdownMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts20=<String,Map<String,Map<String,Object?>>>{"dropdown-menu":{"label":{"kind":"text","defaultValue":"Abrir ações","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"menuLabel":{"kind":"text","defaultValue":"Comandos","nonblank":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies20=<String,String>{"dropdown-menu":"dropdown-menu"};
class CollectionSnippet20 extends StatefulWidget{final String slug='dropdown-menu';final Map<String,Object?> properties=const {"label": "Abrir ações", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "menuLabel": "Comandos", "acceptChanges": true, "open": false, "disabled": false};const CollectionSnippet20({super.key});@override State<CollectionSnippet20> createState()=>_CollectionSnippetState20();}
class _CollectionSnippetState20 extends State<CollectionSnippet20>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies20[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts20[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet20 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeDropdownMenu(label:text('label'),open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),child:menu()),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// NavigationMenu is rendered in its canonical NavigationMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts21=<String,Map<String,Map<String,Object?>>>{"navigation-menu":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"current":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies21=<String,String>{"navigation-menu":"navigation-menu"};
class CollectionSnippet21 extends StatefulWidget{final String slug='navigation-menu';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "open": false, "current": false};const CollectionSnippet21({super.key});@override State<CollectionSnippet21> createState()=>_CollectionSnippetState21();}
class _CollectionSnippetState21 extends State<CollectionSnippet21>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies21[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts21[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet21 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// NavigationMenuHeader is rendered in its canonical NavigationMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts22=<String,Map<String,Map<String,Object?>>>{"navigation-menu-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"current":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies22=<String,String>{"navigation-menu-header":"navigation-menu"};
class CollectionSnippet22 extends StatefulWidget{final String slug='navigation-menu-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "open": false, "current": false};const CollectionSnippet22({super.key});@override State<CollectionSnippet22> createState()=>_CollectionSnippetState22();}
class _CollectionSnippetState22 extends State<CollectionSnippet22>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies22[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts22[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet22 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// NavigationMenuBody is rendered in its canonical NavigationMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts23=<String,Map<String,Map<String,Object?>>>{"navigation-menu-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"current":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies23=<String,String>{"navigation-menu-body":"navigation-menu"};
class CollectionSnippet23 extends StatefulWidget{final String slug='navigation-menu-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "open": false, "current": false};const CollectionSnippet23({super.key});@override State<CollectionSnippet23> createState()=>_CollectionSnippetState23();}
class _CollectionSnippetState23 extends State<CollectionSnippet23>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies23[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts23[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet23 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// NavigationMenuFooter is rendered in its canonical NavigationMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts24=<String,Map<String,Map<String,Object?>>>{"navigation-menu-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"current":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies24=<String,String>{"navigation-menu-footer":"navigation-menu"};
class CollectionSnippet24 extends StatefulWidget{final String slug='navigation-menu-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "open": false, "current": false};const CollectionSnippet24({super.key});@override State<CollectionSnippet24> createState()=>_CollectionSnippetState24();}
class _CollectionSnippetState24 extends State<CollectionSnippet24>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies24[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts24[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet24 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// NavigationMenuItem is rendered in its canonical NavigationMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts25=<String,Map<String,Map<String,Object?>>>{"navigation-menu-item":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"current":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies25=<String,String>{"navigation-menu-item":"navigation-menu"};
class CollectionSnippet25 extends StatefulWidget{final String slug='navigation-menu-item';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "open": false, "current": false};const CollectionSnippet25({super.key});@override State<CollectionSnippet25> createState()=>_CollectionSnippetState25();}
class _CollectionSnippetState25 extends State<CollectionSnippet25>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies25[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts25[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet25 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// NavigationMenuSublist is rendered in its canonical NavigationMenu composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts26=<String,Map<String,Map<String,Object?>>>{"navigation-menu-sublist":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"open":{"kind":"boolean","defaultValue":false},"current":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies26=<String,String>{"navigation-menu-sublist":"navigation-menu"};
class CollectionSnippet26 extends StatefulWidget{final String slug='navigation-menu-sublist';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "open": false, "current": false};const CollectionSnippet26({super.key});@override State<CollectionSnippet26> createState()=>_CollectionSnippetState26();}
class _CollectionSnippetState26 extends State<CollectionSnippet26>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies26[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts26[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet26 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeNavigationMenu(label:text('label'),children:[const ForgeNavigationMenuHeader(child:Text('Navegação')),ForgeNavigationMenuBody(items:[ForgeNavigationMenuItem(label:text('firstLabel'),href:'/alpha',current:flag('current'),animated:flag('animated'),launcher:(request)=>record(request.href)),ForgeNavigationMenuItem(label:text('secondLabel'),animated:flag('animated'),open:opened,onOpenChange:requestOpen,sublist:ForgeNavigationMenuSublist(items:[ForgeNavigationMenuItem(label:'Terceiro',href:'/third',launcher:(request)=>record(request.href))]))]),ForgeNavigationMenuFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// Tree is rendered in its canonical Tree composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts27=<String,Map<String,Map<String,Object?>>>{"tree":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","root","child","other"],"defaultValue":"none"},"expanded":{"kind":"select","options":["none","root"],"defaultValue":"root"}}};
const snippetFamilies27=<String,String>{"tree":"tree"};
class CollectionSnippet27 extends StatefulWidget{final String slug='tree';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "expanded": "root"};const CollectionSnippet27({super.key});@override State<CollectionSnippet27> createState()=>_CollectionSnippetState27();}
class _CollectionSnippetState27 extends State<CollectionSnippet27>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies27[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts27[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet27 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// TreeHeader is rendered in its canonical Tree composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts28=<String,Map<String,Map<String,Object?>>>{"tree-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","root","child","other"],"defaultValue":"none"},"expanded":{"kind":"select","options":["none","root"],"defaultValue":"root"}}};
const snippetFamilies28=<String,String>{"tree-header":"tree"};
class CollectionSnippet28 extends StatefulWidget{final String slug='tree-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "expanded": "root"};const CollectionSnippet28({super.key});@override State<CollectionSnippet28> createState()=>_CollectionSnippetState28();}
class _CollectionSnippetState28 extends State<CollectionSnippet28>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies28[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts28[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet28 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// TreeBody is rendered in its canonical Tree composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts29=<String,Map<String,Map<String,Object?>>>{"tree-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","root","child","other"],"defaultValue":"none"},"expanded":{"kind":"select","options":["none","root"],"defaultValue":"root"}}};
const snippetFamilies29=<String,String>{"tree-body":"tree"};
class CollectionSnippet29 extends StatefulWidget{final String slug='tree-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "expanded": "root"};const CollectionSnippet29({super.key});@override State<CollectionSnippet29> createState()=>_CollectionSnippetState29();}
class _CollectionSnippetState29 extends State<CollectionSnippet29>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies29[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts29[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet29 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// TreeFooter is rendered in its canonical Tree composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts30=<String,Map<String,Map<String,Object?>>>{"tree-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","root","child","other"],"defaultValue":"none"},"expanded":{"kind":"select","options":["none","root"],"defaultValue":"root"}}};
const snippetFamilies30=<String,String>{"tree-footer":"tree"};
class CollectionSnippet30 extends StatefulWidget{final String slug='tree-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "expanded": "root"};const CollectionSnippet30({super.key});@override State<CollectionSnippet30> createState()=>_CollectionSnippetState30();}
class _CollectionSnippetState30 extends State<CollectionSnippet30>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies30[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts30[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet30 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// TreeItem is rendered in its canonical Tree composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts31=<String,Map<String,Map<String,Object?>>>{"tree-item":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","root","child","other"],"defaultValue":"none"},"expanded":{"kind":"select","options":["none","root"],"defaultValue":"root"}}};
const snippetFamilies31=<String,String>{"tree-item":"tree"};
class CollectionSnippet31 extends StatefulWidget{final String slug='tree-item';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "expanded": "root"};const CollectionSnippet31({super.key});@override State<CollectionSnippet31> createState()=>_CollectionSnippetState31();}
class _CollectionSnippetState31 extends State<CollectionSnippet31>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies31[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts31[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet31 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// TreeGroup is rendered in its canonical Tree composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts32=<String,Map<String,Map<String,Object?>>>{"tree-group":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","root","child","other"],"defaultValue":"none"},"expanded":{"kind":"select","options":["none","root"],"defaultValue":"root"}}};
const snippetFamilies32=<String,String>{"tree-group":"tree"};
class CollectionSnippet32 extends StatefulWidget{final String slug='tree-group';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "expanded": "root"};const CollectionSnippet32({super.key});@override State<CollectionSnippet32> createState()=>_CollectionSnippetState32();}
class _CollectionSnippetState32 extends State<CollectionSnippet32>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies32[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts32[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet32 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTree(label:text('label'),nodes:[ForgeTreeNode(key:'root',label:text('firstLabel'),children:[ForgeTreeNode(key:'child',label:text('secondLabel'),disabled:flag('disableSecond'))]),ForgeTreeNode(key:'other',label:'Terceiro')],value:ForgeProvided(current.isEmpty?null:current),onValueChange:requestScalar,expandedValue:expanded,onExpandedValueChange:requestExpanded,animated:flag('animated'),children:[const ForgeTreeHeader(child:Text('Hierarquia')),const ForgeTreeBody(),ForgeTreeFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// Stepper is rendered in its canonical Stepper composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts33=<String,Map<String,Map<String,Object?>>>{"stepper":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["first","second"],"defaultValue":"first"},"status":{"kind":"select","options":["pending","complete","error"],"defaultValue":"pending"}}};
const snippetFamilies33=<String,String>{"stepper":"stepper"};
class CollectionSnippet33 extends StatefulWidget{final String slug='stepper';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "first", "status": "pending"};const CollectionSnippet33({super.key});@override State<CollectionSnippet33> createState()=>_CollectionSnippetState33();}
class _CollectionSnippetState33 extends State<CollectionSnippet33>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies33[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts33[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet33 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// StepperHeader is rendered in its canonical Stepper composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts34=<String,Map<String,Map<String,Object?>>>{"stepper-header":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["first","second"],"defaultValue":"first"},"status":{"kind":"select","options":["pending","complete","error"],"defaultValue":"pending"}}};
const snippetFamilies34=<String,String>{"stepper-header":"stepper"};
class CollectionSnippet34 extends StatefulWidget{final String slug='stepper-header';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "first", "status": "pending"};const CollectionSnippet34({super.key});@override State<CollectionSnippet34> createState()=>_CollectionSnippetState34();}
class _CollectionSnippetState34 extends State<CollectionSnippet34>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies34[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts34[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet34 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// StepperBody is rendered in its canonical Stepper composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts35=<String,Map<String,Map<String,Object?>>>{"stepper-body":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["first","second"],"defaultValue":"first"},"status":{"kind":"select","options":["pending","complete","error"],"defaultValue":"pending"}}};
const snippetFamilies35=<String,String>{"stepper-body":"stepper"};
class CollectionSnippet35 extends StatefulWidget{final String slug='stepper-body';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "first", "status": "pending"};const CollectionSnippet35({super.key});@override State<CollectionSnippet35> createState()=>_CollectionSnippetState35();}
class _CollectionSnippetState35 extends State<CollectionSnippet35>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies35[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts35[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet35 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// StepperFooter is rendered in its canonical Stepper composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts36=<String,Map<String,Map<String,Object?>>>{"stepper-footer":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["first","second"],"defaultValue":"first"},"status":{"kind":"select","options":["pending","complete","error"],"defaultValue":"pending"}}};
const snippetFamilies36=<String,String>{"stepper-footer":"stepper"};
class CollectionSnippet36 extends StatefulWidget{final String slug='stepper-footer';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "first", "status": "pending"};const CollectionSnippet36({super.key});@override State<CollectionSnippet36> createState()=>_CollectionSnippetState36();}
class _CollectionSnippetState36 extends State<CollectionSnippet36>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies36[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts36[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet36 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// StepperItem is rendered in its canonical Stepper composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts37=<String,Map<String,Map<String,Object?>>>{"stepper-item":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["first","second"],"defaultValue":"first"},"status":{"kind":"select","options":["pending","complete","error"],"defaultValue":"pending"}}};
const snippetFamilies37=<String,String>{"stepper-item":"stepper"};
class CollectionSnippet37 extends StatefulWidget{final String slug='stepper-item';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "first", "status": "pending"};const CollectionSnippet37({super.key});@override State<CollectionSnippet37> createState()=>_CollectionSnippetState37();}
class _CollectionSnippetState37 extends State<CollectionSnippet37>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies37[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts37[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet37 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// StepperPanel is rendered in its canonical Stepper composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts38=<String,Map<String,Map<String,Object?>>>{"stepper-panel":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["first","second"],"defaultValue":"first"},"status":{"kind":"select","options":["pending","complete","error"],"defaultValue":"pending"}}};
const snippetFamilies38=<String,String>{"stepper-panel":"stepper"};
class CollectionSnippet38 extends StatefulWidget{final String slug='stepper-panel';final Map<String,Object?> properties=const {"label": "Opções", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "first", "status": "pending"};const CollectionSnippet38({super.key});@override State<CollectionSnippet38> createState()=>_CollectionSnippetState38();}
class _CollectionSnippetState38 extends State<CollectionSnippet38>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies38[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts38[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet38 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeStepper(label:text('label'),value:current,onStepChange:requestScalar,children:[ForgeStepperHeader(items:[ForgeStepperItem(value:'first',label:text('firstLabel'),animated:flag('animated')),ForgeStepperItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'),animated:flag('animated'),status:enumValue('status',ForgeStepStatus.values,ForgeStepStatus.pending),statusLabel:switch(text('status')){'complete'=>'Concluído','error'=>'Erro',_=>'Pendente'})]),const ForgeStepperBody(panels:[ForgeStepperPanel(value:'first',child:ForgeInput(semanticLabel:'Campo da etapa')),ForgeStepperPanel(value:'second',child:Text('Etapa secundária'))]),ForgeStepperFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

// Combobox is rendered in its canonical Combobox composition; data-driven items are constructed by the public Body from the supplied descriptors.
const snippetContracts39=<String,Map<String,Map<String,Object?>>>{"combobox":{"label":{"kind":"text","defaultValue":"Opções","nonblank":true},"firstLabel":{"kind":"text","defaultValue":"Alpha","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Beta","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações da coleção","nonblank":true},"disableSecond":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"acceptChanges":{"kind":"boolean","defaultValue":true},"selection":{"kind":"select","options":["none","first","second"],"defaultValue":"none"},"query":{"kind":"text","defaultValue":"","nonblank":false},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"listboxLabel":{"kind":"text","defaultValue":"Sugestões","nonblank":true},"placeholder":{"kind":"text","defaultValue":"Digite para buscar","nonblank":false}}};
const snippetFamilies39=<String,String>{"combobox":"combobox"};
class CollectionSnippet39 extends StatefulWidget{final String slug='combobox';final Map<String,Object?> properties=const {"label": "Aspas ' barra \\ dólar \$ e\nnova linha", "firstLabel": "Alpha", "secondLabel": "Beta", "footerText": "Informações da coleção", "disableSecond": false, "animated": true, "acceptChanges": true, "selection": "none", "query": "", "readOnly": false, "disabled": false, "listboxLabel": "Sugestões", "placeholder": "Digite para buscar"};const CollectionSnippet39({super.key});@override State<CollectionSnippet39> createState()=>_CollectionSnippetState39();}
class _CollectionSnippetState39 extends State<CollectionSnippet39>{
String query='',current='',feedback='',lastAction='';List<String> values=[],expanded=[];int events=0,dismissals=0;bool opened=false;
final editorFocus=FocusNode();
late final ForgePopupListboxController popup=ForgePopupListboxController(onAcceptOption:(i){final item=popupOptions[i];record(item.label);if(flag('acceptChanges')){setState(()=>query=item.label);popup.dismiss();}});
String get family=>snippetFamilies39[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??snippetContracts39[widget.slug]?[key]?['defaultValue'];
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
@override void didUpdateWidget(covariant CollectionSnippet39 old){
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
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCombobox(label:text('label'),query:query,onQueryChange:requestQuery,selectedValue:current.isEmpty?null:current,onSelectionChange:requestScalar,options:filtered,listboxLabel:text('listboxLabel'),placeholder:text('placeholder'),readOnly:flag('readOnly'),disabled:flag('disabled'),animated:flag('animated'),children:[const ForgeComboboxHeader(child:Text('Busca com seleção')),const ForgeComboboxBody(),ForgeComboboxFooter(child:Text(text('footerText')))]),Text('Solicitações: $events · Fechamentos: $dismissals'),if(feedback.isNotEmpty)Text(feedback),if(lastAction.isNotEmpty)Text('Ação solicitada: $lastAction')]);
}

Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));
void main(){
testWidgets('copyable interaction list-box 0',(t)async{await t.pumpWidget(host(const CollectionSnippet0()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-box-header 1',(t)async{await t.pumpWidget(host(const CollectionSnippet1()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-box-body 2',(t)async{await t.pumpWidget(host(const CollectionSnippet2()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-box-footer 3',(t)async{await t.pumpWidget(host(const CollectionSnippet3()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-box-item 4',(t)async{await t.pumpWidget(host(const CollectionSnippet4()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction autocomplete 5',(t)async{await t.pumpWidget(host(const CollectionSnippet5()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction autocomplete-header 6',(t)async{await t.pumpWidget(host(const CollectionSnippet6()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction autocomplete-body 7',(t)async{await t.pumpWidget(host(const CollectionSnippet7()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction autocomplete-footer 8',(t)async{await t.pumpWidget(host(const CollectionSnippet8()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction combobox 9',(t)async{await t.pumpWidget(host(const CollectionSnippet9()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction combobox-header 10',(t)async{await t.pumpWidget(host(const CollectionSnippet10()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction combobox-body 11',(t)async{await t.pumpWidget(host(const CollectionSnippet11()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction combobox-footer 12',(t)async{await t.pumpWidget(host(const CollectionSnippet12()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction popup-listbox 13',(t)async{await t.pumpWidget(host(const CollectionSnippet13()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction popup-listbox-item 14',(t)async{await t.pumpWidget(host(const CollectionSnippet14()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction menu 15',(t)async{await t.pumpWidget(host(const CollectionSnippet15()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction menu-header 16',(t)async{await t.pumpWidget(host(const CollectionSnippet16()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction menu-body 17',(t)async{await t.pumpWidget(host(const CollectionSnippet17()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction menu-footer 18',(t)async{await t.pumpWidget(host(const CollectionSnippet18()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction menu-item 19',(t)async{await t.pumpWidget(host(const CollectionSnippet19()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction dropdown-menu 20',(t)async{await t.pumpWidget(host(const CollectionSnippet20()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction navigation-menu 21',(t)async{await t.pumpWidget(host(const CollectionSnippet21()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction navigation-menu-header 22',(t)async{await t.pumpWidget(host(const CollectionSnippet22()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction navigation-menu-body 23',(t)async{await t.pumpWidget(host(const CollectionSnippet23()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction navigation-menu-footer 24',(t)async{await t.pumpWidget(host(const CollectionSnippet24()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction navigation-menu-item 25',(t)async{await t.pumpWidget(host(const CollectionSnippet25()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction navigation-menu-sublist 26',(t)async{await t.pumpWidget(host(const CollectionSnippet26()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree 27',(t)async{await t.pumpWidget(host(const CollectionSnippet27()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-header 28',(t)async{await t.pumpWidget(host(const CollectionSnippet28()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-body 29',(t)async{await t.pumpWidget(host(const CollectionSnippet29()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-footer 30',(t)async{await t.pumpWidget(host(const CollectionSnippet30()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-item 31',(t)async{await t.pumpWidget(host(const CollectionSnippet31()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tree-group 32',(t)async{await t.pumpWidget(host(const CollectionSnippet32()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction stepper 33',(t)async{await t.pumpWidget(host(const CollectionSnippet33()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction stepper-header 34',(t)async{await t.pumpWidget(host(const CollectionSnippet34()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction stepper-body 35',(t)async{await t.pumpWidget(host(const CollectionSnippet35()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction stepper-footer 36',(t)async{await t.pumpWidget(host(const CollectionSnippet36()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction stepper-item 37',(t)async{await t.pumpWidget(host(const CollectionSnippet37()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction stepper-panel 38',(t)async{await t.pumpWidget(host(const CollectionSnippet38()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction combobox 39',(t)async{await t.pumpWidget(host(const CollectionSnippet39()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
}
