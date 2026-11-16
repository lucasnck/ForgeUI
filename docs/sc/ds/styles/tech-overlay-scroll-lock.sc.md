---
title: "Overlay scroll lock"
scope: "Optional root overflow policy for explicitly requested scroll locks"
type: "style"
status: "DONE"
ds-level: "none"
---

# Overlay scroll lock

## Files

```text
design-system/styles/overlay-scroll-lock.css (C)
design-system/styles/globals.css (M)
features/showcase-v2/components/StyleResources/OverlayScrollLock/definition.ts (C)
features/showcase-v2/components/StyleResources/OverlayScrollLock/OverlayScrollLock.example.tsx (C)
features/showcase-v2/components/HookResources/useOverlay/useOverlayResourceExample.ts (C)
features/showcase-v2/components/StyleResources/OverlayScrollLock/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Contract

```css
@import "@forge-ui/web/styles/overlay-scroll-lock.css";
```

## Styles

```css
:root[data-overlay-scroll-locked="true"] {
  overflow: hidden;
}
```

```css
@import "./overlay-scroll-lock.css";
```

## Tests

- V2 Scoped scroll ownership: verify its observable state, actual public contract, reset and complete copied code.

- Only the true lock attribute suppresses root scrolling.
- An unlocked root inherits its existing overflow policy.
- The stylesheet adds no geometry, color, duration or inline compensation.

## Criteria

- [x] useOverlay owns reference counting and restores the prior attribute when its last explicit lockScroll owner leaves.
- [x] The style changes overflow only and introduces no component-specific presentation or timing.

- [x] V2 **Scoped scroll ownership**: Use the real useOverlay lockScroll option with two named overlay owners. Observe the root lock attribute and scrolling as each opens/closes; the last release and reset restore the previous root state. Do not leave a manual global attribute mutation behind.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
