---
title: "Toolbar"
scope: "Presentation-only Toolbar with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Toolbar

## Files

```text
features/showcase/examples/useNavigationExampleCopy.ts (C)
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/components/molecules/Toolbar/Toolbar.tsx (C)
design-system/components/molecules/Toolbar/Toolbar.module.css (C)
design-system/components/molecules/Toolbar/index.ts (C)
design-system/internal/toolbar/ToolbarContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Toolbar.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/Toolbar/useToolbar.ts (C)
features/showcase-v2/components/Toolbar/definition.ts (C)
features/showcase-v2/components/Toolbar/Toolbar.example.tsx (C)
features/showcase-v2/components/Toolbar/useToolbarExample.ts (C)
features/showcase-v2/components/Toolbar/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/Toolbar/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [ToolbarItem](../atoms/ToolbarItem.sc.md)
- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-roving-focus.sc.md](../../hooks/tech-roving-focus.sc.md)
- [Button.sc.md](../atoms/Button.sc.md)
- [Focus contracts](../../types/tech-focus-contracts.sc.md)

## Contract

```tsx
import { Toolbar, ToolbarItem } from "@forge-ui/web";
<Toolbar label="Editing actions"><ToolbarItem itemKey="save">Save</ToolbarItem><ToolbarItem itemKey="copy">Copy</ToolbarItem><ToolbarItem itemKey="paste">Paste</ToolbarItem></Toolbar>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  min-inline-size: var(--zero);
  color: var(--color-text-default);
}
.root[data-orientation="horizontal"] {
  flex-direction: row;
  flex-wrap: wrap;
}
```

## Animations

```text
stateFeedback
```

## Hooks

```ts
"use client";

import { useImperativeHandle, useRef } from "react";
import type { KeyboardEventHandler } from "react";
import { useRovingFocus } from "../../../hooks/focus/useRovingFocus";
import type { ToolbarProps } from "./Toolbar";

export function useToolbar({ label, children, orientation = "horizontal", direction = "ltr", onKeyDown, ref, className, ...props }: ToolbarProps, initialId?: string) {
  if (!label.trim()) throw new Error("Toolbar requires a nonempty label.");
  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => rootRef.current!, []);
  const focus = useRovingFocus({ orientation, direction, loop: true, typeahead: false, initialId, fallbackRef: rootRef });
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented) focus.onKeyDown(event);
  };
  return { label, children, orientation, direction, className, props, rootRef, focus, handleKeyDown };
}
```

## Content

```ts
"use client";

import { createContext, useContext } from "react";
import type { RovingFocusContract } from "../../types/focus";

export const ToolbarContext = createContext<RovingFocusContract | null>(null);

export function useToolbarContext() {
  const context = useContext(ToolbarContext);
  if (!context) throw new Error("ToolbarItem must be rendered inside Toolbar.");
  return context;
}
```

```tsx
"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { NativeCollectionRootProps, ComponentChildrenProps } from "../../../types/compound-composition";
import type { NavigationOrientation, NavigationDirection } from "../../../types/focus";
import { ToolbarContext } from "../../../internal/toolbar/ToolbarContext";
import { ToolbarItem } from "../../atoms/ToolbarItem";
import type { ToolbarItemProps } from "../../atoms/ToolbarItem";
import { useToolbar } from "./useToolbar";
import styles from "./Toolbar.module.css";

export interface ToolbarProps extends NativeCollectionRootProps, ComponentChildrenProps {
  label: string;
  orientation?: NavigationOrientation;
  direction?: NavigationDirection;
}

function collectItems(children: ReactNode): ReactElement<ToolbarItemProps>[] {
  const items: ReactElement<ToolbarItemProps>[] = [];
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment && child.key !== null) {
      items.push(...collectItems(child.props.children));
      return;
    }
    if (!isValidElement<ToolbarItemProps>(child) || child.type !== ToolbarItem) {
      throw new Error("Toolbar accepts only ToolbarItem controls and keyed fragments.");
    }
    items.push(child);
  });
  return items;
}

export function Toolbar(input: ToolbarProps) {
  const items = collectItems(input.children);
  const { label, children, orientation, direction, className, props, rootRef, focus, handleKeyDown } = useToolbar(input, items.find((item) => !item.props.disabled)?.props.itemKey);
  if (items.length < 3) throw new Error("Toolbar requires at least three ToolbarItem controls; use ButtonGroup for smaller groups.");
  const keys = items.map((item) => item.props.itemKey);
  if (keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length) throw new Error("Toolbar itemKey values must be nonempty and unique.");
  return (
    <ToolbarContext value={focus}>
      <div
        {...props}
        ref={rootRef}
        role="toolbar"
        aria-label={label}
        aria-orientation={orientation}
        dir={direction}
        data-orientation={orientation}
        data-gap="2"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        {children}
      </div>
    </ToolbarContext>
  );
}
```

## Tests

- V2 Action toolbar: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] Given Tab, one enabled control is entered; arrows move focus and selection is not invented.
- [x] The label / orientation / direction contract uses Required / horizontal / ltr.
- [x] The children contract uses At least three native ToolbarItem controls; smaller groups use ButtonGroup.
- [x] Exclude text input, slider, radio, nested popup and other controls that compete for navigation arrows in this initial contract; those require a reviewed interaction adapter.
- [x] Header/Body/Footer do not have meaningful independent toolbar roles and are intentionally omitted.
- [x] Use data-gap="2" on the owned stack.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.
- [x] Root does not animate item order or wrap.
- [x] useToolbar is colocated with Toolbar and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Action toolbar**: Compose three ToolbarItems with stable itemKey and Children 1..3; supported arrow/Home/End navigation skips disabled items and activation reports the real action.
- [x] The Toolbar V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useToolbarExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
