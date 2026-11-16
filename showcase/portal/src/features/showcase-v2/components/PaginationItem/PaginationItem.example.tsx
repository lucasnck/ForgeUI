"use client";
import { useExamplePropertySnapshot as usePaginationItemExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcasePaginationItemProps } from "react";
import { useExampleProperties as usePaginationItemExampleProperties } from "../ExampleScope/useExampleScope";
import { Fragment } from "react";
import { Stack, Pagination, PaginationItem, PaginationEllipsis } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { usePaginationItemExample } from "./usePaginationItemExample";

export function PaginationItemExample() {
  const { properties: paginationItemProperties } = usePaginationItemPropertyBindings();

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
  } = usePaginationItemExample();
  usePaginationItemPropertySnapshot({ animated: animated });
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
            {item.gapBefore && <PaginationEllipsis />}
            <PaginationItem
              page={item.page}
              animated={animated}
              {...paginationItemProperties}
              label={
                paginationItemProperties.label === undefined
                  ? item.label
                  : `${paginationItemProperties.label} ${item.page}`
              }
            >
              {paginationItemProperties.children === undefined ? (
                <>{item.children}</>
              ) : (
                <>
                  {paginationItemProperties.children} {item.page}
                </>
              )}
            </PaginationItem>
          </Fragment>
        ))}
      </Pagination>
      <ResourceState value={{ page, requested, calls }} />
    </Stack>
  );
}

function usePaginationItemPropertyBindings() {
  return usePaginationItemExampleProperties<
    Pick<
      ShowcasePaginationItemProps<typeof PaginationItem>,
      "animated" | "label" | "title" | "children" | "disabled"
    >
  >("PaginationItem");
}

function usePaginationItemPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  usePaginationItemExamplePropertySnapshot("PaginationItem", values);
}
