"use client";
import type { ComponentProps as ShowcaseErrorStateBodyProps } from "react";
import { useExampleProperties as useErrorStateBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Text, ErrorState, ErrorStateBody } from "@forge-ui/web";
import { ExampleControls, SelectControl, TextControl } from "../ExampleControls";

import { useErrorStateBodyExample } from "./useErrorStateBodyExample";

export function ErrorStateBodyExample() {
  const { properties: errorStateBodyProperties } = useErrorStateBodyPropertyBindings();

  const view = useErrorStateBodyExample();
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
      <ErrorState announcement={viewAnnouncement}>
        <ErrorStateBody {...errorStateBodyProperties}>
          <Text>
            {viewChildren}
            {viewCount ? ` · ${viewLastAction} ${viewCount}` : ""}
          </Text>
        </ErrorStateBody>
      </ErrorState>
    </Stack>
  );
}

function useErrorStateBodyPropertyBindings() {
  return useErrorStateBodyExampleProperties<
    Pick<ShowcaseErrorStateBodyProps<typeof ErrorStateBody>, "title">
  >("ErrorStateBody");
}
