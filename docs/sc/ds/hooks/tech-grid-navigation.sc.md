---
title: "Grid navigation hook"
scope: "Own a cell-only two-dimensional focus model for TreeGrid; no selection, editing or hierarchy state."
status: "DONE"
type: "hook"
ds-level: "none"
---

# Grid navigation hook



## Files

```text
design-system/hooks/grid/useGridNavigation.ts (C)
design-system/hooks/grid/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/HookResources/useGridNavigation/definition.ts (C)
features/showcase-v2/components/HookResources/useGridNavigation/useGridNavigation.example.tsx (C)
features/showcase-v2/components/HookResources/useGridNavigation/useGridNavigationResourceExample.ts (C)
features/showcase-v2/components/HookResources/useGridNavigation/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Grid navigation contracts](../types/tech-grid-navigation-contracts.sc.md)

## Contract

```tsx
import { useGridNavigation } from "@forge-ui/web";
const { active, onCellKeyDown } = useGridNavigation({ rowKeys, columnKeys, direction: "ltr", pageRows: 10 });
```

## Content

```ts
"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import type { GridCellAddress, GridNavigationContract, GridNavigationOptions } from "../../types/grid-navigation";
import { useRovingFocus } from "../focus";

const keyOf = (address: GridCellAddress): string => JSON.stringify([address.rowKey, address.columnKey]);

export function useGridNavigation(options: GridNavigationOptions): GridNavigationContract {
  const { rowKeys, columnKeys, direction = "ltr", fallbackRef } = options;
  for (const keys of [rowKeys, columnKeys]) {
    if (keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length) {
      throw new Error("Grid row and column keys must be nonempty and unique.");
    }
  }
  const roving = useRovingFocus({ orientation: "horizontal", loop: false, fallbackRef,
    initialId: rowKeys.length && columnKeys.length ? keyOf({ rowKey: rowKeys[0], columnKey: columnKeys[0] }) : undefined });
  const focusWithin = useRef(false);
  const hierarchyRepair = !!options.resolveRemovedCell;
  useLayoutEffect(() => {
    if (!hierarchyRepair) return;
    const scope = fallbackRef?.current;
    if (!scope) return;
    const document = scope.ownerDocument;
    const capture = (event: FocusEvent) => { focusWithin.current = scope.contains(event.target as Node); };
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
  const registerCell = useCallback<GridNavigationContract["registerCell"]>((address, ref) =>
    registerItem({ id: keyOf(address), ref, textValue: "" }), [registerItem]);
  const active = roving.activeId === null ? null : (() => {
    const [rowKey, columnKey] = JSON.parse(roving.activeId) as [string, string];
    return { rowKey, columnKey };
  })();

  useLayoutEffect(() => {
    const previous = previousActive.current;
    let intendedActive = active;
    if (previous && !rowKeys.includes(previous.rowKey) && rowKeys.length && columnKeys.length) {
      const index = Math.max(0, previousRows.current.indexOf(previous.rowKey));
      const resolved = options.resolveRemovedCell?.(previous);
      intendedActive = resolved && rowKeys.includes(resolved.rowKey) && columnKeys.includes(resolved.columnKey) ? resolved : {
        rowKey: rowKeys[Math.min(index, rowKeys.length - 1)],
        columnKey: columnKeys.includes(previous.columnKey) ? previous.columnKey : columnKeys[0],
      };
      const scope = fallbackRef?.current;
      if (!hierarchyRepair || !scope || scope.contains(scope.ownerDocument.activeElement) || focusWithin.current) {
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
      if (event.defaultPrevented || event.nativeEvent.isComposing || event.altKey || event.metaKey || event.shiftKey) return;
      let row = rowKeys.indexOf(address.rowKey);
      let column = columnKeys.indexOf(address.columnKey);
      if (row < 0 || column < 0) return;
      const horizontal = direction === "rtl" ? -1 : 1;
      const page = Math.max(1, Math.floor(Number.isFinite(options.pageRows) ? options.pageRows ?? 10 : 10));
      if (event.ctrlKey && event.key !== "Home" && event.key !== "End") return;
      switch (event.key) {
        case "ArrowUp": row--; break;
        case "ArrowDown": row++; break;
        case "ArrowLeft": column -= horizontal; break;
        case "ArrowRight": column += horizontal; break;
        case "Home": if (event.ctrlKey) row = 0; else column = 0; break;
        case "End": if (event.ctrlKey) row = rowKeys.length - 1; else column = columnKeys.length - 1; break;
        case "PageUp": row -= page; break;
        case "PageDown": row += page; break;
        default: return;
      }
      event.preventDefault();
      roving.focus(keyOf({
        rowKey: rowKeys[Math.max(0, Math.min(row, rowKeys.length - 1))],
        columnKey: columnKeys[Math.max(0, Math.min(column, columnKeys.length - 1))],
      }));
    },
  };
}
```

## Tests

- V2 Cell focus matrix: verify its observable state, actual public contract, reset and complete copied code.

- `npm run test:hooks` verifies scoped keyboard/state/rejection behavior; DS typecheck passes. Real browser fixtures verify single tab stops, disabled-item skipping, selection/focus separation, controlled rejection and focus repair under accepted external changes.

- Arrows clamp at every boundary and horizontal RTL reverses movement.
- Home and End retain the row; Ctrl variants retain the column.
- Page movement clamps and uses ten rows by default.
- One registered connected cell owns tabIndex=0 after removal or reorder.
- Tab, composition and prevented events retain native behavior.

## Criteria

- [x] Given arrow movement, only one cell owns tabindex=0.
- [x] Given IME/Tab/owner-consumed Enter, the hook does not steal native behavior.
- [x] The direction / pageRows contract uses ltr / 10; positive integer page size.
- [x] The Model contract uses Cell-only; no row tab stops or interactive widgets in cell content.
- [x] Arrows move by row/column with clamped boundaries, never wrap.
- [x] Home/End move to row boundaries; Ctrl+Home/End move to first/last row in the current column; PageUp/Down move pageRows while retaining column.
- [x] If a row disappears, generic fallback selects the adjacent successor or preceding row while retaining the current available column.
- [x] Empty grids expose a named root fallback.

- [x] V2 **Cell focus matrix**: Bind the returned ref/handlers to a native two-column, three-row semantic grid fixture with indexed cells. Exercise arrows/Home/End and supported RTL/page navigation, show active row/column, and repair focus after a caller removes the active row.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
