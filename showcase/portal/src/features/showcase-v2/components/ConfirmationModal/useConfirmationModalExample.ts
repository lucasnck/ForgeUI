"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConfirmationModalProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useConfirmationModalExample(pending = false) {
  const binding =
    useExampleProperties<
      Pick<
        ConfirmationModalProps,
        | "title"
        | "children"
        | "open"
        | "animated"
        | "animationEffect"
        | "closeOnOutsideClick"
        | "closeLabel"
        | "cancelLabel"
        | "confirmLabel"
        | "loading"
        | "loadingLabel"
      >
    >("ConfirmationModal");
  const base = useDialogPreview(
    binding.properties.open,
    binding.bindChange("open", () => undefined),
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmRequests, setConfirmRequests] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  useEffect(() => clear, [clear]);

  function request(next: boolean) {
    if (!next) {
      clear();
      setLoading(false);
    }

    base.request(next);
  }

  function confirm() {
    if (timerRef.current !== null || loading) return;
    setConfirmRequests((n) => n + 1);

    if (pending) {
      setLoading(true);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setLoading(false);
        setConfirmed((n) => n + 1);
        base.close();
      }, 600);
    } else {
      setConfirmed((n) => n + 1);
      base.close();
    }
  }

  useExamplePropertySnapshot("ConfirmationModal", {
    title: "Title",
    children: "Children",
    open: base.open,
    animated: true,
    animationEffect: "fade",
    closeOnOutsideClick: false,
    closeLabel: base.copy.close,
    cancelLabel: base.copy.cancel,
    confirmLabel: base.copy.confirm,
    loading,
    loadingLabel: "LoadingLabel",
  });
  return {
    ...base,
    properties: binding.properties,
    request,
    confirm,
    loading: binding.properties.loading ?? loading,
    state: {
      ...base.state,
      loading: binding.properties.loading ?? loading,
      confirmRequests,
      confirmed,
    },
  };
}
