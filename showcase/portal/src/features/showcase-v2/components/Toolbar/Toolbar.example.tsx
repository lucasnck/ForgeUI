"use client";
import { Toolbar, ToolbarItem, Stack } from "@forge-ui/web";
import { ToggleControl } from "../ExampleControls";
import { ExampleState } from "../ExampleState/ExampleState";
import { useToolbarExample } from "./useToolbarExample";

export function ToolbarExample() {
  const view = useToolbarExample();

  return (
    <Stack gap="4">
      <ToggleControl
        label="disabled item 2"
        checked={view.disableSecond}
        onChange={view.setDisableSecond}
      />
      <Toolbar label="Label" {...view.properties}>
        {view.renderItems.map((item) => (
          <ToolbarItem
            key={item.id}
            itemKey={item.id}
            title={item.title}
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.children}
          </ToolbarItem>
        ))}
      </Toolbar>
      <ExampleState value={{ itemKey: view.lastAction, calls: view.calls }} />
    </Stack>
  );
}
