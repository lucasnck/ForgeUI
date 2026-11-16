"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGridExample, TreeGridFilteredExample } from "./TreeGrid.example";
import { basicCode, filteredCode } from "./usage-code";
const definition = {
  name: "TreeGrid",
  slug: "tree-grid",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/TreeGrid.sc.md",
  description:
    "Indexed hierarchical plain-text records with canonical cell focus and controlled expansion.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible treegrid name.",
      source: "TreeGridProps<Row>",
    },
    {
      name: "nodes",
      type: "readonly TreeGridNode<Row>[]",
      required: true,
      defaultValue: null,
      description: "Stable original-index records with preserved ancestor paths.",
      source: "TreeGridProps<Row>",
    },
    {
      name: "columns",
      type: "readonly TreeGridColumn<Row>[]",
      required: true,
      defaultValue: null,
      description: "Two plain-text keyed columns.",
      source: "TreeGridProps<Row>",
    },
    {
      name: "getNodeLabel",
      type: "(row: Row) => string",
      required: true,
      defaultValue: null,
      description: "Nonempty caller row label.",
      source: "TreeGridProps<Row>",
    },
    {
      name: "expandedValue",
      type: "readonly string[]",
      required: false,
      defaultValue: null,
      description: "Accepted controlled branch keys.",
      source: "ComponentTreeExpansionProps",
    },
    {
      name: "defaultExpandedValue",
      type: "readonly string[]",
      required: false,
      defaultValue: null,
      description: "Uncontrolled initial expansion; this preview is controlled.",
      source: "ComponentTreeExpansionProps",
    },
    {
      name: "direction",
      type: "NavigationDirection",
      required: false,
      defaultValue: "ltr",
      description: "Canonical cell-navigation direction.",
      source: "TreeGridProps<Row>",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shared state feedback opt-out.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Public Header/Body plus optional Footer.",
      source: "ComponentChildrenProps",
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
  events: [
    {
      name: "onExpandedValueChange",
      signature: "(value: readonly string[]) => void",
      description:
        "Canonical branch-expansion request; caller accepts state. Footer actions set external props independently.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/TreeGrid/TreeGrid.tsx",
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
      title: "Hierarchical tabular records",
      description: "Hierarchical tabular records",
      code: basicCode,
      Component: TreeGridExample,
    },
    {
      id: "filtered",
      title: "Controlled hierarchy filtering",
      description: "Matching descendant paths and empty results preserve stable record identity.",
      code: filteredCode,
      Component: TreeGridFilteredExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
