"use client";
import { ODataFilterCondition, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useODataFilterConditionExample } from "./useODataFilterConditionExample";
import { useODataFilterConditionExactExample } from "./useODataFilterConditionExactExample";

function ODataFilterConditionScenario({ advanced = false }: { advanced?: boolean }) {
  const view = useODataFilterConditionExample(advanced);

  return (
    <Stack gap="4">
      <ODataFilterCondition
        {...view.properties}
        fields={view.fields}
        labels={view.labels}
        value={view.condition}
        onValueChange={view.changeCondition}
      />
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function ODataFilterConditionExample() {
  return <ODataFilterConditionScenario />;
}

export function ODataFilterConditionExactExample() {
  const view = useODataFilterConditionExactExample();

  return (
    <Stack gap="4">
      <ODataFilterCondition
        {...view.properties}
        fields={view.fields}
        labels={view.labels}
        value={view.condition}
        onValueChange={view.change}
      />
      <ExampleState value={view.condition} />
    </Stack>
  );
}
