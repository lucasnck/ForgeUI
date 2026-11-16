"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGroupExample } from "./TreeGroup.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeGroup",
  slug: "tree-group",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/TreeGroup.sc.md",
  description:
    "Generated hierarchical nodes with canonical selection, expansion and keyboard traversal.",
  properties: [
    {
      name: "parentKey",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Owning generated branch identity.",
      source: "TreeGroupProps",
    },
    {
      name: "nodes",
      type: "readonly TreeNodeDescriptor[]",
      required: true,
      defaultValue: null,
      description: "Children generated through public Tree nodes and Body.",
      source: "TreeGroupProps",
    },
    {
      name: "level",
      type: "number",
      required: true,
      defaultValue: null,
      description: "Generated positive descendant level.",
      source: "TreeGroupProps",
    },
    {
      name: "native attributes",
      type: "NativeCollectionListProps",
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
      description: "src/design-system/components/molecules/TreeGroup/TreeGroup.tsx",
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
      Component: TreeGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
