"use client";
import { useState } from "react";

export function useDividerExample() {
  const [visible, setVisible] = useState(true);

  return { visible, setVisible };
}
