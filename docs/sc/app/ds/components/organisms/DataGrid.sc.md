---
title: "Flutter DataGrid"
scope: "Native app contract preserving the Web DataGrid capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter DataGrid

## Files

```text
components/forge_data_grid.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web DataGrid](../../../../ds/components/organisms/DataGrid.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App DataGridHeader](../molecules/DataGridHeader.sc.md)
- [App DataGridBody](../molecules/DataGridBody.sc.md)
- [App DataGridRow](../molecules/DataGridRow.sc.md)
- [App DataGridCell](../atoms/DataGridCell.sc.md)
- [App DataGridFooter](../atoms/DataGridFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeDataGrid(
  label: label,
  rows: rows,
  columns: columns,
  getRowKey: getRowKey,
  children: parts,
)
```

## Tests

### Native behavior

- Use a native scrollable table with typed rows/columns and preserved header/row associations; do not replace it with cards that discard grid capabilities.
- Require stable unique row/column keys, columns nonempty, at most one row-header column and sort labels/callback for sortable columns.
- Sorting requests one ascending/descending change without mutating/sorting caller rows; invalid sorted column is rejected.
- Preserve fullWidth=true, md size, showBorders=true, showColumnLines=false, showRowLines=true and rowAlternationEnabled=true.
- Keep custom action cells independently operable and plain cells out of traversal; preserve emptyContent and explicit Header/Body/Footer.
- Support constrained horizontal scrolling and text scaling with native table header associations; no implicit data fetch, filter or pagination.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeDataGrid<R>({Key? key, required String label, required List<R> rows, required List<ForgeDataGridColumn<R>> columns, required String Function(R) getRowKey, required List<ForgeDataGridPart> children, ForgeDataGridSort? sort, void Function(ForgeDataGridSort)? onSortChange, Widget? emptyContent, bool fullWidth = true, bool showBorders = true, bool showColumnLines = false, bool showRowLines = true, bool rowAlternationEnabled = true, ForgeSize size = ForgeSize.md})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `rows` | `readonly Row[]` | Required; no local initializer | `rows: List<Row>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `columns` | `readonly DataGridColumn<Row>[]` | Required; no local initializer | `columns: List<ForgeDataGridColumn<Row>>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `getRowKey` | `(row: Row) => string` | Required; no local initializer | `getRowKey: String Function(Row)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `sort` | `DataGridSort \| null` | Optional; `null` | `sort: ForgeDataGridSort?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onSortChange` | `((sort: DataGridSort) => void)` | Optional; no local initializer | `onSortChange: void Function(ForgeDataGridSort)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `emptyContent` | `ReactNode` | Optional; no local initializer | `emptyContent: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `showBorders` | `boolean` | Optional; `true` | `showBorders: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `showColumnLines` | `boolean` | Optional; `false` | `showColumnLines: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `showRowLines` | `boolean` | Optional; `true` | `showRowLines: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `rowAlternationEnabled` | `boolean` | Optional; `true` | `rowAlternationEnabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `fullWidth` | `boolean` | Optional; `true` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `sort = null` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Preserve `fullWidth = true` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Preserve `size = "md"` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Preserve `showBorders = true` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Preserve `showColumnLines = false` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Preserve `showRowLines = true` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Preserve `rowAlternationEnabled = true` observed in `web/library/src/design-system/components/organisms/DataGrid/useDataGrid.ts`.
- Source forwards `role="region"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/DataGrid.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/DataGrid/definition.ts): `basic`, `filtered-paginated`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native scrollable table with typed rows/columns and preserved header/row associations; do not replace it with cards that discard grid capabilities.
- [ ] Require stable unique row/column keys, columns nonempty, at most one row-header column and sort labels/callback for sortable columns.
- [ ] Sorting requests one ascending/descending change without mutating/sorting caller rows; invalid sorted column is rejected.
- [ ] Preserve fullWidth=true, md size, showBorders=true, showColumnLines=false, showRowLines=true and rowAlternationEnabled=true.
- [ ] Keep custom action cells independently operable and plain cells out of traversal; preserve emptyContent and explicit Header/Body/Footer.
- [ ] Support constrained horizontal scrolling and text scaling with native table header associations; no implicit data fetch, filter or pagination.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
