"use client";
import entries from "../../model/flutter-inputs.json";
import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { dartString } from "./flutter-button-properties";
type Entry = (typeof entries)[number];
export function resolveInput(slug: string, raw: Readonly<Record<string, unknown>>) {
 const entry=entries.find(e=>e.slug===slug);if(!entry)return {};
 const result: Record<string,string|number|boolean>={};
 for(const [name,field] of Object.entries(entry.schema as unknown as PropertySchema)){
  const value=raw[name]??field.defaultValue;
  const valid=field.kind==="select"?field.options?.includes(value as string)
   :field.kind==="number"?typeof value==="number"&&Number.isFinite(value)&&value>=0&&value<=100
   :field.kind==="boolean"?typeof value==="boolean"
   :typeof value==="string"&&(!(field as {nonblank?:boolean}).nonblank||value.trim().length>0);
  result[name]=valid?(typeof value==="string"?value.slice(0,200):value as number|boolean):field.defaultValue!;
 }
 return result;
}
function InputExample({entry}:{entry:Entry}){
 const {properties}=useExampleProperties(entry.name);
 return <FlutterPreview slug={entry.slug} properties={properties}/>;
}
export function inputCode(entry:Entry,overrides:Readonly<Record<string,unknown>>){
 const values=resolveInput(entry.slug,overrides);
 const defaults=Object.fromEntries(Object.entries(entry.schema as unknown as PropertySchema).map(([k,v])=>[k,v.defaultValue]));
 const literal="{"+Object.entries(values).map(([k,v])=>dartString(k)+": "+(typeof v==="string"?dartString(v):String(v))).join(", ")+"}";
 return entry.code.replace("properties=const "+JSON.stringify(defaults)+";",()=> "properties=const "+literal+";");
}
export const inputConfigurations:Record<string,{schema:PropertySchema;properties:readonly ShowcaseV2Property[];examples:ShowcaseV2Example[]}> = Object.fromEntries(entries.map(entry=>[entry.slug,{
 schema:entry.schema as unknown as PropertySchema,properties:flutterNativeProperties(entry.slug),
 examples:[{id:"basic",title:"Campo nativo",description:"Componente Flutter real com estado do consumidor e retorno das alterações.",code:inputCode(entry,{}),getCode:overrides=>inputCode(entry,overrides),Component:()=> <InputExample entry={entry}/>}]
}]));
