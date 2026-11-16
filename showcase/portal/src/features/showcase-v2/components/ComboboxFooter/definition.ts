"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ComboboxFooterExample } from "./ComboboxFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ComboboxFooter",
  slug: "combobox-footer",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ComboboxFooter.sc.md",
  description:
    "Indexed query suggestions with public compound context and caller-controlled filtering.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Contextual content; generated options stay owned by the root.",
      source: "ComboboxFooterProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native semantic-region title.",
      source: "ComboboxFooterProps",
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
      description: "src/design-system/components/atoms/ComboboxFooter/ComboboxFooter.tsx",
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
      title: "ComboboxFooter contextual region",
      description: "Canonical public composition",
      code: basicCode,
      Component: ComboboxFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
