"use client";
import type { ComponentProps as ShowcaseErrorStateHeaderProps } from "react";
import { useExampleProperties as useErrorStateHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  ErrorState,
  ErrorStateHeader,
  ErrorStateBody,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, TextControl } from "../ExampleControls";

import { useErrorStateHeaderExample } from "./useErrorStateHeaderExample";

export function ErrorStateHeaderExample() {
  const { properties: errorStateHeaderProperties } = useErrorStateHeaderPropertyBindings();

  const view = useErrorStateHeaderExample();
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
      <ErrorState announcement={viewAnnouncement}>
        <ErrorStateHeader {...errorStateHeaderProperties}>
          <Inline gap="2" align="center">
            {viewShowIcon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {viewChildren}
            </Heading>
          </Inline>
        </ErrorStateHeader>
        <ErrorStateBody hidden>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </ErrorStateBody>
      </ErrorState>
    </Stack>
  );
}

function useErrorStateHeaderPropertyBindings() {
  return useErrorStateHeaderExampleProperties<
    Pick<ShowcaseErrorStateHeaderProps<typeof ErrorStateHeader>, "title">
  >("ErrorStateHeader");
}
