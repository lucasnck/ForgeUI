"use client";
import type { PopoverBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { usePopoverPreview } from "../Popover/usePopoverPreview";

export function usePopoverBodyExample() {
  const binding = useExampleProperties<Pick<PopoverBodyProps, "children" | "title">>("PopoverBody");
  const view = usePopoverPreview();
  useExamplePropertySnapshot("PopoverBody", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties: binding.properties };
}
