"use client";
import type { ODataFilterGroupProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useFilterPreview } from "../ODataFilter/useFilterPreview";

export function useODataFilterGroupExample(advanced = false) {
  const { properties, bindChange } =
    useExampleProperties<Pick<ODataFilterGroupProps, "value" | "label" | "disabled" | "title">>(
      "ODataFilterGroup",
    );
  const view = useFilterPreview(advanced);
  useExamplePropertySnapshot("ODataFilterGroup", {
    value: properties.value ?? view.conjunction,
    label: "Label",
    disabled: false,
    title: "Title",
  });
  return {
    ...view,
    state: {
      conjunction: properties.value ?? view.conjunction,
      conditions: view.state.conditions,
      changes: view.state.changes,
    },
    conjunction: properties.value ?? view.conjunction,
    changeConjunction: bindChange("value", view.changeConjunction),
    properties,
  };
}
