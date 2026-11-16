"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeFooterExample } from "./TreeFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeFooter",
  slug: "tree-footer",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/TreeFooter.sc.md",
  description:
    "Generated hierarchical nodes with canonical selection, expansion and keyboard traversal.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Public content slot.",
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
      description: "src/design-system/components/atoms/TreeFooter/TreeFooter.tsx",
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
      title: "TreeFooter contextual region",
      description: "TreeFooter contextual region",
      code: basicCode,
      Component: TreeFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
