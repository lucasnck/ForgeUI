"use client";
import { createContext, useContext } from "react";
import type { OverlayLayerContract } from "../../types";
export interface PopoverContextValue {
  open: boolean;
  requestOpen(open: boolean): void;
  overlay: OverlayLayerContract;
}
export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopoverContext() {
  const value = useContext(PopoverContext);
  if (!value) throw new Error("Popover parts must be inside Popover.");
  return value;
}
