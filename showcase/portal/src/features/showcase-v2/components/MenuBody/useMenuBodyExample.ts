"use client";
import type { MenuBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useMenuPreview } from "../Menu/useMenuPreview";

export function useMenuBodyExample() {
  const { properties } = useExampleProperties<Pick<MenuBodyProps, "title">>("MenuBody");
  const view = useMenuPreview();
  useExamplePropertySnapshot("MenuBody", { title: "Title" });
  return { ...view, properties };
}
