"use client";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { ModalHeaderProps } from "./ModalHeader";

export function useModalHeader(input: ModalHeaderProps) {
  const { title, icon, divider = true, children, ...props } = input;
  if (!title.trim()) throw new Error("ModalHeader requires a nonempty title.");
  const modal = useModalContext();

  return { modal, props, title, icon, divider, children };
}
