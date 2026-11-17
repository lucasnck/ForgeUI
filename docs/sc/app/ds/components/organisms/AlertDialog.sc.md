---
title: "Flutter AlertDialog"
scope: "Native app contract preserving the Web AlertDialog capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter AlertDialog

## Files

```text
components/forge_modal.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web AlertDialog](../../../../ds/components/organisms/AlertDialog.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Modal](../molecules/Modal.sc.md)
- [App ModalBody](../atoms/ModalBody.sc.md)
- [App AlertDialogHeader](../molecules/AlertDialogHeader.sc.md)
- [App AlertDialogBody](../atoms/AlertDialogBody.sc.md)
- [App AlertDialogFooter](../atoms/AlertDialogFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeAlertDialog(
  description: description,
  initialFocusFocusNode: initialFocusFocusNode,
  children: parts,
)
```

## Tests

### Native behavior

- Use the same modal engine with explicit warning semantics and required least-destructive initial focus; barrier/system-back cannot bypass ownership.
- Preserve description and required initial focus mapped to FocusNode; concise warning and controls are announced without duplicate content.
- Confirm invokes only caller action; no automatic mutation or closure, and rejected close remains open.
- Keep shared Modal parts/aliases and restore focus after accepted close; do not create a second modal lifecycle.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeAlertDialog({Key? key, required List<Widget> children, required String description, required FocusNode initialFocusNode, bool? open, bool defaultOpen = false, bool animated = true, void Function(bool)? onOpenChange, FocusNode? returnFocusNode, ForgeAnimationEffect animationEffect = ForgeAnimationEffect.fade, String? semanticLabel, void Function(ForgeModalDismissContext)? onCancel, void Function()? onClose})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `description` | `string` | Required; no local initializer | `description: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `initialFocusRef` | `RefObject<HTMLButtonElement \| null>` | Required; no local initializer | `initialFocusFocusNode: FocusNode` | Native caller-owned FocusNode; never dispose caller resources or infer a second focus scope. |
| `returnFocusRef` | `RefObject<HTMLElement \| null>` | Optional; no local initializer | `returnFocusFocusNode: FocusNode` | Native caller-owned FocusNode; never dispose caller resources or infer a second focus scope. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `open` | `boolean` | Optional; no local initializer | `open: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultOpen` | `boolean` | Optional; no local initializer | `defaultOpen: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onOpenChange` | `((open: boolean) => void)` | Optional; no local initializer | `onOpenChange: void Function(bool)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animationEffect` | `AnimationEffect` | Optional; no local initializer | `animationEffect: ForgeAnimationEffect` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; no local initializer | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Source forwards `role="alertdialog"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/AlertDialog.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/AlertDialog/definition.ts): `basic`, `secondary`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use the same modal engine with explicit warning semantics and required least-destructive initial focus; barrier/system-back cannot bypass ownership.
- [ ] Preserve description and required initial focus mapped to FocusNode; concise warning and controls are announced without duplicate content.
- [ ] Confirm invokes only caller action; no automatic mutation or closure, and rejected close remains open.
- [ ] Keep shared Modal parts/aliases and restore focus after accepted close; do not create a second modal lifecycle.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
