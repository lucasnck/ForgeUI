"use client";
import { useExamplePropertySnapshot as useErrorStateExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseErrorStateProps } from "react";
import { useExampleProperties as useErrorStateExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  Button,
  ErrorState,
  ErrorStateHeader,
  ErrorStateBody,
  ErrorStateFooter,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, TextControl } from "../ExampleControls";

import { useErrorStateExample } from "./useErrorStateExample";

export function ErrorStateExample() {
  const { properties: errorStateProperties } = useErrorStatePropertyBindings();

  const view = useErrorStateExample();
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
  useErrorStatePropertySnapshot({ announcement: viewAnnouncement });
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
      <ErrorState announcement={viewAnnouncement} {...errorStateProperties}>
        <ErrorStateHeader>
          <Inline gap="2" align="center">
            {viewShowIcon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {viewChildren}
            </Heading>
          </Inline>
        </ErrorStateHeader>
        <ErrorStateBody>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </ErrorStateBody>
        <ErrorStateFooter>
          <Inline gap="2" justify="end">
            <Button variant="outline" onClick={viewCancel}>
              {viewCopy.cancel}
            </Button>
            <Button onClick={viewAction}>{viewCopy.retry}</Button>
          </Inline>
        </ErrorStateFooter>
      </ErrorState>
    </Stack>
  );
}

function useErrorStatePropertyBindings() {
  return useErrorStateExampleProperties<
    Pick<ShowcaseErrorStateProps<typeof ErrorState>, "announcement" | "title">
  >("ErrorState");
}

function useErrorStatePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useErrorStateExamplePropertySnapshot("ErrorState", values);
}
