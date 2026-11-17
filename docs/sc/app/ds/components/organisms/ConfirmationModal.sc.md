---
title: "Flutter ConfirmationModal"
scope: "Native app contract preserving the Web ConfirmationModal capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter ConfirmationModal

## Files

```text
components/forge_modal.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ConfirmationModal](../../../../ds/components/organisms/ConfirmationModal.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Button](../atoms/Button.sc.md)
- [App DialogClose](../atoms/DialogClose.sc.md)
- [App Icon](../atoms/Icon.sc.md)
- [App ModalBody](../atoms/ModalBody.sc.md)
- [App ModalFooter](../atoms/ModalFooter.sc.md)
- [App Modal](../molecules/Modal.sc.md)
- [App ModalHeader](../molecules/ModalHeader.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeConfirmationModal(
  title: title,
  closeLabel: closeLabel,
  cancelLabel: cancelLabel,
  confirmLabel: confirmLabel,
  onConfirm: onConfirm,
  child: content,
)
```

## Tests

### Native behavior

- Compose the existing native Modal parts and caller-owned confirm/cancel actions; do not add a second open/loading state machine.
- Require nonblank title/closeLabel/cancelLabel/confirmLabel and preserve children, focus targets, open state and outside-close policy.
- Confirm calls onConfirm once without auto-close or API work; loading/loadingLabel use Button behavior.
- Close/cancel request the Modal owner's state and honor controlled refusal.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeConfirmationModal({Key? key, required String title, required String closeLabel, required String cancelLabel, required String confirmLabel, required Widget child, required void Function() onConfirm, bool? open, bool defaultOpen = false, bool loading = false, bool animated = true, bool closeOnOutsideClick = false, String? loadingLabel, void Function(bool)? onOpenChange, FocusNode? initialFocusNode, FocusNode? returnFocusNode})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `title` | `string` | Required; no local initializer | `title: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `closeLabel` | `string` | Required; no local initializer | `closeLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `cancelLabel` | `string` | Required; no local initializer | `cancelLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `confirmLabel` | `string` | Required; no local initializer | `confirmLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onConfirm` | `() => void` | Required; no local initializer | `onConfirm: void Function()` | Same capability and value constraints; preserve source ownership and callback timing. |
| `initialFocusRef` | `RefObject<HTMLElement \| null>` | Optional; no local initializer | `initialFocusFocusNode: FocusNode` | Native caller-owned FocusNode; never dispose caller resources or infer a second focus scope. |
| `returnFocusRef` | `RefObject<HTMLElement \| null>` | Optional; no local initializer | `returnFocusFocusNode: FocusNode` | Native caller-owned FocusNode; never dispose caller resources or infer a second focus scope. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `closeOnOutsideClick` | `boolean` | Optional; no local initializer | `closeOnOutsideClick: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `child: Widget?` | Compose caller Widgets; keep passive/action semantics and null-content behavior from source. |
| `open` | `boolean` | Optional; no local initializer | `open: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultOpen` | `boolean` | Optional; no local initializer | `defaultOpen: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onOpenChange` | `((open: boolean) => void)` | Optional; no local initializer | `onOpenChange: void Function(bool)` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animationEffect` | `AnimationEffect` | Optional; no local initializer | `animationEffect: ForgeAnimationEffect` | Same capability and value constraints; preserve source ownership and callback timing. |
| `animated` | `boolean` | Optional; no local initializer | `animated: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loading` | `boolean` | Optional; `false` | `loading: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loadingLabel` | `string` | Optional; no local initializer | `loadingLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `loading = false` observed in `web/library/src/design-system/components/organisms/ConfirmationModal/useConfirmationModal.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/ConfirmationModal.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ConfirmationModal/definition.ts): `basic`, `secondary`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Compose the existing native Modal parts and caller-owned confirm/cancel actions; do not add a second open/loading state machine.
- [ ] Require nonblank title/closeLabel/cancelLabel/confirmLabel and preserve children, focus targets, open state and outside-close policy.
- [ ] Confirm calls onConfirm once without auto-close or API work; loading/loadingLabel use Button behavior.
- [ ] Close/cancel request the Modal owner's state and honor controlled refusal.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
