"use client";

import { useState } from "react";

export function useExampleCode(code: string) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function copyCode() {
    setStatus("copying");

    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, copyCode, reset };
}
