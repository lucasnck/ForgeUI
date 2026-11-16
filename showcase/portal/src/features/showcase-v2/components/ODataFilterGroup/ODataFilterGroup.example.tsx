"use client";
import { ODataFilterCondition, ODataFilterGroup, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useODataFilterGroupExample } from "./useODataFilterGroupExample";

function ODataFilterGroupScenario({ advanced = false }: { advanced?: boolean }) {
  const view = useODataFilterGroupExample(advanced);

  return (
    <Stack gap="4">
      <ODataFilterGroup
        label="Label"
        {...view.properties}
        value={view.conjunction}
        onValueChange={view.changeConjunction}
        onAddCondition={view.addCondition}
        labels={view.labels}
      >
        {view.conditions.map((condition) => (
          <ODataFilterCondition
            key={condition.id}
            fields={view.fields}
            labels={view.labels}
            value={condition}
            onValueChange={view.updateCondition(condition.id)}
            onRemove={view.removeCondition(condition.id)}
            disabled={view.properties.disabled}
          />
        ))}
      </ODataFilterGroup>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function ODataFilterGroupExample() {
  return <ODataFilterGroupScenario />;
}
