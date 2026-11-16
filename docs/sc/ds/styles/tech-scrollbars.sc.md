---
title: "Native scrollbar styling"
scope: "Small token-based scrollbar styling for document and native scroll containers"
status: "DONE"
type: "style"
ds-level: "none"
---

# Native scrollbar styling

## Files

```text
design-system/styles/scrollbars.css (C)
design-system/styles/tokens.css (M)
design-system/styles/globals.css (M)
features/showcase-v2/components/StyleResources/ScrollbarRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/ScrollbarRecipes/ScrollbarRecipes.example.tsx (C)
features/showcase-v2/components/StyleResources/ScrollbarRecipes/useScrollbarRecipesExample.ts (C)
features/showcase-v2/components/StyleResources/ScrollbarRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
features/showcase-v2/components/ResourceExamples/ResourceExamples.module.css (C)
```

## Dependencies

- [Design tokens](tech-design-tokens.sc.md)

## Contract

```css
@import "./scrollbars.css";
```

## Styles

```css
:root {
  --scrollbar-size: var(--length-1);
  --scrollbar-radius: var(--radius-md);
  --color-scrollbar-track: var(--color-transparent);
  --color-scrollbar-thumb: var(--color-text-muted);
  --color-scrollbar-thumb-hover: var(--color-text-default);
}
```

```css
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
}

@supports not (scrollbar-width: thin) {
  @media (forced-colors: none) {
    *::-webkit-scrollbar {
      width: var(--scrollbar-size);
      height: var(--scrollbar-size);
    }
    *::-webkit-scrollbar-track {
      background: var(--color-scrollbar-track);
    }
    *::-webkit-scrollbar-thumb {
      background: var(--color-scrollbar-thumb);
      border-radius: var(--scrollbar-radius);
    }
    *::-webkit-scrollbar-thumb:hover {
      background: var(--color-scrollbar-thumb-hover);
    }
    *::-webkit-scrollbar-corner {
      background: var(--color-scrollbar-track);
    }
  }
}

@media (forced-colors: active) {
  * {
    scrollbar-width: auto;
    scrollbar-color: auto;
  }
}
```


```css
.viewport {
  max-block-size: var(--length-28);
  max-inline-size: var(--size-full);
  overflow: auto;
}
.wideContent {
  inline-size: var(--layout-container-wide);
}
```

## Tests

- V2 Bounded scroll region: verify its observable state, actual public contract, reset and complete copied code.

- Check the existing catalog document, sticky menu, horizontal DataGrid viewport and overflowed filter Popover without adding a separate scrollbar component or fake scroll area.
- Verify drag, wheel, touchpad, keyboard and touch continue to use native scrolling; horizontal and vertical tracks retain their orientation.
- Check theme changes through existing semantic colors and native presentation in forced colors. Unsupported CSS and OS-managed overlay scrollbar visibility remain usable.
- Run token validation and build; inspect the standard path and the fallback only on browsers supporting each path. Do not treat mocked pseudo-element CSS as browser evidence.

## Criteria

- [x] Import scrollbars.css once from globals.css after the token import; inherited Showcase preview styles consume the same stylesheet without copying declarations.
- [x] The standard path uses thin native scrollbars and semantic thumb/track colors. The fallback size is length-1, with rounded thumb and a hover color where native pseudo-element styling exists.
- [x] Scrollbar colors follow light, dark, contrast and liquid-glass semantic values. Fallback does not override a browser supporting the standard width property.
- [x] Forced colors restore native automatic width/colors, without forced-color-adjust:none or custom thumb colors overriding the platform.
- [x] No scrollbar is hidden, no overlay scrollbar is forced permanently visible, and no exact cross-platform appearance is promised. Platform touch/overlay behavior remains native.
- [x] Styling does not set overflow, scrollbar-gutter, document scroll locking, wheel/touch handlers, pointer-event interception or scroll position; existing scroll ownership/layout remains intact.
- [x] No JavaScript scrollbar library, custom track/thumb DOM, new UI component, size/tone axis or component catalog entry is introduced.

- [x] V2 **Bounded scroll region**: Render named horizontal and vertical overflow regions with indexed content. Inspect the real globally loaded scrollbar recipe, token thumb/track values and keyboard scroll behavior across themes; do not inject a second global stylesheet or fabricate native thumb controls.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
