"use client";
import {
  NavigationMenu,
  NavigationMenuBody,
  Stack,
  Surface,
  NavigationMenuHeader,
  Heading,
  Inline,
  Icon,
} from "@forge-ui/web";
import { useNavigationMenuHeaderExample } from "./useNavigationMenuHeaderExample";

function NavigationMenuHeaderScenario() {
  const view = useNavigationMenuHeaderExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <NavigationMenu label="Label" title="Title">
          <NavigationMenuHeader title="Title" {...view.properties}>
            <Inline gap="2" align="center">
              <Icon name="info" size="sm" />
              <Heading level={3}>{view.properties.children ?? "Children"}</Heading>
            </Inline>
          </NavigationMenuHeader>
          <NavigationMenuBody hidden />
        </NavigationMenu>
      </Surface>
    </Stack>
  );
}

export function NavigationMenuHeaderExample() {
  return <NavigationMenuHeaderScenario />;
}
