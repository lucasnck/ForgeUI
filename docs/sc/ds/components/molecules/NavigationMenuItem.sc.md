---
title: "NavigationMenuItem"
scope: "NavigationMenu public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# NavigationMenuItem

## Files

```text
features/showcase/examples/NavigationMenuPartExamples.tsx (C)
design-system/components/molecules/NavigationMenuItem/NavigationMenuItem.tsx (C)
design-system/components/molecules/NavigationMenuItem/NavigationMenuItem.module.css (C)
design-system/components/molecules/NavigationMenuItem/index.ts (C)
design-system/internal/navigationmenu/NavigationMenuContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/NavigationMenuItem.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/NavigationMenuItem/useNavigationMenuItem.ts (C)
design-system/components/molecules/NavigationMenuItem/useNavigationMenuGroup.ts (C)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/NavigationMenuItem/definition.ts (C)
features/showcase-v2/components/NavigationMenuItem/NavigationMenuItem.example.tsx (C)
features/showcase-v2/components/NavigationMenuItem/useNavigationMenuItemExample.ts (C)
features/showcase-v2/components/NavigationMenuItem/usage-code.ts (C)
features/showcase-v2/components/NavigationMenu/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [NavigationMenu.sc.md](../organisms/NavigationMenu.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [Link.sc.md](../atoms/Link.sc.md)

## Contract

```tsx
import { NavigationMenu, NavigationMenuBody, NavigationMenuItem } from "@forge-ui/web";
<NavigationMenu label="Navigation"><NavigationMenuBody><NavigationMenuItem label="Page" href="#page" /></NavigationMenuBody></NavigationMenu>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}
.trigger {
  max-inline-size: var(--size-full);
  text-align: start;
}
.panel {
  composes: disclosurePresence from "../../../styles/motion-components.module.css";
}
.clip {
  composes: clip from "../../../styles/motion-components.module.css";
}
.content {
  padding: var(--space-2);
}

.root > a[aria-current="page"] {
  color: var(--color-text-brand);
  font-weight: var(--font-weight-semibold);
}

```

## Hooks

```tsx
"use client";

import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { MouseEventHandler } from "react";
import type { NavigationMenuItemProps } from "./NavigationMenuItem";

export function useNavigationMenuGroup({ open, defaultOpen, onOpenChange, onClick, ...props }: NavigationMenuItemProps) {
  const collapse = useCollapse({ open, defaultOpen, onOpenChange });
  const presence = usePresence({ open: collapse.open, elementRef: collapse.bodyRef, enabled: props.animated });
  const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && collapse.triggerRef.current?.contains(event.target as Node)) collapse.toggle();
  };
  return { props, context: collapse, open: collapse.open, triggerProps: collapse.triggerProps, triggerRef: collapse.triggerRef, bodyProps: collapse.bodyProps, bodyRef: collapse.bodyRef, phase: presence.phase, onTransitionEnd: presence.onTransitionEnd, handleClick };
}
```

```tsx
"use client";

import { useNavigationMenuContext } from "../../../internal/navigationmenu/NavigationMenuContext";
import type { NavigationMenuItemProps } from "./NavigationMenuItem";

export function useNavigationMenuItem({ label, href, current = false, animated = true, open, defaultOpen, onOpenChange, children, className, ...props }: NavigationMenuItemProps) {
  useNavigationMenuContext();
  if (!label.trim()) throw new Error("NavigationMenuItem requires a nonempty label.");
  return { label, href, current, animated, open, defaultOpen, onOpenChange, children, className, props };
}
```

## Content

```tsx
"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { NativeCollectionItemProps } from "../../../types/compound-composition";
import type { ComponentAnimatedProps } from "../../../types/animation";
import type { ComponentOpenProps } from "../../../types/selection-navigation";
import { Link } from "../../atoms/Link";
import { Button } from "../../atoms/Button";
import { NavigationMenuSublist } from "../../atoms/NavigationMenuSublist";
import { NavigationItemContext } from "../../../internal/navigationmenu/NavigationItemContext";
import { useNavigationMenuItem } from "./useNavigationMenuItem";
import { useNavigationMenuGroup } from "./useNavigationMenuGroup";
import styles from "./NavigationMenuItem.module.css";

export interface NavigationMenuItemProps extends NativeCollectionItemProps, ComponentAnimatedProps, ComponentOpenProps {
  label: string;
  href?: string;
  current?: boolean;
}

function collectSublist(children: ReactNode): ReactElement | undefined {
  let sublist: ReactElement | undefined;
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment && child.key !== null) {
      const nested = collectSublist(child.props.children);
      if (nested) {
        if (sublist) throw new Error("NavigationMenuItem accepts exactly one Sublist.");
        sublist = nested;
      }
      return;
    }
    if (!isValidElement(child) || child.type !== NavigationMenuSublist || sublist) throw new Error("NavigationMenuItem group accepts exactly one NavigationMenuSublist.");
    sublist = child;
  });
  return sublist;
}

function NavigationMenuGroup(input: NavigationMenuItemProps) {
  const { props, context, open, triggerProps, triggerRef, bodyProps, bodyRef, phase, onTransitionEnd, handleClick } = useNavigationMenuGroup(input);
  const { label, children, className, animated, ...nativeProps } = props;
  return <NavigationItemContext value={context}>
    <li {...nativeProps} role={undefined} aria-current={undefined} className={[styles.root, className].filter(Boolean).join(" ")} onClick={handleClick}>
      <Button {...triggerProps} ref={triggerRef} type="button" tone="neutral" appearance="ghost" className={styles.trigger}>{label}</Button>
      <div {...bodyProps} ref={bodyRef} hidden={phase === "unmounted"} inert={!open || undefined} aria-hidden={!open || undefined} className={styles.panel} data-motion-state={phase} data-animated={animated} onTransitionEnd={onTransitionEnd}>
        <div className={styles.clip}><div className={styles.content}>{children}</div></div>
      </div>
    </li>
  </NavigationItemContext>;
}

export function NavigationMenuItem(input: NavigationMenuItemProps) {
  const { label, href, current, animated, open, defaultOpen, onOpenChange, children, className, props } = useNavigationMenuItem(input);
  const sublist = collectSublist(children);
  if (sublist) {
    if (href !== undefined || current) throw new Error("NavigationMenuItem groups have no href or current page state.");
    return <NavigationMenuGroup {...props} label={label} animated={animated} className={className} open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>{sublist}</NavigationMenuGroup>;
  }
  if (open !== undefined || defaultOpen !== undefined || onOpenChange !== undefined) throw new Error("NavigationMenuItem open state applies only to groups.");
  if (!href?.trim()) throw new Error("NavigationMenuItem leaves require a nonempty href.");
  return <li {...props} role={undefined} aria-current={undefined} className={[styles.root, className].filter(Boolean).join(" ")}>
    <Link href={href} aria-current={current ? "page" : undefined}>{label}</Link>
  </li>;
}
```

## Tests

- V2 Nested local navigation: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Verify defaultOpen, accepted/rejected controlled toggles, explicit prop updates and nested independent branches using the same useCollapse lifecycle. Reject group-only state on leaves and verify no open/defaultOpen/onOpenChange DOM attributes leak.

- Server-render native nav/ul/li/link hierarchy, one current page and collapsed inert disclosure panels.
- Reject orphan parts, invalid wrappers, ambiguous group href/current and missing leaf href.
- In the browser, verify native Tab/Enter/Space, caller prevention, nested disclosure isolation and close-focus repair.
- Verify animated=false, reduced motion and localized/theme presentation in the browser.

## Criteria

- [x] Given NavigationMenuItem, Leaf with href has no subgroup; group has exactly one NavigationMenuSublist and no href/current ambiguity.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Native nav keyboard and close-focus repair follow root.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useNavigationMenuItem is colocated with NavigationMenuItem and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] Group props extend the existing ComponentOpenProps contract; no duplicated open-state interface or new NavigationMenu component is introduced.
- [x] With no new props, groups preserve the existing initially collapsed uncontrolled behavior. defaultOpen is read as the initial uncontrolled value; open/onOpenChange follow controlled acceptance without a second local disclosure state.
- [x] Controlled refusal retains the actual expanded state and ARIA; accepted external collapse repairs descendant focus through useCollapse. Existing presence cleanup, inert/hidden behavior and animated=false/reduced motion remain intact.
- [x] open/defaultOpen/onOpenChange are consumed only for groups and never spread onto li/button/ul. Leaves reject group-only state rather than silently ignoring it.
- [x] Native caller onClick can prevent a disclosure request. Activating a nested group/leaf does not toggle ancestors; links retain native href and root click propagation for feature-owned routing.
- [x] Public examples illustrate default-open, controlled/rejected toggle and independent nested branches. Existing catalog contracts stay available; proposed controlled imports are not catalogued as delivered.

- [x] V2 **Nested local navigation**: Compose the real NavigationMenu/Body with one indexed parent and two indexed local destinations; supported expansion/traversal preserves accepted current location and stable keys.
- [x] The NavigationMenuItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useNavigationMenuItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the NavigationMenu fixture module listed in Files; part pages do not create a second index/key sequence for the same records.
