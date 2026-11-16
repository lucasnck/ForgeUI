"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { BadgeExample } from "./Badge.example";
const definition = {
  slug: "badge",
  name: "Badge",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Badge.sc.md",
  description: "A passive semantic status marker.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "BadgeProps / inherited native root",
    },
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      source: "ComponentSizedProps",
      defaultValue: "md",
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTone",
      required: false,
      source: "ComponentToneProps",
      defaultValue: "brand",
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      required: false,
      source: "ComponentAppearanceProps",
      defaultValue: "soft",
      description: "Canonical presentation recipe; preserves native semantics.",
    },
    {
      name: "shape",
      type: "ComponentShape",
      required: false,
      source: "ComponentShapeProps",
      defaultValue: null,
      description: "Optional shape override; otherwise inherits the document recipe.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      source: "ComponentFullWidthProps",
      defaultValue: "false",
      description: "Expands within available inline space.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "BadgeProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "BadgeProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Badge/Badge.tsx · src/design-system/components/atoms/Badge/Badge.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Badge public composition",
      description: "Compare supported tone and appearance beside readable text.",
      code: basicCode,
      Component: BadgeExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
