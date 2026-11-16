"use client";
import type { ComponentProps as ShowcaseErrorStateFooterProps } from "react";
import { useExampleProperties as useErrorStateFooterExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Text,
  Button,
  ErrorState,
  ErrorStateBody,
  ErrorStateFooter,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, TextControl } from "../ExampleControls";

import { useErrorStateFooterExample } from "./useErrorStateFooterExample";

export function ErrorStateFooterExample() {
  const { properties: errorStateFooterProperties } = useErrorStateFooterPropertyBindings();

  const view = useErrorStateFooterExample();
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
      <ErrorState announcement={viewAnnouncement}>
        <ErrorStateBody>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </ErrorStateBody>
        <ErrorStateFooter {...errorStateFooterProperties}>
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

function useErrorStateFooterPropertyBindings() {
  return useErrorStateFooterExampleProperties<
    Pick<ShowcaseErrorStateFooterProps<typeof ErrorStateFooter>, "title">
  >("ErrorStateFooter");
}
