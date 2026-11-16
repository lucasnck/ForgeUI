"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { StepperFooterExample } from "./StepperFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "StepperFooter",
  slug: "stepper-footer",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/StepperFooter.sc.md",
  description: "Public Stepper region with paired indexed steps and panels.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: null,
      required: false,
      description: "Content slot; panel text keeps original one-based indices.",
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
      description: "src/design-system/components/atoms/StepperFooter/StepperFooter.tsx",
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
      title: "StepperFooter contextual region",
      description: "StepperFooter contextual region",
      code: basicCode,
      Component: StepperFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
