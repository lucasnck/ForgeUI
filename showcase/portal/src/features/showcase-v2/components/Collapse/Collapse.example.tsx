"use client";
import { useExamplePropertySnapshot as useCollapseExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseCollapseProps } from "react";
import { useExampleProperties as useCollapseExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Collapse,
  CollapseHeader,
  CollapseBody,
  Icon,
  Text,
  CollapseFooter,
  Inline,
  Button,
  Surface,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useCollapseExample } from "./useCollapseExample";

export function CollapseExample() {
  const { properties: collapseProperties, bindChange: bindCollapsePropertyChange } =
    useCollapsePropertyBindings();

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
    copy,
    saved,
    cancelled,
    save,
    cancel,
  } = useCollapseExample();
  useCollapsePropertySnapshot({
    open: open,
    animated: animated,
    disabled: disabled,
  });
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
        <Collapse
          open={open}
          onOpenChange={bindCollapsePropertyChange("open", change)}
          animated={animated}
          disabled={disabled}
          {...collapseProperties}
        >
          <CollapseHeader>
            <Inline as="span" gap="2" align="center" wrap={false}>
              {icon && <Icon name="info" size="inherit" />}
              <Text as="span">{children}</Text>
            </Inline>
          </CollapseHeader>
          <CollapseBody>
            <Surface elevation="flat" padding="4">
              <Text>{children}</Text>
            </Surface>
          </CollapseBody>
          <CollapseFooter>
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

function useCollapsePropertyBindings() {
  return useCollapseExampleProperties<
    Pick<ShowcaseCollapseProps<typeof Collapse>, "open" | "disabled" | "animated" | "title">
  >("Collapse");
}

function useCollapsePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useCollapseExamplePropertySnapshot("Collapse", values);
}
