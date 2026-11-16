"use client";
import type { NavigationMenuSublistProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNavigationPreview } from "../NavigationMenu/useNavigationPreview";

export function useNavigationMenuSublistExample() {
  const binding =
    useExampleProperties<Pick<NavigationMenuSublistProps, "title">>("NavigationMenuSublist");
  const view = useNavigationPreview(true);
  useExamplePropertySnapshot("NavigationMenuSublist", { title: "Title" });
  return { ...view, properties: binding.properties };
}
