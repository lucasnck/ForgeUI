---
title: "Flutter ButtonGroup"
scope: "Named wrapping actions preserving Web spacing and width behavior"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter ButtonGroup

## Files

```text
components/forge_button_group.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)

- [Web ButtonGroup](../../../../ds/components/molecules/ButtonGroup.sc.md)
- [Web layout](../../../../ds/styles/tech-layout.sc.md)
- [Flutter capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeButtonGroup(
  label: 'Actions',
  gap: ForgeSpace.s2,
  fullWidth: false,
  children: actions,
)
```

## Tests

- Require nonblank label and children list; verify gap=s2, padding=null, fullWidth=false and Key identity.
- Verify all twelve spacing choices, including zero and absent padding adding none.
- Verify wrapping in source order, centered cross-axis and directional start alignment, with the same gap token across lines.
- Verify intrinsic non-fullWidth layout, finite-parent filling and finite unbounded layout.
- Verify named group preserves independent child action semantics/focus rather than merging buttons.
- Verify RTL, narrow width and scaled text retain wrapping and callbacks.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeButtonGroup({Key? key, required String label, required List<Widget> children, ForgeSpace gap = ForgeSpace.s2, ForgeSpace? padding, bool fullWidth = false})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `gap` | `ComponentSpace` | Optional; `"2"` | `gap: ForgeSpace` | Same capability and value constraints; preserve source ownership and callback timing. |
| `padding` | `ComponentSpace` | Optional; no local initializer | `padding: ForgeSpace` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `false` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `gap = "2"` observed in `web/library/src/design-system/components/molecules/ButtonGroup/ButtonGroup.tsx`.
- Preserve `fullWidth = false` observed in `web/library/src/design-system/components/molecules/ButtonGroup/ButtonGroup.tsx`.
- Source forwards `role="group"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/ButtonGroup.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ButtonGroup/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [x] Expose children, label, gap, padding and fullWidth with Web defaults/behavior.
- [x] Use canonical spacing and wrapping, not an overflowing fixed Row or extra padding.
- [x] Keep independent actions/focus; do not invent selection, disabled propagation or roving focus.
- [x] Preserve accessible grouping without duplicate labels or lost child semantics.

- [ ] Complete applicable inherited native-property mapping review and targeted visual acceptance of the app/portal group before claiming full parity.
