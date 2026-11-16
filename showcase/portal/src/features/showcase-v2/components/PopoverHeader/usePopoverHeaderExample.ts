"use client";
import type { PopoverHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { usePopoverPreview } from "../Popover/usePopoverPreview";

export function usePopoverHeaderExample() {
  const binding =
    useExampleProperties<Pick<PopoverHeaderProps, "children" | "title" | "divider">>(
      "PopoverHeader",
    );
  const view = usePopoverPreview();
  useExamplePropertySnapshot("PopoverHeader", {
    children: "Children",
    title: "Title",
    divider: true,
  });
  return { ...view, properties: binding.properties };
}
