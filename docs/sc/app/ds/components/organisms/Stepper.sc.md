---
title: "Flutter Stepper"
scope: "Native app contract preserving the Web Stepper capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter Stepper

## Files

```text
components/forge_stepper.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Stepper](../../../../ds/components/organisms/Stepper.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App StepperHeader](../atoms/StepperHeader.sc.md)
- [App StepperBody](../atoms/StepperBody.sc.md)
- [App StepperFooter](../atoms/StepperFooter.sc.md)
- [App StepperPanel](../atoms/StepperPanel.sc.md)
- [App StepperItem](../molecules/StepperItem.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeStepper(
  label: label,
  value: value,
  onStepChange: onStepChange,
  children: parts,
)
```

## Tests

### Native behavior

- Use a named native ordered step controller with caller-owned active value; adapt line orientation/layout without changing step identity.
- Preserve label/value/onStepChange/children; only accepted enabled target steps become active.
- Keep panel associations, visible status labels and keyboard/touch access without automatically validating, saving or routing between steps.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeStepper({Key? key, required String label, required String value, required void Function(String) onStepChange, required List<Widget> children})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `value` | `string` | Required; no local initializer | `value: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onStepChange` | `(value: string) => void` | Required; no local initializer | `onStepChange: void Function(String)` | Same capability and value constraints; preserve source ownership and callback timing. |
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

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/Stepper.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Stepper/definition.ts): `basic`, `review`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a named native ordered step controller with caller-owned active value; adapt line orientation/layout without changing step identity.
- [ ] Preserve label/value/onStepChange/children; only accepted enabled target steps become active.
- [ ] Keep panel associations, visible status labels and keyboard/touch access without automatically validating, saving or routing between steps.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
