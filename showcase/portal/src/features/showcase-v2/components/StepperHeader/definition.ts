"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { StepperHeaderExample } from "./StepperHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "StepperHeader",
  slug: "stepper-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/StepperHeader.sc.md",
  description: "Public Stepper region with paired indexed steps and panels.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: null,
      required: false,
      description: "Public StepperItem children; structured, not replaced by text.",
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
      description: "src/design-system/components/atoms/StepperHeader/StepperHeader.tsx",
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
      title: "StepperHeader contextual region",
      description: "StepperHeader contextual region",
      code: basicCode,
      Component: StepperHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
