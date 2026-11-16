"use client";
import type { ComponentProps as ShowcaseEmptyStateFooterProps } from "react";
import { useExampleProperties as useEmptyStateFooterExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Inline,
  Text,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
} from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";

import { useEmptyStateFooterExample } from "./useEmptyStateFooterExample";

export function EmptyStateFooterExample() {
  const { properties: emptyStateFooterProperties } = useEmptyStateFooterPropertyBindings();

  const view = useEmptyStateFooterExample();
  const {
    children: viewChildren,
    setChildren: viewSetChildren,
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
      </ExampleControls>
      <EmptyState>
        <EmptyStateBody>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </EmptyStateBody>
        <EmptyStateFooter {...emptyStateFooterProperties}>
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

function useEmptyStateFooterPropertyBindings() {
  return useEmptyStateFooterExampleProperties<
    Pick<ShowcaseEmptyStateFooterProps<typeof EmptyStateFooter>, "title">
  >("EmptyStateFooter");
}
