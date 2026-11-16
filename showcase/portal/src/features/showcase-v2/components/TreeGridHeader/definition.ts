"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGridHeaderExample } from "./TreeGridHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeGridHeader",
  slug: "tree-grid-header",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/TreeGridHeader.sc.md",
  description:
    "Indexed hierarchical plain-text records with canonical cell focus and controlled expansion.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Generated contextual rows/headers; structured public children remain intact.",
      source: "Native attributes",
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
      description: "src/design-system/components/molecules/TreeGridHeader/TreeGridHeader.tsx",
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
      title: "TreeGridHeader contextual region",
      description: "TreeGridHeader contextual region",
      code: basicCode,
      Component: TreeGridHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
