"use client";
import { useState } from "react";
import { listItems } from "../List/fixtures";

export function useListHeaderExample() {
  const [children, setChildren] = useState("Children");
  const [icon, setIcon] = useState(true);

  return { children, setChildren, icon, setIcon, items: listItems.slice(0, 3) };
}
