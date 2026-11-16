"use client";
import type { ComponentProps as ShowcaseAccordionBodyProps } from "react";
import { useExampleProperties as useAccordionBodyExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Text,
  Surface,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";

import { useAccordionBodyExample } from "./useAccordionBodyExample";

export function AccordionBodyExample() {
  const { properties: accordionBodyProperties } = useAccordionBodyPropertyBindings();

  const { value, animated, setAnimated, level, change, calls, items, children, setChildren } =
    useAccordionBodyExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <TextControl label="children" value={children} onChange={setChildren} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Accordion level={level} value={value} onValueChange={change} animated={animated}>
          {items.slice(0, 1).map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionHeader hidden>{item.children}</AccordionHeader>
              <AccordionBody {...accordionBodyProperties}>
                <Surface elevation="flat" padding="4">
                  <Text>
                    {children} {item.index}
                  </Text>
                </Surface>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </Surface>
      <ResourceState value={{ value, calls }} />
    </Stack>
  );
}

function useAccordionBodyPropertyBindings() {
  return useAccordionBodyExampleProperties<
    Pick<ShowcaseAccordionBodyProps<typeof AccordionBody>, "title">
  >("AccordionBody");
}
