---
title: "Flutter Disclosure"
scope: "Native app contract preserving the Web Disclosure capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter Disclosure

## Files

```text
components/forge_disclosure.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Disclosure](../../../../ds/components/molecules/Disclosure.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Collapse](Collapse.sc.md)
- [App CollapseHeader](../atoms/CollapseHeader.sc.md)
- [App CollapseBody](../atoms/CollapseBody.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeDisclosure(
  label: label,
  child: content,
)
```

## Tests

### Native behavior

- Use the existing native Collapse engine plus a required visible label, not a new disclosure state machine.
- Preserve inherited Collapse open/defaultOpen/onOpenChange/disabled/animated capabilities.
- Keep one named trigger, retained closed child values and immediate focus repair; reject blank label.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeDisclosure({Key? key, required String label, required Widget child, bool? open, bool defaultOpen = false, bool disabled = false, bool animated = true, void Function(bool)? onOpenChange})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `open` | `boolean` | Optional; no local initializer | `open: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultOpen` | `boolean` | Optional; no local initializer | `defaultOpen: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onOpenChange` | `((open: boolean) => void)` | Optional; no local initializer | `onOpenChange: void Function(bool)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; no local initializer | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/Disclosure.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Disclosure/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use the existing native Collapse engine plus a required visible label, not a new disclosure state machine.
- [ ] Preserve inherited Collapse open/defaultOpen/onOpenChange/disabled/animated capabilities.
- [ ] Keep one named trigger, retained closed child values and immediate focus repair; reject blank label.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-INTERACTION-FORMS-WAVE-6.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
