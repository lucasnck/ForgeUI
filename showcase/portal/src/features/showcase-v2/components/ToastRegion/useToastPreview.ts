"use client";
import { useRef, useState } from "react";
import type { ToastRecord } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import { makeToast, toastIndices } from "./fixtures";

export function useToastPreview(timed = false, partial = false) {
  const copy = useResourceExampleCopy();
  const fallbackRef = useRef<HTMLButtonElement>(null);
  const sequence = useRef(timed ? 3 : partial ? 1 : 2);
  const [records, setRecords] = useState<readonly ToastRecord[]>(() =>
    (timed ? [] : toastIndices)
      .slice(0, partial ? 1 : 2)
      .map((index) => makeToast(index, copy.dismiss, timed)),
  );
  const [requests, setRequests] = useState(0);
  const [actions, setActions] = useState(0);

  function change(next: readonly ToastRecord[]) {
    setRecords(next);
    setRequests((n) => n + 1);
  }

  function action() {
    setActions((n) => n + 1);
  }

  function nextRecord() {
    return makeToast(++sequence.current, copy.dismiss, timed);
  }

  function restore() {
    setRecords(
      toastIndices
        .slice(0, timed ? 3 : partial ? 1 : 2)
        .map((index) => makeToast(index, copy.dismiss, timed)),
    );
  }

  function update() {
    setRecords((current) =>
      current.map((record, index) =>
        index === 0 ? { ...record, message: record.message + " · 2" } : record,
      ),
    );
  }

  return {
    copy,
    fallbackRef,
    records,
    change,
    action,
    nextRecord,
    restore,
    update,
    state: {
      records: records.map(({ id, title, message, duration, urgency }) => ({
        id,
        title,
        message,
        duration,
        urgency,
      })),
      requests,
      actions,
    },
  };
}
