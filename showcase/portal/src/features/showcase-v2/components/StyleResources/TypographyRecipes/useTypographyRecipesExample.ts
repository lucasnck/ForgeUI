"use client";
import { useState, useId } from "react";
import type { ComponentTextSize, ComponentFontWeight } from "@forge-ui/web";

export function useTypographyRecipesExample() {
  const id = useId();
  const [size, setSize] = useState<ComponentTextSize>("lg");
  const [weight, setWeight] = useState<ComponentFontWeight>("regular");

  function changeSize(value: string) {
    setSize(value === "sm" ? "sm" : value === "md" ? "md" : value === "2xl" ? "2xl" : "lg");
  }

  function changeWeight(value: string) {
    setWeight(
      value === "medium"
        ? "medium"
        : value === "semibold"
          ? "semibold"
          : value === "bold"
            ? "bold"
            : "regular",
    );
  }

  return { id, size, changeSize, weight, changeWeight };
}
