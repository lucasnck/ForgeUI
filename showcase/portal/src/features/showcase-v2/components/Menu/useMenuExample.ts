"use client";
import type { MenuProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useMenuPreview } from "../Menu/useMenuPreview";

export function useMenuExample() {
  const { properties } =
    useExampleProperties<Pick<MenuProps, "label" | "animated" | "title">>("Menu");
  const view = useMenuPreview();
  useExamplePropertySnapshot("Menu", {
    label: "Label",
    animated: true,
    title: "Title",
  });
  return { ...view, properties };
}
