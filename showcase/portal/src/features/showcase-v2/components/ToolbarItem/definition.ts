"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ToolbarItemExample } from "./ToolbarItem.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "toolbar-item",
    name: "ToolbarItem",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/ToolbarItem.sc.md",
    description: "Indexed action in a public keyboard-navigable toolbar.",
    properties: [
      {
        name: "itemKey",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Stable, unique action identity used by roving focus.",
        source: "ToolbarItemProps",
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description:
          "Content slot. Structured owner/part children retain the public composition; editable item text keeps its original index.",
        source: "DOMAttributes",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disables the native control or group through the public contract.",
        source: "ButtonHTMLAttributes",
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
      {
        name: "onClick",
        type: "MouseEventHandler<HTMLButtonElement> | undefined",
        required: false,
        defaultValue: null,
        description: "Native activation event; feedback records the original itemKey.",
        source: "DOMAttributes",
      },
    ],
    methods: [],
    events: [
      {
        name: "onClick",
        signature: "MouseEventHandler<HTMLButtonElement> | undefined",
        description: "Native activation event; feedback records the original itemKey.",
      },
    ],
    features: [
      {
        id: "composition",
        name: "Public composition",
        description:
          "Toolbar owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/atoms/ToolbarItem/ToolbarItem.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Action toolbar",
      description: "Indexed action in a public keyboard-navigable toolbar.",
      code: basicCode,
      Component: ToolbarItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
