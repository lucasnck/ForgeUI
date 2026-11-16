"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AutocompleteBodyExample } from "./AutocompleteBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "AutocompleteBody",
  slug: "autocomplete-body",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/AutocompleteBody.sc.md",
  description:
    "Indexed query suggestions with public compound context and caller-controlled filtering.",
  properties: [
    {
      name: "title",
      type: "string",
      description: "Native semantic-region title.",
      source: "AutocompleteBodyProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/AutocompleteBody/AutocompleteBody.tsx",
    },
    {
      id: "ownership",
      name: "Public composition",
      description:
        "The root owns popup focus, active descendant and acceptance. Caller filtering preserves original option keys and indices; no network search or footer API is invented.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AutocompleteBody contextual region",
      description: "Canonical public composition",
      code: basicCode,
      Component: AutocompleteBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
