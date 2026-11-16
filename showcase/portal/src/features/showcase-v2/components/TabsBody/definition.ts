"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TabsBodyExample } from "./TabsBody.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tabs-body",
    name: "TabsBody",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/TabsBody.sc.md",
    description: "Container for paired, mounted tab panels.",
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
        description: "src/design-system/components/atoms/TabsBody/TabsBody.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Linked tab panels",
      description: "Container for paired, mounted tab panels.",
      code: basicCode,
      Component: TabsBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
