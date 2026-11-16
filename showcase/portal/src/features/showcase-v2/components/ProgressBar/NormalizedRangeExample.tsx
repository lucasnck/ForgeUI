"use client";
import { Stack, Text, ProgressBar } from "@forge-ui/web";
import { normalizeProgressRange, normalizeMeterRange } from "../../../../../../../web/library/src/design-system/helpers/range";

export function NormalizedRangeExample() {
  return (
    <Stack gap="2">
      {[undefined, 25, 120].map((value, index) => {
        const range = normalizeProgressRange(value, 100);

        return (
          <ProgressBar
            key={index}
            label={"Label " + (index + 1)}
            value={range.value}
            max={range.max}
          />
        );
      })}
      <Text as="p">
        Meter: {JSON.stringify(normalizeMeterRange({ value: 120, min: 0, max: 100 }))}
      </Text>
    </Stack>
  );
}
