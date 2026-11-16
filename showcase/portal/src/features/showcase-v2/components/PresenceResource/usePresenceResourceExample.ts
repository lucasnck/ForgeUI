"use client";
import { useId, useRef, useState } from "react";
import { usePresence } from "@forge-ui/web";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function usePresenceResourceExample(initialRecipe = "surfacePresence") {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [recipe, setRecipe] = useState(initialRecipe);
  const elementRef = useRef<HTMLDivElement>(null);
  const presence = usePresence({ open, elementRef, enabled });
  const panelId = useId();
  const { copy } = useShowcaseV2Copy();

  function toggle() {
    setOpen((value) => !value);
  }

  return {
    open,
    enabled,
    setEnabled,
    recipe,
    setRecipe,
    elementRef,
    panelId,
    presence,
    copy,
    toggle,
  };
}
