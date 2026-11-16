"use client";
import { PercentageInput, Stack, FormField, Button, Inline } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePercentageInputExample } from "./usePercentageInputExample";

export function PercentageInputExample() {
  const view = usePercentageInputExample();

  return (
    <Stack gap="4">
      <FormField controlId={view.id} label="Label (%)" hint="Hint">
        <PercentageInput
          name="Name"
          placeholder="Placeholder"
          title="Title"
          value={view.value}
          onChange={view.change}
          min={0}
          max={100}
          step={1}
          {...view.properties}
        />
      </FormField>
      <Inline gap="2" justify="end">
        <Button
          size="sm"
          variant="outline"
          onClick={view.clear}
          disabled={view.properties.disabled || view.properties.readOnly}
        >
          {view.copy.clearValue}
        </Button>
      </Inline>
      <ExampleState value={view.state} />
    </Stack>
  );
}
