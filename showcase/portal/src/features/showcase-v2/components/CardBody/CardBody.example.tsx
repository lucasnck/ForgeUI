"use client";
import type { ComponentProps as ShowcaseCardBodyProps } from "react";
import { useExampleProperties as useCardBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Card, CardBody, Text } from "@forge-ui/web";
import { ExampleControls, TextControl } from "../ExampleControls";
import { useCardBodyExample } from "./useCardBodyExample";

export function CardBodyExample() {
  const { properties: cardBodyProperties } = useCardBodyPropertyBindings();

  const view = useCardBodyExample();

  return (
    <>
      <ExampleControls>
        <TextControl label="children" value={view.children} onChange={view.setChildren} />
      </ExampleControls>
      <Card>
        <CardBody {...cardBodyProperties}>
          <Text>{view.children}</Text>
        </CardBody>
      </Card>
    </>
  );
}

function useCardBodyPropertyBindings() {
  return useCardBodyExampleProperties<Pick<ShowcaseCardBodyProps<typeof CardBody>, "title">>(
    "CardBody",
  );
}
