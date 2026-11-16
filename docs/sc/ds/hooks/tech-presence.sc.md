---
title: "usePresence"
scope: "Visual presence, interruption and completion cleanup"
status: "DONE"
type: "hook"
ds-level: "none"
---

# usePresence


## Files

```text
../scripts/check-hooks.cjs (C)
../scripts/hook-harness.cjs (C)
design-system/hooks/motion/usePresence.ts (M)
design-system/hooks/motion/index.ts (M)
features/showcase-v2/components/PresenceResource/definition.ts (C)
features/showcase-v2/components/PresenceResource/PresenceResource.example.tsx (C)
features/showcase-v2/components/PresenceResource/usePresenceResourceExample.ts (C)
```

## Dependencies

- [Animation contracts](../types/tech-animation-contracts.sc.md)

## Contract

```ts
import { usePresence } from "@forge-ui/web";
const presence = usePresence({ open, elementRef, enabled: animated });
```

## Content

```ts
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type {
  PresenceContract,
  PresenceOptions,
  PresencePhase,
} from "../../types/animation";

function opacityDuration(element: HTMLElement): number {
  const style = getComputedStyle(element);
  const properties = style.transitionProperty.split(",");
  const durations = style.transitionDuration.split(",");
  const delays = style.transitionDelay.split(",");
  const milliseconds = (value: string) => {
    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount)) return 0;
    return value.trim().endsWith("ms") ? amount : amount * 1000;
  };
  return properties.reduce((effective, property, index) => {
    if (!["opacity", "all"].includes(property.trim())) return effective;
    const duration = milliseconds(durations[index % durations.length]);
    const delay = milliseconds(delays[index % delays.length]);
    return duration > 0 ? Math.max(0, duration + delay) : 0;
  }, 0);
}

export function usePresence({
  open,
  elementRef,
  enabled = true,
}: PresenceOptions): PresenceContract {
  const [previousOpen, setPreviousOpen] = useState(open);
  const [phase, setPhase] = useState<PresencePhase>(
    open ? "entered" : "unmounted",
  );
  const generation = useRef(0);
  const completion = useRef<(() => void) | null>(null);

  if (previousOpen !== open) {
    setPreviousOpen(open);
    setPhase(open ? "entering" : "exiting");
  }

  useLayoutEffect(() => {
    const currentGeneration = ++generation.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = elementRef.current;
    let frame: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clearPending = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (timer !== undefined) clearTimeout(timer);
      frame = undefined;
      timer = undefined;
    };
    const settle = () => {
      if (generation.current !== currentGeneration) return;
      clearPending();
      setPhase(open ? "entered" : "unmounted");
    };
    const onPreferenceChange = () => {
      if (preference.matches) settle();
    };
    const onCancel = (event: TransitionEvent) => {
      if (
        !element ||
        event.target !== element ||
        event.propertyName !== "opacity"
      ) {
        return;
      }
      // Cancellation may belong to a superseded entry. It is not exit success;
      // CSS already targets current props, and the current fallback owns removal.
      if (!enabled || preference.matches || opacityDuration(element) === 0) {
        settle();
      }
    };

    completion.current = settle;
    preference.addEventListener("change", onPreferenceChange);
    element?.addEventListener("transitioncancel", onCancel);

    if (!enabled || preference.matches || !element) {
      settle();
    } else if (phase === "entering") {
      if (opacityDuration(element) === 0) settle();
      else {
        frame = requestAnimationFrame(() => {
          if (generation.current !== currentGeneration) return;
          frame = requestAnimationFrame(settle);
        });
      }
    } else if (phase === "exiting") {
      const duration = opacityDuration(element);
      if (duration === 0) settle();
      else timer = setTimeout(settle, duration);
    }

    return () => {
      generation.current = currentGeneration + 1;
      clearPending();
      completion.current = null;
      preference.removeEventListener("change", onPreferenceChange);
      element?.removeEventListener("transitioncancel", onCancel);
    };
  }, [open, enabled, elementRef, phase]);

  const currentPhase = enabled ? phase : open ? "entered" : "unmounted";
  return {
    present: currentPhase !== "unmounted",
    phase: currentPhase,
    onTransitionEnd(event) {
      if (
        event.target === event.currentTarget &&
        event.propertyName === "opacity" &&
        currentPhase === "exiting" &&
        !open &&
        getComputedStyle(event.currentTarget).opacity === "0"
      ) {
        completion.current?.();
      }
    },
  };
}
```

## Tests

- Exit retains the element until its CSS transition finishes.
- Reopening cancels pending exit completion and stale events.
- Disabled animation, reduced motion and zero duration settle immediately.
- Focus remains consumer-owned and is not postponed by the visual lifecycle.
- Unmount and StrictMode cleanup cancel timers, frames and listeners.

## Criteria

- [x] The hook owns visual lifecycle only; it does not store semantic open state or call onOpenChange.
- [x] Initial SSR presence is entered when open and absent when closed, without browser access or initial entrance.
- [x] Opening mounts entering content and advances on the next animation frame; closing retains only eligible exit pixels.
- [x] CSS opacity duration and delay determine completion and the bounded missing-event fallback.
- [x] Nested transition events and stale callbacks cannot complete a reopened surface.
- [x] Reversal and transition cancellation retarget to the latest open prop.
- [x] Disabled animation, zero duration and reduced motion settle immediately, including preference changes during motion.
- [x] Unmount cancels listeners, frames and timers without a state callback.
- [x] Consumers move focus before inert/aria-hidden exit and disable retained actions immediately.
- [x] Effect none is consumed with enabled=false; no invisible retention remains.

- [x] The V2 use-presence resource defines Visual presence with the real public hook and Card/CardBody passive content; initial open=false, enabled=true, present=false and phase=unmounted.
- [x] Show/hide reports semantic open and visual present/phase independently; enabled=false settles immediately, reversal uses the existing hook lifecycle, and retained exit pixels are inert and aria-hidden. Reset restores the initial state.
- [x] The resource Contract lists open, elementRef and enabled parameters plus present, phase and onTransitionEnd returns. Its minimal typed snippet calls usePresence inside caller context and consumes the public motion class; caller state/ref and focus ownership remain explicit.
- [x] The V2 resource page follows the two-section layout (dynamic example and Contract), with reset and copy inside the example and no Usage/resources or Related examples UI.
