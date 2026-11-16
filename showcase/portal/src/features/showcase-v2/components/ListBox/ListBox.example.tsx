"use client";
import {
  Stack,
  Surface,
  SearchInput,
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  Button,
  ListBox,
  ListBoxHeader,
  ListBoxBody,
  ListBoxFooter,
  Heading,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useListBoxExample } from "./useListBoxExample";

function ListBoxScenario({ filtered = false }: { filtered?: boolean }) {
  const view = useListBoxExample(filtered);

  return (
    <Stack gap="4">
      {filtered && (
        <SearchInput
          aria-label="Label"
          placeholder="Placeholder"
          value={view.query}
          onChange={view.search}
          clearLabel={view.copy.clear}
        />
      )}
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
              title="Title"
              {...view.properties}
            >
              <ListBoxHeader>
                <Heading level={3}>Children</Heading>
              </ListBoxHeader>
              <ListBoxBody />
              <ListBoxFooter>
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
      {filtered && !view.options.length && <Text role="status">{view.copy.empty}</Text>}
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function ListBoxExample() {
  return <ListBoxScenario />;
}

export function ListBoxFilteredExample() {
  return <ListBoxScenario filtered />;
}
