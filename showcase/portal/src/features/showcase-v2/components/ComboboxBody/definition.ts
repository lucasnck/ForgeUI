"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ComboboxBodyExample } from "./ComboboxBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ComboboxBody",
  slug: "combobox-body",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ComboboxBody.sc.md",
  description:
    "Indexed query suggestions with public compound context and caller-controlled filtering.",
  properties: [
    {
      name: "title",
      type: "string",
      description: "Native semantic-region title.",
      source: "ComboboxBodyProps",
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
      description: "src/design-system/components/molecules/ComboboxBody/ComboboxBody.tsx",
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
      title: "ComboboxBody contextual region",
      description: "Canonical public composition",
      code: basicCode,
      Component: ComboboxBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
