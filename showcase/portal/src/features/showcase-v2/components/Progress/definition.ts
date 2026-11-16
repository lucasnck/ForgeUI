"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ProgressExample } from "./Progress.example";
const definition = {
  slug: "progress",
  name: "Progress",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Progress.sc.md",
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
      name: "native attributes",
      type: 'Omit<\n    ProgressHTMLAttributes<HTMLProgressElement>,\n    "value" | "max" | "children"\n  >',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "ProgressProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ProgressProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Progress/Progress.tsx · src/design-system/components/atoms/Progress/Progress.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Measured range",
      description: "Choose an explicit measurement; progress is not simulated over time.",
      code: basicCode,
      Component: ProgressExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
