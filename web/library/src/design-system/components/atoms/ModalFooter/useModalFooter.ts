"use client";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { ModalFooterProps } from "./ModalFooter";

export function useModalFooter(input: ModalFooterProps) {
  const { children, divider = true, ...props } = input;
  const context = useModalContext();

  return { context, props, children, divider };
}
