"use client";
import type { ToastBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useToastPreview } from "../ToastRegion/useToastPreview";

export function useToastBodyExample(timed = false) {
  const { properties } =
    useExampleProperties<Pick<ToastBodyProps, "children" | "title">>("ToastBody");
  const view = useToastPreview(timed, true);
  useExamplePropertySnapshot("ToastBody", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
