"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TabsExample } from "./Tabs.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tabs",
    name: "Tabs",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/Tabs.sc.md",
    description: "Manually activated tabs with paired, mounted panels.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        defaultValue: null,
        description:
          "Content slot. Structured owner/part children retain the public composition; editable item text keeps its original index.",
        source: "ComponentChildrenProps",
      },
      {
        name: "label",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Accessible public label. Repeated items append their original one-based index.",
        source: "TabsProps",
      },
      {
        name: "value",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description:
          "Controlled accepted selection. Item identity is stable and is not edited across all records.",
        source: "ComponentSelectionProps",
      },
      {
        name: "defaultValue",
        type: "string | undefined",
        required: false,
        defaultValue: "first enabled Tab value",
        description:
          "Initial selection when uncontrolled; this example uses the controlled contract.",
        source: "ComponentSelectionProps",
      },
      {
        name: "onValueChange",
        type: "((value: string) => void) | undefined",
        required: false,
        defaultValue: null,
        description:
          "Requests the next accepted selection; the example records arguments and call count.",
        source: "ComponentSelectionProps",
      },
      {
        name: "direction",
        type: "NavigationDirection | undefined",
        required: false,
        defaultValue: "ltr",
        description: "Public keyboard direction.",
        source: "TabsProps",
      },
      {
        name: "animated",
        type: "boolean | undefined",
        required: false,
        defaultValue: "true",
        description: "Enable the existing DS motion recipe.",
        source: "ComponentAnimatedProps",
      },
      {
        name: "title",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Native title; repeated controls preserve the original item index.",
        source: "HTMLAttributes",
      },
    ],
    methods: [],
    events: [
      {
        name: "onValueChange",
        signature: "((value: string) => void) | undefined",
        description:
          "Requests the next accepted selection; the example records arguments and call count.",
      },
    ],
    features: [
      {
        id: "composition",
        name: "Public composition",
        description:
          "Tabs owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/Tabs/Tabs.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Linked tab panels",
      description: "Manually activated tabs with paired, mounted panels.",
      code: basicCode,
      Component: TabsExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
