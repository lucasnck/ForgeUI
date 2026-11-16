---
title: "Collection, feedback and form contracts"
scope: "Own new reusable native adaptations and data descriptors; do not duplicate existing compound/selection interfaces."
status: "DONE"
type: "type"
ds-level: "none"
---

# Collection, feedback and form contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/collection-contracts.ts (M)
lib/contracts/selection.ts (C)
design-system/types/tree-grid.contracts.test.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [tech-compound-composition.sc.md](tech-compound-composition.sc.md)
- [Modal contracts](tech-modal-contracts.sc.md)

## Contract

```ts
import type { NativeSectionRootProps } from "@forge-ui/web";
type Contract = NativeSectionRootProps;
```

## Content

```ts
import type {
  ComponentPropsWithRef,
  ReactNode,
} from "react";
import type {
  NativeModalRootProps,
} from "./modal";

export interface NativeSectionRootProps extends Omit<ComponentPropsWithRef<"section">, "children" | "defaultValue"> {
}

export interface NativeFormRootProps extends Omit<ComponentPropsWithRef<"form">, "children" | "action" | "method" | "target"> {
}

export interface NativeActionButtonProps extends Omit<ComponentPropsWithRef<"button">, "type"> {
}

export interface NativeWidgetItemProps extends Omit<ComponentPropsWithRef<"li">, "role" | "tabIndex" | "aria-selected" | "aria-expanded"> {
}

export interface NativeTableCellProps extends Omit<ComponentPropsWithRef<"td">, "role" | "tabIndex" | "aria-rowindex" | "aria-colindex"> {
  colSpan?: number;
  rowSpan?: number;
}

export interface NativeTreeGridCellProps extends Omit<NativeTableCellProps, "children"> {
  children: string;
}

export interface NativeTreeGridColumnHeaderProps extends Omit<ComponentPropsWithRef<"th">, "children" | "role" | "tabIndex" | "aria-sort"> {}

export interface NativeTreeGridRowProps extends Omit<ComponentPropsWithRef<"tr">, "role" | "tabIndex" | "aria-expanded" | "aria-selected"> {}

export interface NativeGridCellProps extends Omit<ComponentPropsWithRef<"div">, "role" | "tabIndex" | "aria-rowindex" | "aria-colindex"> {
}

export interface NativeAlertDialogRootProps extends Omit<NativeModalRootProps, "role" | "aria-describedby"> {
}

export type { SelectionMode } from "@/lib/contracts/selection";

export type SortDirection = "ascending" | "descending";

export type AnnouncementPoliteness = "off" | "polite" | "assertive";

export type StepStatus = "pending" | "complete" | "error";

export interface DataGridSort {
  columnKey: string;
  direction: SortDirection;
}

export interface DataGridColumn<Row> {
  key: string;
  header: string;
  renderCell(row: Row): ReactNode;
  sortable?: boolean;
  sortLabel?: string;
  rowHeader?: boolean;
}

export interface TreeNodeDescriptor {
  key: string;
  label: string;
  disabled?: boolean;
  children?: readonly TreeNodeDescriptor[];
}

export interface TreeGridNode<Row> {
  key: string;
  item: Row;
  children?: readonly TreeGridNode<Row>[];
}

export interface TreeGridColumn<Row> {
  key: string;
  header: string;
  getCellText(row: Row): string;
}

export interface ComponentTreeExpansionProps {
  expandedValue?: readonly string[];
  defaultExpandedValue?: readonly string[];
  onExpandedValueChange?(value: readonly string[]): void;
}
export type CollectionFocusEdge = "first" | "last";
```

## Tests

- V2 Consumer snippets for DataGrid, Menu, Stepper retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile generic grid columns and tree descriptors with caller-owned row types; reject incompatible row accessors.
- Compile inherited native refs/events; reject conflicting role, tabIndex and controlled native channels.
- Compile declared selection, sorting and announcement values; reject unsupported literals.

## Criteria

- [x] Native section/form/action/item/table/grid adapters exclude conflicting owned channels once.
- [x] Action buttons preserve a real React ref and inherited native events.
- [x] Selection, sorting, politeness and step status use their canonical declared value types.
- [x] Generic grid columns retain the caller row type in cell rendering and text accessors.
- [x] Tree and tree-grid descriptors use stable string keys and readonly children without owning selection or DOM focus.
- [x] Descriptor contracts remain pure; consuming DataGrid, Tree and collection hooks own runtime unique-key, required-column and localized-label validation.

- [x] V2 typed usage fixtures cover DataGrid, Menu, Stepper: Stable row/item keys, real callbacks and required collection slots. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.
