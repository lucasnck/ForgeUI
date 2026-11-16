"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ChoiceGroupExample } from "./ChoiceGroup.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "choice-group",
    name: "ChoiceGroup",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/ChoiceGroup.sc.md",
    description: "Native fieldset with one legend and connected description.",
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
    events: [],
    features: [
      {
        id: "composition",
        name: "Public composition",
        description:
          "ChoiceGroup owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/ChoiceGroup/ChoiceGroup.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed choice composition",
      description: "Native fieldset with one legend and connected description.",
      code: basicCode,
      Component: ChoiceGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
