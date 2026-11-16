"use client";
import { Tooltip, Button, Stack, Surface } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTooltipExample } from "./useTooltipExample";

export function TooltipExample() {
  const view = useTooltipExample();

  return (
    <Stack gap="4">
      <Surface padding="4" shape="rounded">
        <Tooltip
          content="Content"
          {...view.properties}
          open={view.open}
          onOpenChange={view.request}
        >
          <Button type="button">Children</Button>
        </Tooltip>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
