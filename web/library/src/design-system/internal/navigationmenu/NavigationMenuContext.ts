"use client";

import { createContext, useContext } from "react";
import type { ElementType } from "react";

export const NavigationMenuContext = createContext<{ label: string; Item: ElementType } | null>(
  null,
);

export function useNavigationMenuContext() {
  const value = useContext(NavigationMenuContext);
  if (!value) throw new Error("NavigationMenu parts must be rendered inside NavigationMenu.");
  return value;
}
