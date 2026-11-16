"use client";
import { useState } from "react";
import type { ComponentIconSize } from "@forge-ui/web";

export function useIconRecipesExample() {
  const [size, setSize] = useState<ComponentIconSize>("md");

  function changeSize(value: string) {
    setSize(
      value === "xs"
        ? "xs"
        : value === "sm"
          ? "sm"
          : value === "lg"
            ? "lg"
            : value === "xl"
              ? "xl"
              : value === "inherit"
                ? "inherit"
                : "md",
    );
  }

  return { size, changeSize };
}
