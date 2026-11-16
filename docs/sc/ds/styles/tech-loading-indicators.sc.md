---
title: "Loading Indicators"
scope: "Shared animation contracts and recipes for Spinner and Skeleton"
status: "DONE"
type: "style"
ds-level: "none"
---

# Loading Indicators



## Files

```text
design-system/styles/loading-components.module.css (M)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/StyleResources/LoadingRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/LoadingRecipes/LoadingRecipes.example.tsx (C)
features/showcase-v2/components/StyleResources/LoadingRecipes/useLoadingRecipesExample.ts (C)
features/showcase-v2/components/StyleResources/LoadingRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Design tokens](tech-design-tokens.sc.md)
- [Typography](tech-typography.sc.md)
- [Loading contracts](../types/tech-loading-contracts.sc.md)

## Contract

```tsx
import styles from "@forge-ui/web/styles/loading-components.module.css";
<div className={styles.spinnerSize}/>;
```

## Styles

```css
.rotating[data-animated="true"] {
  animation: indicatorSpin var(--motion-spin-duration) var(--ease-linear)
    infinite;
}
.pulse[data-animated="true"] {
  animation: indicatorPulse var(--motion-pulse-duration) var(--ease-pulse)
    infinite alternate;
}
.spinnerSize {
  --spinner-size: var(--length-4);
  inline-size: var(--spinner-size);
  block-size: var(--spinner-size);
}
.spinnerTone {
  composes: action from "./toned-components.module.css";
  color: var(--color-current);
}
.spinnerTone[data-tone] {
  color: var(--control-background);
}
.skeletonSize {
  composes: shaped from "./shaped-components.module.css";
  --skeleton-height: var(--component-height-md);
  --skeleton-text-height: var(--length-3);
  display: inline-block;
  inline-size: var(--length-20);
  max-inline-size: var(--size-full);
  block-size: var(--skeleton-height);
}
.skeletonSize[data-kind="text"] {
  block-size: var(--skeleton-text-height);
}
.skeletonSize[data-kind="circle"] {
  inline-size: var(--skeleton-height);
  block-size: var(--skeleton-height);
  border-radius: var(--radius-circle);
}
.spinnerSize[data-size="xs"] {
  --spinner-size: var(--length-2);
}
.skeletonSize[data-size="xs"] {
  --skeleton-height: var(--component-height-xs);
  --skeleton-text-height: var(--length-2);
}
.spinnerSize[data-size="sm"] {
  --spinner-size: var(--length-3);
}
.skeletonSize[data-size="sm"] {
  --skeleton-height: var(--component-height-sm);
  --skeleton-text-height: var(--length-2);
}
.spinnerSize[data-size="lg"] {
  --spinner-size: var(--length-5);
}
.skeletonSize[data-size="lg"] {
  --skeleton-height: var(--component-height-lg);
  --skeleton-text-height: var(--length-3);
}
.spinnerSize[data-size="xl"] {
  --spinner-size: var(--length-6);
}
.skeletonSize[data-size="xl"] {
  --skeleton-height: var(--component-height-xl);
  --skeleton-text-height: var(--length-4);
}
@keyframes indicatorSpin {
  to {
    transform: rotate(var(--rotation-full));
  }
}
@keyframes indicatorPulse {
  from {
    opacity: var(--opacity-full);
  }
  to {
    opacity: var(--opacity-pulse);
  }
}
@media (prefers-reduced-motion: reduce) {
  .rotating[data-animated],
  .pulse[data-animated] {
    animation: none;
  }
}
@media (forced-colors: active) {
  .spinnerTone[data-tone] {
    color: var(--color-system-canvas-text);
  }
  .skeletonSize {
    outline: var(--border-width-thin) var(--border-style-default)
      var(--color-system-canvas-text);
  }
}
```

## Tests

- V2 Loading recipe comparison: verify its observable state, actual public contract, reset and complete copied code.

- Spinner and skeleton recipes use their canonical motion and size tokens.
- Reduced motion and animated=false remove loops while preserving visible status/placeholders.
- Skeleton kinds select rectangle/text/circle geometry without exposing fake interactive content.

## Criteria

- [x] Spinner and Skeleton share animation opt-out and OS reduced-motion behavior.
- [x] Button consumes decorative Spinner size xs with inherited color; no private spinner/keyframes remain.
- [x] Button retains disabled, aria-busy, loadingLabel and native type behavior.
- [x] Size/kind/tone selectors have one shared owner and token-backed declarations.
- [x] Forced colors keeps visible feedback without introducing announcements on decorative placeholders.
- [x] Token/type/static-export checks pass without new dependencies.
- [x] No timer, fake progress, fetching or feature dependency.
- [x] ComponentAnimatedProps is shared by Spinner/Skeleton.
- [x] The rotating contract uses data-animated default true; existing motion-spin-duration/ease-linear/rotation-full.
- [x] The pulse contract uses data-animated default true; existing motion-pulse-duration/ease-pulse/opacity-pulse.
- [x] The Spinner size contract uses diameter xs/sm/md/lg/xl = length-2/3/4/5/6; md default.
- [x] The Spinner color contract uses Omitted tone inherits currentColor for Button; explicit tone uses existing tone action pair.
- [x] The Skeleton rectangle contract uses height component-height-xs/sm/md/lg/xl.
- [x] The Skeleton text contract uses height length-2/2/3/3/4.
- [x] The Skeleton circle contract uses diameter component-height-xs/sm/md/lg/xl; fullWidth cannot distort ratio.
- [x] The Animation endpoints contract uses Add --opacity-full: 1 in tokens.css, used by pulse; no new durations.
- [x] Motion disabled explicitly or by OS keeps the placeholder/indicator visible.

- [x] V2 **Loading recipe comparison**: Compose actual Spinner/Skeleton/loading-status consumers and shared recipe classes with supported size/animated settings. Compare canonical motion opt-out/reduced motion and one accessible announcement path without fabricated progress.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
