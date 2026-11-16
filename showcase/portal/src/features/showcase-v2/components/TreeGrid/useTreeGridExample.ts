"use client";
import type { TreeGridProps } from "@forge-ui/web";
import type { TreeGridRecord } from "./fixtures";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridExample() {
  const { properties } =
    useExampleProperties<
      Pick<TreeGridProps<TreeGridRecord>, "label" | "direction" | "animated" | "title">
    >("TreeGrid");
  const view = useTreeGridPreview({ partial: false });
  useExamplePropertySnapshot("TreeGrid", {
    label: "Label",
    direction: "ltr",
    animated: true,
    title: "Title",
  });
  return { ...view, properties };
}
