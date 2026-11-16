"use client";
import type { StepperBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useStepperPreview } from "../Stepper/useStepperPreview";

export function useStepperBodyExample() {
  const { properties } = useExampleProperties<Pick<StepperBodyProps, "title">>("StepperBody");
  const view = useStepperPreview();
  useExamplePropertySnapshot("StepperBody", { title: "Title" });
  return { ...view, properties };
}
