"use client";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import { useToast } from "@forge-ui/web";
import type { ToastRecord } from "@forge-ui/web";

export function useToastActions(id: string, nextRecord: () => ToastRecord, onAction: () => void) {
  const queue = useToast();
  const copy = useResourceExampleCopy();

  return {
    copy,
    dismiss: () => queue.dismiss(id),
    add: () => queue.add(nextRecord()),
    action: onAction,
  };
}
