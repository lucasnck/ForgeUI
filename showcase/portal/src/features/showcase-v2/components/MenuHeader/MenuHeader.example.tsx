"use client";
import { Menu, MenuBody, Surface, Stack, MenuHeader, Inline, Icon, Heading } from "@forge-ui/web";
import { useMenuHeaderExample } from "./useMenuHeaderExample";

export function MenuHeaderExample() {
  const view = useMenuHeaderExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <Menu label="Label" title="Title" onAction={view.action} onDismiss={view.dismiss}>
          <MenuHeader title="Title" {...view.properties}>
            <Inline gap="2" align="center">
              <Icon name="info" size="sm" />
              <Heading level={3}>{view.properties.children ?? "Children"}</Heading>
            </Inline>
          </MenuHeader>
          <MenuBody hidden />
        </Menu>
      </Surface>
    </Stack>
  );
}
