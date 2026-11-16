---
title: "Popup recipes"
scope: "Anchored text-input listbox surface and option states"
status: "DONE"
type: "style"
ds-level: "none"
---

# Popup recipes



## Files

```text
design-system/styles/popup-components.module.css (M)
features/showcase-v2/components/StyleResources/PopupRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/PopupRecipes/PopupRecipes.example.tsx (C)
features/showcase-v2/components/HookResources/usePopupListbox/usePopupListboxResourceExample.ts (C)
features/showcase-v2/components/StyleResources/PopupRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Design Tokens and Visual Foundations](tech-design-tokens.sc.md)

## Contract

```tsx
import styles from "@forge-ui/web/styles/popup-components.module.css";
<div className={styles.anchor}>{control}<ul className={styles.popup}>{options}</ul></div>;
```

## Styles

```css
.anchor {
  position: relative;
  min-inline-size: var(--zero);
}

.popup {
  position: absolute;
  inset-inline: var(--zero);
  inset-block-start: calc(var(--size-full) + var(--space-1));
  z-index: var(--z-index-popup);
  margin: var(--zero);
  padding: var(--space-1);
  list-style: none;
  background: var(--color-surface-raised);
  border: var(--border-width-thin) var(--border-style-default)
    var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-floating);
}

.option {
  display: block;
  overflow: hidden;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--color-text-default);
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
}

.option:hover,
.option[data-active] {
  background: var(--color-action-brand-background);
  color: var(--color-action-foreground);
}

@media (forced-colors: active) {
  .option[data-active] {
    background: var(--color-transparent);
    outline: var(--border-width-thick) var(--border-style-default)
      var(--color-system-highlight);
  }
}
```

## Tests

- V2 Anchored option surface: verify its observable state, actual public contract, reset and complete copied code.

- Popup width and placement follow the anchor without changing surrounding layout.
- Active options use the declared contrast pair and forced-colors outline.
- Consumer composition reuses anchor/popup/option without copying their visual declarations.

## Criteria

- [x] `--z-index-popup` — `src/design-system/styles/tokens.css`, documented by [Design tokens](tech-design-tokens.sc.md) (modify) — `10`; stays below `--z-index-skip-link` (`20`)
- [x] Includes disclosure derivation, active-option derivation, keyboard transitions, pointer acceptance, combobox/listbox/option attributes, stable ids and the popup surface styling. The rendering of the list itself is delivered by the [PopupListbox](../components/molecules/PopupListbox.sc.md) molecule, which consumes this hook and recipe. Excludes option content, filtering, matching, value resolution and completion (owned by each consuming component), non-input triggers such as a button, menu or flyout, dialogs and focus trapping, nested menus, a scrollable popup region and active-option scroll-into-view, outside-click and document listeners, animations, and every business, API, session or locale concern. A control whose trigger is not the text input itself is out of this contract; it needs its own documented adaptation before it can reuse the hook.
- [x] Shared recipe: `src/design-system/styles/popup-components.module.css`. [PopupListbox](../components/molecules/PopupListbox.sc.md) composes `popup` and `option`; a consuming control composes `anchor` on its wrapper and declares no popup visual selector of its own.
- [x] The popup matches the anchor's inline size, sits below it and is absolutely positioned, so it never shifts the layout of the surrounding form. `--color-surface-raised`, `--shadow-floating` and `--color-border-default` already adapt to light, dark, contrast and liquid-glass, so no theme-specific rule is needed here. The active option uses the `--color-action-brand-background`/`--color-action-foreground` pair, which carries the required text contrast; in forced colors the active state becomes an outline instead of a color. Long option text ellipsizes. The recipe declares no scroll region and no motion, so no reduced-motion or scroll-into-view rule is required at this revision.
- [x] Export `usePopupListbox`, `PopupListboxContract`, `PopupListboxOptions`, `PopupComboboxAttributes`, `PopupListboxAttributes`, `PopupOptionAttributes` and `ComponentPopupProps` through `@/design-system`. Add the recipe row and the `--z-index-popup` row to [Design tokens](tech-design-tokens.sc.md) and the hook/contract entry to the technical catalog after implementation and validation. [PopupListbox](../components/molecules/PopupListbox.sc.md) and the files of each consuming component belong to their own SCs.
- [x] Given the recipe, `anchor`, `popup`, `option` and the forced-colors rule declare only semantic tokens, and a consuming control declares no popup visual selector.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and the static render of both consumers pass.

- [x] V2 **Anchored option surface**: Compose a connected query input and real indexed listbox panel using the public popup anchor/surface recipes and actual popup hook. Compare supported open/empty/disabled states while preserving positioning, visible dismissal and keyboard ownership.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
