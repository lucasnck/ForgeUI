"use client";
import { useExamplePropertySnapshot as useSurfaceExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseSurfaceProps } from "react";
import { useExampleProperties as useSurfaceExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, Heading, Text, Surface } from "@forge-ui/web";
import { ExampleControls, SelectControl, EventFeedback } from "../ExampleControls";

import { useSurfaceExample } from "./useSurfaceExample";

export function SurfaceExample() {
  const { properties: surfaceProperties } = useSurfacePropertyBindings();

  const view = useSurfaceExample();
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
  useSurfacePropertySnapshot({
    gap: viewGapValue,
    padding: viewPaddingValue,
    elevation: viewVariant as import("@forge-ui/web").ComponentElevation,
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
          label="elevation"
          value={viewVariant}
          options={["raised", "floating"]}
          onChange={viewSetVariant}
        />
      </ExampleControls>
      <Surface
        gap={viewGapValue}
        padding={viewPaddingValue}
        elevation={viewVariant as import("@forge-ui/web").ComponentElevation}
        {...surfaceProperties}
      >
        <Heading level={3}>Children</Heading>
        <Text>Children</Text>
        <Inline justify="end" gap="2">
          <Button variant="outline" onClick={viewCancel}>
            {viewCopy.cancel}
          </Button>
          <Button onClick={viewSave}>{viewCopy.save}</Button>
        </Inline>
      </Surface>
      <EventFeedback>
        onSave: {viewSaveCount} · onCancel: {viewCancelCount}
      </EventFeedback>
    </Stack>
  );
}

function useSurfacePropertyBindings() {
  return useSurfaceExampleProperties<
    Pick<
      ShowcaseSurfaceProps<typeof Surface>,
      "gap" | "padding" | "align" | "shape" | "elevation" | "title"
    >
  >("Surface");
}

function useSurfacePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useSurfaceExamplePropertySnapshot("Surface", values);
}
