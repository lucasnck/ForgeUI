"use client";

import { useContext } from "react";
import { NotificationContext } from "../../internal/notifications/NotificationContext";

export function useToast() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useToast must be used inside ToastRegion.");
  return context;
}
