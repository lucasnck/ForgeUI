"use client";
import type { ComponentProps as ShowcaseCollapseFooterProps } from "react";
import { useExampleProperties as useCollapseFooterExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Collapse,
  CollapseHeader,
  CollapseBody,
  CollapseFooter,
  Inline,
  Button,
  Surface,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";

import { useCollapseFooterExample } from "./useCollapseFooterExample";

export function CollapseFooterExample() {
  const { properties: collapseFooterProperties } = useCollapseFooterPropertyBindings();

  const {
    open,
    animated,
    setAnimated,
    change,
    calls,
    requested,
    copy,
    saved,
    cancelled,
    save,
    cancel,
  } = useCollapseFooterExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Collapse open={open} onOpenChange={change} animated={animated}>
          <CollapseHeader hidden>Children</CollapseHeader>
          <CollapseBody hidden />
          <CollapseFooter {...collapseFooterProperties}>
            <Inline gap="2" padding="4" justify="end">
              <Button variant="outline" onClick={cancel}>
                {copy.cancel}
              </Button>
              <Button onClick={save}>{copy.save}</Button>
            </Inline>
          </CollapseFooter>
        </Collapse>
      </Surface>
      <ResourceState value={{ open, calls, requested, saved, cancelled }} />
    </Stack>
  );
}

function useCollapseFooterPropertyBindings() {
  return useCollapseFooterExampleProperties<
    Pick<ShowcaseCollapseFooterProps<typeof CollapseFooter>, "title">
  >("CollapseFooter");
}
