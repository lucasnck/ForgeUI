"use client";

import { createContext, useContext } from "react";
import type { AnnouncementPoliteness } from "../../types/collection-contracts";

export interface AlertContextValue {
  titleId?: string;
  announcement: AnnouncementPoliteness;
}
export const AlertContext = createContext<AlertContextValue | null>(null);

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("Alert parts must be rendered inside Alert.");
  return context;
}
