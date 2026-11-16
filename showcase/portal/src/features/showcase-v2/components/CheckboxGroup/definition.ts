"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { CheckboxGroupExample } from "./CheckboxGroup.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "checkbox-group",
    name: "CheckboxGroup",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/CheckboxGroup.sc.md",
    description: "Controlled multiple selection with shared native name and validation.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        defaultValue: null,
        description:
          "Content slot. Structured owner/part children retain the public composition; editable item text keeps its original index.",
        source: "ComponentChildrenProps",
      },
      {
        name: "name",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Native name shared by the grouped fields.",
        source: "CheckboxGroupProps",
      },
      {
        name: "value",
        type: "readonly string[] | undefined",
        required: false,
        defaultValue: null,
        description:
          "Controlled accepted selection. Item identity is stable and is not edited across all records.",
        source: "ComponentSelectionProps",
      },
      {
        name: "defaultValue",
        type: "readonly string[] | undefined",
        required: false,
        defaultValue: "[]",
        description:
          "Initial selection when uncontrolled; this example uses the controlled contract.",
        source: "ComponentSelectionProps",
      },
      {
        name: "onValueChange",
        type: "((value: readonly string[]) => void) | undefined",
        required: false,
        defaultValue: null,
        description:
          "Requests the next accepted selection; the example records arguments and call count.",
        source: "ComponentSelectionProps",
      },
      {
        name: "legend",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description:
          "Alternative legend source; supplying text replaces the Header so only one legend is rendered.",
        source: "ChoiceGroupProps",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disables the native control or group through the public contract.",
        source: "FieldsetHTMLAttributes",
      },
      {
        name: "invalid",
        type: "boolean | undefined",
        required: false,
        defaultValue: null,
        description: "Propagates invalid state through the owning choice context.",
        source: "ComponentInvalidProps",
      },
      {
        name: "gap",
        type: "ComponentSpace | undefined",
        required: false,
        defaultValue: "2",
        description: "Public token-backed spacing between group regions.",
        source: "ComponentSpaceProps",
      },
      {
        name: "padding",
        type: "ComponentSpace | undefined",
        required: false,
        defaultValue: null,
        description: "Public token-backed padding.",
        source: "ComponentSpaceProps",
      },
      {
        name: "title",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Native title; repeated controls preserve the original item index.",
        source: "HTMLAttributes",
      },
    ],
    methods: [],
    events: [
      {
        name: "onValueChange",
        signature: "((value: readonly string[]) => void) | undefined",
        description:
          "Requests the next accepted selection; the example records arguments and call count.",
      },
    ],
    features: [
      {
        id: "composition",
        name: "Public composition",
        description:
          "CheckboxGroup owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/CheckboxGroup/CheckboxGroup.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed choice composition",
      description: "Controlled multiple selection with shared native name and validation.",
      code: basicCode,
      Component: CheckboxGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
