"use client";
import { Fragment } from "react";
import {
  NavigationMenu,
  NavigationMenuBody,
  Stack,
  Surface,
  NavigationMenuItem,
  NavigationMenuSublist,
} from "@forge-ui/web";
import { destinations } from "../NavigationMenu/fixtures";
import { NavigationDestinations } from "../NavigationMenu/NavigationDestinations";
import { ExampleState } from "../ExampleState/ExampleState";
import { useNavigationMenuSublistExample } from "./useNavigationMenuSublistExample";

function NavigationMenuSublistScenario() {
  const view = useNavigationMenuSublistExample();

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <NavigationMenu label="Label" title="Title">
          <NavigationMenuBody title="Title">
            {
              <Fragment key="group">
                <NavigationMenuItem
                  label={"Label 1"}
                  title={"Title 1"}
                  animated={true}
                  open={view.open}
                  onOpenChange={view.change}
                >
                  <NavigationMenuSublist title="Title" {...view.properties}>
                    {destinations.slice(1, 3).map((item) => (
                      <NavigationMenuItem
                        key={item.id}
                        label={item.label}
                        href={view.href(item.id)}
                        current={view.current === item.id}
                        title={item.title}
                        onClick={view.activate(item.id)}
                      />
                    ))}
                  </NavigationMenuSublist>
                </NavigationMenuItem>
              </Fragment>
            }
          </NavigationMenuBody>
        </NavigationMenu>
      </Surface>
      <ExampleState value={view.state} />
      <NavigationDestinations view={view} nested={true} />
    </Stack>
  );
}

export function NavigationMenuSublistExample() {
  return <NavigationMenuSublistScenario />;
}
