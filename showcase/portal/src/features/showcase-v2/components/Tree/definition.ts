"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeExample, TreeRejectExample } from "./Tree.example";
import { basicCode, rejectCode } from "./usage-code";
const definition = {
  name: "Tree",
  slug: "tree",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/Tree.sc.md",
  description:
    "Generated hierarchical nodes with canonical selection, expansion and keyboard traversal.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible tree name.",
      source: "TreeProps",
    },
    {
      name: "nodes",
      type: "readonly TreeNodeDescriptor[]",
      required: true,
      defaultValue: null,
      description: "Stable depth-first indexed parents and children; option 3 is disabled.",
      source: "TreeProps",
    },
    {
      name: "value",
      type: "string | null",
      required: false,
      defaultValue: null,
      description: "Caller-owned selected node, changed by actual tree activation.",
      source: "ComponentSelectionProps",
    },
    {
      name: "defaultValue",
      type: "string | null",
      required: false,
      defaultValue: null,
      description: "Uncontrolled initial selection; this preview is controlled.",
      source: "ComponentSelectionProps",
    },
    {
      name: "expandedValue",
      type: "readonly string[]",
      required: false,
      defaultValue: null,
      description:
        "Accepted controlled expansion; external Footer actions supply authoritative props.",
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
      description: "Required Body with optional Header/Footer.",
      source: "ComponentChildrenProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native title forwarded to the public region.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [
    {
      name: "onValueChange",
      signature: "(value: string | null) => void",
      description: "One request for an enabled node; focus stays independent of selection.",
    },
    {
      name: "onExpandedValueChange",
      signature: "(value: readonly string[]) => void",
      description:
        "Expansion request; caller may reject it. External Footer actions set accepted props without fabricating a DS callback.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/Tree/Tree.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "TreeBody generates Item/Group metadata from public nodes. No orphan item/group, private context or duplicate navigation engine.",
    },
    {
      id: "visible-tree",
      name: "visibleTree",
      description:
        "Canonical @/design-system/helpers/tree computes visible preorder metadata on the same fixture nodes and accepted expansion.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Hierarchical selection",
      description: "Hierarchical selection",
      code: basicCode,
      Component: TreeExample,
    },
    {
      id: "rejection",
      title: "Controlled expansion rejection",
      description:
        "Reject one expansion request, then accept; selected descendants and focus follow canonical controlled state.",
      code: rejectCode,
      Component: TreeRejectExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
