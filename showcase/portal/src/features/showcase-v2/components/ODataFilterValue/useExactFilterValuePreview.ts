"use client";
import { useState } from "react";
import type { ODataFilterValueData, ODataFilterValueProps } from "@forge-ui/web";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { exactFields, labels } from "../ODataFilter/fixtures";

export function useExactFilterValuePreview(index: 0 | 1) {
  const { properties } =
    useExampleProperties<Pick<ODataFilterValueProps, "label" | "disabled" | "invalid">>(
      "ODataFilterValue",
    );
  const [value, change] = useState<ODataFilterValueData>(
    index === 0
      ? "12345678-1234-5678-9abc-123456789abc"
      : ["9007199254740993.0000000001", "9007199254740993.0000000002"],
  );

  return {
    properties,
    field: exactFields[index],
    labels,
    value,
    change,
    operator: index === 0 ? ("eq" as const) : ("between" as const),
  };
}
