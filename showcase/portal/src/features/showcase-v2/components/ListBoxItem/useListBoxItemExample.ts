"use client";
import type { ListBoxItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useListBoxPreview } from "../ListBox/useListBoxPreview";

export function useListBoxItemExample() {
  const { properties } =
    useExampleProperties<
      Pick<ListBoxItemProps, "label" | "disabled" | "size" | "tone" | "appearance" | "shape">
    >("ListBoxItem");
  const view = useListBoxPreview({
    count: 3,
    visual: properties,
    mode: "single",
    label: properties.label ?? "Label",
    firstDisabled: properties.disabled ?? false,
  });
  useExamplePropertySnapshot("ListBoxItem", {
    size: "md",
    tone: "brand",
    appearance: "ghost",
    shape: "rounded",
    label: "Label",
    disabled: false,
  });
  return {
    ...view,
    properties,
    state: {
      value: view.state.value,
      visibleSelected: view.state.visibleSelected,
      requested: view.state.requested,
      calls: view.state.calls,
      submissions: view.state.submissions,
      lastNativeValues: view.state.lastNativeValues,
    },
  };
}
