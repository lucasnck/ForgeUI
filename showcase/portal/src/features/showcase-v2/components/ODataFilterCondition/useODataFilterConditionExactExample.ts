"use client";
import { useState } from "react";
import type { ODataFilterConditionData, ODataFilterConditionProps } from "@forge-ui/web";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { exactFields, labels } from "../ODataFilter/fixtures";

export function useODataFilterConditionExactExample() {
  const { properties } =
    useExampleProperties<Pick<ODataFilterConditionProps, "disabled" | "title">>(
      "ODataFilterCondition",
    );
  const [condition, change] = useState<ODataFilterConditionData>({
    kind: "condition",
    id: "exact-condition",
    fieldId: "guid",
    fieldKind: "guid",
    operator: "eq",
    value: "12345678-1234-5678-9abc-123456789abc",
  });

  return { properties, fields: exactFields, labels, condition, change };
}
