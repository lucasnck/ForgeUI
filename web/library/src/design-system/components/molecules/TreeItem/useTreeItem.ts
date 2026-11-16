"use client";
import { useRef, useLayoutEffect, useImperativeHandle } from "react";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeItemProps } from "./TreeItem";

export function useTreeItem(input: TreeItemProps) {
  const {
    node,
    level,
    position,
    siblingCount,
    ref,
    className,
    onFocus,
    onClick,
    onKeyDown,
    onPointerDown,
    ...props
  } = input;
  if ("children" in input && input.children != null)
    throw new Error("TreeItem owns its plain label and descendant group.");
  if (
    [level, position, siblingCount].some(
      (value) => value !== undefined && (!Number.isInteger(value) || value < 1),
    ) ||
    (position !== undefined && siblingCount !== undefined && position > siblingCount)
  )
    throw new Error("TreeItem metadata must use positive valid sibling coordinates.");
  const tree = useTreeContext();
  const itemRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(ref, () => itemRef.current!, []);
  const visible = tree.visibleNodes.some((entry) => entry.node.key === node.key);
  const register = tree.focus.registerItem;
  useLayoutEffect(
    () =>
      register({
        id: node.key,
        ref: itemRef,
        textValue: node.label,
        disabled: !!node.disabled || !visible,
      }),
    [register, node.key, node.label, node.disabled, visible],
  );

  const handleFocus: NonNullable<TreeItemProps["onFocus"]> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented && event.target === event.currentTarget && !node.disabled)
      tree.focus.onItemFocus(node.key);
  };

  const handleClick: NonNullable<TreeItemProps["onClick"]> = (event) => {
    onClick?.(event);
    event.stopPropagation();

    if (!event.defaultPrevented && !node.disabled) {
      itemRef.current?.focus();
      tree.select(node.key);
    }
  };

  const handleKeyDown: NonNullable<TreeItemProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    event.stopPropagation();
    if (!event.defaultPrevented) tree.onNodeKeyDown(event, node.key);
  };

  const handlePointerDown: NonNullable<TreeItemProps["onPointerDown"]> = (event) => {
    onPointerDown?.(event);
    if (
      !event.defaultPrevented &&
      node.disabled &&
      (event.target as Element).closest('[role="treeitem"]') === event.currentTarget
    )
      event.preventDefault();
  };

  return {
    props,
    className,
    node,
    level,
    position,
    siblingCount,
    itemRef,
    selected: tree.selected === node.key,
    branch: !!node.children?.length,
    expanded: tree.isExpanded(node.key),
    tabIndex: tree.focus.tabIndex(node.key),
    animated: tree.animated,
    handleFocus,
    handleClick,
    handleKeyDown,
    handlePointerDown,
  };
}
