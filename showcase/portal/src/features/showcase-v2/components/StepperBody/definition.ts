"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { StepperBodyExample } from "./StepperBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "StepperBody",
  slug: "stepper-body",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/StepperBody.sc.md",
  description: "Public Stepper region with paired indexed steps and panels.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: null,
      required: false,
      description: "Public StepperPanel children; structured, not replaced by text.",
      source: "Component children",
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
      description: "src/design-system/components/atoms/StepperBody/StepperBody.tsx",
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
      title: "StepperBody contextual region",
      description: "StepperBody contextual region",
      code: basicCode,
      Component: StepperBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
