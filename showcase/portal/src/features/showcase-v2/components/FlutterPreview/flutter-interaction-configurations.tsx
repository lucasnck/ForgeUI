"use client";
import entries from "../../model/flutter-interactions.json";
import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { dartString } from "./flutter-button-properties";
type Entry = (typeof entries)[number];
export function resolveInteraction(slug: string, raw: Readonly<Record<string, unknown>>) {
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
 if(entry.family==="accordion"&&!result.multiple&&result.expanded==="both")result.expanded="first";
 return result;
}
/** Public ForgeTabs recipe, not the generated preview State/bridge implementation. */
function tabsConsumerCode(values: Record<string, string | number | boolean>): string {
  const label = dartString(String(values.label));
  const first = dartString(String(values.firstLabel));
  const second = dartString(String(values.secondLabel));
  const body = dartString(String(values.bodyText));
  const footer = dartString(String(values.footerText));
  const active = dartString(String(values.activeTab));
  const direction = values.direction === "rtl" ? "rtl" : "ltr";
  const acceptChanges = values.acceptChanges === true;
  const disabled = values.disableSecond === true ? "        disabled: true," : "";
  return [
    "import 'package:flutter/material.dart';",
    "import 'package:forge_ui/forge_ui.dart';",
    "",
    "Widget buildTabs() => ForgeTabs(",
    `  label: ${label},`,
    acceptChanges ? `  defaultValue: ${active},` : `  value: ${active},`,
    `  direction: ForgeNavigationDirection.${direction},`,
    `  animated: ${values.animated === true},`,
    "  onValueChange: (value) {",
    acceptChanges ? "    // React to the selection in your application." : "    // Intentionally reject selection changes.",
    "  },",
    "  children: [",
    "    ForgeTabsHeader(tabs: [",
    "      ForgeTab(",
    "        value: 'first',",
    `        child: Text(${first}),`,
    "      ),",
    "      ForgeTab(",
    "        value: 'second',",
    ...(disabled ? [disabled] : []),
    `        child: Text(${second}),`,
    "      ),",
    "    ]),",
    "    ForgeTabsBody(panels: [",
    "      ForgeTabPanel(",
    "        value: 'first',",
    `        child: Text(${body}),`,
    "      ),",
    "      ForgeTabPanel(",
    "        value: 'second',",
    `        child: Text(${second}),`,
    "      ),",
    "    ]),",
    `    ForgeTabsFooter(child: Text(${footer})),`,
    "  ],",
    ");",
  ].join("\n");
}

export function interactionCode(slug: string, raw: Readonly<Record<string, unknown>>): string {
  const entry = entries.find(item => item.slug === slug);
  if (!entry) return "";
  const defaults = Object.fromEntries(
    Object.entries(entry.schema).map(([name, field]) => [name, field.defaultValue]),
  );
  const resolved = resolveInteraction(slug, raw);
  if (entry.family === "tabs") return tabsConsumerCode(resolved);
  // Other interaction families retain their existing contract until each owns
  // a reviewed public-consumer recipe. Do not change their compiled previews here.
  const literal = "{" + Object.entries(resolved)
    .map(([name, value]) => dartString(name) + ": " +
      (typeof value === "string" ? dartString(value) : String(value)))
    .join(", ") + "}";
  return entry.code.replace("properties=const " + JSON.stringify(defaults) + ";", () =>
    "properties=const " + literal + ";");
}
function InteractionExample({entry}:{entry:Entry}){
 const {properties}=useExampleProperties(entry.name);
 return <FlutterPreview slug={entry.slug} properties={properties}/>;
}
export const interactionConfigurations:Record<string,{schema:PropertySchema;properties:readonly ShowcaseV2Property[];examples:ShowcaseV2Example[]}> = Object.fromEntries(entries.map(entry=>[entry.slug,{
 schema:entry.schema as unknown as PropertySchema,properties:flutterNativeProperties(entry.slug),
 examples:[{id:"basic",title:entry.name===entry.owner?"Composição interativa":"Parte em composição",description:entry.name===entry.owner?"Estado, teclado e solicitações controlados pelo consumidor.":"Parte canônica demonstrada dentro de "+entry.owner+".",code:interactionCode(entry.slug,{}),getCode:overrides=>interactionCode(entry.slug,overrides),Component:()=> <InteractionExample entry={entry}/>}]
}]));
