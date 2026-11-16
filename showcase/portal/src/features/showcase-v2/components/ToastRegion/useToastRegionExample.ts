"use client";
import type { ToastRegionProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useToastPreview } from "../ToastRegion/useToastPreview";

export function useToastRegionExample(timed = false) {
  const { properties } =
    useExampleProperties<Pick<ToastRegionProps, "label" | "title">>("ToastRegion");
  const view = useToastPreview(timed, false);
  useExamplePropertySnapshot("ToastRegion", { label: "Label", title: "Title" });
  return { ...view, properties };
}
