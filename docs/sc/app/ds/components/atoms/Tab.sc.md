---
title: "Flutter Tab"
scope: "Native app contract preserving the Web Tab capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Tab

## Files

```text
components/forge_tabs.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Tab](../../../../ds/components/atoms/Tab.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Button](Button.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeTab(
  value: value,
)
```

## Tests

### Native behavior

- Render an owner-registered native tab action with explicit value and attached=false styling option.
- Preserve all shared visuals, native disabled behavior, active semantics and panel relation.
- Request selection once using the owner's traversal/activation model; never create a second selected-value store.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeTab({Key? key, required String value, required Widget child, bool disabled = false, bool attached = false, void Function()? onPressed, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.brand, ForgeAppearance appearance = ForgeAppearance.ghost, ForgeShape shape = ForgeShape.rounded})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `value` | `string` | Required; no local initializer | `value: String` | Native form submission value; preserve source scalar string serialization, distinct from checked/pressed/action state. |
| `attached` | `boolean` | Optional; `false` | `attached: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onClick` | `MouseEventHandler<T>` | Optional; no local initializer | `onPressed: VoidCallback` | Native action callback, never a DOM MouseEvent; preserve one activation and consumer interception/cancellation through the native action binding. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; `false` | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; no local initializer | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; no local initializer | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `appearance` | `ComponentAppearance` | Optional; no local initializer | `appearance: ForgeAppearance` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `attached = false` observed in `web/library/src/design-system/components/atoms/Tab/useTab.ts`.
- Preserve `disabled = false` observed in `web/library/src/design-system/components/atoms/Tab/useTab.ts`.
- Source forwards `type="button"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Source forwards `role="tab"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Tab.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Tab/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Render an owner-registered native tab action with explicit value and attached=false styling option.
- [ ] Preserve all shared visuals, native disabled behavior, active semantics and panel relation.
- [ ] Request selection once using the owner's traversal/activation model; never create a second selected-value store.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
