"use client";
import entries from "../../model/flutter-transients.json";
import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { dartString } from "./flutter-button-properties";
type Entry = (typeof entries)[number];
export function resolveTransient(slug: string, raw: Readonly<Record<string, unknown>>) {
 const entry=entries.find(e=>e.slug===slug);if(!entry)return {};
 const result:Record<string,string|number|boolean>={};
 for(const [name,field]of Object.entries(entry.schema)){
  const v=raw[name]??field.defaultValue;
  const valid=field.kind==="boolean"?typeof v==="boolean"
   :field.kind==="select"?typeof v==="string"&&"options" in field&&(field.options as string[]).includes(v)
   :field.kind==="number"?typeof v==="number"&&Number.isInteger(v)&&"min" in field&&"max" in field&&v>=Number(field.min)&&v<=Number(field.max)
   :typeof v==="string"&&v.length<=200&&(!("nonblank" in field&&field.nonblank)||v.trim().length>0);
  result[name]=valid?v as string|number|boolean:field.defaultValue;
 }
 return result;
}
export function transientCode(slug:string,raw:Readonly<Record<string,unknown>>) {
 const entry=entries.find(e=>e.slug===slug);if(!entry)return "";
 const defaults=Object.fromEntries(Object.entries(entry.schema).map(([k,v])=>[k,v.defaultValue]));
 const resolved=resolveTransient(slug,raw);
 const literal="{"+Object.entries(resolved).map(([k,v])=>dartString(k)+": "+(typeof v==="string"?dartString(v):String(v))).join(", ")+"}";
 return entry.code.replace("properties=const "+JSON.stringify(defaults)+";",()=> "properties=const "+literal+";");
}
function TransientExample({entry}:{entry:Entry}){
 const {properties}=useExampleProperties(entry.name);
 return <FlutterPreview slug={entry.slug} properties={properties}/>;
}
export const transientConfigurations:Record<string,{schema:PropertySchema;properties:readonly ShowcaseV2Property[];examples:ShowcaseV2Example[]}> = Object.fromEntries(entries.map(entry=>[entry.slug,{
 schema:entry.schema as unknown as PropertySchema,properties:flutterNativeProperties(entry.slug),
 examples:[{id:"basic",title:entry.name===entry.owner?"Composição interativa":"Parte em composição",description:entry.name===entry.owner?"Lista passiva ou formulário nativo com valores, validação, envio e reset sob controle do consumidor.":"Parte canônica demonstrada dentro de "+entry.owner+".",code:transientCode(entry.slug,{}),getCode:overrides=>transientCode(entry.slug,overrides),Component:()=> <TransientExample entry={entry}/>}]
}]));
