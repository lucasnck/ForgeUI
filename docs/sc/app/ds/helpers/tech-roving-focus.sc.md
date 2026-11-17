---
title: "Flutter Roving Focus Controller"
scope: "Native focus traversal and FocusNode lifecycle shared by Tabs and Toolbar"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Flutter Roving Focus Controller

## Files

```text
controllers/roving_focus_controller.dart (M)
../../test/navigation_test.dart (M)
```

## Dependencies

- [App Tabs](../components/molecules/Tabs.sc.md)
- [App Toolbar](../components/molecules/Toolbar.sc.md)
- [Native contracts](../types/tech-native-contracts.sc.md)

## Contract

`ForgeRovingFocusController` is an internal controller shared by Tabs and Toolbar. It owns focus and optional typeahead, never selection or activation; caller widgets own their value and callbacks.

## Behavior

- Validate nonempty, unique item IDs before any registry mutation.
- Skip disabled actions. Arrow keys follow orientation and RTL/LTR; Home/End move to boundaries; looping is optional. Ignore modified shortcuts and key-up events. Never duplicate Enter/Space activation.
- Optional typeahead searches enabled labels, cycles repeated letters and resets stale prefix.
- On removal or disabling of the focused/active item, repair to next enabled item in prior order, else preceding, else first enabled; preserve selection. Move physical focus only when the former item had focus, after the new node attaches.
- Dispose detached owned FocusNodes after frame. Deferred callbacks are idempotent if the owner is disposed before the frame. No debug logs or global timers.
- Retained panel tests read the effective `EditableText.controller`, not nullable `TextField.controller`.

## Tests

- Keyboard traversal, disabled skip, RTL, manual tab activation and retained panel content.
- Focused-item removal/replacement, id validation, and owned-node teardown.
- Actual `flutter analyze` and `flutter test test/navigation_test.dart` are required for runtime evidence.

## Criteria

- [ ] Actual Flutter analysis and targeted tests pass.
- [ ] Focus replacement, disposal and no-duplicate activation are verified.
- [ ] No temporary debug logs remain.
- [ ] Tabs/Toolbar broader parity and visual/native acceptance stay PENDING.
