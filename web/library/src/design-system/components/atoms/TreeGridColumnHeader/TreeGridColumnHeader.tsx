"use client";
import type { NativeTreeGridColumnHeaderProps } from "../../../types";
import { useTreeGridColumnHeader } from "./useTreeGridColumnHeader";
import styles from "./TreeGridColumnHeader.module.css";
export interface TreeGridColumnHeaderProps extends NativeTreeGridColumnHeaderProps {
  columnKey: string;
  label: string;
}

export function TreeGridColumnHeader(props: TreeGridColumnHeaderProps) {
  const view = useTreeGridColumnHeader(props);

  return (
    <th
      {...view.props}
      role="columnheader"
      scope="col"
      id={view.grid.headerId(view.columnKey)}
      tabIndex={undefined}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      {view.label}
    </th>
  );
}
