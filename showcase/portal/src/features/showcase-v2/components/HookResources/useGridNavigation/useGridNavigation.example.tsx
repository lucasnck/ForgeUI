"use client";
import { useLayoutEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Button, Stack } from "@forge-ui/web";
import type { GridNavigationContract, GridCellAddress } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { columnKeys, useGridNavigationResourceExample } from "./useGridNavigationResourceExample";
interface CellProps {
  grid: GridNavigationContract;
  row: string;
  column: string;
  remove(): void;
}

function useGridCell({ grid, row, column, remove }: CellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerCell } = grid;
  useLayoutEffect(
    () => registerCell({ rowKey: row, columnKey: column }, ref),
    [registerCell, row, column],
  );
  const address: GridCellAddress = { rowKey: row, columnKey: column };

  function focus() {
    grid.onCellFocus(address);
  }

  function click() {
    grid.focusCell(address);
  }

  function key(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Delete") {
      event.preventDefault();
      remove();
    } else grid.onCellKeyDown(event, address);
  }

  return { ref, focus, key, click, address };
}

function Cell(props: CellProps) {
  const view = useGridCell(props);
  const {
    ref: viewRef,
    address: viewAddress,
    focus: viewFocus,
    click: viewClick,
    key: viewKey,
  } = view;

  return (
    <div
      role="gridcell"
      ref={viewRef}
      tabIndex={props.grid.tabIndex(viewAddress)}
      onFocus={viewFocus}
      onClick={viewClick}
      onKeyDown={viewKey}
      className={styles.item}
    >
      Children {(Number(props.row.slice(-1)) - 1) * 2 + Number(props.column.slice(-1))}
    </div>
  );
}

export function UseGridNavigationExample() {
  const view = useGridNavigationResourceExample();
  const {
    direction: viewDirection,
    changeDirection: viewChangeDirection,
    fallbackRef: viewFallbackRef,
    rowKeys: viewRowKeys,
    grid: viewGrid,
    remove: viewRemove,
    copy: viewCopy,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="direction"
          value={viewDirection}
          onChange={viewChangeDirection}
          options={["ltr", "rtl"]}
        />
      </ExampleControls>
      <div ref={viewFallbackRef} role="grid" aria-label="Label" tabIndex={-1} dir={viewDirection}>
        <div role="row" className={styles.grid}>
          {columnKeys.map((column, index) => (
            <span role="columnheader" key={column}>
              Header {index + 1}
            </span>
          ))}
        </div>
        {viewRowKeys.map((row) => (
          <div role="row" key={row} className={styles.grid}>
            {columnKeys.map((column) => (
              <Cell key={column} row={row} column={column} grid={viewGrid} remove={viewRemove} />
            ))}
          </div>
        ))}
      </div>
      <div>
        <Button variant="outline" onClick={viewRemove} disabled={!viewGrid.active}>
          {viewCopy.remove}
        </Button>
      </div>
      <ResourceState value={{ active: viewGrid.active, rowKeys: viewRowKeys }} />
    </Stack>
  );
}
