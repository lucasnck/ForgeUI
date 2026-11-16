"use client";
import type { ComponentProps as ShowcaseEmptyStateProps } from "react";
import { useExampleProperties as useEmptyStateExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Icon,
  Heading,
  Text,
  Button,
  EmptyState,
  EmptyStateHeader,
  EmptyStateBody,
  EmptyStateFooter,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";

import { useEmptyStateExample } from "./useEmptyStateExample";

export function EmptyStateExample() {
  const { properties: emptyStateProperties } = useEmptyStatePropertyBindings();

  const view = useEmptyStateExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
    showIcon: viewShowIcon,
    setShowIcon: viewSetShowIcon,
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
        <ToggleControl label="icon" checked={viewShowIcon} onChange={viewSetShowIcon} />
      </ExampleControls>
      <EmptyState {...emptyStateProperties}>
        <EmptyStateHeader>
          <Inline gap="2" align="center">
            {viewShowIcon && <Icon name="info" size="inherit" />}
            <Heading level={3} size="md">
              {viewChildren}
            </Heading>
          </Inline>
        </EmptyStateHeader>
        <EmptyStateBody>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </EmptyStateBody>
        <EmptyStateFooter>
          <Inline gap="2" justify="end">
            <Button variant="outline" onClick={viewCancel}>
              {viewCopy.cancel}
            </Button>
            <Button onClick={viewAction}>{viewCopy.addItem}</Button>
          </Inline>
        </EmptyStateFooter>
      </EmptyState>
    </Stack>
  );
}

function useEmptyStatePropertyBindings() {
  return useEmptyStateExampleProperties<Pick<ShowcaseEmptyStateProps<typeof EmptyState>, "title">>(
    "EmptyState",
  );
}
