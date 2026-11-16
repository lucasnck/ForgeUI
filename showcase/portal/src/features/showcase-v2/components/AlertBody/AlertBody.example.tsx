"use client";
import type { ComponentProps as ShowcaseAlertBodyProps } from "react";
import { useExampleProperties as useAlertBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text, Alert, AlertBody } from "@forge-ui/web";
import { ExampleControls, SelectControl, TextControl } from "../ExampleControls";

import { useAlertBodyExample } from "./useAlertBodyExample";

export function AlertBodyExample() {
  const { properties: alertBodyProperties } = useAlertBodyPropertyBindings();

  const view = useAlertBodyExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    announcement: viewAnnouncement,
    changeAnnouncement: viewChangeAnnouncement,
    count: viewCount,
    lastAction: viewLastAction,
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
        <AlertBody {...alertBodyProperties}>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </AlertBody>
      </Alert>
    </Stack>
  );
}

function useAlertBodyPropertyBindings() {
  return useAlertBodyExampleProperties<Pick<ShowcaseAlertBodyProps<typeof AlertBody>, "title">>(
    "AlertBody",
  );
}
