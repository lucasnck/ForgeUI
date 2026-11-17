---
title: "Flutter Skeleton"
scope: "Native app contract preserving the Web Skeleton capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Skeleton

## Files

```text
components/forge_skeleton.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Skeleton](../../../../ds/components/atoms/Skeleton.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeSkeleton()
```

## Tests

### Native behavior

- Use a decorative native placeholder with the same size/kind/shape/width geometry and motion opt-out.
- Preserve md/rectangle/fullWidth=true/animated=true and all source kind/shape values; circle never stretches.
- Exclude placeholder from semantics and focus; it never replaces/removes real caller content or fabricates a loading name.
- Reduced motion preserves geometry and contrast fallback rather than removing the placeholder.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeSkeleton({Key? key, ForgeSize size = ForgeSize.md, ForgeShape? shape, bool fullWidth = true, bool animated = true, ForgeSkeletonKind kind = ForgeSkeletonKind.rectangle})
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
| `children` | `ReactNode` | Optional; no local initializer | Excluded | Source-owned geometry/image/placeholder content overrides inherited children; do not introduce an app child parameter. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `true` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `kind` | `SkeletonKind` | Optional; `"rectangle"` | `kind: ForgeSkeletonKind` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `size = "md"` observed in `web/library/src/design-system/components/atoms/Skeleton/Skeleton.tsx`.
- Preserve `kind = "rectangle"` observed in `web/library/src/design-system/components/atoms/Skeleton/Skeleton.tsx`.
- Preserve `fullWidth = true` observed in `web/library/src/design-system/components/atoms/Skeleton/Skeleton.tsx`.
- Preserve `animated = true` observed in `web/library/src/design-system/components/atoms/Skeleton/Skeleton.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Skeleton.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Skeleton/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a decorative native placeholder with the same size/kind/shape/width geometry and motion opt-out.
- [ ] Preserve md/rectangle/fullWidth=true/animated=true and all source kind/shape values; circle never stretches.
- [ ] Exclude placeholder from semantics and focus; it never replaces/removes real caller content or fabricates a loading name.
- [ ] Reduced motion preserves geometry and contrast fallback rather than removing the placeholder.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
