---
title: "Data grid component recipes"
scope: "Canonical native DataGrid geometry, sizing, borders, focus and row feedback."
status: "DONE"
type: "style"
ds-level: "none"
---

# Data grid component recipes

## Files

```text
design-system/styles/data-grid-components.module.css (C)
../scripts/check-data-grid.cjs (M)
features/showcase-v2/components/StyleResources/DataGridRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/DataGridRecipes/DataGridRecipes.example.tsx (C)
features/showcase-v2/components/StyleResources/DataGridRecipes/useDataGridRecipesExample.ts (C)
features/showcase-v2/components/StyleResources/DataGridRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](tech-design-tokens.sc.md)

## Contract

```css
.root { composes: grid from "../../../styles/data-grid-components.module.css"; }
```

## Styles

```css
.grid {
  composes: fullWidth from "./full-width-components.module.css";
  --data-grid-row-height: var(--component-height-md);
  --data-grid-padding: var(--space-2);
  min-inline-size: var(--zero);
  max-inline-size: var(--size-full);
  inline-size: fit-content;
  background: var(--color-surface-default);
  color: var(--color-text-default);
  border-radius: var(--radius-sm);
}
.grid[data-size="xs"] {
  --data-grid-row-height: var(--component-height-xs);
  --data-grid-padding: var(--space-1);
}
.grid[data-size="sm"] {
  --data-grid-row-height: var(--component-height-sm);
  --data-grid-padding: var(--space-1);
}
.grid[data-size="lg"] {
  --data-grid-row-height: var(--component-height-lg);
  --data-grid-padding: var(--space-3);
}
.grid[data-size="xl"] {
  --data-grid-row-height: var(--component-height-xl);
  --data-grid-padding: var(--space-4);
}
.grid[data-borders="true"] {
  border: var(--border-width-thin) var(--border-style-default) var(--color-border-default);
}
.viewport {
  min-inline-size: var(--zero);
  max-inline-size: var(--size-full);
  overflow-x: auto;
  border-radius: inherit;
}
.viewport:focus-visible {
  outline: var(--border-width-focus) var(--border-style-default) var(--color-focus-ring);
  outline-offset: calc(var(--zero) - var(--border-width-focus));
}
.table {
  inline-size: var(--size-full);
  min-inline-size: var(--length-58);
  border-collapse: collapse;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}
.table :is(th, td) {
  block-size: var(--data-grid-row-height);
  padding: var(--space-1) var(--data-grid-padding);
  text-align: start;
  vertical-align: middle;
}
.header {
  background: var(--color-surface-subtle);
  border-block-end: var(--border-width-thin) var(--border-style-default) var(--color-border-default);
}
.columnHeader {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  white-space: nowrap;
}
.cell {
  color: inherit;
  font-weight: var(--font-weight-regular);
}
.table [data-align="end"] { text-align: end; }
.table [data-align="center"] { text-align: center; }
.grid[data-row-lines="true"] .row:not(:last-child) > :is(th, td) {
  border-block-end: var(--border-width-thin) var(--border-style-default) var(--color-border-subtle);
}
.grid[data-column-lines="true"] .table :is(th, td):not(:last-child) {
  border-inline-end: var(--border-width-thin) var(--border-style-default) var(--color-border-subtle);
}
.grid[data-alternating="true"] .row:nth-child(even) {
  background: var(--color-surface-subtle);
}
.row:hover,
.row:focus-within { background: var(--color-surface-accent); }
.sortButton {
  inline-size: var(--size-full);
  min-block-size: var(--zero);
  padding: var(--zero);
  border: none;
  font-size: inherit;
  font-weight: inherit;
  justify-content: start;
}
.sortButton > span {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}
.footer {
  composes: inline from "./layout-components.module.css";
  --inline-justify: space-between;
  padding: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  border-block-start: var(--border-width-thin) var(--border-style-default) var(--color-border-default);
}

```

## Tests

- V2 Grid recipe anatomy: verify its observable state, actual public contract, reset and complete copied code.

- Verify five sizes, independent border/alternation flags and native table semantics.
- Verify keyboard-focusable bounded horizontal viewport and footer outside it in a narrow browser.

## Criteria

- [x] The family owns one token-based recipe for grid, viewport, table, header, columnHeader, cell, row, sortButton and footer.
- [x] All five canonical sizes and independent outer/column/row line and alternation flags preserve semantic table controls.
- [x] Narrow content scrolls within the focused viewport and retains a visible focus indicator; footer remains outside it.

- [x] V2 **Grid recipe anatomy**: Apply the real grid/header/body/row/cell recipes on valid semantic grid markup through DataGrid. Compare supported density, line/alternation, sorting and keyboard-focus states (DataGrid has no public selection API) and two indexed columns; show actual class/data-attribute/token dependencies rather than fictitious component props.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
