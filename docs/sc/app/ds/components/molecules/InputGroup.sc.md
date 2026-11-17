---
title: "Flutter InputGroup"
scope: "Native app contract preserving the Web InputGroup capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter InputGroup

## Files

```text
components/forge_input_group.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web InputGroup](../../../../ds/components/molecules/InputGroup.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeInputGroup(
  child: content,
)
```

## Tests

### Native behavior

- Use a native layout composition around one control with leading/trailing slots and shared spacing/alignment.
- Preserve required child, optional leading/trailing, gap=s2/align=stretch/padding=s0/fullWidth=true and semantic intent for as.
- Omit absent slot wrappers; trailing Button retains its own name/focus/disabled state, and units are descriptions rather than extra actions.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeInputGroup({Key? key, required Widget child, Widget? leading, Widget? trailing, ForgeSpace gap = ForgeSpace.s2, ForgeSpace padding = ForgeSpace.s0, ForgeAlign align = ForgeAlign.stretch, bool fullWidth = true})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `as` | `LayoutElement` | Optional; `"div"` | `semanticRole: ForgeSemanticRole` | Native semantic/composition intent instead of an HTML tag; preserve text emphasis or structural intent without inventing app landmarks. |
| `leading` | `ReactNode` | Optional; no local initializer | `leading: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `trailing` | `ReactNode` | Optional; no local initializer | `trailing: Widget?` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `gap` | `ComponentSpace` | Optional; `"2"` | `gap: ForgeSpace` | Same capability and value constraints; preserve source ownership and callback timing. |
| `padding` | `ComponentSpace` | Optional; `"0"` | `padding: ForgeSpace` | Same capability and value constraints; preserve source ownership and callback timing. |
| `align` | `ComponentAlign` | Optional; `"stretch"` | `align: ForgeAlign` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `true` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `gap = "2"` observed in `web/library/src/design-system/components/molecules/InputGroup/InputGroup.tsx`.
- Preserve `align = "stretch"` observed in `web/library/src/design-system/components/molecules/InputGroup/InputGroup.tsx`.
- Preserve `padding = "0"` observed in `web/library/src/design-system/components/molecules/InputGroup/InputGroup.tsx`.
- Preserve `fullWidth = true` observed in `web/library/src/design-system/components/molecules/InputGroup/InputGroup.tsx`.
- Preserve `as = "div"` observed in `web/library/src/design-system/components/molecules/InputGroup/InputGroup.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/InputGroup.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/InputGroup/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a native layout composition around one control with leading/trailing slots and shared spacing/alignment.
- [ ] Preserve required child, optional leading/trailing, gap=s2/align=stretch/padding=s0/fullWidth=true and semantic intent for as.
- [ ] Omit absent slot wrappers; trailing Button retains its own name/focus/disabled state, and units are descriptions rather than extra actions.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
