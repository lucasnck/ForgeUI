"use client";
import { FormattingTextExample } from "./FormattingTextExample";
import { formattingNamespaceCode } from "./usage-code";
import { RelativeTimeTextExample } from "./RelativeTimeTextExample";
import { relativeTimeCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode, durationCode } from "./usage-code";
import { TextExample } from "./Text.example";
import { DurationTextExample } from "./DurationText.example";
const definition = {
  slug: "text",
  name: "Text",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Text.sc.md",
  description: "Semantic text with independent visual size and weight.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "TextProps / inherited native root",
    },
    {
      name: "size",
      type: "ComponentTextSize",
      required: false,
      source: "ComponentTextSizeProps",
      defaultValue: null,
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTextTone",
      required: false,
      source: "ComponentTextToneProps",
      defaultValue: null,
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "weight",
      type: "ComponentFontWeight",
      required: false,
      source: "ComponentFontWeightProps",
      defaultValue: null,
      description: "Canonical font weight.",
    },
    {
      name: "as",
      type: "TextElement",
      required: false,
      source: "TextProps",
      defaultValue: "span",
      description: "Supported semantic root element.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "TextProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "TextProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Text/Text.tsx · src/design-system/components/atoms/Text/Text.module.css",
    },
  ],
  examples: [
    {
      id: "formatting-namespace",
      title: "Formatter and validator namespace",
      description:
        "Every public formatter is paired with its canonical validator and deterministic valid inputs.",
      code: formattingNamespaceCode,
      Component: FormattingTextExample,
    },
    {
      id: "relative-time",
      title: "Deterministic relative time",
      description:
        "Past, present and future use a fixed reference instant; no clock or timer is read.",
      code: relativeTimeCode,
      Component: RelativeTimeTextExample,
    },
    {
      id: "basic",
      title: "Semantic typography",
      description:
        "Edit Children or load long content; compare the semantic element, visual size, weight and wrapping.",
      code: basicCode,
      Component: TextExample,
    },
    {
      id: "elapsed-duration",
      title: "Elapsed duration",
      description:
        "Public duration helpers render fixed elapsed seconds with explicit locales; no timer or civil-date conversion is involved.",
      code: durationCode,
      Component: DurationTextExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
