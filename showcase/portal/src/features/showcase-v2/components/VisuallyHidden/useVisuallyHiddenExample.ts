"use client";
import { useState } from "react";

export function useVisuallyHiddenExample() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  function click() {
    setCount((v) => v + 1);
  }

  return { disabled, setDisabled, loading, setLoading, count, click };
}
