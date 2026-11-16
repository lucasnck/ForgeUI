"use client";

import type { ComponentAnimationEffectProps } from "../../../types/animation";
import type { ComponentPopupProps, PopupListboxContract } from "../../../types/popup";
import { PopupListboxItem } from "../../atoms/PopupListboxItem";
import { usePopupListboxView } from "./usePopupListboxView";
import effects from "../../../styles/animations/surface-animations.module.css";
import styles from "./PopupListbox.module.css";

export interface PopupListboxProps<Item>
  extends ComponentPopupProps, ComponentAnimationEffectProps {
  popup: PopupListboxContract;
  items: readonly Item[];
  getOptionLabel(item: Item): string;
  getOptionKey?(item: Item, index: number): string;
}

export function PopupListbox<Item>(input: PopupListboxProps<Item>) {
  const {
    popup,
    items,
    getOptionLabel,
    getOptionKey,
    listboxLabel,
    animationEffect,
    animated,
    elementRef,
    open,
    present,
    phase,
    onTransitionEnd,
  } = usePopupListboxView(input);
  if (!present) return null;
  return (
    <ul
      {...popup.listboxAttributes}
      ref={elementRef}
      className={[styles.list, effects[animationEffect]].join(" ")}
      aria-label={listboxLabel}
      aria-hidden={!open || undefined}
      inert={!open || undefined}
      data-animated={animated}
      data-motion-state={phase}
      data-motion-focus={popup.activeIndex >= 0 || undefined}
      onTransitionEnd={onTransitionEnd}
    >
      {items.map((item, index) => (
        <PopupListboxItem
          key={getOptionKey?.(item, index) ?? popup.optionId(index)}
          popup={popup}
          index={index}
          label={getOptionLabel(item)}
          animated={animated}
        />
      ))}
    </ul>
  );
}
