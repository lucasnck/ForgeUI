// Generated from the real Showcase copyable input examples.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
T? snippetEnum0<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues0=<String,String>{"input":""};
class InputSnippet0 extends StatefulWidget{final String slug='input';final Map<String,Object?> properties=const {"value": "", "showValidationMessage": true, "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "obscureText": false, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "inputType": "text", "autocorrect": true, "spellCheck": true};const InputSnippet0({super.key});@override State<InputSnippet0> createState()=>_InputSnippetState0();}
class _InputSnippetState0 extends State<InputSnippet0>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues0[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum0(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum0(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet0 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum0(p,'value',ForgeLocale.values)??locale;theme=snippetEnum0(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeInput(value: text, showValidationMessage: (p['showValidationMessage'] as bool?)??true, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, obscureText: (p['obscureText'] as bool?)??false, invalid: (p['invalid'] as bool?)??false, size: snippetEnum0(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum0(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum0(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum0(p,'shape',ForgeShape.values), inputType: snippetEnum0(p,'inputType',ForgeInputKind.values)??ForgeInputKind.text, autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum1<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues1=<String,String>{"textarea":""};
class InputSnippet1 extends StatefulWidget{final String slug='textarea';final Map<String,Object?> properties=const {"value": "", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet1({super.key});@override State<InputSnippet1> createState()=>_InputSnippetState1();}
class _InputSnippetState1 extends State<InputSnippet1>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues1[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum1(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum1(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet1 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum1(p,'value',ForgeLocale.values)??locale;theme=snippetEnum1(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeTextarea(value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum1(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum1(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum1(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum1(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum2<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues2=<String,String>{"checkbox":""};
class InputSnippet2 extends StatefulWidget{final String slug='checkbox';final Map<String,Object?> properties=const {"checked": false, "disabled": false, "required": false, "fullWidth": false, "animated": true, "invalid": false, "semanticLabel": "Campo de exemplo", "value": "on", "autofocus": false, "size": "md", "tone": "brand", "shape": "inherit"};const InputSnippet2({super.key});@override State<InputSnippet2> createState()=>_InputSnippetState2();}
class _InputSnippetState2 extends State<InputSnippet2>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues2[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum2(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum2(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet2 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum2(p,'value',ForgeLocale.values)??locale;theme=snippetEnum2(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeCheckbox(checked: checked, disabled: (p['disabled'] as bool?)??false, required: (p['required'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??false, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", value: (p['value'] as String?)??"on", autofocus: (p['autofocus'] as bool?)??false, size: snippetEnum2(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum2(p,'tone',ForgeTone.values)??ForgeTone.brand, shape: snippetEnum2(p,'shape',ForgeShape.values), onChanged: (v)=>setState((){checked=v;events++;feedback=v.toString();})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum3<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues3=<String,String>{"switch":""};
class InputSnippet3 extends StatefulWidget{final String slug='switch';final Map<String,Object?> properties=const {"checked": false, "disabled": false, "required": false, "fullWidth": false, "invalid": false, "semanticLabel": "Campo de exemplo", "value": "on", "autofocus": false, "size": "md", "tone": "brand"};const InputSnippet3({super.key});@override State<InputSnippet3> createState()=>_InputSnippetState3();}
class _InputSnippetState3 extends State<InputSnippet3>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues3[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum3(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum3(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet3 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum3(p,'value',ForgeLocale.values)??locale;theme=snippetEnum3(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeSwitch(checked: checked, disabled: (p['disabled'] as bool?)??false, required: (p['required'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??false, invalid: (p['invalid'] as bool?)??false, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", value: (p['value'] as String?)??"on", autofocus: (p['autofocus'] as bool?)??false, size: snippetEnum3(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum3(p,'tone',ForgeTone.values)??ForgeTone.brand, onChanged: (v)=>setState((){checked=v;events++;feedback=v.toString();})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum4<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues4=<String,String>{"radio":""};
class InputSnippet4 extends StatefulWidget{final String slug='radio';final Map<String,Object?> properties=const {"checked": false, "disabled": false, "required": false, "fullWidth": false, "animated": true, "invalid": false, "semanticLabel": "Campo de exemplo", "value": "on", "autofocus": false, "size": "md", "tone": "brand"};const InputSnippet4({super.key});@override State<InputSnippet4> createState()=>_InputSnippetState4();}
class _InputSnippetState4 extends State<InputSnippet4>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues4[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum4(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum4(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet4 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum4(p,'value',ForgeLocale.values)??locale;theme=snippetEnum4(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeRadio(checked: checked, disabled: (p['disabled'] as bool?)??false, required: (p['required'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??false, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", value: (p['value'] as String?)??"on", autofocus: (p['autofocus'] as bool?)??false, size: snippetEnum4(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum4(p,'tone',ForgeTone.values)??ForgeTone.brand, onChanged: (v)=>setState((){checked=v;events++;feedback=v.toString();})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum5<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues5=<String,String>{"select":"one"};
class InputSnippet5 extends StatefulWidget{final String slug='select';final Map<String,Object?> properties=const {"value": "one", "multiple": false, "disabled": false, "required": false, "fullWidth": true, "autofocus": false, "invalid": false, "label": "Campo de exemplo", "semanticLabel": "Campo de exemplo", "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit"};const InputSnippet5({super.key});@override State<InputSnippet5> createState()=>_InputSnippetState5();}
class _InputSnippetState5 extends State<InputSnippet5>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues5[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum5(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum5(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet5 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum5(p,'value',ForgeLocale.values)??locale;theme=snippetEnum5(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeSelect(value: text, multiple: (p['multiple'] as bool?)??false, disabled: (p['disabled'] as bool?)??false, required: (p['required'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, autofocus: (p['autofocus'] as bool?)??false, invalid: (p['invalid'] as bool?)??false, label: (p['label'] as String?)??"Campo de exemplo", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", size: snippetEnum5(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum5(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum5(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum5(p,'shape',ForgeShape.values), options: const [ForgeOption(value:'one',label:'Primeiro'),ForgeOption(value:'two',label:'Segundo'),ForgeOption(value:'off',label:'Desabilitado',disabled:true)], values: values, onValuesChanged: (v)=>setState((){values=v;events++;feedback=v.join(', ');}), onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum6<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues6=<String,String>{"option":"one"};
class InputSnippet6 extends StatefulWidget{final String slug='option';final Map<String,Object?> properties=const {"value": "one", "label": "", "disabled": false};const InputSnippet6({super.key});@override State<InputSnippet6> createState()=>_InputSnippetState6();}
class _InputSnippetState6 extends State<InputSnippet6>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues6[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum6(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum6(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet6 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum6(p,'value',ForgeLocale.values)??locale;theme=snippetEnum6(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeSelect(label:'Opção em contexto',value:text.isEmpty?'one':text,onChanged:stringChange,options:[ForgeOption(value: (p['value'] as String?)??"one", label: (p['label'] as String?)??"", disabled: (p['disabled'] as bool?)??false),const ForgeOption(value:'two',label:'Outra opção')]),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum7<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues7=<String,String>{"input-base":""};
class InputSnippet7 extends StatefulWidget{final String slug='input-base';final Map<String,Object?> properties=const {"value": "", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true, "inputType": "text"};const InputSnippet7({super.key});@override State<InputSnippet7> createState()=>_InputSnippetState7();}
class _InputSnippetState7 extends State<InputSnippet7>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues7[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum7(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum7(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet7 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum7(p,'value',ForgeLocale.values)??locale;theme=snippetEnum7(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeInputBase(value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum7(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum7(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum7(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum7(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, inputType: snippetEnum7(p,'inputType',ForgeInputKind.values)??ForgeInputKind.text, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum8<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues8=<String,String>{"icon-button":""};
class InputSnippet8 extends StatefulWidget{final String slug='icon-button';final Map<String,Object?> properties=const {"icon": "alertTriangle", "label": "Campo de exemplo", "size": "md", "tone": "brand", "appearance": "inherit", "variant": "inherit", "shape": "inherit", "loading": false, "disabled": false, "autofocus": false, "loadingLabel": "Processando", "tooltip": ""};const InputSnippet8({super.key});@override State<InputSnippet8> createState()=>_InputSnippetState8();}
class _InputSnippetState8 extends State<InputSnippet8>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues8[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum8(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum8(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet8 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum8(p,'value',ForgeLocale.values)??locale;theme=snippetEnum8(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeIconButton(icon: snippetEnum8(p,'icon',ForgeIconName.values)??ForgeIconName.alertTriangle, label: (p['label'] as String?)??"Campo de exemplo", size: snippetEnum8(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum8(p,'tone',ForgeTone.values)??ForgeTone.brand, appearance: snippetEnum8(p,'appearance',ForgeAppearance.values), variant: snippetEnum8(p,'variant',ForgeVariant.values), shape: snippetEnum8(p,'shape',ForgeShape.values), loading: (p['loading'] as bool?)??false, disabled: (p['disabled'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, loadingLabel: (p['loadingLabel'] as String?)??"Processando", tooltip: (p['tooltip'] as String?)??"", onPressed: ()=>setState((){events++;feedback='Ação ativada';})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum9<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues9=<String,String>{"progress-bar":""};
class InputSnippet9 extends StatefulWidget{final String slug='progress-bar';final Map<String,Object?> properties=const {"label": "Campo de exemplo", "size": "md", "tone": "brand", "fullWidth": true, "animated": true, "value": 50};const InputSnippet9({super.key});@override State<InputSnippet9> createState()=>_InputSnippetState9();}
class _InputSnippetState9 extends State<InputSnippet9>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues9[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum9(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum9(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet9 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum9(p,'value',ForgeLocale.values)??locale;theme=snippetEnum9(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeProgressBar(label: (p['label'] as String?)??"Campo de exemplo", size: snippetEnum9(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum9(p,'tone',ForgeTone.values)??ForgeTone.brand, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, value: number),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum10<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues10=<String,String>{"slider":""};
class InputSnippet10 extends StatefulWidget{final String slug='slider';final Map<String,Object?> properties=const {"disabled": false, "readOnly": false, "required": false, "fullWidth": true, "semanticLabel": "Campo de exemplo", "autofocus": false, "size": "md", "tone": "neutral", "invalid": false, "value": 50};const InputSnippet10({super.key});@override State<InputSnippet10> createState()=>_InputSnippetState10();}
class _InputSnippetState10 extends State<InputSnippet10>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues10[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum10(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum10(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet10 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum10(p,'value',ForgeLocale.values)??locale;theme=snippetEnum10(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeSlider(disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", autofocus: (p['autofocus'] as bool?)??false, size: snippetEnum10(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum10(p,'tone',ForgeTone.values)??ForgeTone.neutral, invalid: (p['invalid'] as bool?)??false, value: number, onChanged: (v)=>setState((){number=v;events++;feedback=v.toString();})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum11<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues11=<String,String>{"legend":""};
class InputSnippet11 extends StatefulWidget{final String slug='legend';final Map<String,Object?> properties=const {"text": "Exemplo Forge UI", "semanticLabel": "Campo de exemplo"};const InputSnippet11({super.key});@override State<InputSnippet11> createState()=>_InputSnippetState11();}
class _InputSnippetState11 extends State<InputSnippet11>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues11[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum11(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum11(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet11 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum11(p,'value',ForgeLocale.values)??locale;theme=snippetEnum11(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeLegend(text: (p['text'] as String?)??"Exemplo Forge UI", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo"),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum12<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues12=<String,String>{"input-group":""};
class InputSnippet12 extends StatefulWidget{final String slug='input-group';final Map<String,Object?> properties=const {"gap": "s2", "padding": "s0", "align": "stretch", "fullWidth": true};const InputSnippet12({super.key});@override State<InputSnippet12> createState()=>_InputSnippetState12();}
class _InputSnippetState12 extends State<InputSnippet12>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues12[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum12(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum12(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet12 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum12(p,'value',ForgeLocale.values)??locale;theme=snippetEnum12(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeInputGroup(gap: snippetEnum12(p,'gap',ForgeSpace.values)??ForgeSpace.s2, padding: snippetEnum12(p,'padding',ForgeSpace.values)??ForgeSpace.s0, align: snippetEnum12(p,'align',ForgeAlign.values)??ForgeAlign.stretch, fullWidth: (p['fullWidth'] as bool?)??true, child: ForgeInput(value:text,onChanged:stringChange,semanticLabel:'Campo agrupado'), leading: const ForgeInputAddon(text:'@')),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum13<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues13=<String,String>{"input-addon":""};
class InputSnippet13 extends StatefulWidget{final String slug='input-addon';final Map<String,Object?> properties=const {"text": "Exemplo Forge UI"};const InputSnippet13({super.key});@override State<InputSnippet13> createState()=>_InputSnippetState13();}
class _InputSnippetState13 extends State<InputSnippet13>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues13[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum13(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum13(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet13 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum13(p,'value',ForgeLocale.values)??locale;theme=snippetEnum13(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeInputAddon(text: (p['text'] as String?)??"Exemplo Forge UI"),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum14<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues14=<String,String>{"tag":""};
class InputSnippet14 extends StatefulWidget{final String slug='tag';final Map<String,Object?> properties=const {"text": "Exemplo Forge UI", "removeLabel": "Remover", "disabled": false, "fullWidth": false, "size": "md", "tone": "neutral", "appearance": "soft", "shape": "inherit"};const InputSnippet14({super.key});@override State<InputSnippet14> createState()=>_InputSnippetState14();}
class _InputSnippetState14 extends State<InputSnippet14>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues14[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum14(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum14(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet14 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum14(p,'value',ForgeLocale.values)??locale;theme=snippetEnum14(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeTag(text: (p['text'] as String?)??"Exemplo Forge UI", removeLabel: (p['removeLabel'] as String?)??"Remover", disabled: (p['disabled'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??false, size: snippetEnum14(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum14(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum14(p,'appearance',ForgeAppearance.values)??ForgeAppearance.soft, shape: snippetEnum14(p,'shape',ForgeShape.values), onRemove: ()=>setState((){removed=true;events++;feedback='Removido';})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum15<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues15=<String,String>{"masked-input":""};
class InputSnippet15 extends StatefulWidget{final String slug='masked-input';final Map<String,Object?> properties=const {"value": "", "mask": "000-000", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet15({super.key});@override State<InputSnippet15> createState()=>_InputSnippetState15();}
class _InputSnippetState15 extends State<InputSnippet15>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues15[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum15(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum15(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet15 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum15(p,'value',ForgeLocale.values)??locale;theme=snippetEnum15(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeMaskedInput(value: text, mask: (p['mask'] as String?)??"000-000", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum15(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum15(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum15(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum15(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onValueChange: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum16<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues16=<String,String>{"date-input":""};
class InputSnippet16 extends StatefulWidget{final String slug='date-input';final Map<String,Object?> properties=const {"value": "", "mask": "00/00/0000", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet16({super.key});@override State<InputSnippet16> createState()=>_InputSnippetState16();}
class _InputSnippetState16 extends State<InputSnippet16>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues16[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum16(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum16(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet16 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum16(p,'value',ForgeLocale.values)??locale;theme=snippetEnum16(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeDateInput(value: text, mask: (p['mask'] as String?)??"00/00/0000", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum16(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum16(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum16(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum16(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onValueChange: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum17<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues17=<String,String>{"postal-code-input":""};
class InputSnippet17 extends StatefulWidget{final String slug='postal-code-input';final Map<String,Object?> properties=const {"value": "", "mask": "00000-000", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet17({super.key});@override State<InputSnippet17> createState()=>_InputSnippetState17();}
class _InputSnippetState17 extends State<InputSnippet17>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues17[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum17(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum17(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet17 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum17(p,'value',ForgeLocale.values)??locale;theme=snippetEnum17(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgePostalCodeInput(value: text, mask: (p['mask'] as String?)??"00000-000", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum17(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum17(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum17(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum17(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onValueChange: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum18<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues18=<String,String>{"tax-id-input":""};
class InputSnippet18 extends StatefulWidget{final String slug='tax-id-input';final Map<String,Object?> properties=const {"value": "", "mask": "000.000.000-00", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet18({super.key});@override State<InputSnippet18> createState()=>_InputSnippetState18();}
class _InputSnippetState18 extends State<InputSnippet18>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues18[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum18(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum18(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet18 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum18(p,'value',ForgeLocale.values)??locale;theme=snippetEnum18(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeTaxIdInput(value: text, mask: (p['mask'] as String?)??"000.000.000-00", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum18(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum18(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum18(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum18(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onValueChange: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum19<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues19=<String,String>{"token-input":""};
class InputSnippet19 extends StatefulWidget{final String slug='token-input';final Map<String,Object?> properties=const {"value": "", "mask": "000-000", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet19({super.key});@override State<InputSnippet19> createState()=>_InputSnippetState19();}
class _InputSnippetState19 extends State<InputSnippet19>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues19[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum19(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum19(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet19 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum19(p,'value',ForgeLocale.values)??locale;theme=snippetEnum19(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeTokenInput(value: text, mask: (p['mask'] as String?)??"000-000", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum19(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum19(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum19(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum19(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onValueChange: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum20<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues20=<String,String>{"email-input":""};
class InputSnippet20 extends StatefulWidget{final String slug='email-input';final Map<String,Object?> properties=const {"value": "", "listboxLabel": "Sugestões", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit"};const InputSnippet20({super.key});@override State<InputSnippet20> createState()=>_InputSnippetState20();}
class _InputSnippetState20 extends State<InputSnippet20>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues20[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum20(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum20(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet20 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum20(p,'value',ForgeLocale.values)??locale;theme=snippetEnum20(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeEmailInput(value: text, listboxLabel: (p['listboxLabel'] as String?)??"Sugestões", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum20(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum20(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum20(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum20(p,'shape',ForgeShape.values), providers: const ['gmail.com','outlook.com','forge.example'], onValueChange: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum21<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues21=<String,String>{"search-input":""};
class InputSnippet21 extends StatefulWidget{final String slug='search-input';final Map<String,Object?> properties=const {"clearLabel": "Limpar", "value": "", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet21({super.key});@override State<InputSnippet21> createState()=>_InputSnippetState21();}
class _InputSnippetState21 extends State<InputSnippet21>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues21[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum21(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum21(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet21 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum21(p,'value',ForgeLocale.values)??locale;theme=snippetEnum21(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeSearchInput(clearLabel: (p['clearLabel'] as String?)??"Limpar", value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum21(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum21(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum21(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum21(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum22<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues22=<String,String>{"percentage-input":"25"};
class InputSnippet22 extends StatefulWidget{final String slug='percentage-input';final Map<String,Object?> properties=const {"value": "25", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet22({super.key});@override State<InputSnippet22> createState()=>_InputSnippetState22();}
class _InputSnippetState22 extends State<InputSnippet22>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues22[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum22(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum22(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet22 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum22(p,'value',ForgeLocale.values)??locale;theme=snippetEnum22(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgePercentageInput(value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum22(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum22(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum22(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum22(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum23<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues23=<String,String>{"currency-input":"1234.56"};
class InputSnippet23 extends StatefulWidget{final String slug='currency-input';final Map<String,Object?> properties=const {"value": "1234.56", "currency": "BRL", "locale": "ptBR", "invalidMessage": "Valor inválido", "allowNegative": true, "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet23({super.key});@override State<InputSnippet23> createState()=>_InputSnippetState23();}
class _InputSnippetState23 extends State<InputSnippet23>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues23[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum23(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum23(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet23 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum23(p,'value',ForgeLocale.values)??locale;theme=snippetEnum23(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeCurrencyInput(value: text, currency: (p['currency'] as String?)??"BRL", locale: snippetEnum23(p,'locale',ForgeLocale.values)??ForgeLocale.ptBR, invalidMessage: (p['invalidMessage'] as String?)??"Valor inválido", allowNegative: (p['allowNegative'] as bool?)??true, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum23(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum23(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum23(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum23(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onValueChange: (v)=>stringChange(v??'')),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum24<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues24=<String,String>{"currency-value":"1234.56"};
class InputSnippet24 extends StatefulWidget{final String slug='currency-value';final Map<String,Object?> properties=const {"value": "1234.56", "currency": "BRL", "locale": "ptBR", "currencyDisplay": "code", "useGrouping": true, "size": "inherit", "tone": "inherit", "weight": "inherit", "semanticLabel": "Campo de exemplo", "semanticRole": "inline"};const InputSnippet24({super.key});@override State<InputSnippet24> createState()=>_InputSnippetState24();}
class _InputSnippetState24 extends State<InputSnippet24>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues24[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum24(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum24(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet24 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum24(p,'value',ForgeLocale.values)??locale;theme=snippetEnum24(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeCurrencyValue(value: text, currency: (p['currency'] as String?)??"BRL", locale: snippetEnum24(p,'locale',ForgeLocale.values)??ForgeLocale.ptBR, currencyDisplay: snippetEnum24(p,'currencyDisplay',ForgeCurrencyDisplay.values)??ForgeCurrencyDisplay.code, useGrouping: (p['useGrouping'] as bool?)??true, size: snippetEnum24(p,'size',ForgeTextSize.values), tone: snippetEnum24(p,'tone',ForgeTextTone.values), weight: snippetEnum24(p,'weight',ForgeFontWeight.values), semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", semanticRole: snippetEnum24(p,'semanticRole',ForgeTextSemanticRole.values)??ForgeTextSemanticRole.inline),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum25<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues25=<String,String>{"international-telephone-input":""};
class InputSnippet25 extends StatefulWidget{final String slug='international-telephone-input';final Map<String,Object?> properties=const {"locale": "ptBR", "countryLabel": "País", "internationalLabel": "Telefone internacional", "invalidMessage": "Valor inválido", "showCountrySelector": true, "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet25({super.key});@override State<InputSnippet25> createState()=>_InputSnippetState25();}
class _InputSnippetState25 extends State<InputSnippet25>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues25[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum25(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum25(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet25 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum25(p,'value',ForgeLocale.values)??locale;theme=snippetEnum25(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeInternationalTelephoneInput(locale: snippetEnum25(p,'locale',ForgeLocale.values)??ForgeLocale.ptBR, countryLabel: (p['countryLabel'] as String?)??"País", internationalLabel: (p['internationalLabel'] as String?)??"Telefone internacional", invalidMessage: (p['invalidMessage'] as String?)??"Valor inválido", showCountrySelector: (p['showCountrySelector'] as bool?)??true, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum25(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum25(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum25(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum25(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, value: phone, onValueChange: (v)=>setState((){phone=v;events++;feedback=v.number??'';})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum26<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues26=<String,String>{"locale-selector":""};
class InputSnippet26 extends StatefulWidget{final String slug='locale-selector';final Map<String,Object?> properties=const {"value": "ptBR", "label": "Campo de exemplo", "disabled": false, "size": "md"};const InputSnippet26({super.key});@override State<InputSnippet26> createState()=>_InputSnippetState26();}
class _InputSnippetState26 extends State<InputSnippet26>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues26[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum26(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum26(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet26 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum26(p,'value',ForgeLocale.values)??locale;theme=snippetEnum26(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeLocaleSelector(value: locale, label: (p['label'] as String?)??"Campo de exemplo", disabled: (p['disabled'] as bool?)??false, size: snippetEnum26(p,'size',ForgeSize.values)??ForgeSize.md, options: [for(final v in ForgeLocale.values)ForgeSelectorOption(value:v,label:v.name)], onValueChange: (v)=>setState((){locale=v;events++;feedback=v.name;})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum27<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues27=<String,String>{"theme-selector":""};
class InputSnippet27 extends StatefulWidget{final String slug='theme-selector';final Map<String,Object?> properties=const {"value": "light", "label": "Campo de exemplo", "disabled": false, "size": "md"};const InputSnippet27({super.key});@override State<InputSnippet27> createState()=>_InputSnippetState27();}
class _InputSnippetState27 extends State<InputSnippet27>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues27[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum27(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum27(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet27 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum27(p,'value',ForgeLocale.values)??locale;theme=snippetEnum27(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeThemeSelector(value: theme, label: (p['label'] as String?)??"Campo de exemplo", disabled: (p['disabled'] as bool?)??false, size: snippetEnum27(p,'size',ForgeSize.values)??ForgeSize.md, options: [for(final v in ForgeThemeId.values)ForgeSelectorOption(value:v,label:v.name)], onValueChange: (v)=>setState((){theme=v;events++;feedback=v.name;})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum28<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues28=<String,String>{"color-input":"#336699"};
class InputSnippet28 extends StatefulWidget{final String slug='color-input';final Map<String,Object?> properties=const {"pickerLabel": "Selecionar", "redLabel": "Vermelho", "greenLabel": "Verde", "blueLabel": "Azul", "value": "#336699", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet28({super.key});@override State<InputSnippet28> createState()=>_InputSnippetState28();}
class _InputSnippetState28 extends State<InputSnippet28>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues28[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum28(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum28(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet28 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum28(p,'value',ForgeLocale.values)??locale;theme=snippetEnum28(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeColorInput(pickerLabel: (p['pickerLabel'] as String?)??"Selecionar", redLabel: (p['redLabel'] as String?)??"Vermelho", greenLabel: (p['greenLabel'] as String?)??"Verde", blueLabel: (p['blueLabel'] as String?)??"Azul", value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum28(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum28(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum28(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum28(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum29<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues29=<String,String>{"password-input":""};
class InputSnippet29 extends StatefulWidget{final String slug='password-input';final Map<String,Object?> properties=const {"revealLabel": "Mostrar senha", "concealLabel": "Ocultar senha", "revealable": true, "value": "", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet29({super.key});@override State<InputSnippet29> createState()=>_InputSnippetState29();}
class _InputSnippetState29 extends State<InputSnippet29>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues29[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum29(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum29(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet29 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum29(p,'value',ForgeLocale.values)??locale;theme=snippetEnum29(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgePasswordInput(revealLabel: (p['revealLabel'] as String?)??"Mostrar senha", concealLabel: (p['concealLabel'] as String?)??"Ocultar senha", revealable: (p['revealable'] as bool?)??true, value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum29(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum29(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum29(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum29(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum30<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues30=<String,String>{"number-input":"42"};
class InputSnippet30 extends StatefulWidget{final String slug='number-input';final Map<String,Object?> properties=const {"value": "42", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet30({super.key});@override State<InputSnippet30> createState()=>_InputSnippetState30();}
class _InputSnippetState30 extends State<InputSnippet30>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues30[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum30(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum30(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet30 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum30(p,'value',ForgeLocale.values)??locale;theme=snippetEnum30(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeNumberInput(value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum30(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum30(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum30(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum30(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum31<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues31=<String,String>{"telephone-input":""};
class InputSnippet31 extends StatefulWidget{final String slug='telephone-input';final Map<String,Object?> properties=const {"value": "", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet31({super.key});@override State<InputSnippet31> createState()=>_InputSnippetState31();}
class _InputSnippetState31 extends State<InputSnippet31>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues31[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum31(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum31(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet31 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum31(p,'value',ForgeLocale.values)??locale;theme=snippetEnum31(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeTelephoneInput(value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum31(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum31(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum31(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum31(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum32<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues32=<String,String>{"url-input":""};
class InputSnippet32 extends StatefulWidget{final String slug='url-input';final Map<String,Object?> properties=const {"value": "", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet32({super.key});@override State<InputSnippet32> createState()=>_InputSnippetState32();}
class _InputSnippetState32 extends State<InputSnippet32>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues32[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum32(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum32(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet32 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum32(p,'value',ForgeLocale.values)??locale;theme=snippetEnum32(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeUrlInput(value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum32(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum32(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum32(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum32(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum33<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues33=<String,String>{"date-time-input":"2026-11-16T12:30"};
class InputSnippet33 extends StatefulWidget{final String slug='date-time-input';final Map<String,Object?> properties=const {"pickerLabel": "Selecionar", "value": "2026-11-16T12:30", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet33({super.key});@override State<InputSnippet33> createState()=>_InputSnippetState33();}
class _InputSnippetState33 extends State<InputSnippet33>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues33[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum33(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum33(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet33 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum33(p,'value',ForgeLocale.values)??locale;theme=snippetEnum33(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeDateTimeInput(pickerLabel: (p['pickerLabel'] as String?)??"Selecionar", value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum33(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum33(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum33(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum33(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum34<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues34=<String,String>{"time-input":"12:30"};
class InputSnippet34 extends StatefulWidget{final String slug='time-input';final Map<String,Object?> properties=const {"pickerLabel": "Selecionar", "value": "12:30", "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "autocorrect": true, "spellCheck": true};const InputSnippet34({super.key});@override State<InputSnippet34> createState()=>_InputSnippetState34();}
class _InputSnippetState34 extends State<InputSnippet34>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues34[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum34(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum34(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet34 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum34(p,'value',ForgeLocale.values)??locale;theme=snippetEnum34(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeTimeInput(pickerLabel: (p['pickerLabel'] as String?)??"Selecionar", value: text, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, invalid: (p['invalid'] as bool?)??false, size: snippetEnum34(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum34(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum34(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum34(p,'shape',ForgeShape.values), autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum35<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues35=<String,String>{"file-input":""};
class InputSnippet35 extends StatefulWidget{final String slug='file-input';final Map<String,Object?> properties=const {"chooserLabel": "Selecionar arquivo de exemplo", "semanticLabel": "Campo de exemplo", "capture": "inherit", "multiple": false, "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "invalid": false};const InputSnippet35({super.key});@override State<InputSnippet35> createState()=>_InputSnippetState35();}
class _InputSnippetState35 extends State<InputSnippet35>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues35[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum35(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum35(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet35 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum35(p,'value',ForgeLocale.values)??locale;theme=snippetEnum35(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeFileInput(chooserLabel: (p['chooserLabel'] as String?)??"Selecionar arquivo de exemplo", semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", capture: snippetEnum35(p,'capture',ForgeCapturePreference.values), multiple: (p['multiple'] as bool?)??false, disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, size: snippetEnum35(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum35(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum35(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum35(p,'shape',ForgeShape.values), invalid: (p['invalid'] as bool?)??false, picker: (_)async=>ForgeFilePickerResult.accepted([ForgeFileReference(name:'example.txt',size:5,mimeType:'text/plain',openRead:()=>Stream.value([70,111,114,103,101]))]), onFilesChange: (files)=>setState((){events++;feedback=files.map((f)=>f.name).join(', ');})),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
T? snippetEnum36<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}
const inputInitialValues36=<String,String>{"input":""};
class InputSnippet36 extends StatefulWidget{final String slug='input';final Map<String,Object?> properties=const {"value": "Apóstrofo ' barra \\ dólar \$ e\nnova linha", "showValidationMessage": true, "semanticLabel": "Campo de exemplo", "placeholder": "", "label": "Campo de exemplo", "hint": "", "error": "", "disabled": false, "readOnly": false, "required": false, "autofocus": false, "fullWidth": true, "animated": true, "obscureText": false, "invalid": false, "size": "md", "tone": "neutral", "appearance": "bordered", "shape": "inherit", "inputType": "text", "autocorrect": true, "spellCheck": true};const InputSnippet36({super.key});@override State<InputSnippet36> createState()=>_InputSnippetState36();}
class _InputSnippetState36 extends State<InputSnippet36>{

String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues36[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=snippetEnum36(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=snippetEnum36(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant InputSnippet36 old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=snippetEnum36(p,'value',ForgeLocale.values)??locale;theme=snippetEnum36(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}

@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):ForgeInput(value: text, showValidationMessage: (p['showValidationMessage'] as bool?)??true, semanticLabel: (p['semanticLabel'] as String?)??"Campo de exemplo", placeholder: (p['placeholder'] as String?)??"", label: (p['label'] as String?)??"Campo de exemplo", hint: (p['hint'] as String?)??"", error: (p['error'] as String?)??"", disabled: (p['disabled'] as bool?)??false, readOnly: (p['readOnly'] as bool?)??false, required: (p['required'] as bool?)??false, autofocus: (p['autofocus'] as bool?)??false, fullWidth: (p['fullWidth'] as bool?)??true, animated: (p['animated'] as bool?)??true, obscureText: (p['obscureText'] as bool?)??false, invalid: (p['invalid'] as bool?)??false, size: snippetEnum36(p,'size',ForgeSize.values)??ForgeSize.md, tone: snippetEnum36(p,'tone',ForgeTone.values)??ForgeTone.neutral, appearance: snippetEnum36(p,'appearance',ForgeAppearance.values)??ForgeAppearance.bordered, shape: snippetEnum36(p,'shape',ForgeShape.values), inputType: snippetEnum36(p,'inputType',ForgeInputKind.values)??ForgeInputKind.text, autocorrect: (p['autocorrect'] as bool?)??true, spellCheck: (p['spellCheck'] as bool?)??true, onChanged: stringChange),Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}
Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:560,child:child))));
void main(){
testWidgets('copyable input input 0',(t)async{await t.pumpWidget(host(const InputSnippet0()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input textarea 1',(t)async{await t.pumpWidget(host(const InputSnippet1()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input checkbox 2',(t)async{await t.pumpWidget(host(const InputSnippet2()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input switch 3',(t)async{await t.pumpWidget(host(const InputSnippet3()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input radio 4',(t)async{await t.pumpWidget(host(const InputSnippet4()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input select 5',(t)async{await t.pumpWidget(host(const InputSnippet5()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input option 6',(t)async{await t.pumpWidget(host(const InputSnippet6()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input input-base 7',(t)async{await t.pumpWidget(host(const InputSnippet7()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input icon-button 8',(t)async{await t.pumpWidget(host(const InputSnippet8()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input progress-bar 9',(t)async{await t.pumpWidget(host(const InputSnippet9()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input slider 10',(t)async{await t.pumpWidget(host(const InputSnippet10()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input legend 11',(t)async{await t.pumpWidget(host(const InputSnippet11()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input input-group 12',(t)async{await t.pumpWidget(host(const InputSnippet12()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input input-addon 13',(t)async{await t.pumpWidget(host(const InputSnippet13()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input tag 14',(t)async{await t.pumpWidget(host(const InputSnippet14()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input masked-input 15',(t)async{await t.pumpWidget(host(const InputSnippet15()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input date-input 16',(t)async{await t.pumpWidget(host(const InputSnippet16()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input postal-code-input 17',(t)async{await t.pumpWidget(host(const InputSnippet17()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input tax-id-input 18',(t)async{await t.pumpWidget(host(const InputSnippet18()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input token-input 19',(t)async{await t.pumpWidget(host(const InputSnippet19()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input email-input 20',(t)async{await t.pumpWidget(host(const InputSnippet20()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input search-input 21',(t)async{await t.pumpWidget(host(const InputSnippet21()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input percentage-input 22',(t)async{await t.pumpWidget(host(const InputSnippet22()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input currency-input 23',(t)async{await t.pumpWidget(host(const InputSnippet23()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input currency-value 24',(t)async{await t.pumpWidget(host(const InputSnippet24()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input international-telephone-input 25',(t)async{await t.pumpWidget(host(const InputSnippet25()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input locale-selector 26',(t)async{await t.pumpWidget(host(const InputSnippet26()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input theme-selector 27',(t)async{await t.pumpWidget(host(const InputSnippet27()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input color-input 28',(t)async{await t.pumpWidget(host(const InputSnippet28()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input password-input 29',(t)async{await t.pumpWidget(host(const InputSnippet29()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input number-input 30',(t)async{await t.pumpWidget(host(const InputSnippet30()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input telephone-input 31',(t)async{await t.pumpWidget(host(const InputSnippet31()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input url-input 32',(t)async{await t.pumpWidget(host(const InputSnippet32()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input date-time-input 33',(t)async{await t.pumpWidget(host(const InputSnippet33()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input time-input 34',(t)async{await t.pumpWidget(host(const InputSnippet34()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input file-input 35',(t)async{await t.pumpWidget(host(const InputSnippet35()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
testWidgets('copyable input input 36',(t)async{await t.pumpWidget(host(const InputSnippet36()));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());});
}
