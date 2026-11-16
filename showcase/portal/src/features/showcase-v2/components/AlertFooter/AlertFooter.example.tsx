"use client";
import type { ComponentProps as ShowcaseAlertFooterProps } from "react";
import { useExampleProperties as useAlertFooterExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Text, Button, Alert, AlertBody, AlertFooter } from "@forge-ui/web";
import { ExampleControls, SelectControl, TextControl } from "../ExampleControls";

import { useAlertFooterExample } from "./useAlertFooterExample";

export function AlertFooterExample() {
  const { properties: alertFooterProperties } = useAlertFooterPropertyBindings();

  const view = useAlertFooterExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    announcement: viewAnnouncement,
    changeAnnouncement: viewChangeAnnouncement,
    count: viewCount,
    lastAction: viewLastAction,
    cancel: viewCancel,
    copy: viewCopy,
    action: viewAction,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <SelectControl
          label="announcement"
          value={viewAnnouncement}
          options={["off", "polite", "assertive"]}
          onChange={viewChangeAnnouncement}
        />
      </ExampleControls>
      <Alert announcement={viewAnnouncement}>
        <AlertBody>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </AlertBody>
        <AlertFooter {...alertFooterProperties}>
          <Inline gap="2" justify="end">
            <Button variant="outline" onClick={viewCancel}>
              {viewCopy.cancel}
            </Button>
            <Button onClick={viewAction}>{viewCopy.review}</Button>
          </Inline>
        </AlertFooter>
      </Alert>
    </Stack>
  );
}

function useAlertFooterPropertyBindings() {
  return useAlertFooterExampleProperties<
    Pick<ShowcaseAlertFooterProps<typeof AlertFooter>, "title">
  >("AlertFooter");
}
