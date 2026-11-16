"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TabsHeaderExample } from "./TabsHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tabs-header",
    name: "TabsHeader",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/TabsHeader.sc.md",
    description: "Keyboard-navigable tab list in its public owner.",
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
        description: "src/design-system/components/atoms/TabsHeader/TabsHeader.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Linked tab panels",
      description: "Keyboard-navigable tab list in its public owner.",
      code: basicCode,
      Component: TabsHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
