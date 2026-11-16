"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ListHeaderExample } from "./ListHeader.example";
const definition = {
  slug: "list-header",
  name: "ListHeader",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ListHeader.sc.md",
  description: "A named list header within its public owner.",
  properties: [
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"header">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "ListHeaderProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ListHeaderProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ListHeaderProps",
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
      description: "src/design-system/components/atoms/ListHeader/ListHeader.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "ListHeader contextual region",
      description:
        "Header isolation retains a hidden required Body; edit Children and toggle the aligned icon.",
      code: basicCode,
      Component: ListHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
