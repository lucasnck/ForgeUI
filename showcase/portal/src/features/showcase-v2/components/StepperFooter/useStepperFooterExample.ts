"use client";
import type { StepperFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useStepperPreview } from "../Stepper/useStepperPreview";

export function useStepperFooterExample() {
  const { properties } =
    useExampleProperties<Pick<StepperFooterProps, "children" | "title">>("StepperFooter");
  const view = useStepperPreview();
  useExamplePropertySnapshot("StepperFooter", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
