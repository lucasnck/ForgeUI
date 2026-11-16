---
title: "Popover"
scope: "Aggregate scoped Popover parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Popover

## Files

```text
design-system/components/molecules/Popover/Popover.tsx (C)
design-system/components/molecules/Popover/Popover.module.css (C)
design-system/components/molecules/Popover/index.ts (C)
design-system/internal/popover/PopoverContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Popover.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/Popover/usePopover.ts (C)
features/showcase-v2/components/Popover/definition.ts (C)
features/showcase-v2/components/Popover/Popover.example.tsx (C)
features/showcase-v2/components/Popover/usePopoverExample.ts (C)
features/showcase-v2/components/Popover/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [IconButton](IconButton.sc.md)

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [tech-overlay-interactions.sc.md](../../hooks/tech-overlay-interactions.sc.md)
- [PopoverHeader.sc.md](../atoms/PopoverHeader.sc.md)
- [PopoverBody.sc.md](../atoms/PopoverBody.sc.md)
- [PopoverFooter.sc.md](../atoms/PopoverFooter.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [usePresence](../../hooks/tech-presence.sc.md)
- [Selection, panel and open-state contracts](../../types/tech-selection-navigation.sc.md)
- [Surface animations](../../styles/animations/tech-surface-animations.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)
- [Popup recipes](../../styles/tech-popup-recipes.sc.md)

## Contract

```tsx
import { Popover, PopoverHeader, PopoverBody, PopoverFooter } from "@forge-ui/web";
<Popover triggerLabel="Options" label="Options"><PopoverHeader>Options</PopoverHeader><PopoverBody>Content</PopoverBody><PopoverFooter>Apply action</PopoverFooter></Popover>;
```

## Styles

```css
.root { composes: anchor from "../../../styles/popup-components.module.css"; min-inline-size: var(--zero); }
.surface { composes: popup from "../../../styles/popup-components.module.css"; composes: stack from "../../../styles/layout-components.module.css"; padding: var(--zero); --stack-gap: var(--zero); }
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
import { useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { useOverlay } from "../../../hooks/overlay/useOverlay";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { PopoverProps } from "./Popover";
export function usePopover(input: PopoverProps) {
  const { open, defaultOpen, onOpenChange, trigger, triggerLabel, label, children, animated = true, animationEffect = "fade", onClick, onBlurCapture, className, ...props } = input;
  if (!triggerLabel.trim() || !label.trim()) throw new Error("Popover requires nonempty trigger and panel names.");
  const collapse = useCollapse({ open, defaultOpen, onOpenChange, disabled: !!(trigger?.props.disabled || trigger?.props.loading) });
  useImperativeHandle(trigger?.props.ref, () => collapse.triggerRef.current!, [collapse.triggerRef]);
  const outsideRequest = useRef(false);
  const branches = useRef(new Map<HTMLElement, number>());
  const overlay = useOverlay({ open: collapse.open, triggerRef: collapse.triggerRef, panelRef: collapse.bodyRef,
    onEscape: () => collapse.requestOpen(false),
    onOutside: () => { outsideRequest.current = true; collapse.requestOpen(false); queueMicrotask(() => { outsideRequest.current = false; }); },
  });
  const registerOverlayBranch = overlay.registerBranch;
  const registerBranch = useCallback((element: HTMLElement) => {
    branches.current.set(element, (branches.current.get(element) ?? 0) + 1);
    const dispose = registerOverlayBranch(element);
    let disposed = false;
    return () => { if (disposed) return; disposed = true; const count = branches.current.get(element) ?? 0; if (count <= 1) branches.current.delete(element); else branches.current.set(element, count - 1); dispose(); };
  }, [registerOverlayBranch]);
  const presence = usePresence({ open: collapse.open, elementRef: collapse.bodyRef, enabled: animated && animationEffect !== "none" });
  const handleClick: NonNullable<PopoverProps["onClick"]> = (event) => { onClick?.(event); if (!event.defaultPrevented && collapse.triggerRef.current?.contains(event.target as Node)) collapse.toggle(); };
  const handleBlurCapture: NonNullable<PopoverProps["onBlurCapture"]> = (event) => {
    onBlurCapture?.(event);
    const next = event.relatedTarget;
    if (!event.defaultPrevented && !outsideRequest.current && next && !event.currentTarget.contains(next) && ![...branches.current.keys()].some((branch) => branch.contains(next))) collapse.requestOpen(false);
  };
  useLayoutEffect(() => {
    if (!collapse.open) return;
    const panel = collapse.bodyRef.current;
    const target = [...(panel?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]') ?? [])].find((node) => !node.closest("[hidden], [inert]") && node.getClientRects().length);
    (target ?? panel)?.focus();
  }, [collapse.open, collapse.bodyRef]);
  return { props, children, className, trigger, triggerLabel, label, animated, animationEffect,
    customTriggerProps: { ...collapse.triggerProps, ref: collapse.triggerRef, type: "button" as const, "aria-haspopup": "dialog" as const },
    triggerRef: collapse.triggerRef, triggerProps: collapse.triggerProps, panelRef: collapse.bodyRef, panelProps: { id: collapse.bodyProps.id, onFocusCapture: collapse.bodyProps.onFocusCapture, onBlurCapture: collapse.bodyProps.onBlurCapture },
    acceptedOpen: collapse.open, present: presence.present, phase: presence.phase, onTransitionEnd: presence.onTransitionEnd, handleClick, handleBlurCapture,
    context: { open: collapse.open, requestOpen: collapse.requestOpen, overlay: {
      restoreTriggerFocus: overlay.restoreTriggerFocus,
      registerBranch,
    } },
  };
}
```

## Content

```tsx
"use client";
import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import type { ButtonProps } from "../../atoms/Button";
import { IconButton } from "../IconButton";
import type { NativeCollectionRootProps, ComponentChildrenProps, ComponentOpenProps, ComponentAnimationEffectProps } from "../../../types";
import { PopoverContext } from "../../../internal/popover/PopoverContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { PopoverHeader } from "../../atoms/PopoverHeader";
import { PopoverBody } from "../../atoms/PopoverBody";
import { PopoverFooter } from "../../atoms/PopoverFooter";
import { Button } from "../../atoms/Button";
import { usePopover } from "./usePopover";
import effects from "../../../styles/animations/surface-animations.module.css";
import styles from "./Popover.module.css";
export interface PopoverProps extends NativeCollectionRootProps, ComponentChildrenProps, ComponentOpenProps, ComponentAnimationEffectProps { triggerLabel: string; label: string; trigger?: ReactElement<ButtonProps>; }
export function Popover(input: PopoverProps) {
  const { props, children, className, context, trigger, triggerLabel, label, animated, animationEffect, triggerRef, triggerProps, customTriggerProps, panelRef, panelProps, acceptedOpen, present, phase, onTransitionEnd, handleClick, handleBlurCapture } = usePopover(input);
  if (trigger && (!isValidElement(trigger) || (trigger.type !== Button && trigger.type !== IconButton))) throw new Error("Popover trigger must be a public Button or IconButton.");
  const parts = collectCompoundParts(children, { header: PopoverHeader, body: PopoverBody, footer: PopoverFooter });
  return <PopoverContext value={context}><div {...props} className={[styles.root, className].filter(Boolean).join(" ")} onClick={handleClick} onBlurCapture={handleBlurCapture}>
    {trigger ? cloneElement(trigger, customTriggerProps) : <Button {...triggerProps} ref={triggerRef} type="button" aria-haspopup="dialog">{triggerLabel}</Button>}
    {present && <div {...panelProps} ref={panelRef} hidden={false} role="dialog" aria-label={label} tabIndex={-1} inert={!acceptedOpen || undefined} aria-hidden={!acceptedOpen || undefined} data-animated={animated} data-motion-state={phase} onTransitionEnd={onTransitionEnd} className={[styles.surface, effects[animationEffect]].join(" ")}>{parts.header}{parts.body}{parts.footer}</div>}
  </div></PopoverContext>;
}
```

## Tests

- V2 Named composed popover: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Opening establishes focus immediately while the selected visual entry transition runs.
- Escape returns focus to the trigger; outside pointer preserves the target’s focus.
- A rejected controlled close leaves open state authoritative.
- none and animated=false bypass retention without depending on completion events.
- Exit retains only inert pixels and rapid reopen cancels stale removal.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] The Region absence contract uses Omit absent footer/header; no empty wrapper.
- [x] The triggerLabel / label contract uses Required nonempty action and panel names.
- [x] The open / defaultOpen contract uses undefined / false.
- [x] Use Header/Body/optional Footer inside a nonmodal dialog panel, never an aria-modal trap. useCollapse is the open-state owner and useOverlay owns topmost layer/outside membership.
- [x] Root focus policy moves into first enabled panel child at explicit open; Escape returns to trigger after accepted close; outside pointer preserves its target.
- [x] Focus leaving the entire panel/trigger family closes after onward focus.
- [x] Public native attributes go to their semantic owner.
- [x] Normalize permitted direct parts/keyed fragments with private collectCompoundParts; it receives actual imported component identities, never displayName strings.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Semantic dismissal, trigger focus return and pointer-target focus stay immediate.
- [x] Focus is established immediately without cancelling the selected entry transition.
- [x] usePopover is colocated with Popover and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.
- [x] animationEffect defaults to fade; none disables presence retention.
- [x] Named effect classes are selected from the shared surface CSS module without duplicating their transitions.
- [x] Exit retention is inert and aria-hidden immediately; entry animation does not delay focus or semantic state.
- [x] Animation preference changes and rapid reopen cannot delay semantic open state or create a second focus trap.

- [x] An optional caller-supplied public Button or IconButton retains its ref, label, disabled/loading state and caller-first native handlers; Popover owns disclosure ids, expanded state, focus and dismissal.

- [x] V2 **Named composed popover**: Compose Header/Body/Footer with the real trigger and a visible named Close action inside the panel; supported keyboard/pointer dismissal preserves accepted open state and trigger focus.
- [x] The Popover V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. usePopoverExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
