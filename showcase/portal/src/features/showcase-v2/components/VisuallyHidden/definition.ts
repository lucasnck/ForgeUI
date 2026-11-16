"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { VisuallyHiddenExample } from "./VisuallyHidden.example";
const definition = {
  slug: "visually-hidden",
  name: "VisuallyHidden",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/VisuallyHidden.sc.md",
  description: "Supplementary accessible text without a separate focus target.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "VisuallyHiddenProps / inherited native root",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "VisuallyHiddenProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "VisuallyHiddenProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onClick",
      signature: "(event: MouseEvent<HTMLButtonElement>) => void",
      description: "Native button activation invokes the supplied callback; disabled prevents it.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/VisuallyHidden/VisuallyHidden.tsx · src/design-system/components/atoms/VisuallyHidden/VisuallyHidden.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Accessible supplementary text",
      description:
        "The icon button is named Children through its hidden content and reports native activation.",
      code: basicCode,
      Component: VisuallyHiddenExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
