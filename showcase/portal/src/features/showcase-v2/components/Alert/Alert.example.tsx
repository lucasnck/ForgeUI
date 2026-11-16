"use client";
import { useExamplePropertySnapshot as useAlertExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseAlertProps } from "react";
import { useExampleProperties as useAlertExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  Button,
  Alert,
  AlertHeader,
  AlertBody,
  AlertFooter,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, TextControl } from "../ExampleControls";

import { useAlertExample } from "./useAlertExample";

export function AlertExample() {
  const { properties: alertProperties } = useAlertPropertyBindings();

  const view = useAlertExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    showIcon: viewShowIcon,
    setShowIcon: viewSetShowIcon,
    announcement: viewAnnouncement,
    changeAnnouncement: viewChangeAnnouncement,
    count: viewCount,
    lastAction: viewLastAction,
    cancel: viewCancel,
    copy: viewCopy,
    action: viewAction,
  } = view;
  useAlertPropertySnapshot({ announcement: viewAnnouncement });
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
      <Alert announcement={viewAnnouncement} {...alertProperties}>
        <AlertHeader>
          <Inline gap="2" align="center">
            {viewShowIcon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {viewChildren}
            </Heading>
          </Inline>
        </AlertHeader>
        <AlertBody>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </AlertBody>
        <AlertFooter>
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

function useAlertPropertyBindings() {
  return useAlertExampleProperties<
    Pick<ShowcaseAlertProps<typeof Alert>, "announcement" | "title">
  >("Alert");
}

function useAlertPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useAlertExamplePropertySnapshot("Alert", values);
}
