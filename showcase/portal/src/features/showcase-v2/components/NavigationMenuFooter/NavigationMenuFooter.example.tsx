"use client";
import {
  NavigationMenu,
  NavigationMenuBody,
  Stack,
  Surface,
  NavigationMenuFooter,
  Text,
  NavigationMenuItem,
} from "@forge-ui/web";
import { destinations } from "../NavigationMenu/fixtures";
import { NavigationDestinations } from "../NavigationMenu/NavigationDestinations";
import { ExampleState } from "../ExampleState/ExampleState";
import { useNavigationMenuFooterExample } from "./useNavigationMenuFooterExample";

function NavigationMenuFooterScenario() {
  const view = useNavigationMenuFooterExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <NavigationMenu label="Label" title="Title">
          <NavigationMenuBody title="Title">
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
          <NavigationMenuFooter title="Title" {...view.properties}>
            <Text>{view.properties.children ?? "Children"}</Text>
          </NavigationMenuFooter>
        </NavigationMenu>
      </Surface>
      <ExampleState value={view.state} />
      <NavigationDestinations view={view} nested={false} />
    </Stack>
  );
}

export function NavigationMenuFooterExample() {
  return <NavigationMenuFooterScenario />;
}
