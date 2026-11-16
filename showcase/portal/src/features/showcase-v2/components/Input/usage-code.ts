export const basicCode =
  'import { Stack, Label, FieldHint, Input } from "@forge-ui/web";\n\n<Stack gap="1">\n  <Label htmlFor="field">Label</Label>\n  <Input\n    id="field"\n    aria-describedby="field-hint"\n    name="value"\n    placeholder="Placeholder"\n    value={value}\n    onChange={onChange}\n    fullWidth\n  />\n<FieldHint id="field-hint">Hint</FieldHint>\n</Stack>;';
