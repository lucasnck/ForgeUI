"use client";
import type { TreeGridColumnHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridColumnHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<TreeGridColumnHeaderProps, "label">>("TreeGridColumnHeader");
  const view = useTreeGridPreview({ partial: true });
  useExamplePropertySnapshot("TreeGridColumnHeader", { label: "Label" });
  return { ...view, properties };
}
