"use client";
import { EmailInput, Stack, FormField, Button, Inline } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useEmailInputExample } from "./useEmailInputExample";

export function EmailInputExample() {
  const view = useEmailInputExample();

  return (
    <Stack gap="4">
      <FormField controlId={view.id} label="Label" hint="Hint">
        <EmailInput
          name="Name"
          placeholder="Placeholder"
          title="Title"
          value={view.value}
          onValueChange={view.change}
          providers={view.providers}
          listboxLabel="ListboxLabel"
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
