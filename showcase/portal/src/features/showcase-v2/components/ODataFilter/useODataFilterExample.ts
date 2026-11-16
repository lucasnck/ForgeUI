"use client";
import type { ODataFilterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useFilterPreview } from "../ODataFilter/useFilterPreview";

export function useODataFilterExample(advanced = false) {
  const { properties } =
    useExampleProperties<Pick<ODataFilterProps, "mode" | "disabled" | "title">>("ODataFilter");
  const view = useFilterPreview(advanced);
  useExamplePropertySnapshot("ODataFilter", {
    mode: advanced ? "advanced" : "simple",
    disabled: false,
    title: "Title",
  });
  return {
    ...view,
    state: {
      expression: view.state.expression,
      filter: view.state.filter,
      result: view.state.result,
      changes: view.state.changes,
      applies: view.state.applies,
      cancels: view.state.cancels,
      serializationProof: view.state.serializationProof,
    },
    properties,
  };
}
