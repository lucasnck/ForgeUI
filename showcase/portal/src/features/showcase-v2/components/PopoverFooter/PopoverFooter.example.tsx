"use client";
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Inline,
  Text,
  Button,
  Stack,
  Surface,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePopoverFooterExample } from "./usePopoverFooterExample";

export function PopoverFooterExample() {
  const view = usePopoverFooterExample();

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
          <PopoverHeader hidden />
          <PopoverBody hidden />
          <PopoverFooter title="Title" {...view.properties}>
            <Stack gap="2">
              <Text>{view.properties.children ?? "Children"}</Text>
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
