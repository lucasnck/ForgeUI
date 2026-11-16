"use client";
import type { TreeGridHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridHeaderExample() {
  const { properties } = useExampleProperties<Pick<TreeGridHeaderProps, "title">>("TreeGridHeader");
  const view = useTreeGridPreview({ partial: true });
  useExamplePropertySnapshot("TreeGridHeader", { title: "Title" });
  return { ...view, properties };
}
