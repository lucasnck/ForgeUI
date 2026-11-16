"use client";

import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import type { ToastProps } from "../../molecules/Toast";
import type { NativeSectionRootProps, ToastRegionOptions, ToastRecord } from "../../../types";
import { NotificationContext } from "../../../internal/notifications/NotificationContext";
import { Toast } from "../../molecules/Toast";
import { VisuallyHidden } from "../../atoms/VisuallyHidden";
import { useToastRegionView } from "./useToastRegionView";
import styles from "./ToastRegion.module.css";

export interface ToastRegionProps extends NativeSectionRootProps, ToastRegionOptions {
  label: string;
  renderToast?(record: ToastRecord): ReactElement<ToastProps>;
}

function renderRecord(record: ToastRecord, renderToast: ToastRegionProps["renderToast"]) {
  if (!renderToast) return <Toast key={record.id} record={record} />;
  const rendered = renderToast(record);

  if (!isValidElement<ToastProps>(rendered) || rendered.type !== Toast) {
    throw new Error("ToastRegion renderToast must return a Toast.");
  }

  return cloneElement(rendered, { record, key: record.id });
}

export function ToastRegion(input: ToastRegionProps) {
  const {
    renderToast,
    queue,
    polite,
    assertive,
    sequence,
    label,
    className,
    rootRef,
    props,
    handlePointerEnter,
    handlePointerLeave,
    handleFocusCapture,
    handleBlurCapture,
  } = useToastRegionView(input);

  return (
    <NotificationContext value={queue}>
      <section
        {...props}
        ref={rootRef}
        tabIndex={props.tabIndex ?? -1}
        aria-label={label}
        role={undefined}
        aria-live="off"
        aria-busy={undefined}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-gap="2"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
      >
        <ol className={styles.list} aria-live="off">
          {queue.records.map((record) => renderRecord(record, renderToast))}
        </ol>
        <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
          <span key={sequence}>{polite}</span>
        </VisuallyHidden>
        <VisuallyHidden role="alert" aria-live="assertive" aria-atomic="true">
          <span key={sequence}>{assertive}</span>
        </VisuallyHidden>
      </section>
    </NotificationContext>
  );
}
