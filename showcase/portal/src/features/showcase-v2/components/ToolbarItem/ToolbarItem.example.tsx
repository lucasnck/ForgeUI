"use client";
import { Toolbar, ToolbarItem, Stack } from "@forge-ui/web";
import { ToggleControl } from "../ExampleControls";
import { ExampleState } from "../ExampleState/ExampleState";
import { useToolbarItemExample } from "./useToolbarItemExample";

export function ToolbarItemExample() {
  const view = useToolbarItemExample();

  return (
    <Stack gap="4">
      <ToggleControl
        label="disabled item 2"
        checked={view.disableSecond}
        onChange={view.setDisableSecond}
      />
      <Toolbar label="Label">
        {view.renderItems.map((item) => (
          <ToolbarItem
            key={item.id}
            itemKey={item.id}
            {...view.properties}
            title={`${view.properties.title ?? "Title"} ${item.index}`}
            disabled={view.properties.disabled || item.disabled}
            onClick={item.onClick}
          >{`${view.properties.children ?? "Children"} ${item.index}`}</ToolbarItem>
        ))}
      </Toolbar>
      <ExampleState value={{ itemKey: view.lastAction, calls: view.calls }} />
    </Stack>
  );
}
