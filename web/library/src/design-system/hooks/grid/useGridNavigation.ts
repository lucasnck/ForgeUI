"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type {
  GridCellAddress,
  GridNavigationContract,
  GridNavigationOptions,
} from "../../types/grid-navigation";
import { useRovingFocus } from "../focus";

const keyOf = (address: GridCellAddress): string =>
  JSON.stringify([address.rowKey, address.columnKey]);

export function useGridNavigation(options: GridNavigationOptions): GridNavigationContract {
  const { rowKeys, columnKeys, direction = "ltr", fallbackRef } = options;

  for (const keys of [rowKeys, columnKeys]) {
    if (keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length) {
      throw new Error("Grid row and column keys must be nonempty and unique.");
    }
  }

  const roving = useRovingFocus({
    orientation: "horizontal",
    loop: false,
    fallbackRef,
    initialId:
      rowKeys.length && columnKeys.length
        ? keyOf({ rowKey: rowKeys[0], columnKey: columnKeys[0] })
        : undefined,
  });
  const focusWithin = useRef(false);
  const hierarchyRepair = !!options.resolveRemovedCell;
  useLayoutEffect(() => {
    if (!hierarchyRepair) return;
    const scope = fallbackRef?.current;
    if (!scope) return;
    const document = scope.ownerDocument;

    const capture = (event: FocusEvent) => {
      focusWithin.current = scope.contains(event.target as Node);
    };

    const leave = (event: FocusEvent) => {
      if (event.relatedTarget) focusWithin.current = scope.contains(event.relatedTarget as Node);
    };

    document.addEventListener("focusin", capture);
    document.addEventListener("focusout", leave);

    return () => {
      document.removeEventListener("focusin", capture);
      document.removeEventListener("focusout", leave);
    };
  }, [fallbackRef, hierarchyRepair]);
  const previousRows = useRef(rowKeys);
  const previousActive = useRef<GridCellAddress | null>(null);
  const registerItem = roving.registerItem;
  const registerCell = useCallback<GridNavigationContract["registerCell"]>(
    (address, ref) => registerItem({ id: keyOf(address), ref, textValue: "" }),
    [registerItem],
  );
  const active =
    roving.activeId === null
      ? null
      : (() => {
          const [rowKey, columnKey] = JSON.parse(roving.activeId) as [string, string];

          return { rowKey, columnKey };
        })();

  useLayoutEffect(() => {
    const previous = previousActive.current;
    let intendedActive = active;

    if (previous && !rowKeys.includes(previous.rowKey) && rowKeys.length && columnKeys.length) {
      const index = Math.max(0, previousRows.current.indexOf(previous.rowKey));
      const resolved = options.resolveRemovedCell?.(previous);
      intendedActive =
        resolved && rowKeys.includes(resolved.rowKey) && columnKeys.includes(resolved.columnKey)
          ? resolved
          : {
              rowKey: rowKeys[Math.min(index, rowKeys.length - 1)],
              columnKey: columnKeys.includes(previous.columnKey)
                ? previous.columnKey
                : columnKeys[0],
            };
      const scope = fallbackRef?.current;

      if (
        !hierarchyRepair ||
        !scope ||
        scope.contains(scope.ownerDocument.activeElement) ||
        focusWithin.current
      ) {
        roving.focus(keyOf(intendedActive));
      }
    }

    previousRows.current = rowKeys;
    previousActive.current = intendedActive;
  });

  return {
    active,
    registerCell,
    tabIndex: (address) => roving.tabIndex(keyOf(address)),
    onCellFocus: (address) => roving.onItemFocus(keyOf(address)),
    focusCell: (address) => roving.focus(keyOf(address)),
    onCellKeyDown: (event, address) => {
      if (
        event.defaultPrevented ||
        event.nativeEvent.isComposing ||
        event.altKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      let row = rowKeys.indexOf(address.rowKey);
      let column = columnKeys.indexOf(address.columnKey);
      if (row < 0 || column < 0) return;
      const horizontal = direction === "rtl" ? -1 : 1;
      const page = Math.max(
        1,
        Math.floor(Number.isFinite(options.pageRows) ? (options.pageRows ?? 10) : 10),
      );
      if (event.ctrlKey && event.key !== "Home" && event.key !== "End") return;

      switch (event.key) {
        case "ArrowUp":
          row--;
          break;
        case "ArrowDown":
          row++;
          break;
        case "ArrowLeft":
          column -= horizontal;
          break;
        case "ArrowRight":
          column += horizontal;
          break;
        case "Home":
          if (event.ctrlKey) row = 0;
          else column = 0;
          break;
        case "End":
          if (event.ctrlKey) row = rowKeys.length - 1;
          else column = columnKeys.length - 1;
          break;
        case "PageUp":
          row -= page;
          break;
        case "PageDown":
          row += page;
          break;
        default:
          return;
      }

      event.preventDefault();
      roving.focus(
        keyOf({
          rowKey: rowKeys[Math.max(0, Math.min(row, rowKeys.length - 1))],
          columnKey: columnKeys[Math.max(0, Math.min(column, columnKeys.length - 1))],
        }),
      );
    },
  };
}
