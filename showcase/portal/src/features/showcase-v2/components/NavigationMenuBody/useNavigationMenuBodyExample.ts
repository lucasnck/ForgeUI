"use client";
import type { NavigationMenuBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNavigationPreview } from "../NavigationMenu/useNavigationPreview";

export function useNavigationMenuBodyExample() {
  const binding =
    useExampleProperties<Pick<NavigationMenuBodyProps, "title">>("NavigationMenuBody");
  const view = useNavigationPreview(false);
  useExamplePropertySnapshot("NavigationMenuBody", { title: "Title" });
  return { ...view, properties: binding.properties };
}
