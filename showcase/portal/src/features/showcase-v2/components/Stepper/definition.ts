"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { StepperExample, StepperReviewExample } from "./Stepper.example";
import { basicCode, reviewCode } from "./usage-code";
const definition = {
  name: "Stepper",
  slug: "stepper",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/Stepper.sc.md",
  description: "Controlled local steps with paired panels and caller validation.",
  properties: [
    {
      name: "label",
      type: "string",
      defaultValue: null,
      required: true,
      description: "Accessible navigation name.",
      source: "StepperProps",
    },
    {
      name: "value",
      type: "string",
      defaultValue: null,
      required: true,
      description: "Caller-controlled current step.",
      source: "StepperProps",
    },
    {
      name: "children",
      type: "ReactNode",
      defaultValue: null,
      required: true,
      description:
        "Required public Header and Body with matching Item/Panel values; optional Footer.",
      source: "ComponentChildrenProps",
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
  events: [
    {
      name: "onStepChange",
      signature: "(value: string) => void",
      description:
        "Request from an enabled registered step; caller accepts or rejects. Footer actions share caller validation; they do not emit a synthetic DS event.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/Stepper/Stepper.tsx",
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
      title: "Linear local entry",
      description: "Linear local entry",
      code: basicCode,
      Component: StepperExample,
    },
    {
      id: "review",
      title: "Review and edit",
      description: "Caller validation gates navigation; hidden panels retain drafts.",
      code: reviewCode,
      Component: StepperReviewExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
