"use client";
import { useState } from "react";

export function useTagExample() {
  const [items, setItems] = useState([1, 2, 3]);
  const [removed, setRemoved] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);

  function remove(index: number) {
    setItems((items) => items.filter((value) => value !== index));
    setRemoved(index);
  }

  return { items, removed, disabled, setDisabled, remove };
}
