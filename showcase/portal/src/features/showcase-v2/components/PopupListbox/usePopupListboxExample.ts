"use client";
import type { PopupListboxProps, ChoiceOption } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { usePopupPreview } from "../PopupListbox/usePopupPreview";

export function usePopupListboxExample() {
  const { properties } =
    useExampleProperties<
      Pick<PopupListboxProps<ChoiceOption>, "listboxLabel" | "animated" | "animationEffect">
    >("PopupListbox");
  const view = usePopupPreview();
  useExamplePropertySnapshot("PopupListbox", {
    listboxLabel: "ListboxLabel",
    animated: true,
    animationEffect: "scale",
  });
  return { ...view, properties };
}
