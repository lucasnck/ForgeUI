"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FieldHintExample } from "./FieldHint.example";
const definition = {
  slug: "field-hint",
  name: "FieldHint",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/FieldHint.sc.md",
  description: "A native field description connected to its control.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "FieldHintProps / inherited native root",
    },
    {
      name: "size",
      type: "ComponentTextSize",
      required: false,
      source: "ComponentTextSizeProps",
      defaultValue: "sm",
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTextTone",
      required: false,
      source: "ComponentTextToneProps",
      defaultValue: "muted",
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "weight",
      type: "ComponentFontWeight",
      required: false,
      source: "ComponentFontWeightProps",
      defaultValue: "regular",
      description: "Canonical font weight.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "FieldHintProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FieldHintProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/FieldHint/FieldHint.tsx · src/design-system/components/atoms/FieldHint/FieldHint.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Connected field description",
      description:
        "Edit Children and inspect the native label or description relationship; static error text does not duplicate announcements.",
      code: basicCode,
      Component: FieldHintExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
