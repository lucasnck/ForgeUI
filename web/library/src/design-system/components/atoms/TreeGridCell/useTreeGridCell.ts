"use client";
import { useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridCellProps } from "./TreeGridCell";

export function useTreeGridCell(input: TreeGridCellProps) {
  const { rowKey, columnKey, onFocus, onKeyDown, onClick, children, ref, className, ...props } =
    input;
  const grid = useTreeGridContext();

  if (
    !grid.rows.some((row) => row.node.key === rowKey) ||
    !grid.columns.some((column) => column.key === columnKey) ||
    typeof children !== "string"
  ) {
    throw new Error("TreeGridCell requires root keys and plain text content.");
  }

  const cellRef = useRef<HTMLTableCellElement>(null);
  useImperativeHandle(ref, () => cellRef.current!, []);
  const register = grid.navigation.registerCell;
  useLayoutEffect(() => register({ rowKey, columnKey }, cellRef), [register, rowKey, columnKey]);
  const address = { rowKey, columnKey };

  const handleFocus: NonNullable<TreeGridCellProps["onFocus"]> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented) grid.navigation.onCellFocus(address);
  };

  const handleKeyDown: NonNullable<TreeGridCellProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented) grid.onCellKeyDown(event, address);
  };

  const handleClick: NonNullable<TreeGridCellProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) grid.navigation.focusCell(address);
  };

  return {
    props,
    children,
    className,
    cellRef,
    animated: grid.animated,
    handleFocus,
    handleKeyDown,
    handleClick,
    headerId: grid.hasHeader ? grid.headerId(columnKey) : undefined,
    tabIndex: grid.navigation.tabIndex(address),
    expanded: grid.branchCellExpanded(address),
  };
}
