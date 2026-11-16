"use client";
import { useId } from "react";
import { Stack, Heading } from "@forge-ui/web";
import type { ShowcaseV2ResourceDefinition } from "../../model/showcase-v2-resource.types";
import type { ShowcaseV2Property } from "../../model/showcase-v2.types";
import { ShowcaseV2Template } from "../ShowcaseV2Template/ShowcaseV2Template";
import { PropertyGrid } from "../PropertyGrid/PropertyGrid";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function ResourceRenderer({ definition }: { definition: ShowcaseV2ResourceDefinition }) {
  const properties: ShowcaseV2Property[] = definition.contracts.flatMap((group) =>
    group.entries.map((entry) => ({
      ...entry,
      required: false,
      defaultValue: null,
      source: group.title,
    })),
  );

  return (
    <ShowcaseV2Template
      name={definition.name}
      description={definition.description}
      examples={definition.examples}
      properties={properties}
      schema={{}}
    >
      <ResourceContract definition={definition} />
    </ShowcaseV2Template>
  );
}

function ResourceContract({ definition }: { definition: ShowcaseV2ResourceDefinition }) {
  const { copy } = useShowcaseV2Copy();
  const id = useId();

  return (
    <Stack as="section" id={`${id}-resource-contract`} gap="2" aria-label={copy.contract}>
      <Heading level={3} size="lg">
        {copy.contract}
      </Heading>
      {definition.contracts.map((group) => (
        <Stack key={group.title} gap="2">
          <Heading level={4} size="md">
            {group.title}
          </Heading>
          <PropertyGrid
            properties={group.entries.map((entry) => ({
              ...entry,
              required: false,
              defaultValue: null,
              source: group.title,
            }))}
          />
        </Stack>
      ))}
    </Stack>
  );
}
