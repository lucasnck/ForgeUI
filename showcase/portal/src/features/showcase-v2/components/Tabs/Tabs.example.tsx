"use client";
import { Tabs, TabsHeader, TabsBody, TabsFooter, Tab, TabPanel, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { items } from "../Tabs/fixtures";
import { useTabsExample } from "./useTabsExample";

export function TabsExample() {
  const view = useTabsExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onValueChange" checked={view.reject} onChange={view.setReject} />
      <Tabs label="Label" value={view.selected} onValueChange={view.change} {...view.properties}>
        <TabsHeader>
          {items.map((item) => (
            <Tab key={item.id} value={item.id} title={item.title}>
              {item.children}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {items.map((item) => (
            <TabPanel key={item.id} value={item.id} title={item.title}>
              {item.children}
            </TabPanel>
          ))}
        </TabsBody>
        <TabsFooter>{"Children"}</TabsFooter>
      </Tabs>
      <ExampleState
        value={{
          value: view.properties.value ?? view.selected,
          requested: view.requested,
          calls: view.calls,
        }}
      />
    </Stack>
  );
}
