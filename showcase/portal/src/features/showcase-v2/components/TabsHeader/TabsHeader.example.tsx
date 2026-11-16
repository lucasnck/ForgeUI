"use client";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { items } from "../Tabs/fixtures";
import { useTabsHeaderExample } from "./useTabsHeaderExample";

export function TabsHeaderExample() {
  const view = useTabsHeaderExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onValueChange" checked={view.reject} onChange={view.setReject} />
      <Tabs label="Label" value={view.selected} onValueChange={view.change}>
        <TabsHeader {...view.properties}>
          {items.slice(0, 2).map((item) => (
            <Tab key={item.id} value={item.id} title={item.title}>
              {item.children}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {items.slice(0, 2).map((item) => (
            <TabPanel key={item.id} value={item.id} title={item.title}>
              {item.children}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <ExampleState
        value={{
          value: view.selected,
          requested: view.requested,
          calls: view.calls,
        }}
      />
    </Stack>
  );
}
