"use client";
import type { NavigationMenuProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNavigationPreview } from "../NavigationMenu/useNavigationPreview";

export function useNavigationMenuExample(nested = false) {
  const binding =
    useExampleProperties<Pick<NavigationMenuProps, "label" | "title">>("NavigationMenu");
  const view = useNavigationPreview(nested);
  useExamplePropertySnapshot("NavigationMenu", {
    label: "Label",
    title: "Title",
  });
  return { ...view, properties: binding.properties };
}
