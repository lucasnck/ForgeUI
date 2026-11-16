"use client";
import type { TreeBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTreePreview } from "../Tree/useTreePreview";

export function useTreeBodyExample() {
  const { properties } = useExampleProperties<Pick<TreeBodyProps, "title">>("TreeBody");
  const view = useTreePreview({ partial: true, reject: false });
  useExamplePropertySnapshot("TreeBody", { title: "Title" });
  return { ...view, properties };
}
