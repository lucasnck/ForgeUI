"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FieldErrorExample } from "./FieldError.example";
const definition = {
  slug: "field-error",
  name: "FieldError",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/FieldError.sc.md",
  description: "A native field description connected to its control.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "FieldErrorProps / inherited native root",
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
      defaultValue: "danger",
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
      name: "announce",
      type: "boolean",
      required: false,
      source: "FieldErrorProps",
      defaultValue: "true",
      description:
        "Uses alert semantics when enabled; disable for static/already announced errors.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "FieldErrorProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FieldErrorProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/FieldError/FieldError.tsx · src/design-system/components/atoms/FieldError/FieldError.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Connected field description",
      description:
        "Edit Children and inspect the native label or description relationship; static error text does not duplicate announcements.",
      code: basicCode,
      Component: FieldErrorExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
