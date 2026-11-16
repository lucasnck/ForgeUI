"use client";
import { useId, useState } from "react";

export function useLinkExample() {
  const targetId = useId();
  const [children, setChildren] = useState("Children");

  return { targetId, children, setChildren };
}
