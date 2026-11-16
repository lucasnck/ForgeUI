"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TabExample } from "./Tab.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tab",
    name: "Tab",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/Tab.sc.md",
    description: "Indexed tab control linked to its matching panel.",
    properties: [
      {
        name: "attached",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Square bottom corners to integrate with TabsBody. Disabled by default.",
        source: "TabProps",
      },
      {
        name: "size",
        type: "ComponentSize",
        required: false,
        defaultValue: "md",
        description: "Canonical size recipe.",
        source: "VisualProps",
      },
      {
        name: "tone",
        type: "ComponentTone",
        required: false,
        defaultValue: "brand",
        description: "Canonical tone recipe.",
        source: "VisualProps",
      },
      {
        name: "appearance",
        type: "ComponentAppearance",
        required: false,
        defaultValue: "ghost",
        description: "Inactive appearance; selected tabs retain a filled tone.",
        source: "VisualProps",
      },
      {
        name: "shape",
        type: "ComponentShape",
        required: false,
        defaultValue: "rounded",
        description: "Corner shape; attached=true keeps only the bottom corners square.",
        source: "VisualProps",
      },
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted selection. Item identity is stable and is not edited across all records.",
        source: "TabProps",
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description:
          "Content slot. Structured owner/part children retain the public composition; editable item text keeps its original index.",
        source: "DOMAttributes",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disables the native control or group through the public contract.",
        source: "ButtonHTMLAttributes",
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
    events: [],
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
        description: "src/design-system/components/atoms/Tab/Tab.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Linked tab panels",
      description: "Indexed tab control linked to its matching panel.",
      code: basicCode,
      Component: TabExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
