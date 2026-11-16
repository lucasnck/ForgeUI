"use client";
import {
  Surface,
  Stack,
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  FormField,
  Input,
  Heading,
  Inline,
  Icon,
  Button,
  Select,
  Option,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useFormExample } from "./useFormExample";
import { field } from "./fixtures";

function FormScenario({ intents = false }: { intents?: boolean }) {
  const view = useFormExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Form
          name="Name"
          title="Title"
          loadingLabel="LoadingLabel"
          onValidSubmit={view.submit}
          onInvalidCapture={view.onInvalid}
          onReset={view.reset}
          {...view.properties}
        >
          <FormHeader>
            <Inline gap="2" align="center">
              <Icon name="info" />
              <Heading level={3}>Children</Heading>
            </Inline>
          </FormHeader>
          <FormBody>
            <FormField controlId={view.id} label={field.label}>
              <Input name={field.name} placeholder={field.placeholder} required />
            </FormField>
            {intents && (
              <FormField controlId={view.id + "-2"} label="Label 2">
                <Select name="Name 2" defaultValue="value-1">
                  <Option value="value-1">Children 1</Option>
                  <Option value="value-2">Children 2</Option>
                </Select>
              </FormField>
            )}
          </FormBody>
          <FormFooter data-justify="end">
            <Inline gap="2" justify="end">
              {intents ? (
                <>
                  <Button type="reset" appearance="ghost">
                    {view.copy.clear}
                  </Button>
                  <Button type="submit" name="intent" value="draft" variant="outline">
                    {view.copy.review}
                  </Button>
                  <Button type="submit" name="intent" value="save">
                    {view.copy.save}
                  </Button>
                </>
              ) : (
                <>
                  <Button type="button" variant="outline" onClick={view.cancel}>
                    {view.copy.cancel}
                  </Button>
                  <Button type="submit">{view.copy.save}</Button>
                </>
              )}
            </Inline>
          </FormFooter>
        </Form>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function FormExample() {
  return <FormScenario />;
}

export function FormIntentsExample() {
  return <FormScenario intents />;
}
