"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AutocompleteHeaderExample } from "./AutocompleteHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "AutocompleteHeader",
  slug: "autocomplete-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AutocompleteHeader.sc.md",
  description:
    "Indexed query suggestions with public compound context and caller-controlled filtering.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Contextual content; generated options stay owned by the root.",
      source: "AutocompleteHeaderProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native semantic-region title.",
      source: "AutocompleteHeaderProps",
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
      description: "src/design-system/components/atoms/AutocompleteHeader/AutocompleteHeader.tsx",
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
      title: "AutocompleteHeader contextual region",
      description: "Canonical public composition",
      code: basicCode,
      Component: AutocompleteHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
