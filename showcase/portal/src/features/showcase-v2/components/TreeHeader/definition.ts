"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeHeaderExample } from "./TreeHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeHeader",
  slug: "tree-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/TreeHeader.sc.md",
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
      description: "src/design-system/components/atoms/TreeHeader/TreeHeader.tsx",
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
      title: "TreeHeader contextual region",
      description: "TreeHeader contextual region",
      code: basicCode,
      Component: TreeHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
