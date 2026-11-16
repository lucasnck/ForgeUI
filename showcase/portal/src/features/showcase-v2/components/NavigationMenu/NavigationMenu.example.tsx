"use client";
import { Fragment } from "react";
import {
  NavigationMenu,
  NavigationMenuBody,
  Stack,
  Surface,
  NavigationMenuHeader,
  Heading,
  Inline,
  Icon,
  NavigationMenuFooter,
  Text,
  NavigationMenuItem,
  NavigationMenuSublist,
} from "@forge-ui/web";
import { destinations } from "../NavigationMenu/fixtures";
import { NavigationDestinations } from "../NavigationMenu/NavigationDestinations";
import { ExampleState } from "../ExampleState/ExampleState";
import { useNavigationMenuExample } from "./useNavigationMenuExample";

function NavigationMenuScenario({ nested = false }: { nested?: boolean }) {
  const view = useNavigationMenuExample(nested);

  return (
    <Stack gap="4">
      <Surface padding="2" shape="rounded">
        <NavigationMenu label="Label" title="Title" {...view.properties}>
          <NavigationMenuHeader title="Title">
            <Inline gap="2" align="center">
              <Icon name="info" size="sm" />
              <Heading level={3}>{"Children"}</Heading>
            </Inline>
          </NavigationMenuHeader>
          <NavigationMenuBody title="Title">
            {nested ? (
              <Fragment key="group">
                <NavigationMenuItem
                  label={"Label 1"}
                  title={"Title 1"}
                  animated={true}
                  open={view.open}
                  onOpenChange={view.change}
                >
                  <NavigationMenuSublist title="Title">
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
                {destinations.slice(3, 4).map((item) => (
                  <NavigationMenuItem
                    key={item.id}
                    label={item.label}
                    href={view.href(item.id)}
                    current={view.current === item.id}
                    title={item.title}
                    onClick={view.activate(item.id)}
                  />
                ))}
              </Fragment>
            ) : (
              destinations
                .slice(0, 3)
                .map((item) => (
                  <NavigationMenuItem
                    key={item.id}
                    label={item.label}
                    href={view.href(item.id)}
                    current={view.current === item.id}
                    title={item.title}
                    onClick={view.activate(item.id)}
                  />
                ))
            )}
          </NavigationMenuBody>
          <NavigationMenuFooter title="Title">
            <Text>{"Children"}</Text>
          </NavigationMenuFooter>
        </NavigationMenu>
      </Surface>
      <ExampleState value={view.state} />
      <NavigationDestinations view={view} nested={nested} sibling={nested} />
    </Stack>
  );
}

export function NavigationMenuExample() {
  return <NavigationMenuScenario />;
}

export function NavigationMenuNestedExample() {
  return <NavigationMenuScenario nested />;
}
