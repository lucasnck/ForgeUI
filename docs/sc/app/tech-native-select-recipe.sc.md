---
title: "TECH — Select shared Web/Flutter action recipe without Material ButtonStyle"
scope: "Extract ForgeSelect background resolve from legacy Material ButtonStyle while maintaining exact Forge token palette; full Select native control migration remains separately pending"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# ForgeSelect — native recipe boundary

## Files

- `app/library/lib/src/theme/forge_control_style.dart` (M)
- `app/library/lib/src/components/forge_select.dart` (M)
- `app/library/lib/src/theme/forge_native_action_recipe.dart` (dependency, unchanged)

## Contract

- The previous private helper `forgeActionStyle(...)` takes size, tone, appearance, shape, reduceMotion and the Forge token set. Return the existing `ForgeNativeActionRecipe` instead of Material `ButtonStyle`.
- For `ForgeSelect`, replace the `ButtonStyle.backgroundColor.resolve({})` access with `ForgeNativeActionRecipe.background`. Both paths must resolve exactly the same Web-owned solid/soft/outlined/bordered/ghost/none background color for every tone/theme. No public constructor or default may change.
- Preserve Material `DropdownButton`/`InputDecorator` temporarily, since replacing them requires a full component SC addressing forms, multiple selection, focus/keyboard, typeahead, RTL, popover geometry and accessibility. Do not claim Select independent after this helper refactor.
- Do not add a new palette, hard-coded mobile color, or new state model.

## Acceptance

- [ ] Private helper no longer imports Material/Cupertino; public `ForgeSelect` API unchanged.
- [ ] Static test verifies all exact theme/color/appearance branches come from the same token recipe and does not introduce duplicate mappings.
- [ ] `flutter analyze`, widget tests for Select single/multiple and 4 themes, visual/a11y review in Android/iOS completed before SC DONE.
