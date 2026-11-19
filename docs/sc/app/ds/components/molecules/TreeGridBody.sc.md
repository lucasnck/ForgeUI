---
title: "Flutter TreeGridBody"
scope: "Native app contract preserving the Web TreeGridBody capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter TreeGridBody

## Files

```text
components/forge_tree_grid.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web TreeGridBody](../../../../ds/components/molecules/TreeGridBody.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App TreeGridRow](TreeGridRow.sc.md)
- [App TreeGridCell](../atoms/TreeGridCell.sc.md)
- [App TreeGrid](../organisms/TreeGrid.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeTreeGridBody(
  child: content,
)
```

## Tests

### Native behavior

- Use a scoped native TreeGrid part with the existing owner's state, semantic identity and composition rules. Consume owner-computed typed rows/cells and visible-tree navigation; do not cast arbitrary records or flatten hidden descendants.
- Consume owner-computed typed rows/cells and visible-tree navigation; do not cast arbitrary records or flatten hidden descendants.
- Require the nearest matching owner; isolate simultaneous/nested instances and preserve permitted child content without duplicate registrations.
- Omit absent optional regions, reject duplicate/unknown parts according to the shared owner contract, and dispose scope registrations on removal.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeTreeGridBody({List<ForgeTreeGridRow>? rows})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Source forwards `role="rowgroup"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/TreeGridBody.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/TreeGridBody/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a scoped native TreeGrid part with the existing owner's state, semantic identity and composition rules. Consume owner-computed typed rows/cells and visible-tree navigation; do not cast arbitrary records or flatten hidden descendants.
- [ ] Consume owner-computed typed rows/cells and visible-tree navigation; do not cast arbitrary records or flatten hidden descendants.
- [ ] Require the nearest matching owner; isolate simultaneous/nested instances and preserve permitted child content without duplicate registrations.
- [ ] Omit absent optional regions, reject duplicate/unknown parts according to the shared owner contract, and dispose scope registrations on removal.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
