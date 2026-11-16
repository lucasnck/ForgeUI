"use client";
import type { ToastFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useToastPreview } from "../ToastRegion/useToastPreview";

export function useToastFooterExample(timed = false) {
  const { properties } =
    useExampleProperties<Pick<ToastFooterProps, "children" | "title">>("ToastFooter");
  const view = useToastPreview(timed, true);
  useExamplePropertySnapshot("ToastFooter", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
