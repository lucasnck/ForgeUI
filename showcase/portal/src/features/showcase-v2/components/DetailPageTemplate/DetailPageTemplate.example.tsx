"use client";
import { Stack } from "@forge-ui/web";
import { TemplateDemoProvider } from "../TemplateDemo/TemplateDemoProvider";
import { TemplateDemoDetails, DemoSimulation } from "../TemplateDemo/TemplateDemoPages";
import { useDetailPageTemplateExample } from "./useDetailPageTemplateExample";

function Example() {
  const demo = useDetailPageTemplateExample();

  return (
    <Stack gap="2">
      <DemoSimulation onReset={demo.reset} />
      <TemplateDemoDetails id="item-1" />
    </Stack>
  );
}

export function DetailPageTemplateExample() {
  return (
    <TemplateDemoProvider>
      <Example />
    </TemplateDemoProvider>
  );
}
