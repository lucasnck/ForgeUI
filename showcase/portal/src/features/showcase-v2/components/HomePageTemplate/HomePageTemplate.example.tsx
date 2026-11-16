"use client";
import { Stack } from "@forge-ui/web";
import { TemplateDemoProvider } from "../TemplateDemo/TemplateDemoProvider";
import { TemplateDemoHome, DemoSimulation } from "../TemplateDemo/TemplateDemoPages";
import { useHomePageTemplateExample } from "./useHomePageTemplateExample";

function Example() {
  const demo = useHomePageTemplateExample();

  return (
    <Stack gap="2">
      <DemoSimulation onReset={demo.reset} />
      <TemplateDemoHome />
    </Stack>
  );
}

export function HomePageTemplateExample() {
  return (
    <TemplateDemoProvider>
      <Example />
    </TemplateDemoProvider>
  );
}
