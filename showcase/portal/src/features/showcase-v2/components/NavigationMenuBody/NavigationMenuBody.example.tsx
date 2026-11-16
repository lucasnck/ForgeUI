"use client";
import {
  NavigationMenu,
  NavigationMenuBody,
  Stack,
  Surface,
  NavigationMenuItem,
} from "@forge-ui/web";
import { destinations } from "../NavigationMenu/fixtures";
import { NavigationDestinations } from "../NavigationMenu/NavigationDestinations";
import { ExampleState } from "../ExampleState/ExampleState";
import { useNavigationMenuBodyExample } from "./useNavigationMenuBodyExample";

function NavigationMenuBodyScenario() {
  const view = useNavigationMenuBodyExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <NavigationMenu label="Label" title="Title">
          <NavigationMenuBody title="Title" {...view.properties}>
            {destinations.slice(0, 3).map((item) => (
              <NavigationMenuItem
                key={item.id}
                label={item.label}
                href={view.href(item.id)}
                current={view.current === item.id}
                title={item.title}
                onClick={view.activate(item.id)}
              />
            ))}
          </NavigationMenuBody>
        </NavigationMenu>
      </Surface>
      <ExampleState value={view.state} />
      <NavigationDestinations view={view} nested={false} />
    </Stack>
  );
}

export function NavigationMenuBodyExample() {
  return <NavigationMenuBodyScenario />;
}
