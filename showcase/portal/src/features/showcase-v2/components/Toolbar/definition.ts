"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ToolbarExample } from "./Toolbar.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "toolbar",
    name: "Toolbar",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/Toolbar.sc.md",
    description: "Roving-focus toolbar with three independent actions.",
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
        source: "ToolbarProps",
      },
      {
        name: "orientation",
        type: "NavigationOrientation | undefined",
        required: false,
        defaultValue: "horizontal",
        description: "Public keyboard navigation axis.",
        source: "ToolbarProps",
      },
      {
        name: "direction",
        type: "NavigationDirection | undefined",
        required: false,
        defaultValue: "ltr",
        description: "Public keyboard direction.",
        source: "ToolbarProps",
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
          "Toolbar owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/Toolbar/Toolbar.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Action toolbar",
      description: "Roving-focus toolbar with three independent actions.",
      code: basicCode,
      Component: ToolbarExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
