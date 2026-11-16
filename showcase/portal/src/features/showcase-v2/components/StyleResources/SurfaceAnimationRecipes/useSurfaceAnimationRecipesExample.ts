"use client";
import { useRef, useState } from "react";
import { usePresence } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useSurfaceAnimationRecipesExample() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [effect, setEffect] = useState("scale");
  const presence = usePresence({
    open,
    elementRef,
    enabled: animated && effect !== "none",
  });

  function toggle() {
    setOpen((value) => !value);
  }

  return {
    elementRef,
    open,
    animated,
    setAnimated,
    effect,
    setEffect,
    presence,
    toggle,
    copy: useResourceExampleCopy(),
  };
}
