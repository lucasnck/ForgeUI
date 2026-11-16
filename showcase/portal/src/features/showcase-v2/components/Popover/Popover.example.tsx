"use client";
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Inline,
  Icon,
  Heading,
  Text,
  Button,
  Stack,
  Surface,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePopoverExample } from "./usePopoverExample";

export function PopoverExample() {
  const view = usePopoverExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Popover
          label="Label"
          triggerLabel="TriggerLabel"
          title="Title"
          {...view.properties}
          open={view.open}
          onOpenChange={view.request}
        >
          <PopoverHeader title="Title">
            <Inline gap="2" align="center" justify="between">
              <Inline gap="2" align="center">
                <Icon name="info" size="sm" />
                <Heading level={3}>{"Children"}</Heading>
              </Inline>
            </Inline>
          </PopoverHeader>
          <PopoverBody title="Title">
            <Stack gap="2">
              <Text>{"Children"}</Text>
            </Stack>
          </PopoverBody>
          <PopoverFooter title="Title">
            <Stack gap="2">
              <Inline gap="2" align="center" justify="end">
                <Button type="button" appearance="outlined" onClick={view.close}>
                  {view.copy.close}
                </Button>
              </Inline>
            </Stack>
          </PopoverFooter>
        </Popover>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
