"use client";
import type { ListBoxProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useListBoxPreview } from "./useListBoxPreview";

export function useListBoxExample(filtered = false) {
  const { properties } =
    useExampleProperties<
      Pick<
        ListBoxProps,
        "label" | "selectionMode" | "disabled" | "invalid" | "animated" | "name" | "title"
      >
    >("ListBox");
  const view = useListBoxPreview({
    mode: properties.selectionMode ?? (filtered ? "multiple" : "single"),
    name: properties.name ?? "Name",
  });
  useExamplePropertySnapshot("ListBox", {
    label: "Label",
    selectionMode: filtered ? "multiple" : "single",
    disabled: false,
    invalid: false,
    animated: true,
    name: "Name",
    title: "Title",
  });
  return { ...view, properties };
}
