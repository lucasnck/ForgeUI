"use client";
import { CurrencyInput, Stack, FormField, Button, Inline } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { HelperResults } from "../InputFixtures/HelperResults";
import { useCurrencyInputExample } from "./useCurrencyInputExample";

export function CurrencyInputExample() {
  const view = useCurrencyInputExample();

  return (
    <Stack gap="4">
      <FormField controlId={view.id} label="Label" hint="Hint">
        <CurrencyInput
          name="Name"
          placeholder="Placeholder"
          title="Title"
          value={view.value}
          onValueChange={view.change}
          currency="BRL"
          locale="pt-BR"
          invalidMessage="InvalidMessage"
          onInputStateChange={view.setInputState}
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
      <HelperResults label="formatters.money / validators.money" rows={view.helperRows} />
    </Stack>
  );
}
