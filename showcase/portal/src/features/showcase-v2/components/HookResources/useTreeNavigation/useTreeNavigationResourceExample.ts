"use client";
import { useTreeNavigation } from "@forge-ui/web";
import { useTreeFixture } from "../useTreeFixture";

export function useTreeNavigationResourceExample() {
  const fixture = useTreeFixture();
  const state = useTreeNavigation({
    nodes: fixture.nodes,
    value: fixture.selected,
    onValueChange: fixture.select,
    expandedValue: fixture.expanded,
    onExpandedValueChange: fixture.expand,
    fallbackRef: fixture.fallbackRef,
  });

  function removeActive() {
    fixture.remove(state.focus.activeId);
  }

  return { ...fixture, state, removeActive };
}
