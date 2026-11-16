"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TabPanelExample } from "./TabPanel.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tab-panel",
    name: "TabPanel",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/TabPanel.sc.md",
    description: "Indexed content panel linked to its matching tab.",
    properties: [
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted selection. Item identity is stable and is not edited across all records.",
        source: "TabPanelProps",
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
        description: "src/design-system/components/atoms/TabPanel/TabPanel.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Linked tab panels",
      description: "Indexed content panel linked to its matching tab.",
      code: basicCode,
      Component: TabPanelExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
