---
title: "Flutter FieldError"
scope: "Native app contract preserving the Web FieldError capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter FieldError

## Files

```text
components/forge_field_error.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web FieldError](../../../../ds/components/atoms/FieldError.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeFieldError(
  child: content,
)
```

## Tests

### Native behavior

- Use native validation description and optional safe announcement, keeping validity owned by its control/form.
- Preserve announce=true and sm/danger/regular defaults plus all typography capabilities.
- Link the current error once, respect announce=false and never duplicate the control's error announcement or move focus automatically.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeFieldError({Key? key, String? text, Widget? child, bool announce = true, ForgeTextSize? size = ForgeTextSize.sm, ForgeTextTone? tone = ForgeTextTone.danger, ForgeFontWeight? weight = ForgeFontWeight.regular, String? semanticId, String? semanticLabel, List<ForgeDescriptionBinding> descriptions = const []})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `announce` | `boolean` | Optional; `true` | `announce: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `size` | `ComponentTextSize` | Optional; `"sm"` | `size: ForgeTextSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTextTone` | Optional; `"danger"` | `tone: ForgeTextTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `weight` | `ComponentFontWeight` | Optional; `"regular"` | `weight: ForgeFontWeight` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `announce = true` observed in `web/library/src/design-system/components/atoms/FieldError/FieldError.tsx`.
- Preserve `size = "sm"` observed in `web/library/src/design-system/components/atoms/FieldError/FieldError.tsx`.
- Preserve `tone = "danger"` observed in `web/library/src/design-system/components/atoms/FieldError/FieldError.tsx`.
- Preserve `weight = "regular"` observed in `web/library/src/design-system/components/atoms/FieldError/FieldError.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/FieldError.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/FieldError/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use native validation description and optional safe announcement, keeping validity owned by its control/form.
- [ ] Preserve announce=true and sm/danger/regular defaults plus all typography capabilities.
- [ ] Link the current error once, respect announce=false and never duplicate the control's error announcement or move focus automatically.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
