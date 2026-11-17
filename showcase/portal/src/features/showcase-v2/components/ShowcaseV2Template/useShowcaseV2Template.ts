"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";
import type { ShowcaseV2Example } from "../../model/showcase-v2.types";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function useShowcaseV2Template(examples: readonly ShowcaseV2Example[]) {
  const [active, setActive] = useState(examples[0]?.id ?? "");
  const id = useId();
  const { copy } = useShowcaseV2Copy();

  function select(event: ChangeEvent<HTMLSelectElement>) {
    setActive(event.target.value);
  }

  return { active, id, copy, select };
}
