"use client";
import type { ComponentProps as ShowcaseEmptyStateHeaderProps } from "react";
import { useExampleProperties as useEmptyStateHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  EmptyState,
  EmptyStateHeader,
  EmptyStateBody,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";

import { useEmptyStateHeaderExample } from "./useEmptyStateHeaderExample";

export function EmptyStateHeaderExample() {
  const { properties: emptyStateHeaderProperties } = useEmptyStateHeaderPropertyBindings();

  const view = useEmptyStateHeaderExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    showIcon: viewShowIcon,
    setShowIcon: viewSetShowIcon,
    count: viewCount,
    lastAction: viewLastAction,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
        <ToggleControl label="icon" checked={viewShowIcon} onChange={viewSetShowIcon} />
      </ExampleControls>
      <EmptyState>
        <EmptyStateHeader {...emptyStateHeaderProperties}>
          <Inline gap="2" align="center">
            {viewShowIcon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {viewChildren}
            </Heading>
          </Inline>
        </EmptyStateHeader>
        <EmptyStateBody hidden>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </EmptyStateBody>
      </EmptyState>
    </Stack>
  );
}

function useEmptyStateHeaderPropertyBindings() {
  return useEmptyStateHeaderExampleProperties<
    Pick<ShowcaseEmptyStateHeaderProps<typeof EmptyStateHeader>, "title">
  >("EmptyStateHeader");
}
