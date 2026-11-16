"use client";
import type { StepperPanelProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useStepperPreview } from "../Stepper/useStepperPreview";

export function useStepperPanelExample() {
  const { properties } =
    useExampleProperties<Pick<StepperPanelProps, "children" | "title">>("StepperPanel");
  const view = useStepperPreview();
  useExamplePropertySnapshot("StepperPanel", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
