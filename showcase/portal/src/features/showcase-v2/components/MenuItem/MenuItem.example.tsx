"use client";
import { Menu, MenuBody, Surface, Stack, MenuItem } from "@forge-ui/web";
import { menuItems } from "../Menu/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useMenuItemExample } from "./useMenuItemExample";

export function MenuItemExample() {
  const view = useMenuItemExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Menu label="Label" title="Title" onAction={view.action} onDismiss={view.dismiss}>
          <MenuBody title="Title">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                label={(view.properties.label ?? "Label") + " " + item.index}
                disabled={
                  item.disabled || (item.index === 1 && (view.properties.disabled ?? false))
                }
                title={(view.properties.title ?? "Title") + " " + item.index}
              />
            ))}
          </MenuBody>
        </Menu>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
