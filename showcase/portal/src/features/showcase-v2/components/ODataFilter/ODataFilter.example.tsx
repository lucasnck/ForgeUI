"use client";
import { ODataFilter, Stack, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useODataFilterExample } from "./useODataFilterExample";
import { useODataFilterExactExample } from "./useODataFilterExactExample";

function ODataFilterScenario({ advanced = false }: { advanced?: boolean }) {
  const view = useODataFilterExample(advanced);

  return (
    <Stack gap="4">
      <ODataFilter
        mode={advanced ? "advanced" : "simple"}
        {...view.properties}
        fields={view.fields}
        labels={view.labels}
        value={view.expression}
        onValueChange={view.change}
        onApply={view.apply}
        onCancel={view.cancel}
      />
      <Text>{view.state.result.join(", ")}</Text>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function ODataFilterExample() {
  return <ODataFilterScenario />;
}

export function ODataFilterAdvancedExample() {
  return <ODataFilterScenario advanced />;
}

export function ODataFilterExactExample() {
  const view = useODataFilterExactExample();

  return (
    <Stack gap="4">
      <ODataFilter
        mode="advanced"
        fields={view.fields}
        labels={view.labels}
        value={view.expression}
        onValueChange={view.change}
        onApply={view.apply}
      />
      <ExampleState value={view.state} />
    </Stack>
  );
}
