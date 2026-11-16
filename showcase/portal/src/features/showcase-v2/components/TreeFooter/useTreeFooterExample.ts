"use client";
import type { TreeFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreePreview } from "../Tree/useTreePreview";

export function useTreeFooterExample() {
  const { properties } =
    useExampleProperties<Pick<TreeFooterProps, "children" | "title">>("TreeFooter");
  const view = useTreePreview({ partial: true, reject: false });
  useExamplePropertySnapshot("TreeFooter", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
