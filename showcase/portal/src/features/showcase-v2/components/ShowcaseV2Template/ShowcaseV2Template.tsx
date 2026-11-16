"use client";
import type { ReactNode } from "react";
import { Stack, Container, Inline, Heading, Text, Select, Option, Label } from "@forge-ui/web";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { useShowcaseV2Template } from "./useShowcaseV2Template";
import { ExampleScope } from "../ExampleScope/ExampleScope";
import { ExamplePreview } from "../ExamplePreview/ExamplePreview";
import { ScenarioControls } from "../ExampleState/ScenarioControls";
import type { PropertySchema } from "../ExampleScope/example-store";
interface Props {
  name: string;
  description: string;
  examples: readonly ShowcaseV2Example[];
  properties: readonly ShowcaseV2Property[];
  schema: PropertySchema;
  links?: ReactNode;
  children: ReactNode;
}

export function ShowcaseV2Template(props: Props) {
  const { active, id, copy, select } = useShowcaseV2Template(props.examples);

  return (
    <Container padding="0">
      <Stack as="article" gap="6" padding="4">
        <Stack as="header" gap="2">
          <Heading level={2} size="xl">
            {props.name}
          </Heading>
          <Text as="p">{props.description}</Text>
          {props.links}
          {props.examples.length > 1 && (
            <Inline gap="2" align="end">
              <Stack gap="1">
                <Label htmlFor={id}>{copy.scenario}</Label>
                <Select id={id} value={active} onChange={select}>
                  {props.examples.map((example) => (
                    <Option key={example.id} value={example.id}>
                      {example.title}
                    </Option>
                  ))}
                </Select>
              </Stack>
            </Inline>
          )}
        </Stack>
        {props.examples.map((example) => (
          <div key={example.id} hidden={example.id !== active}>
            <ExampleScope name={props.name} schema={props.schema} properties={props.properties}>
              <Stack gap="6">
                <ExamplePreview example={example} />
                <ScenarioControls />
                {props.children}
              </Stack>
            </ExampleScope>
          </div>
        ))}
      </Stack>
    </Container>
  );
}
