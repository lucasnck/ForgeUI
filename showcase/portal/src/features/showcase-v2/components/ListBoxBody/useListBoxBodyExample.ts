"use client";
import type { ListBoxBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useListBoxPreview } from "../ListBox/useListBoxPreview";

export function useListBoxBodyExample() {
  const { properties } = useExampleProperties<Pick<ListBoxBodyProps, "title">>("ListBoxBody");
  const view = useListBoxPreview({ count: 3, mode: "single" });
  useExamplePropertySnapshot("ListBoxBody", { title: "Title" });
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
