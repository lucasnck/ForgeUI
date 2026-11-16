"use client";
import type { MenuItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useMenuPreview } from "../Menu/useMenuPreview";

export function useMenuItemExample() {
  const { properties } =
    useExampleProperties<Pick<MenuItemProps, "label" | "disabled" | "title">>("MenuItem");
  const view = useMenuPreview();
  useExamplePropertySnapshot("MenuItem", {
    label: "Label",
    disabled: false,
    title: "Title",
  });
  return { ...view, properties };
}
