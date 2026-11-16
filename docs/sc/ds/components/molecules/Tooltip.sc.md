---
title: "Tooltip"
scope: "Supplementary noninteractive description associated with one focusable trigger; excludes essential instructions and interactive content."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Tooltip

## Files

```text
../scripts/check-tooltip.cjs (C)
design-system/index.ts (M)
design-system/components/molecules/Tooltip/Tooltip.tsx (C)
design-system/components/molecules/Tooltip/Tooltip.module.css (C)
design-system/components/molecules/Tooltip/index.ts (C)
features/showcase/examples/Tooltip.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/Tooltip/useTooltip.ts (C)
features/showcase-v2/components/Tooltip/definition.ts (C)
features/showcase-v2/components/Tooltip/Tooltip.example.tsx (C)
features/showcase-v2/components/Tooltip/useTooltipExample.ts (C)
features/showcase-v2/components/Tooltip/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-overlay-interactions.sc.md](../../hooks/tech-overlay-interactions.sc.md)
- [Button.sc.md](../atoms/Button.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [usePresence](../../hooks/tech-presence.sc.md)
- [Overlay contracts](../../types/tech-overlay-contracts.sc.md)
- [Selection, panel and open-state contracts](../../types/tech-selection-navigation.sc.md)

## Contract

```tsx
import { Tooltip, Button } from "@forge-ui/web";
<Tooltip content="Save your changes"><Button>Save</Button></Tooltip>;
```

## Styles

```css
.anchor { composes: anchor from "../../../styles/popup-components.module.css"; display: inline-block; }
.surface { composes: popup from "../../../styles/popup-components.module.css"; composes: fade from "../../../styles/animations/surface-animations.module.css"; }
.surface::before { content: ""; position: absolute; inset-inline: var(--zero); inset-block-start: calc(var(--zero) - var(--space-1)); block-size: var(--space-1); }
```

## Animations

```text
fade (shared CSS; animated=false bypasses lifecycle retention)
```

## Hooks

```tsx
"use client";
import { useId, useRef, useState, useLayoutEffect, useImperativeHandle } from "react";
import type { MouseEvent, FocusEvent, KeyboardEvent } from "react";
import { useOverlay } from "../../../hooks/overlay/useOverlay";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { TooltipProps } from "./Tooltip";
type Activity = { trigger: boolean; surface: boolean; focused: boolean; dismissed: boolean };
export function useTooltip({ children, content, open, defaultOpen = false, onOpenChange, animated = true }: TooltipProps) {
  if (!content.trim()) throw new Error("Tooltip requires nonempty supplementary text.");
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLSpanElement>(null);
  useImperativeHandle(children.props.ref, () => triggerRef.current!, []);
  useLayoutEffect(() => { if (!triggerRef.current?.ownerDocument || typeof triggerRef.current.matches !== "function") throw new Error("Tooltip requires an enabled ref-forwarding DOM trigger."); }, []);
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const visible = open ?? localOpen;
  const accepted = useRef(visible);
  const requested = useRef(visible);
  const [activity, setActivity] = useState<Activity>({ trigger: false, surface: false, focused: false, dismissed: false });
  const latestActivity = useRef(activity);
  useLayoutEffect(() => { if (accepted.current !== visible) requested.current = visible; accepted.current = visible; }, [visible]);
  function requestOpen(next: boolean) {
    if (next === accepted.current) { requested.current = next; return; }
    if (next === requested.current) return;
    requested.current = next;
    if (open === undefined) { accepted.current = next; setLocalOpen(next); }
    onOpenChange?.(next);
  }
  function update(patch: Partial<Activity>) {
    const next = { ...latestActivity.current, ...patch };
    if (!next.trigger && !next.surface && !next.focused) next.dismissed = false;
    latestActivity.current = next; setActivity(next);
    requestOpen(!next.dismissed && (next.trigger || next.surface || next.focused));
  }
  function dismiss() { const next = { ...latestActivity.current, dismissed: true }; latestActivity.current = next; setActivity(next); requestOpen(false); }
  useOverlay({ open: visible, triggerRef, panelRef, onEscape: dismiss, onOutside: dismiss });
  const presence = usePresence({ open: visible, elementRef: panelRef, enabled: animated });
  function enabled(element: HTMLElement) { return !element.matches(":disabled, [aria-disabled='true']"); }
  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => { children.props.onMouseEnter?.(event); if (!event.defaultPrevented && enabled(event.currentTarget)) update({ trigger: true }); };
  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => { children.props.onMouseLeave?.(event); if (!event.defaultPrevented) update({ trigger: false, surface: !!panelRef.current?.contains(event.relatedTarget as Node | null) }); };
  const handleFocus = (event: FocusEvent<HTMLElement>) => { children.props.onFocus?.(event); if (!event.defaultPrevented && enabled(event.currentTarget)) update({ focused: true }); };
  const handleBlur = (event: FocusEvent<HTMLElement>) => { children.props.onBlur?.(event); if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) update({ focused: false }); };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => { children.props.onKeyDown?.(event); if (!event.defaultPrevented && visible && event.key === "Escape" && !event.nativeEvent.isComposing && !event.ctrlKey && !event.altKey && !event.metaKey) { event.preventDefault(); dismiss(); } };
  const handleSurfaceEnter = () => { if (visible) update({ surface: true }); };
  const handleSurfaceLeave = (event: MouseEvent<HTMLSpanElement>) => update({ surface: false, trigger: !!triggerRef.current?.contains(event.relatedTarget as Node | null) });
  const description = [...new Set([...(children.props["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []), ...(visible ? [tooltipId] : [])])].join(" ") || undefined;
  return { children, content, tooltipId, panelRef, visible, animated, focused: activity.focused, present: presence.present, phase: presence.phase, onTransitionEnd: presence.onTransitionEnd,
    triggerProps: { ref: triggerRef, "aria-describedby": description, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown }, handleSurfaceEnter, handleSurfaceLeave,
  };
}
```

## Content

```tsx
"use client";
import { cloneElement, Fragment, isValidElement } from "react";
import type { ReactElement } from "react";
import type { TooltipTriggerProps, ComponentOpenProps, ComponentAnimatedProps } from "../../../types";
import { useTooltip } from "./useTooltip";
import styles from "./Tooltip.module.css";
export interface TooltipProps extends ComponentOpenProps, ComponentAnimatedProps { content: string; children: ReactElement<TooltipTriggerProps>; }
export function Tooltip(input: TooltipProps) {
  if (!isValidElement(input.children) || input.children.type === Fragment) throw new Error("Tooltip requires one enabled ref-forwarding trigger.");
  const { children, content, tooltipId, panelRef, visible, animated, focused, present, phase, onTransitionEnd, triggerProps, handleSurfaceEnter, handleSurfaceLeave } = useTooltip(input);
  return <span className={styles.anchor}>{cloneElement(children, triggerProps)}{present && <span ref={panelRef} id={tooltipId} role="tooltip" inert={!visible || undefined} aria-hidden={!visible || undefined} data-animated={animated} data-motion-state={phase} data-motion-focus={focused || undefined} onTransitionEnd={onTransitionEnd} onMouseEnter={handleSurfaceEnter} onMouseLeave={handleSurfaceLeave} className={styles.surface}>{content}</span>}</span>;
}
```

## Tests

- V2 Pointer and focus hint: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:tooltip` verifies ref/callback composition, cumulative activity, Escape suppression, description deduplication, surface transfer and controlled rejection through an isolated hook harness. `npm run test:overlays` verifies real React SSR. Pixel geometry and OS preferences remain browser acceptance.

- Focus and pointer entry request visibility once; explicit controlled open remains authoritative.
- Escape dismisses while the focused trigger keeps its native focus.
- Existing description ids survive opening and closing; tooltip id is removed at semantic dismissal.
- Retained exit content is inert and cannot deliver an action.
- Hover transfer to the tooltip surface keeps the supplementary description usable.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: Compose ref and pointer/focus handlers without replacing caller callbacks.
- [x] Verify: Focus/hover opens; Escape closes and suppresses reopen until hover and focus both leave.
- [x] Verify: Hovering tooltip content keeps it visible.
- [x] Given two instances, control/panel ids and accessible associations never collide; native names and FormData semantics are preserved where applicable.
- [x] Native interactions remain delegated to the control; custom handlers intercept only documented keys, respect composition and prevent activation when disabled.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The content / children contract uses Required; Nonempty text and enabled ref-forwarding trigger.
- [x] The open / defaultOpen contract uses undefined / false; Shared open channel.
- [x] The timing contract uses immediate semantic requests; no delay clock. Optional visual fade belongs to the shared CSS recipe.
- [x] Focus/hover opens; Escape closes and suppresses reopen until hover and focus both leave.
- [x] Focus/hover → Closed, not dismissed → Open → Request true.
- [x] Escape → Open → Dismissed → Request false; focus unchanged.
- [x] Tooltip pointer enters → Open → Open → No callback.
- [x] All hover/focus leaves → Any → Closed, dismissal reset → Request false if needed.
- [x] No local transition definitions, timing constants or measured coordinate literals are introduced.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] State, callbacks, native form values and focus update immediately.
- [x] closed → open → Accepted authoritative open → Dedicated visual .surface, not the focused trigger → surfacePresence; --motion-normal / --ease-standard.
- [x] open → closed → Accepted authoritative close → Inert retained visual shell only when supported → Same recipe; usePresence completion/fallback.
- [x] Semantic dismissal, trigger focus return and pointer-target focus stay immediate.
- [x] Native trigger focus is preserved during entry; descriptions update immediately without cancelling the visual transition.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useTooltip is colocated with Tooltip and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Pointer and focus hint**: Wrap a named Button with Tooltip content="Content"; pointer and focus reveal it, documented dismissal hides it and passive tooltip content adds no focus target.
- [x] The Tooltip V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTooltipExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
