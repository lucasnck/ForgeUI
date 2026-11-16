"use client";

import { Button } from "../../atoms/Button";
import { DialogClose } from "../../atoms/DialogClose";
import { Icon } from "../../atoms/Icon";
import { ModalBody } from "../../atoms/ModalBody";
import { ModalFooter } from "../../atoms/ModalFooter";
import { Modal, type ModalProps } from "../../molecules/Modal";
import { ModalHeader } from "../../molecules/ModalHeader";
import type { ComponentLoadingProps } from "../../../types/component-capabilities";
import { useConfirmationModal } from "./useConfirmationModal";
import styles from "./ConfirmationModal.module.css";

export interface ConfirmationModalProps extends ModalProps, ComponentLoadingProps {
  title: string;
  closeLabel: string;
  cancelLabel: string;
  confirmLabel: string;
  onConfirm(): void;
}

export function ConfirmationModal(input: ConfirmationModalProps) {
  const view = useConfirmationModal(input);

  return (
    <Modal {...view.props} initialFocusRef={view.initialFocusRef}>
      <ModalHeader title={view.title}>
        <DialogClose
          aria-label={view.closeLabel}
          appearance="ghost"
          tone="neutral"
          className={styles.close}
        >
          <Icon name="close" size="inherit" />
        </DialogClose>
      </ModalHeader>
      <ModalBody>{view.children}</ModalBody>
      <ModalFooter>
        <DialogClose ref={view.cancelRef} appearance="ghost" tone="neutral">
          {view.cancelLabel}
        </DialogClose>
        <Button loading={view.loading} loadingLabel={view.loadingLabel} onClick={view.onConfirm}>
          {view.confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
