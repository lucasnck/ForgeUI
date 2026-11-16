"use client";
import { useState } from "react";
import type { MenuProps } from "@forge-ui/web";

export function useMenuPreview() {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [actions, setActions] = useState(0);
  const [dismissals, setDismissals] = useState(0);

  const action: MenuProps["onAction"] = (value) => {
    setLastAction(value);
    setActions((n) => n + 1);
  };

  const dismiss: NonNullable<MenuProps["onDismiss"]> = () => setDismissals((n) => n + 1);

  return { action, dismiss, state: { lastAction, actions, dismissals } };
}
