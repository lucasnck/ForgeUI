"use client";
import { useExamplePropertySnapshot as useContainerExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseContainerProps } from "react";
import { useExampleProperties as useContainerExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, Heading, Text, Container } from "@forge-ui/web";
import { ExampleControls, SelectControl, EventFeedback } from "../ExampleControls";

import { useContainerExample } from "./useContainerExample";

export function ContainerExample() {
  const { properties: containerProperties } = useContainerPropertyBindings();

  const view = useContainerExample();
  const {
    gap: viewGap,
    setGap: viewSetGap,
    padding: viewPadding,
    setPadding: viewSetPadding,
    variant: viewVariant,
    setVariant: viewSetVariant,
    gapValue: viewGapValue,
    paddingValue: viewPaddingValue,
    cancel: viewCancel,
    copy: viewCopy,
    save: viewSave,
    saveCount: viewSaveCount,
    cancelCount: viewCancelCount,
  } = view;
  useContainerPropertySnapshot({
    gap: viewGapValue,
    padding: viewPaddingValue,
    size: viewVariant as import("@forge-ui/web").ComponentContainerSize,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="gap"
          value={viewGap}
          options={["1", "2", "4", "8"]}
          onChange={viewSetGap}
        />
        <SelectControl
          label="padding"
          value={viewPadding}
          options={["0", "2", "4"]}
          onChange={viewSetPadding}
        />
        <SelectControl
          label="size"
          value={viewVariant}
          options={["narrow", "wide"]}
          onChange={viewSetVariant}
        />
      </ExampleControls>
      <Container
        gap={viewGapValue}
        padding={viewPaddingValue}
        size={viewVariant as import("@forge-ui/web").ComponentContainerSize}
        {...containerProperties}
      >
        <Heading level={3}>Children</Heading>
        <Text>Children</Text>
        <Inline justify="end" gap="2">
          <Button variant="outline" onClick={viewCancel}>
            {viewCopy.cancel}
          </Button>
          <Button onClick={viewSave}>{viewCopy.save}</Button>
        </Inline>
      </Container>
      <EventFeedback>
        onSave: {viewSaveCount} · onCancel: {viewCancelCount}
      </EventFeedback>
    </Stack>
  );
}

function useContainerPropertyBindings() {
  return useContainerExampleProperties<
    Pick<ShowcaseContainerProps<typeof Container>, "gap" | "padding" | "size" | "title">
  >("Container");
}

function useContainerPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useContainerExamplePropertySnapshot("Container", values);
}
