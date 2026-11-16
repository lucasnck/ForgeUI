"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ListItemExample } from "./ListItem.example";
const definition = {
  slug: "list-item",
  name: "ListItem",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ListItem.sc.md",
  description: "Indexed list content with independent local item actions.",
  properties: [
    {
      name: "native attributes",
      type: "NativeCollectionItemProps",
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "ListItemProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ListItemProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "Part pages use the real owner and required siblings. Collection indices and keys remain stable under caller filtering and reordering; no selection/listbox API is added.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/ListItem/ListItem.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed content list",
      description:
        "Filter to item 2 or empty content, reverse original indices, and observe caller actions before resetting.",
      code: basicCode,
      Component: ListItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
