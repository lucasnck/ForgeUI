"use client";

import type { NativePopupListboxItemProps, PopupListboxContract } from "../../../types/popup";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { usePopupListboxItem } from "./usePopupListboxItem";
import styles from "./PopupListboxItem.module.css";

export interface PopupListboxItemProps extends NativePopupListboxItemProps, ComponentAnimatedProps {
  popup: PopupListboxContract;
  index: number;
  label: string;
}

export function PopupListboxItem(input: PopupListboxItemProps) {
  const { popup, index, label, props, className, animated, handlePointerDown } =
    usePopupListboxItem(input);

  return (
    <li
      {...props}
      {...popup.optionAttributes(index)}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-animated={animated}
      onPointerDown={handlePointerDown}
    >
      {label}
    </li>
  );
}
