---
title: "Flutter ODataFilter"
scope: "Native app contract preserving the Web ODataFilter capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter ODataFilter

## Files

```text
components/forge_o_data_filter.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ODataFilter](../../../../ds/components/organisms/ODataFilter.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App ODataFilterCondition](../molecules/ODataFilterCondition.sc.md)
- [App ODataFilterGroup](../molecules/ODataFilterGroup.sc.md)
- [App Button](../atoms/Button.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeODataFilter(
  mode: mode,
  fields: fields,
  value: value,
  onValueChange: onValueChange,
  onApply: onApply,
  labels: labels,
)
```

## Tests

### Native behavior

- Port the exact expression model and serializer semantics to Dart. Use native form controls and responsive inline/stack actions without adding an API client.
- Preserve controlled simple/advanced expression edits, AND/OR nesting, add/remove/clear/cancel/apply callbacks and unsupported-simple-mode feedback.
- Validate before onApply and emit the exact filter string with the expression once; invalid/incomplete input leaves editable text visible and never silently drops conditions.
- Preserve GUID text and exact decimal sign/precision/trailing zeros and both between bounds; never use floating-point conversion for exact decimal fields.
- Clear to the same root id with empty AND children; disabled/unsupported actions follow the existing ownership rules and caller-refused changes remain authoritative.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeODataFilter({Key? key, required ForgeODataFilterMode mode, required List<ForgeODataFilterField> fields, required ForgeODataFilterExpression value, required void Function(ForgeODataFilterExpression) onValueChange, required void Function(ForgeODataFilterExpression, String) onApply, required ForgeODataFilterLabels labels, void Function()? onCancel, bool disabled = false, ForgeODataFilterActionsLayout actionsLayout = ForgeODataFilterActionsLayout.inline})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `mode` | `ODataFilterMode` | Required; no local initializer | `mode: ForgeODataFilterMode` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fields` | `readonly ODataFilterField[]` | Required; no local initializer | `fields: List<ForgeODataFilterField>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `value` | `ODataFilterExpression` | Required; no local initializer | `value: ForgeODataFilterExpression` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onValueChange` | `(value: ODataFilterExpression) => void` | Required; no local initializer | `onValueChange: void Function(ForgeODataFilterExpression)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onApply` | `(value: ODataFilterExpression, filter: string) => void` | Required; no local initializer | `onApply: void Function(ForgeODataFilterExpression, String)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onCancel` | `(() => void)` | Optional; no local initializer | `onCancel: void Function()` | Same capability and value constraints; preserve source ownership and callback timing. |
| `labels` | `ODataFilterLabels` | Required; no local initializer | `labels: ForgeODataFilterLabels` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; `false` | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `actionsLayout` | `ODataFilterActionsLayout` | Optional; `"inline"` | `actionsLayout: ForgeODataFilterActionsLayout` | Same capability and value constraints; preserve source ownership and callback timing. |
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

- Preserve `disabled = false` observed in `web/library/src/design-system/components/organisms/ODataFilter/useODataFilter.ts`.
- Preserve `actionsLayout = "inline"` observed in `web/library/src/design-system/components/organisms/ODataFilter/useODataFilter.ts`.
- Source forwards `role="status"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Source forwards `role="alert"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/ODataFilter.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ODataFilter/definition.ts): `sidebar`, `dropdown`, `basic`, `advanced`, `exact`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Port the exact expression model and serializer semantics to Dart. Use native form controls and responsive inline/stack actions without adding an API client.
- [ ] Preserve controlled simple/advanced expression edits, AND/OR nesting, add/remove/clear/cancel/apply callbacks and unsupported-simple-mode feedback.
- [ ] Validate before onApply and emit the exact filter string with the expression once; invalid/incomplete input leaves editable text visible and never silently drops conditions.
- [ ] Preserve GUID text and exact decimal sign/precision/trailing zeros and both between bounds; never use floating-point conversion for exact decimal fields.
- [ ] Clear to the same root id with empty AND children; disabled/unsupported actions follow the existing ownership rules and caller-refused changes remain authoritative.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
