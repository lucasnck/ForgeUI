"use client";
import type { ComponentProps as ShowcaseAccordionHeaderProps } from "react";
import { useExampleProperties as useAccordionHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Icon,
  Surface,
  Inline,
  Text,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, TextControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useAccordionHeaderExample } from "./useAccordionHeaderExample";

export function AccordionHeaderExample() {
  const { properties: accordionHeaderProperties } = useAccordionHeaderPropertyBindings();

  const {
    value,
    animated,
    setAnimated,
    level,
    change,
    calls,
    items,
    icon,
    setIcon,
    children,
    setChildren,
  } = useAccordionHeaderExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <ToggleControl label="icon" checked={icon} onChange={setIcon} />
        <TextControl label="children" value={children} onChange={setChildren} />
      </ExampleControls>
      <Surface padding="2" shape="rounded">
        <Accordion level={level} value={value} onValueChange={change} animated={animated}>
          {items.slice(0, 1).map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionHeader {...accordionHeaderProperties}>
                <Inline as="span" gap="2" align="center" wrap={false}>
                  {icon && <Icon name="info" size="inherit" />}
                  <Text as="span">
                    {children} {item.index}
                  </Text>
                </Inline>
              </AccordionHeader>
              <AccordionBody hidden />
            </AccordionItem>
          ))}
        </Accordion>
      </Surface>
      <ResourceState value={{ value, calls }} />
    </Stack>
  );
}

function useAccordionHeaderPropertyBindings() {
  return useAccordionHeaderExampleProperties<
    Pick<ShowcaseAccordionHeaderProps<typeof AccordionHeader>, "title" | "disabled">
  >("AccordionHeader");
}
