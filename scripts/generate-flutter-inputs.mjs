import fs from 'node:fs';
const api=JSON.parse(fs.readFileSync('docs/sc/app/reference/native-component-api.json','utf8'));
const names=JSON.parse(fs.readFileSync('docs/migration/FLUTTER-IMPLEMENTATION-PROGRESS.json','utf8')).groups.find(g=>g.id==='inputs').names;
const checks=new Set(['Checkbox','Switch','Radio']);
const labels={label:'Campo de exemplo',semanticLabel:'Campo de exemplo',text:'Exemplo Forge UI',mask:'000-000',currency:'BRL',invalidMessage:'Valor inválido',listboxLabel:'Sugestões',countryLabel:'País',internationalLabel:'Telefone internacional',pickerLabel:'Selecionar',redLabel:'Vermelho',greenLabel:'Verde',blueLabel:'Azul',revealLabel:'Mostrar senha',concealLabel:'Ocultar senha',chooserLabel:'Selecionar arquivo de exemplo',clearLabel:'Limpar',removeLabel:'Remover',loadingLabel:'Processando'};
const initial={CurrencyInput:'1234.56',CurrencyValue:'1234.56',NumberInput:'42',PercentageInput:'25',ColorInput:'#336699',DateTimeInput:'2026-11-16T12:30',TimeInput:'12:30',Select:'one',Option:'one'};
const strings=new Set(['value','text','label','semanticLabel','placeholder','hint','error','loadingLabel','tooltip','clearLabel','removeLabel','mask','currency']);
const entries=[];
for(const name of names){
 const c=api.components.find(c=>c.name===name),schema={},args=new Map();
 for(const p of c.parameters){
 const k=p.name,t=p.type.replace(/\?$/,''),enums=api.enums[t];
 if(['key','defaultValue','defaultChecked','selected'].includes(k))continue;
 if(!(t==='bool'||enums||t==='String'&&(p.required||strings.has(k))))continue;
 let v=p.defaultValue;
 if(enums)v=v&&v!=='null'?v.split('.').at(-1):p.type.endsWith('?')?'inherit':enums[0];
 else if(t==='bool')v=v==='true';
 else{v=v&&v!=='null'?v.replace(/^['"]|['"]$/g,''):labels[k]??'';if(k==='value')v=initial[name]??(checks.has(name)?'on':'');}
 if(k==='mask')v=name==='DateInput'?'00/00/0000':name==='PostalCodeInput'?'00000-000':name==='TaxIdInput'?'000.000.000-00':'000-000';
 schema[k]=enums?{kind:'select',options:[...(p.type.endsWith('?')?['inherit']:[]),...enums],defaultValue:v}:{kind:t==='bool'?'boolean':'text',defaultValue:v};
 if(k==='currency')schema[k]={kind:'select',options:['BRL','USD','EUR','JPY'],defaultValue:'BRL'};
 if(p.required&&t==='String'&&k!=='value')schema[k].nonblank=true;
 let e;
 if(k==='checked')e='checked';
 else if(k==='value'&&name==='LocaleSelector')e='locale';
 else if(k==='value'&&name==='ThemeSelector')e='theme';
 else if(k==='value'&&!checks.has(name)&&name!=='Option')e='text';
 else if(enums)e="enumValue(p,'"+k+"',"+t+".values)"+(p.type.endsWith('?')?'':'??'+t+'.'+v);
 else if(t==='bool')e="(p['"+k+"'] as bool?)??"+v;
 else e="(p['"+k+"'] as String?)??"+JSON.stringify(v);
 args.set(k,e);
 }
 const set=(k,v)=>args.set(k,v);
 const vp=c.parameters.find(p=>p.name==='value');
 if(vp?.type==='double?'||vp?.type==='double'){schema.value={kind:'number',defaultValue:50};set('value','number');}
 if(name==='InternationalTelephoneInput')set('value','phone');
 if(name==='Select'){set('options',"const [ForgeOption(value:'one',label:'Primeiro'),ForgeOption(value:'two',label:'Segundo'),ForgeOption(value:'off',label:'Desabilitado',disabled:true)]");set('values','values');set('onValuesChanged',"(v)=>setState((){values=v;events++;feedback=v.join(', ');})");}
 if(name==='EmailInput')set('providers',"const ['gmail.com','outlook.com','forge.example']");
 if(name==='LocaleSelector')set('options',"[for(final v in ForgeLocale.values)ForgeSelectorOption(value:v,label:v.name)]");
 if(name==='ThemeSelector')set('options',"[for(final v in ForgeThemeId.values)ForgeSelectorOption(value:v,label:v.name)]");
 if(name==='InputGroup'){set('child',"ForgeInput(value:text,onChanged:stringChange,semanticLabel:'Campo agrupado')");set('leading',"const ForgeInputAddon(text:'@')");}
 if(name==='FileInput'){set('picker',"(_)async=>ForgeFilePickerResult.accepted([ForgeFileReference(name:'example.txt',size:5,mimeType:'text/plain',openRead:()=>Stream.value([70,111,114,103,101]))])");set('onFilesChange',"(files)=>setState((){events++;feedback=files.map((f)=>f.name).join(', ');})");}
 for(const p of c.parameters){
 if(args.has(p.name))continue;
 if(p.name==='onValueChange')set(p.name,name==='InternationalTelephoneInput'?"(v)=>setState((){phone=v;events++;feedback=v.number??'';})":name==='LocaleSelector'?"(v)=>setState((){locale=v;events++;feedback=v.name;})":name==='ThemeSelector'?"(v)=>setState((){theme=v;events++;feedback=v.name;})":p.type.includes('String?')?"(v)=>stringChange(v??'')":'stringChange');
 else if(p.name==='onChanged'&&name!=='FileInput')set(p.name,checks.has(name)?"(v)=>setState((){checked=v;events++;feedback=v.toString();})":name==='Slider'?"(v)=>setState((){number=v;events++;feedback=v.toString();})":'stringChange');
 else if(p.name==='onPressed')set(p.name,"()=>setState((){events++;feedback='Ação ativada';})");
 else if(p.name==='onRemove')set(p.name,"()=>setState((){removed=true;events++;feedback='Removido';})");
 else if(p.required)throw Error('Missing required fixture '+name+'.'+p.name+':'+p.type);
 }
 let constructor='Forge'+name+'('+[...args].map(([k,v])=>k+': '+v).join(', ')+')';
 if(name==='Option')constructor="ForgeSelect(label:'Opção em contexto',value:text.isEmpty?'one':text,onChanged:stringChange,options:["+constructor+",const ForgeOption(value:'two',label:'Outra opção')])";
 entries.push({slug:c.slug,name,schema,constructor,initialText:initial[name]??''});
}
const state=`
String text='',feedback='';double number=50;bool checked=false,removed=false;int events=0;List<String> values=[];
ForgeLocale locale=ForgeLocale.ptBR;ForgeThemeId theme=ForgeThemeId.light;
ForgePhoneInputValue phone=const ForgePhoneInputValue(number:null,country:'BR');
Map<String,Object?> get p=>widget.properties;
void stringChange(String v)=>setState((){text=v;events++;feedback=v;});
void resetModel(){final v=p['value'];text=v is String?v:(inputInitialValues[widget.slug]??'');number=v is num?v.toDouble():50;checked=p['checked']==true;
locale=enumValue(p,'value',ForgeLocale.values)??ForgeLocale.ptBR;theme=enumValue(p,'value',ForgeThemeId.values)??ForgeThemeId.light;values=[];events=0;removed=false;feedback='';}
@override void initState(){super.initState();resetModel();}
@override void didUpdateWidget(covariant ForgeInputCatalogExample old){super.didUpdateWidget(old);
if(old.slug!=widget.slug){resetModel();return;}
if(old.properties['value']!=p['value']){final v=p['value'];if(v is String)text=v;if(v is num)number=v.toDouble();locale=enumValue(p,'value',ForgeLocale.values)??locale;theme=enumValue(p,'value',ForgeThemeId.values)??theme;}
if(old.properties['checked']!=p['checked'])checked=p['checked']==true;
}
`;
const source="// Generated by scripts/generate-flutter-inputs.mjs.\nimport 'dart:convert';\nimport 'package:flutter/material.dart';\nimport 'package:forge_ui/forge_ui.dart';\nimport 'primitives_generated.dart' show enumValue;\nfinal inputContracts=(jsonDecode(r'''"+JSON.stringify(Object.fromEntries(entries.map(e=>[e.slug,e.schema])))+"''') as Map).cast<String,dynamic>();\nconst inputInitialValues=<String,String>"+JSON.stringify(Object.fromEntries(entries.map(e=>[e.slug,e.initialText])))+";\nclass ForgeInputCatalogExample extends StatefulWidget{final String slug;final Map<String,Object?> properties;const ForgeInputCatalogExample({super.key,required this.slug,this.properties=const {}});@override State<ForgeInputCatalogExample> createState()=>_InputCatalogState();}\nclass _InputCatalogState extends State<ForgeInputCatalogExample>{\n"+state+"\n@override Widget build(BuildContext context){final Widget control=removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):switch(widget.slug){\n"+entries.map(e=>"'"+e.slug+"' => "+e.constructor+",").join('\n')+"\n_=>throw ArgumentError.value(widget.slug)};return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[control,Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback),if(widget.slug=='file-input')const Text('Fixture em memória; o aplicativo fornece o seletor real.')]);}}\n";
fs.writeFileSync('app/showcase_flutter/lib/examples/inputs_generated.dart',source);
fs.writeFileSync('showcase/portal/src/features/showcase-v2/model/flutter-inputs.json',JSON.stringify(entries,null,2)+'\n');
for(const entry of entries){
 const props=JSON.stringify(Object.fromEntries(Object.entries(entry.schema).map(([k,v])=>[k,v.defaultValue])));
 const helper="T? enumValue<T extends Enum>(Map<String,Object?> p,String key,List<T> values){for(final v in values){if(v.name==p[key])return v;}return null;}";
 entry.code="import 'package:flutter/material.dart';\nimport 'package:forge_ui/forge_ui.dart';\n"+helper+"\nconst inputInitialValues=<String,String>"+JSON.stringify({[entry.slug]:entry.initialText})+";\nclass ForgeInputCatalogExample extends StatefulWidget{final String slug='"+entry.slug+"';final Map<String,Object?> properties=const "+props+";const ForgeInputCatalogExample({super.key});@override State<ForgeInputCatalogExample> createState()=>_InputCatalogState();}\nclass _InputCatalogState extends State<ForgeInputCatalogExample>{\n"+state+"\n@override Widget build(BuildContext context){return Column(crossAxisAlignment:CrossAxisAlignment.start,children:[removed?ForgeButton(onPressed:()=>setState(()=>removed=false),child:const Text('Restaurar')):"+entry.constructor+",Text('Alterações: $events'),if(feedback.isNotEmpty)Text(feedback)]);}}";
}
fs.writeFileSync('showcase/portal/src/features/showcase-v2/model/flutter-inputs.json',JSON.stringify(entries,null,2)+'\n');
console.log('Generated '+entries.length+' typed native input fixtures.');
