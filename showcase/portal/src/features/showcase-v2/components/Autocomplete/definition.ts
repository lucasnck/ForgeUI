"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AutocompleteExample } from "./Autocomplete.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "Autocomplete",
  slug: "autocomplete",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Autocomplete.sc.md",
  description:
    "Indexed query suggestions with public compound context and caller-controlled filtering.",
  properties: [
    {
      name: "options",
      type: "readonly ChoiceOption[]",
      description:
        "Caller-filtered indexed options; disabled entries are excluded from acceptance.",
      source: "AutocompleteProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "query",
      type: "string",
      description: "Controlled input query. Filtering remains caller-owned.",
      source: "AutocompleteProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Public compound parts; Body required.",
      source: "ComponentChildrenProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "size",
      type: "ComponentSize",
      description: "Forwarded public size setting.",
      source: "Component capabilities",
      required: false,
      defaultValue: "md",
    },
    {
      name: "tone",
      type: "ComponentTone",
      description: "Forwarded public tone setting.",
      source: "Component capabilities",
      required: false,
      defaultValue: "neutral",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      description: "Forwarded public appearance setting.",
      source: "Component capabilities",
      required: false,
      defaultValue: "bordered",
    },
    {
      name: "shape",
      type: "ComponentShape",
      description: "Forwarded public shape setting.",
      source: "Component capabilities",
      required: false,
      defaultValue: null,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Forwarded public disabled setting.",
      source: "NativeQueryInputProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "readOnly",
      type: "boolean",
      description: "Forwarded public readOnly setting.",
      source: "NativeQueryInputProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "required",
      type: "boolean",
      description: "Forwarded public required setting.",
      source: "NativeQueryInputProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "invalid",
      type: "boolean",
      description: "Forwarded public invalid setting.",
      source: "Component capabilities",
      required: false,
      defaultValue: "false",
    },
    {
      name: "fullWidth",
      type: "boolean",
      description: "Forwarded public fullWidth setting.",
      source: "Component capabilities",
      required: false,
      defaultValue: "true",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Forwarded public placeholder setting.",
      source: "NativeQueryInputProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Forwarded public title setting.",
      source: "NativeQueryInputProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "name",
      type: "string",
      description: "Forwarded public name setting.",
      source: "NativeQueryInputProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "listboxLabel",
      type: "string",
      description: "Forwarded public listboxLabel setting.",
      source: "ComponentPopupProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [
    {
      name: "onQueryChange",
      signature: "(query: string) => void",
      description: "Native input edits or accepted suggestions.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/Autocomplete/Autocomplete.tsx",
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
      title: "Filtered indexed options",
      description: "Canonical public composition",
      code: basicCode,
      Component: AutocompleteExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
