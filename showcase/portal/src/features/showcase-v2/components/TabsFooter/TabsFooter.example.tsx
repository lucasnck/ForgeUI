"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabsFooter,
  Tab,
  TabPanel,
  Stack,
  Inline,
  Text,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { items } from "../Tabs/fixtures";
import { useTabsFooterExample } from "./useTabsFooterExample";

export function TabsFooterExample() {
  const view = useTabsFooterExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onValueChange" checked={view.reject} onChange={view.setReject} />
      <Tabs label="Label" value={view.selected} onValueChange={view.change}>
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
        <TabsFooter {...view.properties}>
          <Inline gap="2" align="center" justify="between">
            <Text>
              {view.properties.children ?? "Children"} · {view.selected}
            </Text>
            <Button size="sm" variant="outline" onClick={view.nextPanel}>
              {view.copy.nextPanel}
            </Button>
          </Inline>
        </TabsFooter>
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
