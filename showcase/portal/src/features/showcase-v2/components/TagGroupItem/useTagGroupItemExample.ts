"use client";
import { useState, useId } from "react";
import type { TagGroupItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { items } from "../TagGroup/fixtures";

export function useTagGroupItemExample() {
  const id = useId();
  const binding = useExampleProperties<Pick<TagGroupItemProps, "title">>("TagGroupItem");
  const [remaining, setRemaining] = useState(items);
  const [removed, setRemoved] = useState<string[]>([]);

  function remove(id: string) {
    setRemaining((previous) => previous.filter((item) => item.id !== id));
    setRemoved((previous) => [...previous, id]);
  }

  useExamplePropertySnapshot("TagGroupItem", { title: "Title" });
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
