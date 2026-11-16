import type { ReactNode, RefObject } from "react";

export type ToastDuration = "persistent" | "short" | "long";

export type ToastPauseReason = "hover" | "focus" | "document-hidden";

export type NotificationUrgency = "normal" | "urgent";

export interface ToastRecord {
  id: string;
  title: string;
  message: string;
  duration?: ToastDuration;
  urgency?: NotificationUrgency;
  action?: ReactNode;
  dismissLabel: string;
}

export interface ToastRegionOptions {
  fallbackRef?: RefObject<HTMLElement | null>;
  records?: readonly ToastRecord[];
  defaultRecords?: readonly ToastRecord[];
  onRecordsChange?(records: readonly ToastRecord[]): void;
}

export interface ToastRegionContract {
  records: readonly ToastRecord[];
  announcement: {
    sequence: number;
    messages: readonly { text: string; urgency: NotificationUrgency }[];
  } | null;
  registerRecord(
    id: string,
    root: RefObject<HTMLElement | null>,
    action: RefObject<HTMLElement | null>,
  ): () => void;
  add(record: ToastRecord): void;
  dismiss(id: string): void;
  pause(reason: ToastPauseReason): void;
  resume(reason: ToastPauseReason): void;
}
