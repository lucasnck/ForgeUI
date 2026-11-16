"use client";
import { useRef, useState } from "react";
import { useToastRegion } from "@forge-ui/web";
import type { ToastRecord, ToastDuration, NotificationUrgency } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useToastRegionResourceExample() {
  const fallbackRef = useRef<HTMLButtonElement>(null);
  const sequence = useRef(0);
  const [records, setRecords] = useState<readonly ToastRecord[]>([]);
  const [accept, setAccept] = useState(true);
  const [request, setRequest] = useState<readonly string[]>([]);
  const [duration, setDuration] = useState<ToastDuration>("persistent");
  const [urgency, setUrgency] = useState<NotificationUrgency>("normal");
  const [paused, setPaused] = useState(false);
  const queue = useToastRegion({
    records,
    onRecordsChange: change,
    fallbackRef,
  });
  const copy = useResourceExampleCopy();

  function change(next: readonly ToastRecord[]) {
    setRequest(next.map((r) => r.id));
    if (accept) setRecords(next);
  }

  function add() {
    const index = ++sequence.current;
    queue.add({
      id: `item-${index}`,
      title: `Title ${index}`,
      message: `Message ${index}`,
      dismissLabel: copy.dismiss,
      duration,
      urgency,
    });
  }

  function dismiss() {
    const first = queue.records[0];
    if (first) queue.dismiss(first.id);
  }

  function update() {
    setRecords((current) =>
      current.map((record, index) =>
        index === 0
          ? {
              ...record,
              message: `Message ${record.id.replace("item-", "")} · 2`,
            }
          : record,
      ),
    );
  }

  function togglePause(next: boolean) {
    setPaused(next);
    if (next) queue.pause("hover");
    else queue.resume("hover");
  }

  function changeDuration(value: string) {
    setDuration(value === "short" ? "short" : value === "long" ? "long" : "persistent");
  }

  function changeUrgency(value: string) {
    setUrgency(value === "urgent" ? "urgent" : "normal");
  }

  return {
    queue,
    fallbackRef,
    accept,
    setAccept,
    request,
    duration,
    changeDuration,
    urgency,
    changeUrgency,
    paused,
    togglePause,
    add,
    dismiss,
    update,
    copy,
  };
}
