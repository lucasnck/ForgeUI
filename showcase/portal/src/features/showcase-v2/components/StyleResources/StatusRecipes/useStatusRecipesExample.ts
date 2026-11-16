"use client";
import { useState } from "react";
import type { ComponentTone } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useStatusRecipesExample() {
  const [tone, setTone] = useState<ComponentTone>("success");
  const [actions, setActions] = useState(0);

  function changeTone(value: string) {
    setTone(
      value === "danger"
        ? "danger"
        : value === "warning"
          ? "warning"
          : value === "info"
            ? "info"
            : "success",
    );
  }

  function action() {
    setActions((v) => v + 1);
  }

  return { tone, changeTone, actions, action, copy: useResourceExampleCopy() };
}
