"use client";

import { createContext, useContext } from "react";
import type { CollapseContract } from "../../types/disclosure";

export const NavigationItemContext = createContext<CollapseContract | null>(null);

export function useNavigationItemContext() {
  const value = useContext(NavigationItemContext);
  if (!value)
    throw new Error("NavigationMenuSublist must be rendered inside a NavigationMenuItem group.");
  return value;
}
