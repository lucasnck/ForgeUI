"use client";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuHeaderProps } from "./MenuHeader";

export function useMenuHeader(input: MenuHeaderProps) {
  useMenuContext();
  return input;
}
