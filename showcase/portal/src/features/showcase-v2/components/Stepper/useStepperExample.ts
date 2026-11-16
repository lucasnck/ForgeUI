"use client";
import type { StepperProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useStepperPreview } from "./useStepperPreview";

export function useStepperExample(review = false) {
  const binding = useExampleProperties<Pick<StepperProps, "label" | "value" | "title">>("Stepper");
  const view = useStepperPreview(
    review,
    binding.properties.value,
    binding.bindChange("value", () => undefined),
  );
  useExamplePropertySnapshot("Stepper", {
    label: "Label",
    title: "Title",
    value: view.value,
  });
  return { ...view, properties: binding.properties };
}
