"use client";

import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuBodyProps } from "./NavigationMenuBody";

export function useNavigationMenuBody({ children, className, ...props }: NavigationMenuBodyProps) {
  useNavigationMenuContext();
  return { props, children, className };
}
