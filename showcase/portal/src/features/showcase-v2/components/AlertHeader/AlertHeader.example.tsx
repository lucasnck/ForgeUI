"use client";
import type { ComponentProps as ShowcaseAlertHeaderProps } from "react";
import { useExampleProperties as useAlertHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Icon, Heading, Text, Alert, AlertHeader, AlertBody } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, TextControl } from "../ExampleControls";

import { useAlertHeaderExample } from "./useAlertHeaderExample";

export function AlertHeaderExample() {
  const { properties: alertHeaderProperties } = useAlertHeaderPropertyBindings();

  const view = useAlertHeaderExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    showIcon: viewShowIcon,
    setShowIcon: viewSetShowIcon,
    announcement: viewAnnouncement,
    changeAnnouncement: viewChangeAnnouncement,
    count: viewCount,
    lastAction: viewLastAction,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <ToggleControl label="icon" checked={viewShowIcon} onChange={viewSetShowIcon} />
        <SelectControl
          label="announcement"
          value={viewAnnouncement}
          options={["off", "polite", "assertive"]}
          onChange={viewChangeAnnouncement}
        />
      </ExampleControls>
      <Alert announcement={viewAnnouncement}>
        <AlertHeader {...alertHeaderProperties}>
          <Inline gap="2" align="center">
            {viewShowIcon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {viewChildren}
            </Heading>
          </Inline>
        </AlertHeader>
        <AlertBody hidden>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </AlertBody>
      </Alert>
    </Stack>
  );
}

function useAlertHeaderPropertyBindings() {
  return useAlertHeaderExampleProperties<
    Pick<ShowcaseAlertHeaderProps<typeof AlertHeader>, "title">
  >("AlertHeader");
}
