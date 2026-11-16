"use client";
import type { MenuFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useMenuPreview } from "../Menu/useMenuPreview";

export function useMenuFooterExample() {
  const { properties } =
    useExampleProperties<Pick<MenuFooterProps, "children" | "title">>("MenuFooter");
  const view = useMenuPreview();
  useExamplePropertySnapshot("MenuFooter", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties };
}
