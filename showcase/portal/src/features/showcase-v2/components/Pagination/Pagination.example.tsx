"use client";
import { useExamplePropertySnapshot as usePaginationExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcasePaginationProps } from "react";
import { useExampleProperties as usePaginationExampleProperties } from "../ExampleScope/useExampleScope";
import { Fragment } from "react";
import { Stack, Pagination, PaginationItem, PaginationEllipsis } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { usePaginationExample } from "./usePaginationExample";

export function PaginationExample() {
  const { properties: paginationProperties, bindChange: bindPaginationPropertyChange } =
    usePaginationPropertyBindings();

  const {
    page,
    disabled,
    setDisabled,
    animated,
    setAnimated,
    reject,
    setReject,
    calls,
    requested,
    change,
    items,
  } = usePaginationExample();
  usePaginationPropertySnapshot({
    label: "Label",
    page: page,
    pageCount: 12,
    disabled: disabled,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={disabled} onChange={setDisabled} />
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <ToggleControl label="reject onPageChange" checked={reject} onChange={setReject} />
      </ExampleControls>
      <Pagination
        label="Label"
        page={page}
        pageCount={12}
        onPageChange={bindPaginationPropertyChange("page", change)}
        disabled={disabled}
        {...paginationProperties}
      >
        {items.map((item) => (
          <Fragment key={item.id}>
            {item.gapBefore && <PaginationEllipsis />}
            <PaginationItem page={item.page} label={item.label} animated={animated}>
              {item.children}
            </PaginationItem>
          </Fragment>
        ))}
      </Pagination>
      <ResourceState value={{ page, requested, calls }} />
    </Stack>
  );
}

function usePaginationPropertyBindings() {
  return usePaginationExampleProperties<
    Pick<
      ShowcasePaginationProps<typeof Pagination>,
      "disabled" | "label" | "page" | "pageCount" | "title"
    >
  >("Pagination");
}

function usePaginationPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  usePaginationExamplePropertySnapshot("Pagination", values);
}
