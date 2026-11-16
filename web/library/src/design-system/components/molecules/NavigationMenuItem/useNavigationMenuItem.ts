"use client";

import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuItemProps } from "./NavigationMenuItem";

export function useNavigationMenuItem({
  label,
  href,
  current = false,
  animated = true,
  open,
  defaultOpen,
  onOpenChange,
  children,
  className,
  ...props
}: NavigationMenuItemProps) {
  useNavigationMenuContext();
  if (!label.trim()) throw new Error("NavigationMenuItem requires a nonempty label.");
  return {
    label,
    href,
    current,
    animated,
    open,
    defaultOpen,
    onOpenChange,
    children,
    className,
    props,
  };
}
