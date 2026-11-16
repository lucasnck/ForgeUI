"use client";
import type { NavigationMenuFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNavigationPreview } from "../NavigationMenu/useNavigationPreview";

export function useNavigationMenuFooterExample() {
  const binding =
    useExampleProperties<Pick<NavigationMenuFooterProps, "children" | "title">>(
      "NavigationMenuFooter",
    );
  const view = useNavigationPreview(false);
  useExamplePropertySnapshot("NavigationMenuFooter", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties: binding.properties };
}
