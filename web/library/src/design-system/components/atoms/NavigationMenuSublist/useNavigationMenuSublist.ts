"use client";

import { useNavigationItemContext } from "../../../internal/navigationmenu/NavigationItemContext";
import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuSublistProps } from "./NavigationMenuSublist";

export function useNavigationMenuSublist({
  children,
  className,
  ...props
}: NavigationMenuSublistProps) {
  useNavigationItemContext();
  const { Item } = useNavigationMenuContext();

  return { children, props, className, Item };
}
