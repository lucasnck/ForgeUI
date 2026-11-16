"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { PresenceContract, PresenceOptions, PresencePhase } from "../../types/animation";

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
  const [phase, setPhase] = useState<PresencePhase>(open ? "entered" : "unmounted");
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
      if (!element || event.target !== element || event.propertyName !== "opacity") {
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
