"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TabsFooterExample } from "./TabsFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tabs-footer",
    name: "TabsFooter",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/TabsFooter.sc.md",
    description: "Supplementary content after the active tab panel.",
    properties: [
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
        description: "src/design-system/components/atoms/TabsFooter/TabsFooter.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Linked tab panels",
      description: "Supplementary content after the active tab panel.",
      code: basicCode,
      Component: TabsFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
