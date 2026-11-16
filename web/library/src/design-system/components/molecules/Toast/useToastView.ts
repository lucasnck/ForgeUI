"use client";

import { useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useToast } from "../../../hooks/notifications";
import type { ToastProps } from "./Toast";

export function useToastView(input: ToastProps) {
  const {
    children,
    record,
    animated = true,
    animationEffect = "fade",
    ref,
    className,
    ...props
  } = input;
  if (!record.dismissLabel.trim()) throw new Error("Toast requires a nonempty dismissLabel.");
  const queue = useToast();
  const rootRef = useRef<HTMLLIElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => rootRef.current!, []);
  const registerRecord = queue.registerRecord;
  useLayoutEffect(() => {
    if (
      !actionRef.current?.isConnected ||
      actionRef.current.disabled ||
      !actionRef.current.getClientRects().length
    ) {
      actionRef.current =
        Array.from(
          rootRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [],
        ).find((button) => button.getClientRects().length > 0 && !button.closest("[inert]")) ??
        null;
    }

    return registerRecord(record.id, rootRef, actionRef);
  }, [record.id, registerRecord, children, queue.records]);
  const dismiss = () => queue.dismiss(record.id);

  return {
    children,
    record,
    animated,
    animationEffect,
    className,
    props,
    rootRef,
    actionRef,
    dismiss,
    context: { record, dismiss },
  };
}
