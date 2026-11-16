"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeItemExample } from "./TreeItem.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeItem",
  slug: "tree-item",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/TreeItem.sc.md",
  description:
    "Generated hierarchical nodes with canonical selection, expansion and keyboard traversal.",
  properties: [
    {
      name: "node",
      type: "TreeNodeDescriptor",
      required: true,
      defaultValue: null,
      description:
        "Generated from public Tree nodes; contains plain label, optional disabled state and descendants.",
      source: "TreeItemProps",
    },
    {
      name: "level",
      type: "number",
      required: false,
      defaultValue: null,
      description:
        "Canonical generated hierarchy metadata; not overwritten independently of descriptors.",
      source: "TreeItemProps",
    },
    {
      name: "position",
      type: "number",
      required: false,
      defaultValue: null,
      description:
        "Canonical generated hierarchy metadata; not overwritten independently of descriptors.",
      source: "TreeItemProps",
    },
    {
      name: "siblingCount",
      type: "number",
      required: false,
      defaultValue: null,
      description:
        "Canonical generated hierarchy metadata; not overwritten independently of descriptors.",
      source: "TreeItemProps",
    },
    {
      name: "native attributes",
      type: "NativeTreeItemProps",
      required: false,
      defaultValue: null,
      description:
        "Generated paths expose owner descriptors only; do not inject native attributes, refs or internal context.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/TreeItem/TreeItem.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "TreeBody generates Item/Group metadata from public nodes. No orphan item/group, private context or duplicate navigation engine.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Generated tree nodes",
      description: "Generated tree nodes",
      code: basicCode,
      Component: TreeItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
