---
title: "Flutter Form"
scope: "Native app contract preserving the Web Form capabilities and ownership"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# Flutter Form

## Files

```text
components/forge_form.dart (C)
../forge_ui.dart (M)
```

## Dependencies

- [Shared Web Form](../../../../ds/components/organisms/Form.sc.md)
- [Native API and model adaptation](../../types/tech-native-contracts.sc.md)
- [Flutter theme adapter](../../../tech-flutter-theme-adapter.sc.md)
- [App FormHeader](../atoms/FormHeader.sc.md)
- [App FormBody](../atoms/FormBody.sc.md)
- [App FormFooter](../atoms/FormFooter.sc.md)

## Contract

```dart
import 'package:forge_ui/forge_ui.dart';

ForgeForm(
  onValidSubmit: onValidSubmit,
  children: parts,
)
```

## Tests

### Native behavior

- Use a scoped native form/registration adapter with explicit valid submission and reset intents, not HTML FormData or a network client.
- Preserve onValidSubmit, children, loading=false/loadingLabel and caller cancellation ordering.
- Validate registered required/pattern/range constraints before valid submission, with explicit noValidate opt-out and named data/submitter intent.
- Keep submit disabled/loading semantics and native invalid focus; no automatic backend request or implicit submit from generic Button.
- Reset restores registered defaults once and honors cancellation; file/selection/scalar fields preserve their declared submission values.

### Implemented native API

The resolved public Dart constructor is shown below. This records source availability, not complete Web parity, native-device acceptance or compiled preview availability. The proposed equivalence and remaining Criteria below still apply.

```dart
ForgeForm({Key? key, required List<Widget> children, required void Function(ForgeFormData, ForgeSubmitContext) onValidSubmit, ForgeFormBinding? binding, bool loading = false, String? loadingLabel, String? semanticLabel, bool noValidate = false, void Function(ForgeSubmitContext)? onSubmit, void Function(ForgeSubmitContext)? onReset})
```

Constructor types, required parameters, defaults and aliases are generated in the [resolved native API inventory](../../../reference/native-component-api.json) using `npm run catalog:flutter-api`.

### Property equivalence

Each row is a proposed native contract, not an available export. Source types/requiredness are retained below; optional app parameters follow the documented source default, not a guessed Material default. Native aliases and model translations follow [the native mapping rules](../../../core-native-api-mapping.sc.md).

| Web property | Web type | Presence / local default | Proposed app property/type | Native adaptation |
| --- | --- | --- | --- | --- |
| `onValidSubmit` | `(data: FormData, event: SubmitEvent<HTMLFormElement>) => void` | Required; no local initializer | `onValidSubmit: void Function(ForgeFormData, ForgeSubmitContext)` | Validated native ordered form data plus submitter/cancellation context; preserve repeated names and caller intents. |
| `title` | `string` | Optional; no local initializer | `tooltip: String` | Preserve visible component title; inherited native title maps to tooltip. |
| `autoFocus` | `boolean` | Optional; no local initializer | `autofocus: bool` | Native focus request, subordinate to modal/compound owner policy; no focus theft during updates. |
| `id` | `string` | Optional; no local initializer | `semanticId: String` | Stable owner-scoped semantic/test identity, not a DOM id. |
| `aria-describedby` | `string` | Optional; no local initializer | `descriptions: List<ForgeDescriptionBinding>` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-expanded` | `Booleanish` | Optional; no local initializer | `semanticExpanded: bool` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-invalid` | `boolean \| "false" \| "true" \| "grammar" \| "spelling"` | Optional; no local initializer | `semanticInvalid: ForgeInvalidState` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-label` | `string` | Optional; no local initializer | `semanticLabel: String` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `aria-pressed` | `boolean \| "false" \| "mixed" \| "true"` | Optional; no local initializer | `semanticPressed: ForgeSemanticFlag` | Native semantics equivalent; component/context-owned state wins according to the shared contract; no duplicate announcements. |
| `onReset` | `ReactEventHandler<T>` | Optional; no local initializer | `onReset: ForgeResetInterceptor` | Native reset request with explicit cancellation; accepted reset restores registered defaults once without fabricating user changes. |
| `onSubmit` | `SubmitEventHandler<T>` | Optional; no local initializer | `onSubmit: ForgeSubmitInterceptor` | Caller interception precedes owned valid-submit handling; cancellation prevents callbacks and side effects. |
| `name` | `string` | Optional; no local initializer | `name: String` | Same capability and value constraints; preserve source ownership and callback timing. |
| `autoComplete` | `string` | Optional; no local initializer | `autoComplete: ForgeAutofillHints` | Translate the ordered Web autofill tokens to native autofill hints; report unsupported platform hints without inventing saved values. |
| `noValidate` | `boolean` | Optional; no local initializer | `noValidate: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `children` | `ReactNode` | Required; no local initializer | `children: List<Widget>` | Preserve permitted canonical parts, child order and identity; no arbitrary descendant cloning. |
| `loading` | `boolean` | Optional; `false` | `loading: bool` | Same capability and value constraints; preserve source ownership and callback timing. |
| `loadingLabel` | `string` | Optional; no local initializer | `loadingLabel: String` | Same capability and value constraints; preserve source ownership and callback timing. |

### Defaults and fixed forwarding

- Preserve `loading = false` observed in `web/library/src/design-system/components/organisms/Form/useForm.ts`.
- Preserve all observable constraints in [the shared acceptance criteria](../../../../ds/components/organisms/Form.sc.md#criteria); interpret browser-specific implementation/tooling through this native contract, not as Flutter dependencies.

### Showcase equivalence

- Preserve the component-owned scenarios from [the current Web showcase definition](../../../../../../showcase/portal/src/features/showcase-v2/components/Form/definition.ts): `basic`, `intents`. Source resource fixtures may remain documentation/typed fixtures rather than becoming extra widget parameters.
- Demonstrate the native contract, controlled refusal where applicable, reset and action feedback using actual app exports only after implementation. Do not simulate missing library features with demo-local styles or state.
- Compare copyable Dart usage and real property controls with the equivalent Web outcomes; Flutter Web preview alone is not native-device or visual acceptance.

## Criteria

- [ ] Expose the proposed native contract with every mapped shared capability, exact source value constraints and documented default/override precedence.
- [ ] Use a scoped native form/registration adapter with explicit valid submission and reset intents, not HTML FormData or a network client.
- [ ] Preserve onValidSubmit, children, loading=false/loadingLabel and caller cancellation ordering.
- [ ] Validate registered required/pattern/range constraints before valid submission, with explicit noValidate opt-out and named data/submitter intent.
- [ ] Keep submit disabled/loading semantics and native invalid focus; no automatic backend request or implicit submit from generic Button.
- [ ] Reset restores registered defaults once and honors cancellation; file/selection/scalar fields preserve their declared submission values.
- [ ] Retain public owner/part and typed data contracts; preserve shared observable acceptance while replacing Web mechanisms as mapped.
- [ ] Use canonical token/theme mappings and inherited app settings; resolve missing mappings at their shared owner instead of hardcoding a substitute.
- [ ] Implement equivalent scenarios/property controls only after the public widget supports them; record targeted behavior and relevant runtime evidence before DONE.

## Showcase verification checkpoint — 2026-11-17

The native showcase now exercises this API in its canonical composition. The [group validation report](../../../../../migration/FLUTTER-INTERACTION-FORMS-WAVE-6.md) records widget/snippet tests, compilation evidence and limits. This records preview coverage; it does not establish full Web parity or Android/iOS visual and assistive acceptance. Unverified Criteria remain PENDING.
