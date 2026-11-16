"use client";
import type { TreeGridFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreeGridPreview } from "../TreeGrid/useTreeGridPreview";

export function useTreeGridFooterExample() {
  const { properties } =
    useExampleProperties<Pick<TreeGridFooterProps, "children" | "title">>("TreeGridFooter");
  const view = useTreeGridPreview({ partial: true });
  useExamplePropertySnapshot("TreeGridFooter", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
