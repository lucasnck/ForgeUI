"use client";

import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuHeaderProps } from "./NavigationMenuHeader";

export function useNavigationMenuHeader({
  children,
  className,
  ...props
}: NavigationMenuHeaderProps) {
  useNavigationMenuContext();
  return { props, children, className };
}
