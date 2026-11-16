"use client";
import type { TreeGridBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridBodyExample() {
  const { properties } = useExampleProperties<Pick<TreeGridBodyProps, "title">>("TreeGridBody");
  const view = useTreeGridPreview({ partial: true });
  useExamplePropertySnapshot("TreeGridBody", { title: "Title" });
  return { ...view, properties };
}
