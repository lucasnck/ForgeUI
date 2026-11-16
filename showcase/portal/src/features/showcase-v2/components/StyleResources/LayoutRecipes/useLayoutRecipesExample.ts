"use client";
import { useState } from "react";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useLayoutRecipesExample() {
  const [gap, setGap] = useState("2");
  const [layout, setLayout] = useState("grid");
  const [padding, setPadding] = useState("2");
  const [count, setCount] = useState(0);

  function action() {
    setCount((v) => v + 1);
  }

  return {
    gap,
    setGap,
    layout,
    setLayout,
    padding,
    setPadding,
    count,
    action,
    copy: useResourceExampleCopy(),
  };
}
