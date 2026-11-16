"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ListBodyExample } from "./ListBody.example";
const definition = {
  slug: "list-body",
  name: "ListBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ListBody.sc.md",
  description: "The native unordered list region, with stable filtering and order.",
  properties: [
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"ul">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "ListBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ListBodyProps",
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
      description: "src/design-system/components/atoms/ListBody/ListBody.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "ListBody contextual region",
      description:
        "Filter to item 2 or empty content, reverse original indices, and observe caller actions before resetting.",
      code: basicCode,
      Component: ListBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
