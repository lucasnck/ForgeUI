"use client";
import type { PopupListboxItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { usePopupPreview } from "../PopupListbox/usePopupPreview";

export function usePopupListboxItemExample() {
  const { properties } =
    useExampleProperties<Pick<PopupListboxItemProps, "label" | "animated" | "title">>(
      "PopupListboxItem",
    );
  const view = usePopupPreview(properties.label ?? "Label");
  useExamplePropertySnapshot("PopupListboxItem", {
    label: "Label",
    animated: true,
    title: "Title",
  });
  return { ...view, properties };
}
