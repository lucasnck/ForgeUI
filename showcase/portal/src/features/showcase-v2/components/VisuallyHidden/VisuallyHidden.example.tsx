"use client";
import type { ComponentProps as ShowcaseVisuallyHiddenProps } from "react";
import { useExampleProperties as useVisuallyHiddenExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Button, Icon, VisuallyHidden } from "@forge-ui/web";
import { ExampleControls, ToggleControl, EventFeedback } from "../ExampleControls";

import { useVisuallyHiddenExample } from "./useVisuallyHiddenExample";

export function VisuallyHiddenExample() {
  const { properties: visuallyHiddenProperties } = useVisuallyHiddenPropertyBindings();

  const view = useVisuallyHiddenExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    click: viewClick,
    count: viewCount,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <div>
        <Button disabled={viewDisabled} onClick={viewClick}>
          <Icon name="search" size="inherit" />
          <VisuallyHidden {...visuallyHiddenProperties}>
            {visuallyHiddenProperties.children === undefined ? (
              <> Children </>
            ) : (
              <>{visuallyHiddenProperties.children}</>
            )}
          </VisuallyHidden>
        </Button>
      </div>
      <EventFeedback>onClick: {viewCount}</EventFeedback>
    </Stack>
  );
}

function useVisuallyHiddenPropertyBindings() {
  return useVisuallyHiddenExampleProperties<
    Pick<ShowcaseVisuallyHiddenProps<typeof VisuallyHidden>, "children" | "title">
  >("VisuallyHidden");
}
