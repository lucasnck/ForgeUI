"use client";
import type { StepperHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useStepperPreview } from "../Stepper/useStepperPreview";

export function useStepperHeaderExample() {
  const { properties } = useExampleProperties<Pick<StepperHeaderProps, "title">>("StepperHeader");
  const view = useStepperPreview();
  useExamplePropertySnapshot("StepperHeader", { title: "Title" });
  return { ...view, properties };
}
