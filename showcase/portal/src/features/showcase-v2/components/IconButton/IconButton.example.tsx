"use client";
import { useExamplePropertySnapshot as useIconButtonExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseIconButtonProps } from "react";
import { useExampleProperties as useIconButtonExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, IconButton } from "@forge-ui/web";
import { ExampleControls, ToggleControl, EventFeedback } from "../ExampleControls";

import { useIconButtonExample } from "./useIconButtonExample";

export function IconButtonExample() {
  const { properties: iconButtonProperties } = useIconButtonPropertyBindings();

  const view = useIconButtonExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    loading: viewLoading,
    setLoading: viewSetLoading,
    click: viewClick,
    count: viewCount,
  } = view;
  useIconButtonPropertySnapshot({
    icon: "search",
    label: "Label",
    disabled: viewDisabled,
    loading: viewLoading,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
        <ToggleControl label="loading" checked={viewLoading} onChange={viewSetLoading} />
      </ExampleControls>
      <div>
        <IconButton
          icon="search"
          label="Label"
          disabled={viewDisabled}
          loading={viewLoading}
          onClick={viewClick}
          {...iconButtonProperties}
        />
      </div>
      <EventFeedback>onClick: {viewCount}</EventFeedback>
    </Stack>
  );
}

function useIconButtonPropertyBindings() {
  return useIconButtonExampleProperties<
    Pick<
      ShowcaseIconButtonProps<typeof IconButton>,
      | "label"
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "loading"
      | "loadingLabel"
      | "variant"
      | "icon"
      | "title"
      | "disabled"
    >
  >("IconButton");
}

function useIconButtonPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useIconButtonExamplePropertySnapshot("IconButton", values);
}
