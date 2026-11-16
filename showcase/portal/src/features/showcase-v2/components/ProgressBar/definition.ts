"use client";
import { NormalizedRangeExample } from "./NormalizedRangeExample";
import { normalizedRangeCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ProgressBarExample } from "./ProgressBar.example";
const definition = {
  slug: "progress-bar",
  name: "ProgressBar",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ProgressBar.sc.md",
  description: "A valid native range and its immediate semantic value.",
  properties: [
    {
      name: "value",
      type: "number",
      required: false,
      source: "ComponentProgressValueProps",
      defaultValue: null,
      description: "Valid caller-owned native/canonical value in its declared type.",
    },
    {
      name: "max",
      type: "number",
      required: false,
      source: "ComponentProgressValueProps",
      defaultValue: null,
      description: "Native measurement maximum.",
    },
    {
      name: "label",
      type: "string",
      required: true,
      source: "ComponentAccessibleNameProps",
      defaultValue: null,
      description: "Meaningful accessible name supplied by the caller.",
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
      name: "fullWidth",
      type: "boolean",
      required: false,
      source: "ComponentFullWidthProps",
      defaultValue: "true",
      description: "Expands within available inline space.",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      source: "ComponentAnimatedProps",
      defaultValue: "true",
      description: "False disables visual motion; native semantics and callbacks remain immediate.",
    },
    {
      name: "valueText",
      type: "string",
      required: false,
      source: "ProgressBarProps",
      defaultValue: null,
      description: "Optional human-readable measurement text.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLDivElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "ProgressBarProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ProgressBarProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/ProgressBar/ProgressBar.tsx · src/design-system/components/molecules/ProgressBar/ProgressBar.module.css",
    },
  ],
  examples: [
    {
      id: "normalized-range",
      title: "Normalized range boundaries",
      description:
        "Out-of-range and missing measurements use canonical normalization; no simulated progress.",
      code: normalizedRangeCode,
      Component: NormalizedRangeExample,
    },
    {
      id: "basic",
      title: "Measured range",
      description: "Choose an explicit measurement; progress is not simulated over time.",
      code: basicCode,
      Component: ProgressBarExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
