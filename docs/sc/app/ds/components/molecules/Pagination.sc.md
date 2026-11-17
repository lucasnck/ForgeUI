---
title: "Flutter Pagination"
scope: "Native app contract preserving the Web Pagination capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter Pagination

## Files

```text
components/forge_pagination.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Pagination](../../../../ds/components/molecules/Pagination.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App PaginationEllipsis](../atoms/PaginationEllipsis.sc.md)
- [App PaginationItem](../atoms/PaginationItem.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgePagination(
  label: label,
  page: page,
  pageCount: pageCount,
  onPageChange: onPageChange,
  children: parts,
)
```

## Tests

### Native behavior

- Use a named native page-control collection with explicit caller-owned page/pageCount and callback.
- Validate integral root/item ranges, require permitted parts and reject orphan/duplicate targets.
- Preserve disabled=false and one onPageChange request; controlled refusal keeps current page and never fetches or scrolls automatically.
- Keep page actions named and current state distinct from ellipsis.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgePagination({Key? key, required String label, required int page, required int pageCount, required void Function(int) onPageChange, required List<Widget> children, bool disabled = false})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `page` | `number` | Required; no local initializer | `page: int` | Same capability and value constraints; preserve source ownership and callback timing. |
| `pageCount` | `number` | Required; no local initializer | `pageCount: int` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onPageChange` | `(page: number) => void` | Required; no local initializer | `onPageChange: void Function(num)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; `false` | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |

### Defaults and fixed forwarding

- Preserve `disabled = false` observed in `web/library/src/design-system/components/molecules/Pagination/usePagination.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/Pagination.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Pagination/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a named native page-control collection with explicit caller-owned page/pageCount and callback.
- [ ] Validate integral root/item ranges, require permitted parts and reject orphan/duplicate targets.
- [ ] Preserve disabled=false and one onPageChange request; controlled refusal keeps current page and never fetches or scrolls automatically.
- [ ] Keep page actions named and current state distinct from ellipsis.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.


## Implementation checkpoint — 2026-11-16

- **Source written:** Native Dart implementation and public export for this owner/part.
- **Behavior covered in source:** explicit owner composition, validation, controlled callback intent, native semantics and theme tokens; no routing/network side effects.
- **Evidence:** static structural inspection and token/export checks only.
- **Runtime status:** `NOT_RUN` for `flutter analyze`, `flutter test test/forge_navigation_compounds_test.dart`, Flutter Web compilation, browser/native accessibility and pixel acceptance. The Flutter SDK is not available in this execution environment.
- **Acceptance:** Remains **PENDING**. Proposed native mappings not yet exposed remain open, and source code alone is not proof of parity. The tests must pass before this component is marked implemented/validated or registered in the preview manifest.
