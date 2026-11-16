"use client";

import type { MouseEvent } from "react";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { DialogCloseProps } from "./DialogClose";

export function useDialogClose(input: DialogCloseProps) {
  const { onClick, disabled, children, className, ...props } = input;
  const modal = useModalContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled) modal.requestOpen(false);
  };

  return { props, disabled, children, className, handleClick };
}
