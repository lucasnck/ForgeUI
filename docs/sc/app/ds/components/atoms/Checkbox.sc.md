---
title: "Flutter Checkbox"
scope: "Native app contract preserving the Web Checkbox capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Flutter Checkbox

## Files

```text
components/forge_checkable.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Checkbox](../../../../ds/components/atoms/Checkbox.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeCheckbox()
```

## Tests

### Native behavior

- Use native checkable semantics and controlled/default checked state, preserving disabled, required, invalid and named form intent.
- One user toggle/selection emits one boolean change; controlled refusal and prop changes do not create corrective callbacks.
- Keep native focus/touch/keyboard behavior and exact submitted value; Radio selection exclusivity uses native group adapter rather than DOM name.
- Preserve each component's actual visuals/defaults; do not add appearance/shape capabilities absent from that component.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeCheckbox({Key? key, bool? checked, bool defaultChecked = false, void Function(bool)? onChanged, bool disabled = false, bool required = false, bool fullWidth = false, bool animated = true, bool? invalid, String? name, String? semanticLabel, String value = 'on', ForgeFormBinding? form, FocusNode? focusNode, bool autofocus = false, ForgeSize size = ForgeSize.md, ForgeTone tone = ForgeTone.brand, ForgeShape? shape})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `form` | `string` | Optional; no local initializer | `form: ForgeFormBinding` | Explicit native form association; no hidden HTML controls or ambient document lookup. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `defaultChecked` | `boolean` | Optional; no local initializer | `defaultChecked: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onChange` | `ChangeEventHandler<T, HTMLInputElement>` | Optional; no local initializer | `onChanged: ValueChanged<bool>` | Native value callback replacing browser event; preserve controlled/default ownership, exact canonical value and one user-change notification. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `value` | `string \| readonly string[] \| number` | Optional; no local initializer | `value: String` | Native form submission value; preserve source scalar string serialization, distinct from checked/pressed/action state. |
| `required` | `boolean` | Optional; no local initializer | `required: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `checked` | `boolean` | Optional; no local initializer | `checked: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `disabled` | `boolean` | Optional; no local initializer | `disabled: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `readOnly` | `boolean` | Optional; no local initializer | `readOnly: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `size` | `ComponentSize` | Optional; `"md"` | `size: ForgeSize` | Same capability and value constraints; preserve source ownership and callback timing. |
| `tone` | `ComponentTone` | Optional; `"brand"` | `tone: ForgeTone` | Same capability and value constraints; preserve source ownership and callback timing. |
| `shape` | `ComponentShape` | Optional; no local initializer | `shape: ForgeShape` | Same capability and value constraints; preserve source ownership and callback timing. |
| `fullWidth` | `boolean` | Optional; `false` | `fullWidth: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `invalid` | `boolean` | Optional; no local initializer | `invalid: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; `true` | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `size = "md"` observed in `web/library/src/design-system/components/atoms/Checkbox/Checkbox.tsx`.
- Preserve `tone = "brand"` observed in `web/library/src/design-system/components/atoms/Checkbox/Checkbox.tsx`.
- Preserve `fullWidth = false` observed in `web/library/src/design-system/components/atoms/Checkbox/Checkbox.tsx`.
- Preserve `animated = true` observed in `web/library/src/design-system/components/atoms/Checkbox/Checkbox.tsx`.
- Source forwards `type="checkbox"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/atoms/Checkbox.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Checkbox/definition.ts): `basic`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use native checkable semantics and controlled/default checked state, preserving disabled, required, invalid and named form intent.
- [ ] One user toggle/selection emits one boolean change; controlled refusal and prop changes do not create corrective callbacks.
- [ ] Keep native focus/touch/keyboard behavior and exact submitted value; Radio selection exclusivity uses native group adapter rather than DOM name.
- [ ] Preserve each component's actual visuals/defaults; do not add appearance/shape capabilities absent from that component.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

### Independência nativa — recorte 18/11/2026

- **Fonte canônica compartilhada:** `app/library/lib/src/components/forge_checkable.dart` e [TECH de controles nativos](../../../tech-native-checkables.sc.md).
- **Implementação deste recorte:** `package:flutter/widgets.dart` + `services.dart`, `Focus`, `GestureDetector`, `Semantics` e tokens existentes, removendo `Material`, `InkWell` e `kMinInteractiveDimension` da fonte.
- **Contrato Checkbox:** `checked/defaultChecked` controlled/uncontrolled, onChanged once per user action, disabled, focus, required, invalid and named form reset; semantic checked + activation Enter/Space.
- **Limite de compatibilidade:** alvo mínimo 48 dp equivalente ao anterior, ainda sem token semântico dedicado; nenhum contrato público ou export modificado.
- **Validação requerida:** `npm run test:native-checkables`, `flutter analyze`, `flutter test test/forge_native_checkables_test.dart`, acessibilidade e paridade em aparelho. O teste Node cobre fronteira estrutural, não a semântica em runtime.
- **Estado:** `PENDING`. Só marcar critérios após execução dos testes e verificação funcional/visual.
