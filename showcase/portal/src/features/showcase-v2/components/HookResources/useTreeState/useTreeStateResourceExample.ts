"use client";
import { useTreeState } from "@forge-ui/web";
import { useTreeFixture } from "../useTreeFixture";

export function useTreeStateResourceExample() {
  const fixture = useTreeFixture();
  const state = useTreeState({
    nodes: fixture.nodes,
    value: fixture.selected,
    onValueChange: fixture.select,
    expandedValue: fixture.expanded,
    onExpandedValueChange: fixture.expand,
    fallbackRef: fixture.fallbackRef,
  });

  function removeActive() {
    fixture.remove(state.selected);
  }

  return { ...fixture, state, removeActive };
}
