"use client";

import { useId } from "react";
import type { AlertDialogProps } from "./AlertDialog";

export function useAlertDialog(input: AlertDialogProps) {
  const { children, description, initialFocusRef, returnFocusRef, ...props } = input;
  const descriptionId = useId();
  if (!description.trim()) throw new Error("AlertDialog requires a nonempty plain description.");
  return { children, description, initialFocusRef, returnFocusRef, props, descriptionId };
}
