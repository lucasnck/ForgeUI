"use client";
import type { ComponentProps as ShowcaseCollapseHeaderProps } from "react";
import { useExampleProperties as useCollapseHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Collapse,
  CollapseHeader,
  CollapseBody,
  Icon,
  Surface,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useCollapseHeaderExample } from "./useCollapseHeaderExample";

export function CollapseHeaderExample() {
  const { properties: collapseHeaderProperties } = useCollapseHeaderPropertyBindings();

  const {
    open,
    animated,
    setAnimated,
    change,
    calls,
    requested,
    disabled,
    setDisabled,
    reject,
    setReject,
    children,
    setChildren,
    icon,
    setIcon,
  } = useCollapseHeaderExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <ToggleControl label="disabled" checked={disabled} onChange={setDisabled} />
        <ToggleControl label="reject onOpenChange" checked={reject} onChange={setReject} />
        <TextControl label="children" value={children} onChange={setChildren} />
        <ToggleControl label="icon" checked={icon} onChange={setIcon} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Collapse open={open} onOpenChange={change} animated={animated} disabled={disabled}>
          <CollapseHeader {...collapseHeaderProperties}>
            <Inline as="span" gap="2" align="center" wrap={false}>
              {icon && <Icon name="info" size="inherit" />}
              <Text as="span">{children}</Text>
            </Inline>
          </CollapseHeader>
          <CollapseBody hidden />
        </Collapse>
      </Surface>
      <ResourceState value={{ open, calls, requested }} />
    </Stack>
  );
}

function useCollapseHeaderPropertyBindings() {
  return useCollapseHeaderExampleProperties<
    Pick<ShowcaseCollapseHeaderProps<typeof CollapseHeader>, "title" | "disabled">
  >("CollapseHeader");
}
