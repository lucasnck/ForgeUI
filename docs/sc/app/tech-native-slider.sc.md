---
title: "TECH — Native token-backed Slider"
status: "PENDING"
type: "tech"
scope: "A Flutter-native adjustable range without Material UI defaults"
---

# TECH — Native Slider

## Sequence

`sc-author` maintains the Web reference (`docs/sc/ds/components/molecules/Slider.sc.md`),
Flutter component contract (`docs/sc/app/ds/components/molecules/Slider.sc.md`) and this
TECH before `sc-implementer` modifies source or tests.

## Ownership

`app/library/lib/src/components/forge_slider.dart` owns touch/drag, focus,
keyboard, semantically adjustable value, canonical numeric normalization,
controlled/uncontrolled state, form registration/reset, disabled/readOnly,
painted track/thumb/focus/invalid state, and four-theme colors from generated
tokens. It imports `widgets.dart`, `services.dart` and `dart:math`, never
Material/Cupertino controls. The consumer owns focus nodes passed in, form
submit/reset, screen navigation and locale-specific `valueText`.

## Stable current API

Preserve the published constructor (`double? value`, `double? defaultValue`,
`double min/max/step`, `ValueChanged<double>? onChanged`, `ForgeSize`, `ForgeTone`,
`invalid`, `disabled`, `readOnly`, `required`, `fullWidth`, `focusNode`, `autofocus`,
`name`, `form`, `semanticLabel`, `valueText`). Do not silently replace Dart
numerics with Web strings; record the parity delta in the SC.

## Acceptance

1. Finite `min < max`, finite positive `step`; clamp/snap and preserve endpoints.
2. A gesture or keyboard action submits only one accepted normalized change;
   parent owns whether a controlled value is committed. Physical arrows obey
   RTL, while semantic increase/decrease always changes the numeric direction.
3. Passive `disabled` / `readOnly` never emits callbacks. Form data and reset
   retain existing ownership, including caller-owned `FocusNode` disposal.
4. The 48dp minimum **hit target** does not stretch the token track/thumb.
   Colors, borders, focus ring and opacity are derived from shared Web tokens.
5. Semantics exposes label/value and adjustable increase/decrease actions, with
   appropriate enabled/focusable state and no extra announcements.
6. Run static Node checks including negative mutations; then `dart format`,
   `flutter analyze`, targeted `flutter test`, `check:cross-platform`, Web ×
   Flutter four-theme visual comparison, Android/iOS keyboard/touch/a11y.
7. All 221 component contracts remain PENDING until independently accepted.

## Known remaining parity delta

The Web Slider's canonical input value/change channel is string-compatible,
whereas the currently published Flutter implementation uses `double` and a
numeric callback. The native rewrite retains that API to prevent breaking
consumers. A later approved SC must reconcile the observable Web contract,
including draft values and mapped inherited editing/semantic properties.
