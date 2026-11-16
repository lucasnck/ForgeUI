"use client";
import { useLayoutEffect, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { RovingFocusContract } from "@forge-ui/web";
import styles from "./ResourceExamples.module.css";
export interface FocusItemProps {
  focus: RovingFocusContract;
  id: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  role: "option" | "treeitem";
  level?: number;
  expanded?: boolean;
  position?: number;
  size?: number;
  children?: ReactNode;
  onSelect(id: string): void;
  onKey(event: KeyboardEvent<HTMLElement>, id: string): void;
}

function useFocusItem(props: FocusItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { registerItem } = props.focus;
  const { id, label, disabled } = props;
  useLayoutEffect(
    () => registerItem({ id, ref, textValue: label, disabled }),
    [registerItem, id, label, disabled],
  );

  function focus() {
    props.focus.onItemFocus(id);
  }

  function click() {
    if (!disabled) props.onSelect(id);
  }

  function key(event: KeyboardEvent<HTMLLIElement>) {
    props.onKey(event, id);
  }

  return { ref, focus, click, key };
}

export function FocusItem(props: FocusItemProps) {
  const view = useFocusItem(props);
  const { ref: viewRef, focus: viewFocus, click: viewClick, key: viewKey } = view;

  return (
    <li
      ref={viewRef}
      role={props.role}
      tabIndex={props.disabled ? -1 : props.focus.tabIndex(props.id)}
      aria-selected={props.selected}
      aria-disabled={props.disabled || undefined}
      aria-level={props.level}
      aria-expanded={props.expanded}
      aria-posinset={props.position}
      aria-setsize={props.size}
      onFocus={viewFocus}
      onClick={viewClick}
      onKeyDown={viewKey}
      className={styles.item}
    >
      {props.label}
      {props.children}
    </li>
  );
}
