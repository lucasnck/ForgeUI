"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DisclosureExample } from "./Disclosure.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "disclosure",
    name: "Disclosure",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/Disclosure.sc.md",
    description: "Named disclosure with controlled open state and public collapse behavior.",
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
        name: "label",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Accessible public label. Repeated items append their original one-based index.",
        source: "DisclosureProps",
      },
      {
        name: "open",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Controlled accepted disclosure state.",
        source: "ComponentOpenProps",
      },
      {
        name: "defaultOpen",
        type: "boolean | undefined",
        required: false,
        defaultValue: null,
        description: "Initial open state when uncontrolled; this example is controlled.",
        source: "ComponentOpenProps",
      },
      {
        name: "onOpenChange",
        type: "((open: boolean) => void) | undefined",
        required: false,
        defaultValue: null,
        description: "Requests an open-state change; the caller may accept or reject it.",
        source: "ComponentOpenProps",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disables the native control or group through the public contract.",
        source: "CollapseProps",
      },
      {
        name: "animated",
        type: "boolean | undefined",
        required: false,
        defaultValue: "true",
        description: "Enable the existing DS motion recipe.",
        source: "ComponentAnimatedProps",
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
        name: "onOpenChange",
        signature: "((open: boolean) => void) | undefined",
        description: "Requests an open-state change; the caller may accept or reject it.",
      },
    ],
    features: [
      {
        id: "composition",
        name: "Public composition",
        description:
          "Disclosure owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/Disclosure/Disclosure.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Visible disclosure",
      description: "Named disclosure with controlled open state and public collapse behavior.",
      code: basicCode,
      Component: DisclosureExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
