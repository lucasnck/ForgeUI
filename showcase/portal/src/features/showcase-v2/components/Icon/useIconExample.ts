"use client";
import { useState } from "react";
import type { IconName } from "@forge-ui/web";

export function useIconExample() {
  const [name, setName] = useState<IconName>("search");
  const [named, setNamed] = useState(false);

  function changeName(v: string) {
    setName(v as IconName);
  }

  return { name, changeName, named, setNamed };
}
