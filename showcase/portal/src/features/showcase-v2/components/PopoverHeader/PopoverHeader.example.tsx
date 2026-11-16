"use client";
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Inline,
  Icon,
  Heading,
  Button,
  Stack,
  Surface,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePopoverHeaderExample } from "./usePopoverHeaderExample";

export function PopoverHeaderExample() {
  const view = usePopoverHeaderExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Popover
          label="Label"
          triggerLabel="TriggerLabel"
          title="Title"
          open={view.open}
          onOpenChange={view.request}
        >
          <PopoverHeader title="Title" {...view.properties}>
            <Inline gap="2" align="center" justify="between">
              <Inline gap="2" align="center">
                <Icon name="info" size="sm" />
                <Heading level={3}>{view.properties.children ?? "Children"}</Heading>
              </Inline>
              <Inline gap="2" align="center" justify="end">
                <Button type="button" appearance="outlined" onClick={view.close}>
                  {view.copy.close}
                </Button>
              </Inline>
            </Inline>
          </PopoverHeader>
          <PopoverBody hidden />
        </Popover>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
