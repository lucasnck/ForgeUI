---
title: "Flutter FormField"
scope: "Native app contract preserving the Web FormField capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# Flutter FormField

## Files

```text
components/forge_form_field.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web FormField](../../../../ds/components/molecules/FormField.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Label](../atoms/Label.sc.md)
- [App FieldHint](../atoms/FieldHint.sc.md)
- [App FieldError](../atoms/FieldError.sc.md)
- [App FormFieldHeader](../atoms/FormFieldHeader.sc.md)
- [App FormFieldBody](../atoms/FormFieldBody.sc.md)
- [App FormFieldFooter](FormFieldFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeFormField(
  controlId: controlId,
  label: label,
  children: parts,
)
```

## Tests

### Native behavior

- Use one native field-association scope linking a visible label, exactly one control and optional hint/error.
- Preserve controlId/label/hint/error/child content and existing consumer descriptions; only mounted messages contribute semantic associations.
- Use Label/FieldHint/FieldError primitives and explicit focus/semantic bindings rather than traversing arbitrary descendants.
- Invalid state and field value stay caller-owned; no automatic form registration/validation is introduced by presentation alone.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeFormField({Key? key, required String controlId, required String label, String? hint, String? error, ForgeControlBinding? control, Widget Function(BuildContext, ForgeFieldControl)? controlBuilder, List<Widget>? children})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `controlId` | `string` | Required; no local initializer | `controlId: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `hint` | `string` | Optional; no local initializer | `hint: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `error` | `string` | Optional; no local initializer | `error: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/molecules/FormField.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/FormField/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use one native field-association scope linking a visible label, exactly one control and optional hint/error.
- [ ] Preserve controlId/label/hint/error/child content and existing consumer descriptions; only mounted messages contribute semantic associations.
- [ ] Use Label/FieldHint/FieldError primitives and explicit focus/semantic bindings rather than traversing arbitrary descendants.
- [ ] Invalid state and field value stay caller-owned; no automatic form registration/validation is introduced by presentation alone.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
