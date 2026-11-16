"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";
import type { ChoiceGroupFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function useChoiceGroupFooterExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding =
    useExampleProperties<Pick<ChoiceGroupFooterProps, "title" | "children">>("ChoiceGroupFooter");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [calls, setCalls] = useState(0);
  const [resets, setResets] = useState(0);

  function clear() {
    setSelected([]);
    setResets((count) => count + 1);
  }

  function change(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setSelected((previous) =>
      checked ? [...previous, value] : previous.filter((item) => item !== value),
    );
    setCalls((n) => n + 1);
  }

  useExamplePropertySnapshot("ChoiceGroupFooter", {
    children: "Children",
    title: undefined,
  });
  return {
    copy,
    id,
    properties: binding.properties,
    selected,
    calls,
    change,
    clear,
    resets,
  };
}
