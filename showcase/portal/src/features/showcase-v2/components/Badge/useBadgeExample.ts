"use client";
import { useState } from "react";
import { useNativeRecipeOptions } from "../ResourceExamples/useNativeRecipeOptions";

export function useBadgeExample() {
  const options = useNativeRecipeOptions();
  const [appearance, setAppearance] = useState("soft");

  return {
    ...options,
    appearance,
    setAppearance,
    resolvedAppearance: appearance as import("@forge-ui/web").ComponentAppearance,
  };
}
