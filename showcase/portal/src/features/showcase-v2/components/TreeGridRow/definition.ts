"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGridRowExample } from "./TreeGridRow.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeGridRow",
  slug: "tree-grid-row",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/TreeGridRow.sc.md",
  description:
    "Indexed hierarchical plain-text records with canonical cell focus and controlled expansion.",
  properties: [
    {
      name: "rowKey",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Stable currently visible node key.",
      source: "TreeGridRowProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Exactly one keyed plain-text Cell per declared column.",
      source: "NativeTreeGridRowProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native title forwarded to the semantic region.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/TreeGridRow/TreeGridRow.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "TreeGrid owns hierarchy metadata, keyed row/cell validation, header associations and native focus. Filtering preserves source ancestor paths and original record indices; no selection API is fabricated.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "TreeGridRow contextual region",
      description: "TreeGridRow contextual region",
      code: basicCode,
      Component: TreeGridRowExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
