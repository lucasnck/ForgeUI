"use client";

import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuFooterProps } from "./NavigationMenuFooter";

export function useNavigationMenuFooter({
  children,
  className,
  ...props
}: NavigationMenuFooterProps) {
  useNavigationMenuContext();
  return { props, children, className };
}
