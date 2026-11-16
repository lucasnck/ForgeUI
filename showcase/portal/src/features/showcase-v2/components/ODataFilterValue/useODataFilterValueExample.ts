"use client";
import type { ODataFilterValueProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useFilterPreview } from "../ODataFilter/useFilterPreview";

export function useODataFilterValueExample(advanced = false) {
  const { properties } =
    useExampleProperties<
      Pick<ODataFilterValueProps, "operator" | "label" | "disabled" | "invalid">
    >("ODataFilterValue");
  const view = useFilterPreview(advanced);
  useExamplePropertySnapshot("ODataFilterValue", {
    operator: "contains",
    label: "Label",
    disabled: false,
    invalid: false,
  });
  return {
    ...view,
    state: {
      value: view.state.value,
      operator: properties.operator ?? "contains",
      changes: view.state.changes,
    },
    properties,
  };
}
