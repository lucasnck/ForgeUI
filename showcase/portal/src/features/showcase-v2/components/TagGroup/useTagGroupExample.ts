"use client";
import { useState, useId } from "react";
import type { TagGroupProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { items } from "../TagGroup/fixtures";

export function useTagGroupExample() {
  const id = useId();
  const binding = useExampleProperties<Pick<TagGroupProps, "fullWidth" | "title">>("TagGroup");
  const [remaining, setRemaining] = useState(items);
  const [removed, setRemoved] = useState<string[]>([]);

  function remove(id: string) {
    setRemaining((previous) => previous.filter((item) => item.id !== id));
    setRemoved((previous) => [...previous, id]);
  }

  useExamplePropertySnapshot("TagGroup", { fullWidth: true, title: "Title" });
  const renderItems = remaining.map((item) => ({
    ...item,
    tag: {
      id: item.id,
      children: item.children,
      title: item.title,
      removeLabel: item.removeLabel,
      onRemove: () => remove(item.id),
    },
  }));

  return {
    renderItems,
    id,
    properties: binding.properties,
    remaining,
    removed,
    remove,
  };
}
