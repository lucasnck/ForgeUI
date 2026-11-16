"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGridCellExample } from "./TreeGridCell.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeGridCell",
  slug: "tree-grid-cell",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/TreeGridCell.sc.md",
  description:
    "Indexed hierarchical plain-text records with canonical cell focus and controlled expansion.",
  properties: [
    {
      name: "rowKey",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Stable visible row identity.",
      source: "TreeGridCellProps",
    },
    {
      name: "columnKey",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Stable declared column identity.",
      source: "TreeGridCellProps",
    },
    {
      name: "children",
      type: "string",
      required: true,
      defaultValue: null,
      description:
        "Editable first-column text prefix, followed by original row index. Plain text only.",
      source: "NativeTreeGridCellProps",
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
      description: "src/design-system/components/atoms/TreeGridCell/TreeGridCell.tsx",
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
      title: "TreeGridCell contextual region",
      description: "TreeGridCell contextual region",
      code: basicCode,
      Component: TreeGridCellExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
