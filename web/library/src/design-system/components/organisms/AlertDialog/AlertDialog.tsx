"use client";

import type { ReactElement, RefObject } from "react";
import type {
  ComponentAnimationEffectProps,
  ComponentChildrenProps,
  ComponentOpenProps,
  NativeAlertDialogRootProps,
} from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { Modal } from "../../molecules/Modal";
import { ModalBody } from "../../atoms/ModalBody";
import type { ModalBodyProps } from "../../atoms/ModalBody";
import { AlertDialogHeader } from "../../molecules/AlertDialogHeader";
import { AlertDialogBody } from "../../atoms/AlertDialogBody";
import { AlertDialogFooter } from "../../atoms/AlertDialogFooter";
import { useAlertDialog } from "./useAlertDialog";
import styles from "./AlertDialog.module.css";

export interface AlertDialogProps
  extends
    NativeAlertDialogRootProps,
    ComponentChildrenProps,
    ComponentOpenProps,
    ComponentAnimationEffectProps {
  description: string;
  initialFocusRef: RefObject<HTMLButtonElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function AlertDialog(input: AlertDialogProps) {
  const { children, description, initialFocusRef, returnFocusRef, props, descriptionId } =
    useAlertDialog(input);
  const parts = collectCompoundParts(children, {
    header: AlertDialogHeader,
    body: AlertDialogBody,
    footer: AlertDialogFooter,
  });
  const body = parts.body as ReactElement<ModalBodyProps>;

  return (
    <Modal
      {...props}
      role="alertdialog"
      aria-describedby={descriptionId}
      initialFocusRef={initialFocusRef}
      returnFocusRef={returnFocusRef}
    >
      {parts.header}
      <ModalBody {...body.props} key={body.key}>
        <p key={descriptionId} id={descriptionId} className={styles.description}>
          {description}
        </p>
        {body.props.children}
      </ModalBody>
      {parts.footer}
    </Modal>
  );
}
