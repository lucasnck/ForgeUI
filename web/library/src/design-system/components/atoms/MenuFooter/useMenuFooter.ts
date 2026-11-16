"use client";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuFooterProps } from "./MenuFooter";

export function useMenuFooter(input: MenuFooterProps) {
  useMenuContext();
  return input;
}
