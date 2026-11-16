"use client";
import type { PopoverProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { usePopoverPreview } from "../Popover/usePopoverPreview";

export function usePopoverExample() {
  const binding =
    useExampleProperties<
      Pick<
        PopoverProps,
        "label" | "triggerLabel" | "open" | "animated" | "animationEffect" | "title"
      >
    >("Popover");
  const view = usePopoverPreview(
    binding.properties.open,
    binding.bindChange("open", () => undefined),
  );
  useExamplePropertySnapshot("Popover", {
    label: "Label",
    triggerLabel: "TriggerLabel",
    open: view.open,
    animated: true,
    animationEffect: "fade",
    title: "Title",
  });
  return { ...view, properties: binding.properties };
}
