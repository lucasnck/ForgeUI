"use client";
import type { StepperItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useStepperPreview } from "../Stepper/useStepperPreview";

export function useStepperItemExample() {
  const { properties } =
    useExampleProperties<
      Pick<StepperItemProps, "label" | "status" | "statusLabel" | "disabled" | "animated" | "title">
    >("StepperItem");
  const view = useStepperPreview();
  useExamplePropertySnapshot("StepperItem", {
    label: "Label",
    status: "pending",
    statusLabel: "StatusLabel",
    disabled: false,
    animated: true,
    title: "Title",
  });
  return { ...view, properties };
}
