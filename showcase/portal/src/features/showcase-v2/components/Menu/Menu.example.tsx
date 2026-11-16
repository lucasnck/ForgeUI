"use client";
import {
  Menu,
  MenuBody,
  Surface,
  Stack,
  MenuHeader,
  Inline,
  Icon,
  Heading,
  MenuFooter,
  Text,
  MenuItem,
} from "@forge-ui/web";
import { menuItems } from "../Menu/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useMenuExample } from "./useMenuExample";

export function MenuExample() {
  const view = useMenuExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Menu
          label="Label"
          title="Title"
          {...view.properties}
          onAction={view.action}
          onDismiss={view.dismiss}
        >
          <MenuHeader title="Title">
            <Inline gap="2" align="center">
              <Icon name="info" size="sm" />
              <Heading level={3}>{"Children"}</Heading>
            </Inline>
          </MenuHeader>
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
          <MenuFooter title="Title">
            <Text>{"Children"}</Text>
          </MenuFooter>
        </Menu>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}
