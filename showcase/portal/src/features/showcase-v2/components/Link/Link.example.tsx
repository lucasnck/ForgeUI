"use client";
import type { ComponentProps as ShowcaseLinkProps } from "react";
import { useExampleProperties as useLinkExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Link, Text } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";

import { useLinkExample } from "./useLinkExample";

export function LinkExample() {
  const { properties: linkProperties } = useLinkPropertyBindings();

  const view = useLinkExample();
  const { children: viewChildren, setChildren: viewSetChildren, targetId: viewTargetId } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="children" value={viewChildren} onChange={viewSetChildren} />
      </ExampleControls>
      <Link href={`#${viewTargetId}`} {...linkProperties}>
        {linkProperties.children === undefined ? (
          <> {viewChildren} </>
        ) : (
          <>{linkProperties.children}</>
        )}
      </Link>
      <Text as="p" id={viewTargetId} tabIndex={-1}>
        Children
      </Text>
    </Stack>
  );
}

function useLinkPropertyBindings() {
  return useLinkExampleProperties<Pick<ShowcaseLinkProps<typeof Link>, "children" | "title">>(
    "Link",
  );
}
