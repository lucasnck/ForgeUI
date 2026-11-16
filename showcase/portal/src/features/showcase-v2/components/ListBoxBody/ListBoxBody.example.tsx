"use client";
import {
  Stack,
  Surface,
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  Button,
  ListBox,
  ListBoxBody,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useListBoxBodyExample } from "./useListBoxBodyExample";

export function ListBoxBodyExample() {
  const view = useListBoxBodyExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Form id={view.formId} onValidSubmit={view.capture}>
          <FormHeader hidden />
          <FormBody>
            <ListBox
              label="Label"
              options={view.options}
              value={view.value}
              onValueChange={view.change}
              selectionMode={view.mode}
              name="Name"
              form={view.formId}
            >
              <ListBoxBody title="Title" {...view.properties} />
            </ListBox>
          </FormBody>
          <FormFooter data-justify="end">
            <Button type="submit">{view.copy.save}</Button>
          </FormFooter>
        </Form>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
