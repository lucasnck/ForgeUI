"use client";
import { useState, useId } from "react";
import type { ComponentShape } from "@forge-ui/web";

export function useShapeRecipesExample() {
  const id = useId();
  const [shape, setShape] = useState<ComponentShape | undefined>();

  function change(value: string) {
    setShape(
      value === "square"
        ? "square"
        : value === "rounded"
          ? "rounded"
          : value === "pill"
            ? "pill"
            : undefined,
    );
  }

  return { id, shape, change };
}
