"use client";
import type {
  ComponentChildrenProps,
  ComponentTreeExpansionProps,
  ComponentAnimatedProps,
  NativeCollectionRootProps,
  TreeGridColumn,
  TreeGridNode,
  NavigationDirection,
} from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { TreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import { TreeGridHeader } from "../../molecules/TreeGridHeader";
import { TreeGridBody } from "../../molecules/TreeGridBody";
import { TreeGridFooter } from "../../atoms/TreeGridFooter";
import { TreeGridRow } from "../../molecules/TreeGridRow";
import { TreeGridCell } from "../../atoms/TreeGridCell";
import { useTreeGrid } from "./useTreeGrid";
import styles from "./TreeGrid.module.css";
export interface TreeGridProps<Row>
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentTreeExpansionProps,
    ComponentAnimatedProps {
  label: string;
  nodes: readonly TreeGridNode<Row>[];
  columns: readonly TreeGridColumn<Row>[];
  getNodeLabel(node: Row): string;
  direction?: NavigationDirection;
}

export function TreeGrid<Row>(props: TreeGridProps<Row>) {
  const {
    columns,
    hierarchy,
    navigation,
    nodeByKey,
    tableRef,
    onCellKeyDown,
    label,
    children,
    className,
    props: nativeProps,
    direction,
    headerId,
    branchCellExpanded,
    animated,
  } = useTreeGrid(props);
  const regions = collectCompoundParts(children, {
    header: TreeGridHeader,
    body: TreeGridBody,
    footer: TreeGridFooter,
  });
  if (!regions.body) throw new Error("TreeGrid requires TreeGridBody.");
  const renderedRows = hierarchy.visibleNodes.map((entry) => (
    <TreeGridRow key={entry.node.key} rowKey={entry.node.key}>
      {columns.map((column) => {
        const text = column.getCellText(nodeByKey.get(entry.node.key)!.item);
        if (typeof text !== "string") throw new Error("TreeGrid cells require plain text.");
        return (
          <TreeGridCell key={column.key} rowKey={entry.node.key} columnKey={column.key}>
            {text}
          </TreeGridCell>
        );
      })}
    </TreeGridRow>
  ));

  return (
    <TreeGridContext
      value={{
        animated,
        renderedRows,
        columns,
        hasHeader: !!regions.header,
        rows: hierarchy.visibleNodes,
        navigation,
        headerId,
        branchCellExpanded,
        onCellKeyDown,
      }}
    >
      <div
        {...nativeProps}
        data-gap="2"
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        <table
          ref={tableRef}
          role="treegrid"
          aria-label={label}
          dir={direction}
          tabIndex={renderedRows.length ? undefined : 0}
        >
          {regions.header}
          {regions.body}
        </table>
        {regions.footer}
      </div>
    </TreeGridContext>
  );
}
