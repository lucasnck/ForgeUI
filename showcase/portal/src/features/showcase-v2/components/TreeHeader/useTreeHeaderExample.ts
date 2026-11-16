"use client";
import type { TreeHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreePreview } from "../Tree/useTreePreview";

export function useTreeHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<TreeHeaderProps, "children" | "title">>("TreeHeader");
  const view = useTreePreview({ partial: true, reject: false });
  useExamplePropertySnapshot("TreeHeader", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
