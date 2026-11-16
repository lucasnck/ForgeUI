"use client";
import { Menu, MenuBody, Surface, Stack, MenuFooter, Text, MenuItem } from "@forge-ui/web";
import { menuItems } from "../Menu/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useMenuFooterExample } from "./useMenuFooterExample";

export function MenuFooterExample() {
  const view = useMenuFooterExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Menu label="Label" title="Title" onAction={view.action} onDismiss={view.dismiss}>
          <MenuBody title="Title">
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
          <MenuFooter title="Title" {...view.properties}>
            <Text>{view.properties.children ?? "Children"}</Text>
          </MenuFooter>
        </Menu>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
