"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ListFooterExample } from "./ListFooter.example";
const definition = {
  slug: "list-footer",
  name: "ListFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ListFooter.sc.md",
  description: "Caller-owned progressive disclosure of six indexed records.",
  properties: [
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"footer">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "ListFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ListFooterProps",
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
      description: "src/design-system/components/atoms/ListFooter/ListFooter.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "ListFooter contextual region",
      description:
        "Show six records progressively, initially three; filtering and reverse order preserve original indices.",
      code: basicCode,
      Component: ListFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
