---
title: "Flutter ToastRegion"
scope: "Native app contract preserving the Web ToastRegion capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter ToastRegion

## Files

```text
components/forge_toast.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web ToastRegion](../../../../ds/components/organisms/ToastRegion.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App Toast](../molecules/Toast.sc.md)
- [App VisuallyHidden](../atoms/VisuallyHidden.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeToastRegion(
  label: label,
)
```

## Tests

### Native behavior

- Use an explicitly scoped native toast queue/overlay and accessibility announcement coordinator; do not replace record ownership with a global ScaffoldMessenger singleton.
- Preserve records/defaultRecords/onRecordsChange and typed renderToast; each record has stable identity and one queue-owned announcement.
- Respect timeouts, pause reasons for actual focus/hover/app lifecycle, resume after removal and dispose timers; rejected controlled removal retains the record.
- Restore focus to a surviving action or explicit fallbackFocusNode when the focused toast disappears, without stealing focus on arrival.
- Prevent competing root live/busy overrides from duplicating or suppressing queue channels; native gesture dismissal and keyboard actions request the same removal.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeToastRegion({Key? key, required String label, List<ForgeToastRecord>? records, List<ForgeToastRecord> defaultRecords = const [], void Function(List<ForgeToastRecord>)? onRecordsChange, ForgeToast Function(ForgeToastRecord)? renderToast, FocusNode? fallbackFocusNode, void Function(BuildContext, List<ForgeNotificationMessage>)? announcer, ForgeToastQueue? controller})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `label` | `string` | Required; no local initializer | `label: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `renderToast` | `((record: ToastRecord) => ReactElement<ToastProps>)` | Optional; no local initializer | `renderToast: ForgeToast Function(ForgeToastRecord)` | Custom renderer must return the canonical ForgeToast, preserving queue record ownership, identity, announcements and focus policy; arbitrary Widget results are rejected. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `fallbackRef` | `RefObject<HTMLElement \| null>` | Optional; no local initializer | `fallbackFocusNode: FocusNode` | Native caller-owned FocusNode; never dispose caller resources or infer a second focus scope. |
| `records` | `readonly ToastRecord[]` | Optional; no local initializer | `records: List<ForgeToastRecord>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `defaultRecords` | `readonly ToastRecord[]` | Optional; no local initializer | `defaultRecords: List<ForgeToastRecord>` | Same capability and value constraints; preserve source ownership and callback timing. |
| `onRecordsChange` | `((records: readonly ToastRecord[]) => void)` | Optional; no local initializer | `onRecordsChange: void Function(List<ForgeToastRecord>)` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- No public-property initializer is owned locally; preserve inherited defaults from the shared baseline/delegated component rather than choosing a new native default.
- Source forwards `role="status"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Source forwards `role="alert"` to a rendered control. Preserve that control intent and the source spread/override precedence; it is not automatically a new public app parameter.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/ToastRegion.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/ToastRegion/definition.ts): `basic`, `timed`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use an explicitly scoped native toast queue/overlay and accessibility announcement coordinator; do not replace record ownership with a global ScaffoldMessenger singleton.
- [ ] Preserve records/defaultRecords/onRecordsChange and typed renderToast; each record has stable identity and one queue-owned announcement.
- [ ] Respect timeouts, pause reasons for actual focus/hover/app lifecycle, resume after removal and dispose timers; rejected controlled removal retains the record.
- [ ] Restore focus to a surviving action or explicit fallbackFocusNode when the focused toast disappears, without stealing focus on arrival.
- [ ] Prevent competing root live/busy overrides from duplicating or suppressing queue channels; native gesture dismissal and keyboard actions request the same removal.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.
