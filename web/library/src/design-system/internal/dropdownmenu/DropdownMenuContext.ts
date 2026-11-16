"use client";
import { createContext } from "react";
import type { OverlayLayerContract } from "../../types";
export interface DropdownMenuContextValue {
  dismiss(): void;
  overlay: OverlayLayerContract;
}
export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);
