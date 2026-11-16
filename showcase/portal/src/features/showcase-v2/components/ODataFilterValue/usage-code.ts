export const basicCode =
  'import { ODataFilterValue } from "@forge-ui/web";\n<ODataFilterValue\n  field={filterFields[0]}\n  label="Label"\n  operator="contains"\n  value={filterScalar}\n  onValueChange={onFilterScalarChange}\n  labels={filterLabels}\n/>;\n';
export const exactCode =
  'import { ODataFilterValue, Stack } from "@forge-ui/web";\n<Stack gap="4">\n  <ODataFilterValue field={filterFields[0]} label="Label 1" operator="eq" value={filterScalar} onValueChange={onFilterScalarChange} labels={filterLabels} />\n  <ODataFilterValue field={filterFields[1]} label="Label 2" operator="between" value={filterScalar} onValueChange={onFilterScalarChange} labels={filterLabels} />\n</Stack>;\n';
