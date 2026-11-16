"use client";
import { InternationalTelephoneInput, Stack, FormField, Button, Inline } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { HelperResults } from "../InputFixtures/HelperResults";
import { useInternationalTelephoneInputExample } from "./useInternationalTelephoneInputExample";

export function InternationalTelephoneInputExample() {
  const view = useInternationalTelephoneInputExample();

  return (
    <Stack gap="4">
      <FormField controlId={view.id} label="Label" hint="Hint">
        <InternationalTelephoneInput
          name="Name"
          placeholder="Placeholder"
          title="Title"
          value={view.value}
          onValueChange={view.change}
          locale="pt-BR"
          countryLabel="CountryLabel"
          internationalLabel="InternationalLabel"
          invalidMessage="InvalidMessage"
          countries={view.countries}
          fixedCountry={view.fixedCountry}
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
      <HelperResults label="formatters.phone / validators.phone" rows={view.helperRows} />
    </Stack>
  );
}
