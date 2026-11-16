"use client";
import { ODataFilterValue, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useODataFilterValueExample } from "./useODataFilterValueExample";
import { useExactFilterValuePreview } from "./useExactFilterValuePreview";

function ODataFilterValueScenario({ advanced = false }: { advanced?: boolean }) {
  const view = useODataFilterValueExample(advanced);

  return (
    <Stack gap="4">
      <ODataFilterValue
        label="Label"
        {...view.properties}
        field={view.fields[0]}
        operator={view.properties.operator ?? "contains"}
        value={view.value}
        onValueChange={view.changeValue}
        labels={view.labels}
      />
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function ODataFilterValueExample() {
  return <ODataFilterValueScenario />;
}

function ExactValuePreview({ index }: { index: 0 | 1 }) {
  const view = useExactFilterValuePreview(index);

  return (
    <Stack gap="2">
      <ODataFilterValue
        {...view.properties}
        field={view.field}
        label={view.properties.label ?? view.field.label}
        operator={view.operator}
        labels={view.labels}
        value={view.value}
        onValueChange={view.change}
      />
      <ExampleState value={view.value} />
    </Stack>
  );
}

export function ODataFilterValueExactExample() {
  return (
    <Stack gap="4">
      <ExactValuePreview index={0} />
      <ExactValuePreview index={1} />
    </Stack>
  );
}
