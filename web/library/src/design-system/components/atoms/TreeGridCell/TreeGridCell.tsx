"use client";
import type { NativeTreeGridCellProps } from "../../../types";
import { useTreeGridCell } from "./useTreeGridCell";
import styles from "./TreeGridCell.module.css";
export interface TreeGridCellProps extends NativeTreeGridCellProps {
  rowKey: string;
  columnKey: string;
}

export function TreeGridCell(props: TreeGridCellProps) {
  const {
    props: nativeProps,
    cellRef,
    headerId,
    tabIndex,
    expanded,
    handleFocus,
    handleKeyDown,
    handleClick,
    className,
    children,
    animated,
  } = useTreeGridCell(props);

  return (
    <td
      {...nativeProps}
      ref={cellRef}
      role="gridcell"
      data-animated={animated}
      headers={headerId}
      tabIndex={tabIndex}
      aria-expanded={expanded}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </td>
  );
}
