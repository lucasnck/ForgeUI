"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AutocompleteFooterExample } from "./AutocompleteFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "AutocompleteFooter",
  slug: "autocomplete-footer",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AutocompleteFooter.sc.md",
  description:
    "Indexed query suggestions with public compound context and caller-controlled filtering.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Contextual content; generated options stay owned by the root.",
      source: "AutocompleteFooterProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native semantic-region title.",
      source: "AutocompleteFooterProps",
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
      description: "src/design-system/components/atoms/AutocompleteFooter/AutocompleteFooter.tsx",
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
      title: "AutocompleteFooter contextual region",
      description: "Canonical public composition",
      code: basicCode,
      Component: AutocompleteFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
