"use client";

import { createContext, useContext } from "react";
import type { ToastRecord } from "../../types/notifications";

export const ToastContext = createContext<{ record: ToastRecord; dismiss(): void } | null>(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("Toast parts must be rendered inside Toast.");
  return context;
}
