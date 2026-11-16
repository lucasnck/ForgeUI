"use client";
import type { ODataFilterConditionProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useFilterPreview } from "../ODataFilter/useFilterPreview";

export function useODataFilterConditionExample(advanced = false) {
  const { properties } =
    useExampleProperties<Pick<ODataFilterConditionProps, "simple" | "disabled" | "title">>(
      "ODataFilterCondition",
    );
  const view = useFilterPreview(advanced);
  useExamplePropertySnapshot("ODataFilterCondition", {
    simple: false,
    disabled: false,
    title: "Title",
  });
  return {
    ...view,
    state: { condition: view.state.condition, changes: view.state.changes },
    properties,
  };
}
