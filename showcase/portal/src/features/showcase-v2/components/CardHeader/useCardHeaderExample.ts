"use client";
import { useState } from "react";

export function useCardHeaderExample() {
  const [icon, setIcon] = useState(true);
  const [divider, setDivider] = useState(false);
  const [children, setChildren] = useState("Children");

  return { icon, setIcon, divider, setDivider, children, setChildren };
}
