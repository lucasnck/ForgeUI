"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { StepperItemExample } from "./StepperItem.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "StepperItem",
  slug: "stepper-item",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/StepperItem.sc.md",
  description: "Public Stepper region with paired indexed steps and panels.",
  properties: [
    {
      name: "value",
      type: "string",
      defaultValue: null,
      required: true,
      description:
        "Stable identity paired with exactly one StepperPanel; not edited across records.",
      source: "StepperItemProps",
    },
    {
      name: "label",
      type: "string",
      defaultValue: null,
      required: true,
      description: "Option label prefix with original one-based index.",
      source: "StepperItemProps",
    },
    {
      name: "status",
      type: "StepStatus",
      defaultValue: "pending",
      required: false,
      description: "Caller-owned status; never inferred by DS activation.",
      source: "StepperItemProps",
    },
    {
      name: "statusLabel",
      type: "string",
      defaultValue: null,
      required: false,
      description: "Required nonblank visible label for complete/error, indexed per item.",
      source: "StepperItemProps",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      required: false,
      description: "Disables the generated native step button.",
      source: "StepperItemProps",
    },
    {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      required: false,
      description: "Shared animation opt-out.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "title",
      type: "string",
      defaultValue: null,
      required: false,
      description: "Native title; repeated item/panel titles preserve original index.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/StepperItem/StepperItem.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "Stepper owns selection; native Tab order, aria-current and matching mounted hidden panels. Caller supplies drafts, validation and Footer actions.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Registered step control",
      description: "Registered step control",
      code: basicCode,
      Component: StepperItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
