"use client";
import { MaskedInput, Stack, FormField, Button, Inline } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { HelperResults } from "../InputFixtures/HelperResults";
import { useMaskedInputExample } from "./useMaskedInputExample";

export function MaskedInputExample() {
  const view = useMaskedInputExample();

  return (
    <Stack gap="4">
      <FormField controlId={view.id} label="Label" hint="Hint">
        <MaskedInput
          mask={view.mask}
          name="Name"
          placeholder="Placeholder"
          title="Title"
          value={view.value}
          onValueChange={view.change}
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
      <HelperResults label="applyMask / unmask / isMaskComplete" rows={view.helperRows} />
    </Stack>
  );
}
