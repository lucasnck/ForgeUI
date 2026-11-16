"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type {
  ToastPauseReason,
  ToastRecord,
  ToastRegionContract,
  ToastRegionOptions,
} from "../../types/notifications";
import { notificationBudget } from "./budgets";

type Registration = { root: RefObject<HTMLElement | null>; action: RefObject<HTMLElement | null> };

export function useToastRegion(options: ToastRegionOptions): ToastRegionContract {
  const [local, setLocal] = useState<readonly ToastRecord[]>(options.defaultRecords ?? []);
  const records = options.records ?? local;
  const ids = records.map((record) => record.id);

  if (ids.some((id) => !id.trim()) || new Set(ids).size !== ids.length) {
    throw new Error("Toast record ids must be nonempty and unique.");
  }

  const [announcement, setAnnouncement] = useState<ToastRegionContract["announcement"]>(null);
  const [pauseVersion, setPauseVersion] = useState(0);
  const reasons = useRef(new Set<ToastPauseReason>());
  const remaining = useRef(new Map<string, number>());
  const expired = useRef(new Set<string>());
  const seen = useRef(new Map<string, string>());
  const initialized = useRef(false);
  const sequence = useRef(0);
  const registry = useRef(new Map<string, Registration>());
  const origins = useRef(new Map<string, HTMLElement>());
  const focusedRecord = useRef<string | null>(null);
  const latest = useRef({ options, records });
  useLayoutEffect(() => {
    latest.current = { options, records };
  });

  const request = useCallback((next: readonly ToastRecord[]): void => {
    if (latest.current.options.records === undefined) {
      latest.current.records = next;
      setLocal(next);
    }

    latest.current.options.onRecordsChange?.(next);
  }, []);
  const dismiss = useCallback(
    (id: string): void => {
      const current = latest.current.records;
      if (!current.some((record) => record.id === id)) return;
      request(current.filter((record) => record.id !== id));
    },
    [request],
  );
  const pause = useCallback((reason: ToastPauseReason): void => {
    if (reasons.current.has(reason)) return;
    reasons.current.add(reason);
    setPauseVersion((version) => version + 1);
  }, []);
  const resume = useCallback((reason: ToastPauseReason): void => {
    if (!reasons.current.delete(reason)) return;
    setPauseVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const ids = records.map((record) => record.id);
    const signatures = new Map(
      records.map((record) => [
        record.id,
        JSON.stringify([record.title, record.message, record.urgency ?? "normal"]),
      ]),
    );
    const added = records.filter(
      (record) => seen.current.get(record.id) !== signatures.get(record.id),
    );

    if (initialized.current) {
      const active = document.activeElement;

      if (active instanceof HTMLElement) {
        for (const record of added) {
          if (!seen.current.has(record.id) && !origins.current.has(record.id))
            origins.current.set(record.id, active);
        }
      }
    }

    if (initialized.current && added.length)
      setAnnouncement({
        sequence: ++sequence.current,
        messages: added.map((record) => ({
          text: [record.title, record.message].filter(Boolean).join(". "),
          urgency: record.urgency ?? "normal",
        })),
      });

    for (const id of seen.current.keys()) {
      if (ids.includes(id)) continue;

      if (focusedRecord.current === id) {
        const previousIds = [...seen.current.keys()];
        const position = previousIds.indexOf(id);
        const candidates = [
          ...previousIds.slice(position + 1),
          ...previousIds.slice(0, position).reverse(),
          ...ids,
        ];
        const next = candidates
          .filter((candidate) => ids.includes(candidate))
          .map((candidate) => registry.current.get(candidate)?.action.current)
          .find((element) => element?.isConnected);
        const origin = origins.current.get(id);
        const fallback = latest.current.options.fallbackRef?.current;
        focusedRecord.current = null;
        if (!next) resume("focus");
        (next ?? (origin?.isConnected ? origin : fallback?.isConnected ? fallback : null))?.focus();
      }

      origins.current.delete(id);
      remaining.current.delete(id);
      expired.current.delete(id);
    }

    seen.current = signatures;
    initialized.current = true;
    // A new authoritative records snapshot permits another request. Merely
    // pausing or rerendering an unchanged rejected queue does not.
    expired.current.clear();
  }, [records, resume]);

  useEffect(() => {
    const onVisibility = () =>
      document.hidden ? pause("document-hidden") : resume("document-hidden");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pause, resume]);

  useEffect(() => {
    const timers: { id: string; started: number; timer: ReturnType<typeof setTimeout> }[] = [];
    const budgets = remaining.current;

    for (const record of records) {
      const budget = notificationBudget(record);

      if (budget === null) {
        remaining.current.delete(record.id);
        continue;
      }

      if (!remaining.current.has(record.id)) remaining.current.set(record.id, budget);
      if (reasons.current.size || expired.current.has(record.id)) continue;
      const started = Date.now();
      const timer = setTimeout(() => {
        expired.current.add(record.id);
        remaining.current.set(record.id, 0);
        dismiss(record.id);
      }, remaining.current.get(record.id));
      timers.push({ id: record.id, started, timer });
    }

    return () => {
      for (const { id, started, timer } of timers) {
        clearTimeout(timer);
        budgets.set(id, Math.max(0, (budgets.get(id) ?? 0) - (Date.now() - started)));
      }
    };
  }, [records, pauseVersion, dismiss]);

  const registerRecord = useCallback<ToastRegionContract["registerRecord"]>((id, root, action) => {
    const registration = { root, action };
    registry.current.set(id, registration);
    const element = root.current;

    const onFocus = () => {
      focusedRecord.current = id;
    };

    const onBlur = (event: FocusEvent) => {
      if (event.relatedTarget && !element?.contains(event.relatedTarget as Node))
        focusedRecord.current = null;
    };

    element?.addEventListener("focusin", onFocus);
    element?.addEventListener("focusout", onBlur);

    return () => {
      element?.removeEventListener("focusin", onFocus);
      element?.removeEventListener("focusout", onBlur);
      if (registry.current.get(id) === registration) registry.current.delete(id);
    };
  }, []);

  return {
    records,
    announcement,
    dismiss,
    pause,
    resume,
    registerRecord,
    add(record) {
      if (!record.id.trim() || latest.current.records.some((current) => current.id === record.id)) {
        throw new Error("Toast record ids must be nonempty and unique.");
      }

      const active = document.activeElement;
      if (active instanceof HTMLElement) origins.current.set(record.id, active);
      request([...latest.current.records, record]);
    },
  };
}
