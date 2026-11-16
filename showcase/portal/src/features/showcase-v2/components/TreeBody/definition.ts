"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeBodyExample } from "./TreeBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeBody",
  slug: "tree-body",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/TreeBody.sc.md",
  description:
    "Generated hierarchical nodes with canonical selection, expansion and keyboard traversal.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Owned generated TreeItems; caller children are not inserted.",
      source: "Native attributes",
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
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/TreeBody/TreeBody.tsx",
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
      title: "TreeBody contextual region",
      description: "TreeBody contextual region",
      code: basicCode,
      Component: TreeBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
