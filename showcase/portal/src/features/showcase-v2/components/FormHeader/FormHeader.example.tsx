"use client";
import { Surface, Stack, Form, FormHeader, FormBody, Inline, Icon, Heading } from "@forge-ui/web";

import { useFormHeaderExample } from "./useFormHeaderExample";

export function FormHeaderExample() {
  const view = useFormHeaderExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Form onValidSubmit={view.submit} loadingLabel="LoadingLabel">
          <FormHeader title="Title" {...view.properties}>
            <Inline gap="2" align="center">
              <Icon name="info" />
              <Heading level={3}>{view.properties.children ?? "Children"}</Heading>
            </Inline>
          </FormHeader>
          <FormBody hidden />
        </Form>
      </Surface>
    </Stack>
  );
}
