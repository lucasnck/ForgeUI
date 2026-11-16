"use client";
import type { PopoverFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { usePopoverPreview } from "../Popover/usePopoverPreview";

export function usePopoverFooterExample() {
  const binding =
    useExampleProperties<Pick<PopoverFooterProps, "children" | "title" | "divider">>(
      "PopoverFooter",
    );
  const view = usePopoverPreview();
  useExamplePropertySnapshot("PopoverFooter", {
    children: "Children",
    title: "Title",
    divider: true,
  });
  return { ...view, properties: binding.properties };
}
