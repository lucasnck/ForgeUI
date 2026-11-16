"use client";
import { useState } from "react";
import type { ComponentSize } from "@forge-ui/web";

export function useLoadingRecipesExample() {
  const [animated, setAnimated] = useState(true);
  const [size, setSize] = useState<ComponentSize>("md");

  function changeSize(value: string) {
    setSize(value === "sm" ? "sm" : value === "lg" ? "lg" : "md");
  }

  return { animated, setAnimated, size, changeSize };
}
