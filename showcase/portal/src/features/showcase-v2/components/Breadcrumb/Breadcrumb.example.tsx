"use client";
import { useExamplePropertySnapshot as useBreadcrumbExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseBreadcrumbProps } from "react";
import { useExampleProperties as useBreadcrumbExampleProperties } from "../ExampleScope/useExampleScope";
import { Breadcrumb, BreadcrumbItem, Stack, Text } from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useBreadcrumbExample } from "./useBreadcrumbExample";

export function BreadcrumbExample() {
  const { properties: breadcrumbProperties } = useBreadcrumbPropertyBindings();

  const { compact, setCompact, label, setLabel, items, clicked, calls } = useBreadcrumbExample();
  useBreadcrumbPropertySnapshot({ label: label.trim() || "Label" });
  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="label" value={label} onChange={setLabel} />
        <ToggleControl label="compact" checked={compact} onChange={setCompact} />
      </ExampleControls>
      <Breadcrumb label={label.trim() || "Label"} {...breadcrumbProperties}>
        {items.map((item) => (
          <BreadcrumbItem
            key={item.id}
            current={item.id === "item-3"}
            href={item.href}
            onClick={item.onClick}
          >
            {item.children}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Stack gap="2">
        {items.map((item) => (
          <Text as="p" key={item.id} id={item.href.slice(1)}>
            {item.children}
          </Text>
        ))}
      </Stack>
      <ResourceState value={{ clicked, calls }} />
    </Stack>
  );
}

function useBreadcrumbPropertyBindings() {
  return useBreadcrumbExampleProperties<
    Pick<ShowcaseBreadcrumbProps<typeof Breadcrumb>, "label" | "title">
  >("Breadcrumb");
}

function useBreadcrumbPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useBreadcrumbExamplePropertySnapshot("Breadcrumb", values);
}
