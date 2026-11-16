"use client";
import type { ComponentPropsWithRef } from "react";
import { TreeGridColumnHeader } from "../../atoms/TreeGridColumnHeader";
import { validateTreeGridHeaders } from "../../../internal/treegrid/validateParts";
import { useTreeGridHeader } from "./useTreeGridHeader";
import styles from "./TreeGridHeader.module.css";
export interface TreeGridHeaderProps extends ComponentPropsWithRef<"thead"> {}

export function TreeGridHeader(props: TreeGridHeaderProps) {
  const view = useTreeGridHeader(props);

  return (
    <thead
      {...view.props}
      role="rowgroup"
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      <tr role="row">
        {view.children == null
          ? view.grid.columns.map((column) => (
              <TreeGridColumnHeader key={column.key} columnKey={column.key} label={column.header} />
            ))
          : validateTreeGridHeaders(
              view.children,
              view.grid.columns.map((column) => column.key),
              TreeGridColumnHeader,
            )}
      </tr>
    </thead>
  );
}
