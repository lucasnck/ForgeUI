"use client";
import {
  Surface,
  Stack,
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  Inline,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";

import { useFormFooterExample } from "./useFormFooterExample";

export function FormFooterExample() {
  const view = useFormFooterExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Form
          onValidSubmit={view.submit}
          onInvalidCapture={view.onInvalid}
          onReset={view.reset}
          loading={view.loading}
          loadingLabel="LoadingLabel"
        >
          <FormHeader hidden />
          <FormBody hidden />
          <FormFooter title="Title" {...view.properties} data-justify="end">
            <Inline gap="2" justify="end">
              <Button type="button" variant="outline" onClick={view.cancel}>
                {view.copy.cancel}
              </Button>
              <Button type="submit">{view.copy.save}</Button>
            </Inline>
          </FormFooter>
        </Form>
      </Surface>
      <ExampleState value={view.state} />
      <ToggleControl label="Form.loading" checked={view.loading} onChange={view.setLoading} />
    </Stack>
  );
}
