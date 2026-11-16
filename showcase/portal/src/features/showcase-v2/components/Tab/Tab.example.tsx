"use client";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { items } from "../Tabs/fixtures";
import { useTabExample } from "./useTabExample";

export function TabExample() {
  const view = useTabExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onValueChange" checked={view.reject} onChange={view.setReject} />
      <Tabs label="Label" value={view.selected} onValueChange={view.change}>
        <TabsHeader>
          {items.map((item) => (
            <Tab
              key={item.id}
              value={item.id}
              {...view.properties}
              title={`${view.properties.title ?? "Title"} ${item.index}`}
            >{`${view.properties.children ?? "Children"} ${item.index}`}</Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {items.map((item) => (
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
