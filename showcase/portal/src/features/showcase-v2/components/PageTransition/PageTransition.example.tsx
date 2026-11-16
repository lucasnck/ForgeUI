"use client";
import {
  PageTransition,
  SharedElement,
  Stack,
  Inline,
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePageTransitionExample } from "./usePageTransitionExample";

export function PageTransitionExample() {
  const view = usePageTransitionExample();

  return (
    <Stack gap="4">
      <Inline gap="2" align="center">
        {(["forward", "back", "replace", "reveal"] as const).map((intent) => (
          <Button
            key={intent}
            type="button"
            appearance="outlined"
            onClick={() => view.change(intent)}
          >
            {intent}
          </Button>
        ))}
      </Inline>
      <PageTransition
        key={view.detail ? "detail" : "list"}
        animated={view.properties.animated ?? true}
        title={view.properties.title ?? "Title"}
      >
        <Card>
          <CardHeader>
            <Heading level={3}>
              <SharedElement name={view.name} animated={view.properties.animated ?? true}>
                Title 1
              </SharedElement>
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>{view.detail ? "Description 1" : "Title 1"}</Text>
          </CardBody>
        </Card>
      </PageTransition>
      <ExampleState value={view.state} />
    </Stack>
  );
}
