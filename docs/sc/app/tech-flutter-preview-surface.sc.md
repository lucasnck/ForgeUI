---
title: "TECH — Flutter preview surface in the Web Showcase"
scope: "Embed the existing compiled Flutter preview in one responsive, theme-aware and accessible Showcase surface"
status: "PENDING"
type: "component"
ds-level: "none"
---

# Flutter preview surface

## Files

```text
showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.tsx (M)
showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterPreview.module.css (M)
showcase/portal/src/features/showcase-v2/components/FlutterPreview/FlutterComponentShowcase.tsx (M)
```

## Contract

```tsx
<FlutterPreview slug="button" />
```

## Ownership

This TECH owns **the shared Web host surface** for embedded Flutter Web builds, not generating Dart components, compiling the build itself, changing the library theme adapter or implementing the feature catalog. Keep the existing sandbox/frame messaging and same-origin validation. The user-facing per-component Showcase parity and interactive scenario choices belong to [App Showcase Parity](feature-showcase-parity.sc.md). Each component's native rendering remains governed by its own Flutter SC.

## Tests

- The preview frame fits the same responsive container as the Web example without duplicate chrome, clipped width or unwanted fixed maximum width.
- Theme, selected component and scenario changes propagate through the existing validated bridge; blocked/unavailable builds remain truthful and recoverable.
- Accessibility title/labels, keyboard focus, loading and error states have appropriate scope and no duplicate focus traps.
- Test narrow and wide preview viewports, light/dark themes and platform switching in a real browser before declaring visual parity.
- Run portal typecheck/build and targeted preview interaction checks; record command and browser evidence.

## Criteria

- [ ] One accessible and responsive Flutter preview host preserves valid bridge behavior.
- [ ] Equivalent scenarios and theme changes render in the shared Showcase container without false availability claims.
- [ ] Browser-based layout, keyboard and error handling checks recorded; no Dart-widget parity inferred.
