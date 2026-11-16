"use client";
import { useState } from "react";

export function useScrollbarRecipesExample() {
  const [expanded, setExpanded] = useState(false);

  return {
    expanded,
    setExpanded,
    indices: Array.from({ length: expanded ? 24 : 12 }, (_, index) => index + 1),
  };
}
