"use client";
import type { TreeGridCellProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridCellExample() {
  const { properties } =
    useExampleProperties<Pick<TreeGridCellProps, "children" | "title">>("TreeGridCell");
  const view = useTreeGridPreview({
    partial: true,
    cellPrefix: String(properties.children ?? "Children"),
  });
  useExamplePropertySnapshot("TreeGridCell", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
