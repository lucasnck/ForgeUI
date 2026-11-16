"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DialogCloseExample } from "./DialogClose.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "DialogClose",
  slug: "dialog-close",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/DialogClose.sc.md",
  description: "Public native dialog composition with safe actions and caller-owned record state.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Visible close action text; caller label edits keep DialogClose ownership.",
      source: "NativeActionButtonProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Disables this close action; the Header action and Escape remain available.",
      source: "NativeActionButtonProps",
    },
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      defaultValue: "md",
      description: "Canonical size.",
      source: "VisualProps",
    },
    {
      name: "tone",
      type: "ComponentTone",
      required: false,
      defaultValue: "brand",
      description: "Canonical tone.",
      source: "VisualProps",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      required: false,
      defaultValue: null,
      description: "Canonical appearance; omitted uses Button variant default.",
      source: "VisualProps",
    },
    {
      name: "shape",
      type: "ComponentShape",
      required: false,
      defaultValue: null,
      description: "Canonical shape.",
      source: "VisualProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/DialogClose/DialogClose.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "One canonical Modal engine; aliases preserve public constructor identity. Part previews use public Dialog and minimum visible siblings; AlertDialog aggregate separately owns required description and safe initial focus.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Contextual dismissal",
      description: "Contextual dismissal",
      code: basicCode,
      Component: DialogCloseExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
