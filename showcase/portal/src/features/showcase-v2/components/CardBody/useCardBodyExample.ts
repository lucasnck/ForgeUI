"use client";
import { useState } from "react";

export function useCardBodyExample() {
  const [children, setChildren] = useState("Children");

  return { children, setChildren };
}
