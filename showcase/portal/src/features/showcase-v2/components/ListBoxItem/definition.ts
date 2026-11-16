"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ListBoxItemExample } from "./ListBoxItem.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "ListBoxItem",
    slug: "list-box-item",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/ListBoxItem.sc.md",
    description: "Generated options edited through the public ListBoxOption descriptors.",
    properties: [
      {
        name: "size",
        type: "ComponentSize",
        defaultValue: "md",
        required: false,
        description: "Canonical size recipe on generated options.",
        source: "VisualProps via ListBoxOption",
      },
      {
        name: "tone",
        type: "ComponentTone",
        defaultValue: "brand",
        required: false,
        description: "Canonical tone recipe on generated options.",
        source: "VisualProps via ListBoxOption",
      },
      {
        name: "appearance",
        type: "ComponentAppearance",
        defaultValue: "ghost",
        required: false,
        description:
          "Unselected appearance; selected items retain filled tone and a border/weight cue.",
        source: "VisualProps via ListBoxOption",
      },
      {
        name: "shape",
        type: "ComponentShape",
        defaultValue: "rounded",
        required: false,
        description: "Canonical shape recipe on generated options.",
        source: "VisualProps via ListBoxOption",
      },
      {
        name: "value",
        type: "string",
        description:
          "Stable owner option value; edited neither across records nor independently of descriptors.",
        source: "ListBoxItemProps",
        defaultValue: null,
        required: true,
      },
      {
        name: "label",
        type: "string",
        description: "Editable option-label prefix, followed by its original one-based index.",
        source: "ListBoxItemProps via ListBoxOption.label",
        defaultValue: null,
        required: true,
      },
      {
        name: "disabled",
        type: "boolean",
        description:
          "Disables the first option only; option 2 stays disabled as a keyboard fixture.",
        source: "ListBoxItemProps via ListBoxOption.disabled",
        defaultValue: "false",
        required: false,
      },
      {
        name: "native attributes",
        type: "NativeWidgetItemProps",
        description:
          "This generated path exposes ListBoxOption fields only. It does not inject children, refs or native events into generated items.",
        source: "ListBoxItemProps",
        defaultValue: null,
        required: false,
      },
    ],
    methods: [],
    events: [],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/atoms/ListBoxItem/ListBoxItem.tsx",
      },
      {
        id: "ownership",
        name: "Public composition",
        description:
          "ListBoxBody generates options. No orphan item, private context, nested interactive option or duplicate selection engine is used.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Generated listbox item",
      description: "Generated options edited through the public ListBoxOption descriptors.",
      code: basicCode,
      Component: ListBoxItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
