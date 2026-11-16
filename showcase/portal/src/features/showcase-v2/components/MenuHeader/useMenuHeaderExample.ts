"use client";
import type { MenuHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useMenuPreview } from "../Menu/useMenuPreview";

export function useMenuHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<MenuHeaderProps, "children" | "title">>("MenuHeader");
  const view = useMenuPreview();
  useExamplePropertySnapshot("MenuHeader", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
