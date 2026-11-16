"use client";

import type {
  ComponentAnimationEffectProps,
  NativeWidgetItemProps,
  ToastRecord,
} from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { ToastContext } from "../../../internal/toast/ToastContext";
import { Surface } from "../../atoms/Surface";
import { Button } from "../../atoms/Button";
import { ToastHeader } from "../../atoms/ToastHeader";
import { ToastBody } from "../../atoms/ToastBody";
import { ToastFooter } from "../ToastFooter";
import { useToastView } from "./useToastView";
import styles from "./Toast.module.css";
import effects from "../../../styles/animations/surface-animations.module.css";

export interface ToastProps extends NativeWidgetItemProps, ComponentAnimationEffectProps {
  record: ToastRecord;
}

export function Toast(input: ToastProps) {
  const {
    children,
    record,
    animated,
    animationEffect,
    className,
    props,
    rootRef,
    actionRef,
    dismiss,
    context,
  } = useToastView(input);
  const parts =
    children == null
      ? null
      : collectCompoundParts(
          children,
          { header: ToastHeader, body: ToastBody, footer: ToastFooter },
          ["body"],
        );

  return (
    <ToastContext value={context}>
      <li
        {...props}
        ref={rootRef}
        aria-live="off"
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        <Surface
          gap="2"
          padding="2"
          className={effects[animationEffect]}
          data-motion-state="entered"
          data-animated={animated}
        >
          {parts ? (
            <>
              {parts.header}
              {parts.body}
              {parts.footer}
            </>
          ) : (
            <>
              <ToastHeader>{record.title}</ToastHeader>
              <ToastBody>{record.message}</ToastBody>
              <ToastFooter>
                {record.action}
                <Button ref={actionRef} type="button" onClick={dismiss}>
                  {record.dismissLabel}
                </Button>
              </ToastFooter>
            </>
          )}
        </Surface>
      </li>
    </ToastContext>
  );
}
