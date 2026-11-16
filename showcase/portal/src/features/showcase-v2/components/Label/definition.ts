"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { LabelExample } from "./Label.example";
const definition = {
  slug: "label",
  name: "Label",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Label.sc.md",
  description: "A native field description connected to its control.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "LabelProps / inherited native root",
    },
    {
      name: "size",
      type: "ComponentTextSize",
      required: false,
      source: "ComponentTextSizeProps",
      defaultValue: "md",
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTextTone",
      required: false,
      source: "ComponentTextToneProps",
      defaultValue: "default",
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "weight",
      type: "ComponentFontWeight",
      required: false,
      source: "ComponentFontWeightProps",
      defaultValue: "semibold",
      description: "Canonical font weight.",
    },
    {
      name: "htmlFor",
      type: "string",
      required: true,
      source: "LabelProps",
      defaultValue: null,
      description: "Unique ID of the associated native control.",
    },
    {
      name: "required",
      type: "boolean",
      required: false,
      source: "LabelProps",
      defaultValue: "false",
      description: "Required indication; validation stays native or caller-owned.",
    },
    {
      name: "native attributes",
      type: "LabelHTMLAttributes<HTMLLabelElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "LabelProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "LabelProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Label/Label.tsx · src/design-system/components/atoms/Label/Label.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Connected field description",
      description:
        "Edit Children and inspect the native label or description relationship; static error text does not duplicate announcements.",
      code: basicCode,
      Component: LabelExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
