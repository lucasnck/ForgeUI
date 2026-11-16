"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";
import type { ChoiceGroupHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useChoiceGroupHeaderExample() {
  const id = useId();
  const binding =
    useExampleProperties<Pick<ChoiceGroupHeaderProps, "title" | "children">>("ChoiceGroupHeader");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [calls, setCalls] = useState(0);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setSelected((previous) =>
      checked ? [...previous, value] : previous.filter((item) => item !== value),
    );
    setCalls((n) => n + 1);
  }

  useExamplePropertySnapshot("ChoiceGroupHeader", {
    children: "Children",
    title: undefined,
  });
  return { id, properties: binding.properties, selected, calls, change };
}
