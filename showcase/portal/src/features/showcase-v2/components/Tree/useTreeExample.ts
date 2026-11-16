"use client";
import type { TreeProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreePreview } from "../Tree/useTreePreview";

export function useTreeExample(reject = false) {
  const { properties } =
    useExampleProperties<Pick<TreeProps, "label" | "animated" | "title">>("Tree");
  const view = useTreePreview({ partial: false, reject: reject });
  useExamplePropertySnapshot("Tree", {
    label: "Label",
    animated: true,
    title: "Title",
  });
  return { ...view, properties };
}
