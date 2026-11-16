"use client";
import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type { RovingFocusContract } from "../../types";
export interface MenuIdentity {
  value: string;
  disabled?: boolean;
}
export interface MenuContextValue {
  label: string;
  focus: RovingFocusContract;
  activate(value: string): void;
  dismiss?(): void;
  bodyRef: RefObject<HTMLUListElement | null>;
  fallback: boolean;
  animated: boolean;
}
export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  const value = useContext(MenuContext);
  if (!value) throw new Error("Menu parts must be inside Menu.");
  return value;
}
