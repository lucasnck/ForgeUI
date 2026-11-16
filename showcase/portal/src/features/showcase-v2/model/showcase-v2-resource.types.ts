import type { ShowcaseV2Example } from "./showcase-v2.types";
export type ShowcaseV2ResourceKind = "hook" | "style";
export interface ShowcaseV2ResourceIndexEntry { slug: string; name: string; kind: ShowcaseV2ResourceKind; specification: string; source: string; }
export interface ShowcaseV2ResourceContract { title: string; entries: readonly { name: string; type: string; description: string }[]; }
export interface ShowcaseV2ResourceDefinition extends ShowcaseV2ResourceIndexEntry { description: string; examples: readonly [ShowcaseV2Example,...ShowcaseV2Example[]]; contracts: readonly ShowcaseV2ResourceContract[]; notes: readonly string[]; related: readonly {name:string;href:string}[]; }
