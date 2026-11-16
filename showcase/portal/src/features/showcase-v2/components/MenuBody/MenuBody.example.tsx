"use client";
import { Menu, MenuBody, Surface, Stack, MenuItem } from "@forge-ui/web";
import { menuItems } from "../Menu/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useMenuBodyExample } from "./useMenuBodyExample";

export function MenuBodyExample() {
  const view = useMenuBodyExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Menu label="Label" title="Title" onAction={view.action} onDismiss={view.dismiss}>
          <MenuBody title="Title" {...view.properties}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                label={item.label}
                disabled={item.disabled}
                title={item.title}
              />
            ))}
          </MenuBody>
        </Menu>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
