"use client";
import { useState } from "react";
import type { ComponentAspectRatio } from "@forge-ui/web";

export function useAspectRatioExample() {
  const [ratio, setRatio] = useState<ComponentAspectRatio>("video");

  function changeRatio(v: string) {
    setRatio(v as ComponentAspectRatio);
  }

  return { ratio, changeRatio };
}
