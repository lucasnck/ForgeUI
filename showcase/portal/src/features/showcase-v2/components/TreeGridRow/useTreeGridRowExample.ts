"use client";
import type { TreeGridRowProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridRowExample() {
  const { properties } = useExampleProperties<Pick<TreeGridRowProps, "title">>("TreeGridRow");
  const view = useTreeGridPreview({ partial: true });
  useExamplePropertySnapshot("TreeGridRow", { title: "Title" });
  return { ...view, properties };
}
