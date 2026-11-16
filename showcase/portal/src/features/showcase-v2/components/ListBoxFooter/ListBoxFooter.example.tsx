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
  ListBoxFooter,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useListBoxFooterExample } from "./useListBoxFooterExample";

export function ListBoxFooterExample() {
  const view = useListBoxFooterExample();

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
              <ListBoxBody />
              <ListBoxFooter title="Title" {...view.properties}>
                <Inline gap="2" align="center" justify="between">
                  <Text>
                    {view.visibleSelected.length} / {view.available}
                  </Text>
                  <Button type="button" variant="outline" onClick={view.clear}>
                    {view.copy.resetSelection}
                  </Button>
                </Inline>
              </ListBoxFooter>
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
