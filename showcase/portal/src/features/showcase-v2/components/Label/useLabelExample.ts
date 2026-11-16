"use client";
import { useId, useState } from "react";

export function useLabelExample() {
  const id = useId();
  const [children, setChildren] = useState("Children");
  const [required, setRequired] = useState(false);

  return { id, children, setChildren, required, setRequired };
}
