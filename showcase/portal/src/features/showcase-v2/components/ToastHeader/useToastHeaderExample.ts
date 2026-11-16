"use client";
import type { ToastHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useToastPreview } from "../ToastRegion/useToastPreview";

export function useToastHeaderExample(timed = false) {
  const { properties } =
    useExampleProperties<Pick<ToastHeaderProps, "children" | "title">>("ToastHeader");
  const view = useToastPreview(timed, true);
  useExamplePropertySnapshot("ToastHeader", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
