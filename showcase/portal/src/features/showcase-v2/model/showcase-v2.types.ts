import type { ComponentType } from "react";

export type ShowcaseV2Level = "atoms" | "molecules" | "organisms" | "templates";
export interface ShowcaseV2IndexEntry {
  slug: string;
  name: string;
  level: ShowcaseV2Level;
  specification: string;
}
export interface ShowcaseV2Property {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
  source: string;
}
export interface ShowcaseV2Method {
  name: string;
  signature: string;
  description: string;
}
export interface ShowcaseV2Feature {
  id: string;
  name: string;
  description: string;
}
export interface ShowcaseV2Example {
  id: string;
  title: string;
  description: string;
  code: string;
  getCode?: (overrides: Readonly<Record<string, unknown>>) => string;
  Component: ComponentType;
}
export interface ShowcaseV2Definition extends ShowcaseV2IndexEntry {
  description: string;
  examples: readonly [ShowcaseV2Example, ...ShowcaseV2Example[]];
  properties: readonly ShowcaseV2Property[];
  methods: readonly ShowcaseV2Method[];
  events: readonly ShowcaseV2Method[];
  features: readonly ShowcaseV2Feature[];
  demoHref?: string;
}
export interface ShowcaseV2RendererProps {
  definition: ShowcaseV2Definition;
}
