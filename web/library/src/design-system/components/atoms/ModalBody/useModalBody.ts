"use client";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { ModalBodyProps } from "./ModalBody";

export function useModalBody(input: ModalBodyProps) {
  const { children, ...props } = input;
  const context = useModalContext();

  return { context, props, children };
}
