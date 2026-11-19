---
title: "Flutter BreadcrumbItem"
scope: "Native app contract preserving the Web BreadcrumbItem capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter BreadcrumbItem

## Files

```text
components/forge_breadcrumb.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web BreadcrumbItem](../../../../ds/components/atoms/BreadcrumbItem.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Link](Link.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeBreadcrumbItem(
  child: content,
)
```

## Tests

### Native behavior

- Use an ancestor link or passive current-location item in the nearest Breadcrumb.
- Preserve current=false/href/child content and require current item last without href activation.
- Keep native link naming and exact destination; route resolution stays with consumer.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeBreadcrumbItem({Key? key, bool current = false, String? href, String? rel, Widget child = const SizedBox.shrink(), String? semanticLabel, void Function()? onActivate, void Function(ForgeLaunchRequest)? launcher, FocusNode? focusNode})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `current` | `boolean` | Optional; `false` | `current: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `href` | `string` | Optional; no local initializer | `href: String` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `children` | `ReactNode` | Optional; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `rel` | `string` | Optional; no local initializer | `rel: String` | Preserve destination/launch/download/language intent via injected navigation adapter; tab/referrer mechanics are explicitly Web-only. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onFocus` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus gain is true; preserve caller interception intent via the native focus/action binding. |
| `onBlur` | `FocusEventHandler<T>` | Optional; no local initializer | `onFocusChange: ValueChanged<bool>` | Native focus loss is false; retain blur/commit timing and no duplicate value callback. |
| `onClick` | `MouseEventHandler<T>` | Optional; no local initializer | `onActivate: VoidCallback` | Native action callback, never a DOM MouseEvent; preserve one activation and consumer interception/cancellation through the native action binding. |

### Defaults and fixed forwarding

- Preserve `current = false` observed in `web/library/src/design-system/components/atoms/BreadcrumbItem/BreadcrumbItem.tsx`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/BreadcrumbItem.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/BreadcrumbItem/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use an ancestor link or passive current-location item in the nearest Breadcrumb.
- [ ] Preserve current=false/href/child content and require current item last without href activation.
- [ ] Keep native link naming and exact destination; route resolution stays with consumer.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.


## Implementation checkpoint — 2026-11-16

- **Source written:** Native Dart implementation and public export for this owner/part.
- **Behavior covered in source:** explicit owner composition, validation, controlled callback intent, native semantics and theme tokens; no routing/network side effects.
- **Evidence:** static structural inspection and token/export checks only.
- **Runtime status:** `NOT_RUN` for `flutter analyze`, `flutter test test/forge_navigation_compounds_test.dart`, Flutter Web compilation, browser/native accessibility and pixel acceptance. The Flutter SDK is not available in this execution environment.
- **Acceptance:** Remains **PENDING**. Proposed native mappings not yet exposed remain open, and source code alone is not proof of parity. The tests must pass before this component is marked implemented/validated or registered in the preview manifest.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-REMAINING-PREVIEWS-WAVE-8.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
