"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGridFooterExample } from "./TreeGridFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeGridFooter",
  slug: "tree-grid-footer",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/TreeGridFooter.sc.md",
  description:
    "Indexed hierarchical plain-text records with canonical cell focus and controlled expansion.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Editable contextual footer text.",
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
      description: "src/design-system/components/atoms/TreeGridFooter/TreeGridFooter.tsx",
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
      title: "TreeGridFooter contextual region",
      description: "TreeGridFooter contextual region",
      code: basicCode,
      Component: TreeGridFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
