"use client";
import { Disclosure, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { useDisclosureExample } from "./useDisclosureExample";

export function DisclosureExample() {
  const view = useDisclosureExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onOpenChange" checked={view.reject} onChange={view.setReject} />
      <Disclosure label="Label" open={view.open} onOpenChange={view.change} {...view.properties}>
        {view.properties.children ?? "Children"}
      </Disclosure>
      <ExampleState
        value={{
          open: view.properties.open ?? view.open,
          requested: view.requested,
          calls: view.calls,
        }}
      />
    </Stack>
  );
}
