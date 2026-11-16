export const basicCode =
  'import { ProgressBar } from "@forge-ui/web";\n\n<ProgressBar label="Label" value={40} max={100} fullWidth />;';

export const normalizedRangeCode = `import { Stack, Text, ProgressBar } from "@forge-ui/web";
import { normalizeProgressRange, normalizeMeterRange } from "../../../../../../../web/library/src/design-system/helpers/range";

<Stack gap="2">
  <ProgressBar label="Label 1" {...normalizeProgressRange(undefined, 100)} />
  <ProgressBar label="Label 2" {...normalizeProgressRange(25, 100)} />
  <ProgressBar label="Label 3" {...normalizeProgressRange(120, 100)} />
  <Text as="p">Meter: {JSON.stringify(normalizeMeterRange({ value: 120, min: 0, max: 100 }))}</Text>
</Stack>;`;
