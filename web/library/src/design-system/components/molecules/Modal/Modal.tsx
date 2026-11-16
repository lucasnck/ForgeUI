"use client";

import type { RefObject } from "react";
import type {
  ModalDismissProps,
  ComponentAnimationEffectProps,
  ComponentChildrenProps,
  ComponentOpenProps,
  NativeModalRootProps,
} from "../../../types";
import { ModalContext } from "../../../internal/modal/ModalContext";
import { useModalView } from "./useModalView";
import { collectCompoundParts } from "../../../helpers/compound";
import { ModalHeader } from "../ModalHeader";
import { ModalBody } from "../../atoms/ModalBody";
import { ModalFooter } from "../../atoms/ModalFooter";
import styles from "./Modal.module.css";
import effects from "../../../styles/animations/modal-animations.module.css";

export interface ModalProps
  extends
    NativeModalRootProps,
    ModalDismissProps,
    ComponentChildrenProps,
    ComponentOpenProps,
    ComponentAnimationEffectProps {
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function Modal(input: ModalProps) {
  const {
    props,
    context,
    dialogRef,
    titleId,
    label,
    className,
    children,
    animated,
    animationEffect,
    onCancel,
    onClose,
    onPointerDown,
    onPointerCancel,
    onClick,
  } = useModalView(input);
  const parts = collectCompoundParts(
    children,
    { header: ModalHeader, body: ModalBody, footer: ModalFooter },
    label ? ["body"] : ["header", "body"],
  );

  return (
    <ModalContext value={context}>
      <dialog
        {...props}
        ref={dialogRef}
        aria-label={label}
        aria-labelledby={label ? undefined : titleId}
        aria-hidden={context.open ? undefined : true}
        inert={!context.open}
        onCancel={onCancel}
        onClose={onClose}
        onPointerDown={onPointerDown}
        onPointerCancel={onPointerCancel}
        onClick={onClick}
        className={[styles.root, effects.root, className].filter(Boolean).join(" ")}
        data-animation-effect={animationEffect}
        data-animated={animated}
      >
        <div className={styles.surface}>
          {parts.header}
          {parts.body}
          {parts.footer}
        </div>
      </dialog>
    </ModalContext>
  );
}
