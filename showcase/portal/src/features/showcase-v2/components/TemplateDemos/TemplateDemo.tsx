"use client";
import {
  ApplicationLayoutTemplate,
  ShowcasePageTemplate,
  Container,
  Stack,
  Inline,
  Heading,
  Text,
  Surface,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Toolbar,
  ToolbarItem,
  NavigationMenu,
  NavigationMenuBody,
  NavigationMenuItem,
  LocaleSelector,
  ThemeSelector,
} from "@forge-ui/web";
import type {
  ApplicationDemoScenario,
  ShowcaseDemoScenario,
} from "../../model/template-demo-scenarios";
import { ExampleState } from "../ExampleState/ExampleState";
import { useTemplateDemo } from "./useTemplateDemo";

export function TemplateDemo({
  template,
  scenario,
}: {
  template: "application" | "showcase";
  scenario: ApplicationDemoScenario | ShowcaseDemoScenario;
}) {
  const view = useTemplateDemo();
  const text = (key: string, fallback: string) => view.settings.get(key) ?? fallback;
  const nav = (
    <NavigationMenu label="Label">
      <NavigationMenuBody>
        {[1, 2].map((index) => (
          <NavigationMenuItem
            key={index}
            label={"Label " + index}
            href={"#" + view.id + "-item-" + index}
            current={view.selected === "item-" + index}
            onClick={view.activate("item-" + index)}
          />
        ))}
      </NavigationMenuBody>
    </NavigationMenu>
  );
  const toolbar = (
    <Toolbar label="Toolbar">
      {[1, 2, 3].map((index) => (
        <ToolbarItem key={index} itemKey={"action-" + index} onClick={view.action}>
          {"Children " + index}
        </ToolbarItem>
      ))}
    </Toolbar>
  );
  const breadcrumb = (
    <Breadcrumb label="Breadcrumb">
      <BreadcrumbItem href={"#" + view.id + "-item-1"} onClick={view.activate("item-1")}>
        Children 1
      </BreadcrumbItem>
      <BreadcrumbItem current>Children 2</BreadcrumbItem>
    </Breadcrumb>
  );
  const content = (
    <Container padding="4">
      <Stack gap="4">
        <Text>{text("children", "Children")}</Text>
        {(scenario === "shell" || scenario === "catalog") && (
          <>
            {[1, 2].map((index) => (
              <Surface key={index} id={view.id + "-item-" + index} padding="4" shape="rounded">
                <Stack gap="2">
                  <Heading level={2}>{"Title " + index}</Heading>
                  <Text>{"Description " + index}</Text>
                </Stack>
              </Surface>
            ))}
          </>
        )}
        <ExampleState value={{ actions: view.actions, selected: view.selected }} />
        <Inline gap="2" align="center" justify="end">
          <Button type="button" appearance="outlined" onClick={view.action}>
            Action
          </Button>
        </Inline>
      </Stack>
    </Container>
  );
  if (template === "showcase")
    return (
      <ShowcasePageTemplate
        title={text("title", "Title")}
        navigation={scenario === "catalog" ? nav : undefined}
        toolbar={
          <Inline gap="2" align="center">
            <LocaleSelector {...view.localeSelectorProps} />
            <ThemeSelector {...view.themeSelectorProps} />
            {toolbar}
          </Inline>
        }
      >
        {content}
      </ShowcasePageTemplate>
    );
  return (
    <Container padding="4">
      <ApplicationLayoutTemplate
        mainId={text("mainId", "main-content")}
        title={text("title", "Title")}
        header={
          scenario === "shell" ? (
            <Container padding="4">
              <Stack gap="2">
                <Heading level={1}>{text("header", "Header")}</Heading>
                {breadcrumb}
              </Stack>
            </Container>
          ) : scenario === "header" ? (
            <Container padding="4">
              <Heading level={1}>{text("children", "Children")}</Heading>
            </Container>
          ) : undefined
        }
        navigation={scenario === "shell" ? nav : undefined}
        toolbar={scenario === "shell" ? toolbar : undefined}
        footer={
          scenario === "shell" || scenario === "footer" ? (
            <Container padding="4">
              <Inline gap="2" align="center" justify="end">
                <Text>
                  {text(
                    scenario === "footer" ? "children" : "footer",
                    scenario === "footer" ? "Children" : "Footer",
                  )}
                </Text>
                <Button type="button" appearance="outlined" onClick={view.action}>
                  Action
                </Button>
              </Inline>
            </Container>
          ) : undefined
        }
      >
        {scenario === "header" || scenario === "footer" ? (
          <ExampleState value={{ actions: view.actions }} />
        ) : (
          content
        )}
      </ApplicationLayoutTemplate>
    </Container>
  );
}
