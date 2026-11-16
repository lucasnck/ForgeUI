"use client";
import type { ListBoxFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useListBoxPreview } from "../ListBox/useListBoxPreview";

export function useListBoxFooterExample() {
  const { properties } = useExampleProperties<Pick<ListBoxFooterProps, "title">>("ListBoxFooter");
  const view = useListBoxPreview({ count: 5, mode: "multiple" });
  useExamplePropertySnapshot("ListBoxFooter", { title: "Title" });
  return { ...view, properties };
}
