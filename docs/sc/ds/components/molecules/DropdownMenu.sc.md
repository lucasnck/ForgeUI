---
title: "DropdownMenu"
scope: "Aggregate scoped DropdownMenu parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# DropdownMenu

## Files

```text
design-system/components/molecules/DropdownMenu/DropdownMenu.tsx (C)
design-system/components/molecules/DropdownMenu/DropdownMenu.module.css (C)
design-system/components/molecules/DropdownMenu/index.ts (C)
design-system/internal/dropdownmenu/DropdownMenuContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/DropdownMenu.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/DropdownMenu/useDropdownMenu.ts (C)
features/showcase-v2/components/DropdownMenu/definition.ts (C)
features/showcase-v2/components/DropdownMenu/DropdownMenu.example.tsx (C)
features/showcase-v2/components/DropdownMenu/useDropdownMenuExample.ts (C)
features/showcase-v2/components/DropdownMenu/usage-code.ts (C)
features/showcase-v2/components/DropdownMenu/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Menu.sc.md](Menu.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [tech-overlay-interactions.sc.md](../../hooks/tech-overlay-interactions.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [usePresence](../../hooks/tech-presence.sc.md)
- [Selection, panel and open-state contracts](../../types/tech-selection-navigation.sc.md)

## Contract

```tsx
import { DropdownMenu, Menu, MenuHeader, MenuBody, MenuItem, MenuFooter } from "@forge-ui/web";
<DropdownMenu label="Actions"><Menu label="Actions" onAction={runAction}><MenuHeader>Document</MenuHeader><MenuBody><MenuItem value="download" label="Download"/></MenuBody><MenuFooter>Related help</MenuFooter></Menu></DropdownMenu>;
```

## Styles

```css
.root { composes: anchor from "../../../styles/popup-components.module.css"; min-inline-size: var(--zero); }
.surface { padding: var(--zero); composes: popup from "../../../styles/popup-components.module.css"; }
```

## Animations

```text
none
fade
scale
```

## Hooks

```tsx
"use client";
import { useLayoutEffect, useRef, useImperativeHandle } from "react";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { useOverlay } from "../../../hooks/overlay/useOverlay";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { DropdownMenuProps } from "./DropdownMenu";
import type { CollectionFocusEdge } from "../../../types/collection-contracts";
function focusMenuPanel(panel: HTMLDivElement | null, preference: CollectionFocusEdge) {
  const nodes = [...(panel?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])].filter((node) => !node.closest("[hidden], [inert]") && node.getClientRects().length);
  (preference === "last" ? nodes.at(-1) : nodes[0])?.focus();
  if (!nodes.length) panel?.querySelector<HTMLElement>('[role="menu"]')?.focus();
}
export function useDropdownMenu(input: DropdownMenuProps) {
  const { open, defaultOpen, onOpenChange, disabled: rootDisabled = false, label, trigger, children, animated = true, animationEffect = "fade", className, onClick, onKeyDown, onBlurCapture, ...props } = input;
  if (!label.trim()) throw new Error("DropdownMenu requires a nonempty label.");
  const disabled = rootDisabled || !!(trigger?.props.disabled || trigger?.props.loading);
  const collapse = useCollapse({ open, defaultOpen, onOpenChange, disabled });
  useImperativeHandle(trigger?.props.ref, () => collapse.triggerRef.current!, [collapse.triggerRef]);
  const pendingClose = useRef(false);
  const preference = useRef<CollectionFocusEdge>("first");
  function dismiss() { if (pendingClose.current) return; pendingClose.current = true; collapse.requestOpen(false); queueMicrotask(() => { pendingClose.current = false; }); }
  const overlay = useOverlay({ open: collapse.open, triggerRef: collapse.triggerRef, panelRef: collapse.bodyRef, onEscape: dismiss, onOutside: dismiss });
  const presence = usePresence({ open: collapse.open, elementRef: collapse.bodyRef, enabled: animated && animationEffect !== "none" });
  const handleClick: NonNullable<DropdownMenuProps["onClick"]> = (event) => { onClick?.(event); if (!event.defaultPrevented && collapse.triggerRef.current?.contains(event.target as Node)) { preference.current = "first"; collapse.toggle(); } };
  const handleKeyDown: NonNullable<DropdownMenuProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event); if (event.defaultPrevented || disabled || event.nativeEvent.isComposing || event.ctrlKey || event.altKey || event.metaKey || !collapse.triggerRef.current?.contains(event.target as Node) || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault(); preference.current = event.key === "ArrowUp" ? "last" : "first";
    if (collapse.open) focusMenuPanel(collapse.bodyRef.current, preference.current); else collapse.requestOpen(true);
  };
  const handleBlurCapture: NonNullable<DropdownMenuProps["onBlurCapture"]> = (event) => { onBlurCapture?.(event); if (!event.defaultPrevented && !pendingClose.current && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) dismiss(); };
  useLayoutEffect(() => { if (collapse.open) focusMenuPanel(collapse.bodyRef.current, preference.current); }, [collapse.open, collapse.bodyRef]);
  return { props, children, trigger, customTriggerProps: { ...collapse.triggerProps, disabled, ref: collapse.triggerRef, type: "button" as const, "aria-haspopup": "menu" as const }, className, label, animated, animationEffect, triggerRef: collapse.triggerRef, triggerProps: collapse.triggerProps,
    panelRef: collapse.bodyRef, panelProps: { id: collapse.bodyProps.id, onFocusCapture: collapse.bodyProps.onFocusCapture, onBlurCapture: collapse.bodyProps.onBlurCapture },
    acceptedOpen: collapse.open, present: presence.present, phase: presence.phase, onTransitionEnd: presence.onTransitionEnd, handleClick, handleKeyDown, handleBlurCapture, context: { dismiss, overlay },
  };
}
```

## Content

```tsx
"use client";
import { Children, Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode, ReactElement } from "react";
import type { NativeCollectionRootProps, ComponentChildrenProps, ComponentOpenProps, ComponentAnimationEffectProps } from "../../../types";
import { DropdownMenuContext } from "../../../internal/dropdownmenu/DropdownMenuContext";
import { Menu } from "../Menu";
import type { ButtonProps } from "../../atoms/Button";
import { IconButton } from "../IconButton";
import { Button } from "../../atoms/Button";
import { useDropdownMenu } from "./useDropdownMenu";
import effects from "../../../styles/animations/surface-animations.module.css";
import styles from "./DropdownMenu.module.css";
export interface DropdownMenuProps extends NativeCollectionRootProps, ComponentChildrenProps, ComponentOpenProps, ComponentAnimationEffectProps { label: string; disabled?: boolean; trigger?: ReactElement<ButtonProps>; }
function validateMenu(children: ReactNode, menus: ReactNode[] = []) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<{ children?: ReactNode }>(child)) throw new Error("DropdownMenu requires a direct Menu child.");
    if (child.type === Fragment && child.key !== null) { validateMenu(child.props.children, menus); return; }
    if (child.type !== Menu) throw new Error("DropdownMenu requires a direct Menu child."); menus.push(child);
  });
  return menus;
}
function validateTriggerContent(children: ReactNode) {
  Children.forEach(children, (child) => {
    if (!isValidElement<{ children?: ReactNode; href?: string }>(child)) return;
    if (child.type === Button || child.type === IconButton || (typeof child.type === "string" && (["button", "input", "select", "textarea"].includes(child.type) || (child.type === "a" && child.props.href !== undefined)))) throw new Error("DropdownMenu trigger cannot contain interactive controls.");
    if (child.type === Fragment || typeof child.type === "string") validateTriggerContent(child.props.children);
  });
}
export function DropdownMenu(input: DropdownMenuProps) {
  const { props, children, className, label, animated, animationEffect, triggerRef, triggerProps, panelRef, panelProps, acceptedOpen, present, phase, onTransitionEnd, handleClick, handleKeyDown, handleBlurCapture, context, trigger, customTriggerProps } = useDropdownMenu(input);
  if (trigger && (!isValidElement(trigger) || (trigger.type !== Button && trigger.type !== IconButton))) throw new Error("DropdownMenu trigger must be a public Button or IconButton.");
  if (trigger) validateTriggerContent(trigger.props.children);
  if (validateMenu(children).length !== 1) throw new Error("DropdownMenu requires exactly one Menu.");
  return <DropdownMenuContext value={context}><div {...props} className={[styles.root, className].filter(Boolean).join(" ")} onClick={handleClick} onKeyDown={handleKeyDown} onBlurCapture={handleBlurCapture}>{trigger ? cloneElement(trigger, customTriggerProps) : <Button {...triggerProps} ref={triggerRef} type="button" aria-haspopup="menu">{label}</Button>}
    {present && <div {...panelProps} ref={panelRef} tabIndex={-1} inert={!acceptedOpen || undefined} aria-hidden={!acceptedOpen || undefined} data-animated={animated} data-motion-state={phase} onTransitionEnd={onTransitionEnd} className={[styles.surface, effects[animationEffect]].join(" ")}>{children}</div>}
  </div></DropdownMenuContext>;
}
```

## Tests

- V2 Default and composite triggers: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Disabled or unregistered items are skipped during the family’s documented keyboard traversal.
- Caller-prevented activation runs no owned selection/action and does not duplicate callbacks.
- Nested scopes and unmount cleanup preserve independent registration and stable relationship ids.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] The required Menu owns optional Header/Footer; DropdownMenu adds only its trigger and popup shell.
- [x] The label contract uses Required trigger name.
- [x] The open / defaultOpen / disabled contract uses undefined / false / false.
- [x] Root owns open state via useCollapse and layer via useOverlay; Menu owns action callbacks and useRovingFocus.
- [x] Public native attributes go to their semantic owner.
- [x] Validate exactly one direct Menu by constructor identity; keyed fragments may group that child and invalid descendants are rejected.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] No new token family or motion is added.
- [x] State, callbacks, native form values and focus update immediately.
- [x] closed → open → Accepted authoritative open → Dedicated visual .surface, not the focused trigger → surfacePresence; --motion-normal / --ease-standard.
- [x] open → closed → Accepted authoritative close → Inert retained visual shell only when supported → Same recipe; usePresence completion/fallback.
- [x] Semantic dismissal, trigger focus return and pointer-target focus stay immediate.
- [x] Focus is established immediately without cancelling the selected entry transition.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useDropdownMenu is colocated with DropdownMenu and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Default and composite triggers**: Compose one Menu/Body with three indexed MenuItems; compare the default trigger and a single public Button containing Avatar/Text in Inline gap="2" align="center". Observe onAction, Escape and focus return.
- [x] The DropdownMenu V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDropdownMenuExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
