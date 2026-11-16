"use client";
import type { ComponentProps as ShowcaseCardHeaderProps } from "react";
import { useExampleProperties as useCardHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import { Card, CardHeader, CardBody, Heading, Icon, Divider, Inline, Stack } from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { useCardHeaderExample } from "./useCardHeaderExample";

export function CardHeaderExample() {
  const { properties: cardHeaderProperties } = useCardHeaderPropertyBindings();

  const view = useCardHeaderExample();

  return (
    <>
      <ExampleControls>
        <TextControl label="children" value={view.children} onChange={view.setChildren} />
        <ToggleControl label="Icon" checked={view.icon} onChange={view.setIcon} />
        <ToggleControl label="Divider" checked={view.divider} onChange={view.setDivider} />
      </ExampleControls>
      <Card>
        <CardHeader {...cardHeaderProperties}>
          <Stack gap="2">
            <Inline gap="2" align="center" wrap={false}>
              {view.icon && <Icon name="info" size="inherit" />}
              <Heading level={4}>{view.children}</Heading>
            </Inline>
            {view.divider && <Divider />}
          </Stack>
        </CardHeader>
        <CardBody hidden />
      </Card>
    </>
  );
}

function useCardHeaderPropertyBindings() {
  return useCardHeaderExampleProperties<Pick<ShowcaseCardHeaderProps<typeof CardHeader>, "title">>(
    "CardHeader",
  );
}
