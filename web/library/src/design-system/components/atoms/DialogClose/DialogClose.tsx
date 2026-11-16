"use client";

import type { NativeActionButtonProps } from "../../../types";
import type { VisualProps } from "../../../types/component-capabilities";
import { Button } from "../Button";
import { useDialogClose } from "./useDialogClose";
import styles from "./DialogClose.module.css";

export interface DialogCloseProps extends NativeActionButtonProps, VisualProps {}

export function DialogClose(input: DialogCloseProps) {
  const { props, disabled, children, className, handleClick } = useDialogClose(input);

  return (
    <Button
      {...props}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      data-animated="true"
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </Button>
  );
}
