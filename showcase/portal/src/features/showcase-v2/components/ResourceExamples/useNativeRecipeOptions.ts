"use client";
import { useState } from "react";
import type { ComponentSize, ComponentTone } from "@forge-ui/web";

export function useNativeRecipeOptions() {
  const [size, setSize] = useState<ComponentSize>("md");
  const [tone, setTone] = useState<ComponentTone>("brand");

  function changeSize(value: string) {
    setSize(value === "sm" ? "sm" : value === "lg" ? "lg" : "md");
  }

  function changeTone(value: string) {
    setTone(value === "danger" ? "danger" : value === "success" ? "success" : "brand");
  }

  return { size, changeSize, tone, changeTone };
}
