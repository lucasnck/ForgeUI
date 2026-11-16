"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TreeGridColumnHeaderExample } from "./TreeGridColumnHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "TreeGridColumnHeader",
  slug: "tree-grid-column-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/TreeGridColumnHeader.sc.md",
  description:
    "Indexed hierarchical plain-text records with canonical cell focus and controlled expansion.",
  properties: [
    {
      name: "columnKey",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Stable key paired with one column.",
      source: "TreeGridColumnHeaderProps",
    },
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Editable original column-index prefix.",
      source: "TreeGridColumnHeaderProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/TreeGridColumnHeader/TreeGridColumnHeader.tsx",
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
      title: "TreeGridColumnHeader contextual region",
      description: "TreeGridColumnHeader contextual region",
      code: basicCode,
      Component: TreeGridColumnHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
