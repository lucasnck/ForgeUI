// Generated from actual copyable native interaction snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
const snippetContracts0=<String,Map<String,Map<String,Object?>>>{"choice-group":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies0=<String,String>{"choice-group":"choice-group"};
class InteractionSnippet0 extends StatefulWidget {final String slug='choice-group';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none"};const InteractionSnippet0({super.key});@override State<InteractionSnippet0> createState()=>_InteractionSnippetState0();}
class _InteractionSnippetState0 extends State<InteractionSnippet0>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts0[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies0[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet0 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeChoiceGroup(disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckbox(checked:values.contains('first'),disabled:flag('disabled'),semanticLabel:text('firstLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='first'),'first']:values.where((v)=>v!='first').toList())),
Text(text('firstLabel')),
ForgeCheckbox(checked:values.contains('second'),disabled:flag('disabled')||flag('disableSecond'),semanticLabel:text('secondLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='second'),'second']:values.where((v)=>v!='second').toList())),
Text(text('secondLabel'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts1=<String,Map<String,Map<String,Object?>>>{"choice-group-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies1=<String,String>{"choice-group-header":"choice-group"};
class InteractionSnippet1 extends StatefulWidget {final String slug='choice-group-header';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none"};const InteractionSnippet1({super.key});@override State<InteractionSnippet1> createState()=>_InteractionSnippetState1();}
class _InteractionSnippetState1 extends State<InteractionSnippet1>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts1[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies1[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet1 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeChoiceGroup(disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckbox(checked:values.contains('first'),disabled:flag('disabled'),semanticLabel:text('firstLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='first'),'first']:values.where((v)=>v!='first').toList())),
Text(text('firstLabel')),
ForgeCheckbox(checked:values.contains('second'),disabled:flag('disabled')||flag('disableSecond'),semanticLabel:text('secondLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='second'),'second']:values.where((v)=>v!='second').toList())),
Text(text('secondLabel'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts2=<String,Map<String,Map<String,Object?>>>{"choice-group-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies2=<String,String>{"choice-group-body":"choice-group"};
class InteractionSnippet2 extends StatefulWidget {final String slug='choice-group-body';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none"};const InteractionSnippet2({super.key});@override State<InteractionSnippet2> createState()=>_InteractionSnippetState2();}
class _InteractionSnippetState2 extends State<InteractionSnippet2>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts2[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies2[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet2 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeChoiceGroup(disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckbox(checked:values.contains('first'),disabled:flag('disabled'),semanticLabel:text('firstLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='first'),'first']:values.where((v)=>v!='first').toList())),
Text(text('firstLabel')),
ForgeCheckbox(checked:values.contains('second'),disabled:flag('disabled')||flag('disableSecond'),semanticLabel:text('secondLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='second'),'second']:values.where((v)=>v!='second').toList())),
Text(text('secondLabel'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts3=<String,Map<String,Map<String,Object?>>>{"choice-group-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies3=<String,String>{"choice-group-footer":"choice-group"};
class InteractionSnippet3 extends StatefulWidget {final String slug='choice-group-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none"};const InteractionSnippet3({super.key});@override State<InteractionSnippet3> createState()=>_InteractionSnippetState3();}
class _InteractionSnippetState3 extends State<InteractionSnippet3>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts3[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies3[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet3 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeChoiceGroup(disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckbox(checked:values.contains('first'),disabled:flag('disabled'),semanticLabel:text('firstLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='first'),'first']:values.where((v)=>v!='first').toList())),
Text(text('firstLabel')),
ForgeCheckbox(checked:values.contains('second'),disabled:flag('disabled')||flag('disableSecond'),semanticLabel:text('secondLabel'),onChanged:(v)=>requestValues(v?[...values.where((v)=>v!='second'),'second']:values.where((v)=>v!='second').toList())),
Text(text('secondLabel'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts4=<String,Map<String,Map<String,Object?>>>{"checkbox-group":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"},"name":{"kind":"text","defaultValue":"preferences","nonblank":true}}};
const snippetFamilies4=<String,String>{"checkbox-group":"checkbox-group"};
class InteractionSnippet4 extends StatefulWidget {final String slug='checkbox-group';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none", "name": "preferences"};const InteractionSnippet4({super.key});@override State<InteractionSnippet4> createState()=>_InteractionSnippetState4();}
class _InteractionSnippetState4 extends State<InteractionSnippet4>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts4[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies4[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet4 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCheckboxGroup(name:text('name'),disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),value:values,onValueChange:requestValues,children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckboxGroupItem(value:'first',label:text('firstLabel')),
ForgeCheckboxGroupItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts5=<String,Map<String,Map<String,Object?>>>{"checkbox-group-item":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"},"name":{"kind":"text","defaultValue":"preferences","nonblank":true}}};
const snippetFamilies5=<String,String>{"checkbox-group-item":"checkbox-group"};
class InteractionSnippet5 extends StatefulWidget {final String slug='checkbox-group-item';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none", "name": "preferences"};const InteractionSnippet5({super.key});@override State<InteractionSnippet5> createState()=>_InteractionSnippetState5();}
class _InteractionSnippetState5 extends State<InteractionSnippet5>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts5[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies5[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet5 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCheckboxGroup(name:text('name'),disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),value:values,onValueChange:requestValues,children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeCheckboxGroupItem(value:'first',label:text('firstLabel')),
ForgeCheckboxGroupItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond'))])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts6=<String,Map<String,Map<String,Object?>>>{"radio-group":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","third"],"defaultValue":"none"},"name":{"kind":"text","defaultValue":"delivery","nonblank":true}}};
const snippetFamilies6=<String,String>{"radio-group":"radio-group"};
class InteractionSnippet6 extends StatefulWidget {final String slug='radio-group';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none", "name": "delivery"};const InteractionSnippet6({super.key});@override State<InteractionSnippet6> createState()=>_InteractionSnippetState6();}
class _InteractionSnippetState6 extends State<InteractionSnippet6>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts6[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies6[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet6 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeRadioGroup(name:text('name'),disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),value:current,onValueChange:requestScalar,children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeRadioGroupItem(value:'first',label:text('firstLabel')),
ForgeRadioGroupItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond')),
const ForgeRadioGroupItem(value:'third',label:'Terceiro')])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts7=<String,Map<String,Map<String,Object?>>>{"radio-group-item":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Preferências","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"invalid":{"kind":"boolean","defaultValue":false},"gap":{"kind":"select","options":["s0","s1","s2","s3","s4","s6"],"defaultValue":"s2"},"padding":{"kind":"select","options":["s0","s1","s2","s3","s4"],"defaultValue":"s0"},"disableSecond":{"kind":"boolean","defaultValue":false},"selection":{"kind":"select","options":["none","first","second","third"],"defaultValue":"none"},"name":{"kind":"text","defaultValue":"delivery","nonblank":true}}};
const snippetFamilies7=<String,String>{"radio-group-item":"radio-group"};
class InteractionSnippet7 extends StatefulWidget {final String slug='radio-group-item';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "footerText": "Informações complementares", "label": "Preferências", "disabled": false, "invalid": false, "gap": "s2", "padding": "s0", "disableSecond": false, "selection": "none", "name": "delivery"};const InteractionSnippet7({super.key});@override State<InteractionSnippet7> createState()=>_InteractionSnippetState7();}
class _InteractionSnippetState7 extends State<InteractionSnippet7>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts7[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies7[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet7 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeRadioGroup(name:text('name'),disabled:flag('disabled'),invalid:flag('invalid'),gap:enumValue('gap',ForgeSpace.values,ForgeSpace.s2),padding:enumValue('padding',ForgeSpace.values,ForgeSpace.s0),value:current,onValueChange:requestScalar,children:[
ForgeChoiceGroupHeader(child:Text(text('label'))),
ForgeChoiceGroupBody(child:Column(children:[
ForgeRadioGroupItem(value:'first',label:text('firstLabel')),
ForgeRadioGroupItem(value:'second',label:text('secondLabel'),disabled:flag('disableSecond')),
const ForgeRadioGroupItem(value:'third',label:'Terceiro')])),
ForgeChoiceGroupFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts8=<String,Map<String,Map<String,Object?>>>{"tabs":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies8=<String,String>{"tabs":"tabs"};
class InteractionSnippet8 extends StatefulWidget {final String slug='tabs';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Seções", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet8({super.key});@override State<InteractionSnippet8> createState()=>_InteractionSnippetState8();}
class _InteractionSnippetState8 extends State<InteractionSnippet8>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts8[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies8[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet8 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts9=<String,Map<String,Map<String,Object?>>>{"tabs-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies9=<String,String>{"tabs-header":"tabs"};
class InteractionSnippet9 extends StatefulWidget {final String slug='tabs-header';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Seções", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet9({super.key});@override State<InteractionSnippet9> createState()=>_InteractionSnippetState9();}
class _InteractionSnippetState9 extends State<InteractionSnippet9>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts9[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies9[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet9 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts10=<String,Map<String,Map<String,Object?>>>{"tabs-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies10=<String,String>{"tabs-body":"tabs"};
class InteractionSnippet10 extends StatefulWidget {final String slug='tabs-body';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Seções", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet10({super.key});@override State<InteractionSnippet10> createState()=>_InteractionSnippetState10();}
class _InteractionSnippetState10 extends State<InteractionSnippet10>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts10[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies10[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet10 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts11=<String,Map<String,Map<String,Object?>>>{"tabs-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies11=<String,String>{"tabs-footer":"tabs"};
class InteractionSnippet11 extends StatefulWidget {final String slug='tabs-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Seções", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet11({super.key});@override State<InteractionSnippet11> createState()=>_InteractionSnippetState11();}
class _InteractionSnippetState11 extends State<InteractionSnippet11>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts11[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies11[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet11 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts12=<String,Map<String,Map<String,Object?>>>{"tab":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies12=<String,String>{"tab":"tabs"};
class InteractionSnippet12 extends StatefulWidget {final String slug='tab';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Seções", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet12({super.key});@override State<InteractionSnippet12> createState()=>_InteractionSnippetState12();}
class _InteractionSnippetState12 extends State<InteractionSnippet12>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts12[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies12[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet12 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts13=<String,Map<String,Map<String,Object?>>>{"tab-panel":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies13=<String,String>{"tab-panel":"tabs"};
class InteractionSnippet13 extends StatefulWidget {final String slug='tab-panel';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Seções", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet13({super.key});@override State<InteractionSnippet13> createState()=>_InteractionSnippetState13();}
class _InteractionSnippetState13 extends State<InteractionSnippet13>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts13[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies13[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet13 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts14=<String,Map<String,Map<String,Object?>>>{"toolbar":{"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"label":{"kind":"text","defaultValue":"Ações","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"orientation":{"kind":"select","options":["horizontal","vertical"],"defaultValue":"horizontal"},"disableSecond":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies14=<String,String>{"toolbar":"toolbar"};
class InteractionSnippet14 extends StatefulWidget {final String slug='toolbar';final Map<String,Object?> properties=const {"firstLabel": "Primeiro", "secondLabel": "Segundo", "label": "Ações", "direction": "ltr", "orientation": "horizontal", "disableSecond": false};const InteractionSnippet14({super.key});@override State<InteractionSnippet14> createState()=>_InteractionSnippetState14();}
class _InteractionSnippetState14 extends State<InteractionSnippet14>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts14[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies14[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet14 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeToolbar(label:text('label'),direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),orientation:enumValue('orientation',ForgeNavigationOrientation.values,ForgeNavigationOrientation.horizontal),children:[
ForgeToolbarItem(itemKey:'first',onPressed:()=>record('first'),child:Text(text('firstLabel'))),
ForgeToolbarItem(itemKey:'second',disabled:flag('disableSecond'),onPressed:()=>record('second'),child:Text(text('secondLabel'))),
ForgeToolbarItem(itemKey:'third',onPressed:()=>record('third'),child:const Text('Terceiro'))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts15=<String,Map<String,Map<String,Object?>>>{"toolbar-item":{"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"label":{"kind":"text","defaultValue":"Ações","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"orientation":{"kind":"select","options":["horizontal","vertical"],"defaultValue":"horizontal"},"disableSecond":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies15=<String,String>{"toolbar-item":"toolbar"};
class InteractionSnippet15 extends StatefulWidget {final String slug='toolbar-item';final Map<String,Object?> properties=const {"firstLabel": "Primeiro", "secondLabel": "Segundo", "label": "Ações", "direction": "ltr", "orientation": "horizontal", "disableSecond": false};const InteractionSnippet15({super.key});@override State<InteractionSnippet15> createState()=>_InteractionSnippetState15();}
class _InteractionSnippetState15 extends State<InteractionSnippet15>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts15[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies15[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet15 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeToolbar(label:text('label'),direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),orientation:enumValue('orientation',ForgeNavigationOrientation.values,ForgeNavigationOrientation.horizontal),children:[
ForgeToolbarItem(itemKey:'first',onPressed:()=>record('first'),child:Text(text('firstLabel'))),
ForgeToolbarItem(itemKey:'second',disabled:flag('disableSecond'),onPressed:()=>record('second'),child:Text(text('secondLabel'))),
ForgeToolbarItem(itemKey:'third',onPressed:()=>record('third'),child:const Text('Terceiro'))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts16=<String,Map<String,Map<String,Object?>>>{"disclosure":{"acceptChanges":{"kind":"boolean","defaultValue":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"label":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"open":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies16=<String,String>{"disclosure":"disclosure"};
class InteractionSnippet16 extends StatefulWidget {final String slug='disclosure';final Map<String,Object?> properties=const {"acceptChanges": true, "bodyText": "Conteúdo preservado", "label": "Detalhes", "open": false, "disabled": false, "animated": true};const InteractionSnippet16({super.key});@override State<InteractionSnippet16> createState()=>_InteractionSnippetState16();}
class _InteractionSnippetState16 extends State<InteractionSnippet16>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts16[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies16[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet16 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeDisclosure(label:text('label'),open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts17=<String,Map<String,Map<String,Object?>>>{"collapse":{"acceptChanges":{"kind":"boolean","defaultValue":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"open":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies17=<String,String>{"collapse":"collapse"};
class InteractionSnippet17 extends StatefulWidget {final String slug='collapse';final Map<String,Object?> properties=const {"acceptChanges": true, "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Detalhes", "open": false, "disabled": false, "animated": true};const InteractionSnippet17({super.key});@override State<InteractionSnippet17> createState()=>_InteractionSnippetState17();}
class _InteractionSnippetState17 extends State<InteractionSnippet17>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts17[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies17[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet17 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCollapse(open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeCollapseHeader(child:Text(text('label'))),
ForgeCollapseBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),
ForgeCollapseFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts18=<String,Map<String,Map<String,Object?>>>{"collapse-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"open":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies18=<String,String>{"collapse-header":"collapse"};
class InteractionSnippet18 extends StatefulWidget {final String slug='collapse-header';final Map<String,Object?> properties=const {"acceptChanges": true, "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Detalhes", "open": false, "disabled": false, "animated": true};const InteractionSnippet18({super.key});@override State<InteractionSnippet18> createState()=>_InteractionSnippetState18();}
class _InteractionSnippetState18 extends State<InteractionSnippet18>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts18[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies18[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet18 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCollapse(open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeCollapseHeader(child:Text(text('label'))),
ForgeCollapseBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),
ForgeCollapseFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts19=<String,Map<String,Map<String,Object?>>>{"collapse-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"open":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies19=<String,String>{"collapse-body":"collapse"};
class InteractionSnippet19 extends StatefulWidget {final String slug='collapse-body';final Map<String,Object?> properties=const {"acceptChanges": true, "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Detalhes", "open": false, "disabled": false, "animated": true};const InteractionSnippet19({super.key});@override State<InteractionSnippet19> createState()=>_InteractionSnippetState19();}
class _InteractionSnippetState19 extends State<InteractionSnippet19>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts19[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies19[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet19 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCollapse(open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeCollapseHeader(child:Text(text('label'))),
ForgeCollapseBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),
ForgeCollapseFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts20=<String,Map<String,Map<String,Object?>>>{"collapse-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Detalhes","nonblank":true},"open":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true}}};
const snippetFamilies20=<String,String>{"collapse-footer":"collapse"};
class InteractionSnippet20 extends StatefulWidget {final String slug='collapse-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Detalhes", "open": false, "disabled": false, "animated": true};const InteractionSnippet20({super.key});@override State<InteractionSnippet20> createState()=>_InteractionSnippetState20();}
class _InteractionSnippetState20 extends State<InteractionSnippet20>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts20[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies20[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet20 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeCollapse(open:opened,onOpenChange:requestOpen,disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeCollapseHeader(child:Text(text('label'))),
ForgeCollapseBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),
ForgeCollapseFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts21=<String,Map<String,Map<String,Object?>>>{"accordion":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"multiple":{"kind":"boolean","defaultValue":false},"collapsible":{"kind":"boolean","defaultValue":true},"level":{"kind":"number","defaultValue":2,"min":1,"max":6},"expanded":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies21=<String,String>{"accordion":"accordion"};
class InteractionSnippet21 extends StatefulWidget {final String slug='accordion';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "disabled": false, "animated": true, "disableSecond": false, "multiple": false, "collapsible": true, "level": 2, "expanded": "none"};const InteractionSnippet21({super.key});@override State<InteractionSnippet21> createState()=>_InteractionSnippetState21();}
class _InteractionSnippetState21 extends State<InteractionSnippet21>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts21[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies21[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet21 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAccordion(value:flag('multiple')?values:values.take(1).toList(),onValueChange:requestValues,multiple:flag('multiple'),collapsible:flag('collapsible'),level:((prop('level') as num?)??2).toInt(),disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeAccordionItem(value:'first',children:[ForgeAccordionHeader(child:Text(text('firstLabel'))),ForgeAccordionBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),ForgeAccordionFooter(child:Text(text('footerText')))]),
ForgeAccordionItem(value:'second',disabled:flag('disableSecond'),children:[ForgeAccordionHeader(child:Text(text('secondLabel'))),const ForgeAccordionBody(child:Text('Conteúdo secundário')),ForgeAccordionFooter(child:Text(text('footerText')))])]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts22=<String,Map<String,Map<String,Object?>>>{"accordion-item":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"multiple":{"kind":"boolean","defaultValue":false},"collapsible":{"kind":"boolean","defaultValue":true},"level":{"kind":"number","defaultValue":2,"min":1,"max":6},"expanded":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies22=<String,String>{"accordion-item":"accordion"};
class InteractionSnippet22 extends StatefulWidget {final String slug='accordion-item';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "disabled": false, "animated": true, "disableSecond": false, "multiple": false, "collapsible": true, "level": 2, "expanded": "none"};const InteractionSnippet22({super.key});@override State<InteractionSnippet22> createState()=>_InteractionSnippetState22();}
class _InteractionSnippetState22 extends State<InteractionSnippet22>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts22[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies22[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet22 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAccordion(value:flag('multiple')?values:values.take(1).toList(),onValueChange:requestValues,multiple:flag('multiple'),collapsible:flag('collapsible'),level:((prop('level') as num?)??2).toInt(),disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeAccordionItem(value:'first',children:[ForgeAccordionHeader(child:Text(text('firstLabel'))),ForgeAccordionBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),ForgeAccordionFooter(child:Text(text('footerText')))]),
ForgeAccordionItem(value:'second',disabled:flag('disableSecond'),children:[ForgeAccordionHeader(child:Text(text('secondLabel'))),const ForgeAccordionBody(child:Text('Conteúdo secundário')),ForgeAccordionFooter(child:Text(text('footerText')))])]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts23=<String,Map<String,Map<String,Object?>>>{"accordion-header":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"multiple":{"kind":"boolean","defaultValue":false},"collapsible":{"kind":"boolean","defaultValue":true},"level":{"kind":"number","defaultValue":2,"min":1,"max":6},"expanded":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies23=<String,String>{"accordion-header":"accordion"};
class InteractionSnippet23 extends StatefulWidget {final String slug='accordion-header';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "disabled": false, "animated": true, "disableSecond": false, "multiple": false, "collapsible": true, "level": 2, "expanded": "none"};const InteractionSnippet23({super.key});@override State<InteractionSnippet23> createState()=>_InteractionSnippetState23();}
class _InteractionSnippetState23 extends State<InteractionSnippet23>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts23[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies23[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet23 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAccordion(value:flag('multiple')?values:values.take(1).toList(),onValueChange:requestValues,multiple:flag('multiple'),collapsible:flag('collapsible'),level:((prop('level') as num?)??2).toInt(),disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeAccordionItem(value:'first',children:[ForgeAccordionHeader(child:Text(text('firstLabel'))),ForgeAccordionBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),ForgeAccordionFooter(child:Text(text('footerText')))]),
ForgeAccordionItem(value:'second',disabled:flag('disableSecond'),children:[ForgeAccordionHeader(child:Text(text('secondLabel'))),const ForgeAccordionBody(child:Text('Conteúdo secundário')),ForgeAccordionFooter(child:Text(text('footerText')))])]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts24=<String,Map<String,Map<String,Object?>>>{"accordion-body":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"multiple":{"kind":"boolean","defaultValue":false},"collapsible":{"kind":"boolean","defaultValue":true},"level":{"kind":"number","defaultValue":2,"min":1,"max":6},"expanded":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies24=<String,String>{"accordion-body":"accordion"};
class InteractionSnippet24 extends StatefulWidget {final String slug='accordion-body';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "disabled": false, "animated": true, "disableSecond": false, "multiple": false, "collapsible": true, "level": 2, "expanded": "none"};const InteractionSnippet24({super.key});@override State<InteractionSnippet24> createState()=>_InteractionSnippetState24();}
class _InteractionSnippetState24 extends State<InteractionSnippet24>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts24[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies24[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet24 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAccordion(value:flag('multiple')?values:values.take(1).toList(),onValueChange:requestValues,multiple:flag('multiple'),collapsible:flag('collapsible'),level:((prop('level') as num?)??2).toInt(),disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeAccordionItem(value:'first',children:[ForgeAccordionHeader(child:Text(text('firstLabel'))),ForgeAccordionBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),ForgeAccordionFooter(child:Text(text('footerText')))]),
ForgeAccordionItem(value:'second',disabled:flag('disableSecond'),children:[ForgeAccordionHeader(child:Text(text('secondLabel'))),const ForgeAccordionBody(child:Text('Conteúdo secundário')),ForgeAccordionFooter(child:Text(text('footerText')))])]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts25=<String,Map<String,Map<String,Object?>>>{"accordion-footer":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"disabled":{"kind":"boolean","defaultValue":false},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"multiple":{"kind":"boolean","defaultValue":false},"collapsible":{"kind":"boolean","defaultValue":true},"level":{"kind":"number","defaultValue":2,"min":1,"max":6},"expanded":{"kind":"select","options":["none","first","second","both"],"defaultValue":"none"}}};
const snippetFamilies25=<String,String>{"accordion-footer":"accordion"};
class InteractionSnippet25 extends StatefulWidget {final String slug='accordion-footer';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "disabled": false, "animated": true, "disableSecond": false, "multiple": false, "collapsible": true, "level": 2, "expanded": "none"};const InteractionSnippet25({super.key});@override State<InteractionSnippet25> createState()=>_InteractionSnippetState25();}
class _InteractionSnippetState25 extends State<InteractionSnippet25>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts25[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies25[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet25 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeAccordion(value:flag('multiple')?values:values.take(1).toList(),onValueChange:requestValues,multiple:flag('multiple'),collapsible:flag('collapsible'),level:((prop('level') as num?)??2).toInt(),disabled:flag('disabled'),animated:flag('animated'),children:[
ForgeAccordionItem(value:'first',children:[ForgeAccordionHeader(child:Text(text('firstLabel'))),ForgeAccordionBody(child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),ForgeAccordionFooter(child:Text(text('footerText')))]),
ForgeAccordionItem(value:'second',disabled:flag('disableSecond'),children:[ForgeAccordionHeader(child:Text(text('secondLabel'))),const ForgeAccordionBody(child:Text('Conteúdo secundário')),ForgeAccordionFooter(child:Text(text('footerText')))])]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

const snippetContracts26=<String,Map<String,Map<String,Object?>>>{"tabs":{"acceptChanges":{"kind":"boolean","defaultValue":true},"firstLabel":{"kind":"text","defaultValue":"Primeiro","nonblank":true},"secondLabel":{"kind":"text","defaultValue":"Segundo","nonblank":true},"bodyText":{"kind":"text","defaultValue":"Conteúdo preservado","nonblank":true},"footerText":{"kind":"text","defaultValue":"Informações complementares","nonblank":true},"label":{"kind":"text","defaultValue":"Seções","nonblank":true},"direction":{"kind":"select","options":["ltr","rtl"],"defaultValue":"ltr"},"animated":{"kind":"boolean","defaultValue":true},"disableSecond":{"kind":"boolean","defaultValue":false},"activeTab":{"kind":"select","options":["first","second"],"defaultValue":"first"}}};
const snippetFamilies26=<String,String>{"tabs":"tabs"};
class InteractionSnippet26 extends StatefulWidget {final String slug='tabs';final Map<String,Object?> properties=const {"acceptChanges": true, "firstLabel": "Primeiro", "secondLabel": "Segundo", "bodyText": "Conteúdo preservado", "footerText": "Informações complementares", "label": "Aspas ' barra \\ dólar \$ e\nnova linha", "direction": "ltr", "animated": true, "disableSecond": false, "activeTab": "first"};const InteractionSnippet26({super.key});@override State<InteractionSnippet26> createState()=>_InteractionSnippetState26();}
class _InteractionSnippetState26 extends State<InteractionSnippet26>{
String current='first',feedback='';List<String> values=[];bool opened=false;int events=0;
Map<String,Map<String,Object?>> get schema=>snippetContracts26[widget.slug]!;
Object? prop(String key)=>widget.properties[key]??schema[key]?['defaultValue'];
String text(String key)=>(prop(key) as String?)??'';
bool flag(String key)=>prop(key)==true;
T enumValue<T extends Enum>(String key,List<T> items,T fallback)=>items.where((v)=>v.name==prop(key)).firstOrNull??fallback;
String get family=>snippetFamilies26[widget.slug]!;
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
@override void didUpdateWidget(covariant InteractionSnippet26 old){
 super.didUpdateWidget(old);
 if(old.slug!=widget.slug){events=0;feedback='';sync();return;}
 if(['activeTab','selection','expanded','open'].any((key)=>old.properties[key]!=widget.properties[key]))sync();
 if(family=='accordion'&&!flag('multiple'))values=values.take(1).toList();
}
@override Widget build(BuildContext context)=>Column(crossAxisAlignment:CrossAxisAlignment.start,children:[ForgeTabs(label:text('label'),value:current,onValueChange:requestScalar,direction:enumValue('direction',ForgeNavigationDirection.values,ForgeNavigationDirection.ltr),animated:flag('animated'),children:[
ForgeTabsHeader(tabs:[ForgeTab(value:'first',child:Text(text('firstLabel'))),ForgeTab(value:'second',disabled:flag('disableSecond'),child:Text(text('secondLabel')))]),
ForgeTabsBody(panels:[ForgeTabPanel(value:'first',child:Column(children:[Text(text('bodyText')),const ForgeInput(semanticLabel:'Campo preservado')])),const ForgeTabPanel(value:'second',child:Text('Painel secundário'))]),
ForgeTabsFooter(child:Text(text('footerText')))]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);
}

Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));
void main(){
testWidgets('copyable interaction choice-group 0',(t)async{await t.pumpWidget(host(const InteractionSnippet0()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction choice-group-header 1',(t)async{await t.pumpWidget(host(const InteractionSnippet1()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction choice-group-body 2',(t)async{await t.pumpWidget(host(const InteractionSnippet2()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction choice-group-footer 3',(t)async{await t.pumpWidget(host(const InteractionSnippet3()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction checkbox-group 4',(t)async{await t.pumpWidget(host(const InteractionSnippet4()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction checkbox-group-item 5',(t)async{await t.pumpWidget(host(const InteractionSnippet5()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction radio-group 6',(t)async{await t.pumpWidget(host(const InteractionSnippet6()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction radio-group-item 7',(t)async{await t.pumpWidget(host(const InteractionSnippet7()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tabs 8',(t)async{await t.pumpWidget(host(const InteractionSnippet8()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tabs-header 9',(t)async{await t.pumpWidget(host(const InteractionSnippet9()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tabs-body 10',(t)async{await t.pumpWidget(host(const InteractionSnippet10()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tabs-footer 11',(t)async{await t.pumpWidget(host(const InteractionSnippet11()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tab 12',(t)async{await t.pumpWidget(host(const InteractionSnippet12()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tab-panel 13',(t)async{await t.pumpWidget(host(const InteractionSnippet13()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toolbar 14',(t)async{await t.pumpWidget(host(const InteractionSnippet14()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction toolbar-item 15',(t)async{await t.pumpWidget(host(const InteractionSnippet15()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction disclosure 16',(t)async{await t.pumpWidget(host(const InteractionSnippet16()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction collapse 17',(t)async{await t.pumpWidget(host(const InteractionSnippet17()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction collapse-header 18',(t)async{await t.pumpWidget(host(const InteractionSnippet18()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction collapse-body 19',(t)async{await t.pumpWidget(host(const InteractionSnippet19()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction collapse-footer 20',(t)async{await t.pumpWidget(host(const InteractionSnippet20()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction accordion 21',(t)async{await t.pumpWidget(host(const InteractionSnippet21()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction accordion-item 22',(t)async{await t.pumpWidget(host(const InteractionSnippet22()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction accordion-header 23',(t)async{await t.pumpWidget(host(const InteractionSnippet23()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction accordion-body 24',(t)async{await t.pumpWidget(host(const InteractionSnippet24()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction accordion-footer 25',(t)async{await t.pumpWidget(host(const InteractionSnippet25()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction tabs 26',(t)async{await t.pumpWidget(host(const InteractionSnippet26()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
}
