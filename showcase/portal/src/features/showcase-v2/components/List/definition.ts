"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ListExample } from "./List.example";
const definition = {
  slug: "list",
  name: "List",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/List.sc.md",
  description: "A native content list with caller-owned filtering and stable item identity.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Direct public composition: one required Body and optional Header/Footer.",
      source: "ComponentChildrenProps",
    },
    {
      name: "label",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Accessible name when Header is absent.",
      source: "ListProps",
    },
    {
      name: "native attributes",
      type: "NativeSectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "ListProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ListProps",
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
      description: "src/design-system/components/molecules/List/List.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed content list",
      description:
        "Filter to item 2 or empty content, reverse original indices, and observe caller actions before resetting.",
      code: basicCode,
      Component: ListExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
