"use client";
import type { ToastProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useToastPreview } from "../ToastRegion/useToastPreview";

export function useToastExample(timed = false) {
  const { properties } =
    useExampleProperties<Pick<ToastProps, "animated" | "animationEffect" | "title">>("Toast");
  const view = useToastPreview(timed, true);
  useExamplePropertySnapshot("Toast", {
    animated: true,
    animationEffect: "fade",
    title: "Title",
  });
  return { ...view, properties };
}
