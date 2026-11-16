"use client";
import type { NavigationMenuItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNavigationPreview } from "../NavigationMenu/useNavigationPreview";

export function useNavigationMenuItemExample() {
  const binding =
    useExampleProperties<Pick<NavigationMenuItemProps, "label" | "open" | "animated" | "title">>(
      "NavigationMenuItem",
    );
  const view = useNavigationPreview(
    true,
    binding.properties.open,
    binding.bindChange("open", () => undefined),
  );
  useExamplePropertySnapshot("NavigationMenuItem", {
    label: "Label",
    open: view.open,
    animated: true,
    title: "Title",
  });
  return { ...view, properties: binding.properties };
}
