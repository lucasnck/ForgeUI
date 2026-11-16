"use client";
import type { ComponentProps as ShowcaseBreadcrumbItemProps } from "react";
import { useExampleProperties as useBreadcrumbItemExampleProperties } from "../ExampleScope/useExampleScope";
import { Breadcrumb, BreadcrumbItem, Stack, Text } from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useBreadcrumbItemExample } from "./useBreadcrumbItemExample";

export function BreadcrumbItemExample() {
  const { properties: breadcrumbItemProperties } = useBreadcrumbItemPropertyBindings();

  const { compact, setCompact, label, setLabel, items, clicked, calls } =
    useBreadcrumbItemExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="label" value={label} onChange={setLabel} />
        <ToggleControl label="compact" checked={compact} onChange={setCompact} />
      </ExampleControls>
      <Breadcrumb label={label.trim() || "Label"}>
        {items.map((item) => (
          <BreadcrumbItem
            key={item.id}
            current={item.id === "item-3"}
            href={item.href}
            onClick={item.onClick}
            {...breadcrumbItemProperties}
          >
            {breadcrumbItemProperties.children === undefined ? (
              <>{item.children}</>
            ) : (
              <>
                {breadcrumbItemProperties.children} {item.id.slice(-1)}
              </>
            )}
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

function useBreadcrumbItemPropertyBindings() {
  return useBreadcrumbItemExampleProperties<
    Pick<
      ShowcaseBreadcrumbItemProps<typeof BreadcrumbItem>,
      "current" | "href" | "title" | "children"
    >
  >("BreadcrumbItem");
}
