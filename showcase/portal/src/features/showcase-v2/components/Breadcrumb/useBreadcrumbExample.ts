"use client";
import { useState } from "react";
import { breadcrumbItems } from "../Breadcrumb/fixtures";

export function useBreadcrumbExample() {
  const [compact, setCompact] = useState(false);
  const [label, setLabel] = useState("Label");
  const [clicked, setClicked] = useState<number | null>(null);
  const [calls, setCalls] = useState(0);
  const items = (
    compact ? breadcrumbItems.filter((item) => item.id !== "item-2") : breadcrumbItems
  ).map((item) => ({
    ...item,
    onClick() {
      setClicked(breadcrumbItems.indexOf(item) + 1);
      setCalls((value) => value + 1);
    },
  }));

  return { compact, setCompact, label, setLabel, items, clicked, calls };
}
