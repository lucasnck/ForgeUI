"use client";
import {
  Surface,
  Stack,
  Form,
  FormHeader,
  FormBody,
  Text,
  FormField,
  Input,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { field } from "../Form/fixtures";
import { useFormBodyExample } from "./useFormBodyExample";

export function FormBodyExample() {
  const view = useFormBodyExample();

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
          <FormBody title="Title" {...view.properties}>
            <Text>{view.properties.children ?? "Children"}</Text>
            <FormField controlId={view.id} label={field.label}>
              <Input name={field.name} placeholder={field.placeholder} required />
            </FormField>
          </FormBody>
        </Form>
      </Surface>
      <ExampleState value={view.state} />
      <ToggleControl label="Form.loading" checked={view.loading} onChange={view.setLoading} />
    </Stack>
  );
}
