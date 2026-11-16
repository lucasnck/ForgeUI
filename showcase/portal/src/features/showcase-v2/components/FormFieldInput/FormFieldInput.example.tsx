"use client";
import { FormProvider } from "react-hook-form";
import { FormFieldInput, Stack, Inline, Button } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useFormFieldInputExample } from "./useFormFieldInputExample";
import type { RegisteredValues } from "./fixtures";

function RegisteredScenario({ conditional = false }: { conditional?: boolean }) {
  const view = useFormFieldInputExample();

  return (
    <Stack gap="4">
      <FormProvider {...view.methods}>
        <form noValidate onSubmit={view.submit}>
          <Stack gap="4">
            <FormFieldInput<RegisteredValues>
              name="profile.name"
              label="Label"
              hint="Hint"
              placeholder="Placeholder"
              required
              appearance="outlined"
              shape="rounded"
              {...view.properties}
            />
            {conditional && (
              <>
                {view.visible && (
                  <FormFieldInput<RegisteredValues>
                    name="conditional"
                    label="Label 2"
                    hint="Hint 2"
                    placeholder="Placeholder 2"
                  />
                )}
                <FormFieldInput<RegisteredValues> name="readOnly" label="Label 3" readOnly />
                <Inline gap="2" align="center">
                  <Button type="button" appearance="outlined" onClick={view.toggle}>
                    Toggle
                  </Button>
                  <Button type="button" appearance="outlined" onClick={view.showError}>
                    Set error
                  </Button>
                  <Button type="button" appearance="outlined" onClick={view.clearErrors}>
                    Clear errors
                  </Button>
                </Inline>
              </>
            )}
            <Inline gap="2" align="center" justify="end">
              <Button type="button" appearance="outlined" onClick={view.reset}>
                Reset
              </Button>
              <Button type="submit">{view.copy.save}</Button>
            </Inline>
          </Stack>
        </form>
      </FormProvider>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function FormFieldInputExample() {
  return <RegisteredScenario />;
}

export function FormFieldInputConditionalExample() {
  return <RegisteredScenario conditional />;
}
