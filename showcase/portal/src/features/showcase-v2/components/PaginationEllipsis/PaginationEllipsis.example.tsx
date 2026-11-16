"use client";
import type { ComponentProps as ShowcasePaginationEllipsisProps } from "react";
import { useExampleProperties as usePaginationEllipsisExampleProperties } from "../ExampleScope/useExampleScope";
import { Fragment } from "react";
import { Stack, Pagination, PaginationItem, PaginationEllipsis } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { usePaginationEllipsisExample } from "./usePaginationEllipsisExample";

export function PaginationEllipsisExample() {
  const { properties: paginationEllipsisProperties } = usePaginationEllipsisPropertyBindings();

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
  } = usePaginationEllipsisExample();

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
        onPageChange={change}
        disabled={disabled}
      >
        {items.map((item) => (
          <Fragment key={item.id}>
            {item.gapBefore && <PaginationEllipsis {...paginationEllipsisProperties} />}
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

function usePaginationEllipsisPropertyBindings() {
  return usePaginationEllipsisExampleProperties<
    Pick<ShowcasePaginationEllipsisProps<typeof PaginationEllipsis>, "title">
  >("PaginationEllipsis");
}
