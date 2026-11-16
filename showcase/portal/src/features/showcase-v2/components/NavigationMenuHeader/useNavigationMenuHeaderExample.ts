"use client";
import type { NavigationMenuHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNavigationPreview } from "../NavigationMenu/useNavigationPreview";

export function useNavigationMenuHeaderExample() {
  const binding =
    useExampleProperties<Pick<NavigationMenuHeaderProps, "children" | "title">>(
      "NavigationMenuHeader",
    );
  const view = useNavigationPreview(false);
  useExamplePropertySnapshot("NavigationMenuHeader", {
    children: "Children",
    title: "Title",
  });
  return { ...view, properties: binding.properties };
}
