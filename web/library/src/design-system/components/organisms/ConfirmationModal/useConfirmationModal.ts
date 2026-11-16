"use client";

import { useRef } from "react";
import type { ConfirmationModalProps } from "./ConfirmationModal";

export function useConfirmationModal(input: ConfirmationModalProps) {
  const {
    title,
    closeLabel,
    cancelLabel,
    confirmLabel,
    onConfirm,
    loading = false,
    loadingLabel,
    children,
    initialFocusRef,
    ...props
  } = input;
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (![title, closeLabel, cancelLabel, confirmLabel].every((value) => value.trim())) {
    throw new Error("ConfirmationModal requires nonempty title and action labels.");
  }

  return {
    title,
    closeLabel,
    cancelLabel,
    confirmLabel,
    onConfirm,
    loading,
    loadingLabel,
    children,
    props,
    cancelRef,
    initialFocusRef: initialFocusRef ?? cancelRef,
  };
}
