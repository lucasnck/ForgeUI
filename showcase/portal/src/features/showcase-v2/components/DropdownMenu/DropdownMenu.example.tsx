"use client";
import {
  DropdownMenu,
  Menu,
  MenuHeader,
  MenuBody,
  MenuFooter,
  MenuItem,
  Button,
  Avatar,
  Text,
  Heading,
  Inline,
  Stack,
  Surface,
} from "@forge-ui/web";
import { menuItems } from "../Menu/fixtures";
import { ExampleState } from "../ExampleState/ExampleState";
import { useDropdownMenuExample } from "./useDropdownMenuExample";

function DropdownMenuScenario({ composite = false }: { composite?: boolean }) {
  const view = useDropdownMenuExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <DropdownMenu
          label="Label"
          title="Title"
          {...view.properties}
          open={view.open}
          onOpenChange={view.change}
          trigger={
            composite ? (
              <Button appearance="outlined">
                <Inline as="span" gap="2" align="center">
                  <Avatar label="Label" decorative size="sm" />
                  <Text>Children</Text>
                </Inline>
              </Button>
            ) : undefined
          }
        >
          <Menu label="Label" onAction={view.action} onDismiss={view.dismiss}>
            <MenuHeader>
              <Heading level={3}>Children</Heading>
            </MenuHeader>
            <MenuBody>
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
            <MenuFooter>
              <Inline gap="2" align="center" justify="end">
                <Button type="button" appearance="outlined" onClick={view.close}>
                  {view.copy.close}
                </Button>
              </Inline>
            </MenuFooter>
          </Menu>
        </DropdownMenu>
      </Surface>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function DropdownMenuExample() {
  return <DropdownMenuScenario />;
}

export function DropdownMenuCompositeExample() {
  return <DropdownMenuScenario composite />;
}
