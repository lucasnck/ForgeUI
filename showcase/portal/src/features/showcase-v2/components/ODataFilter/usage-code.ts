export const basicCode =
  'import { ODataFilter } from "@forge-ui/web";\n<ODataFilter\n  mode="simple"\n  fields={filterFields}\n  labels={filterLabels}\n  value={filterExpression}\n  onValueChange={onFilterChange}\n  onApply={onFilterApply}\n/>;\n';
export const advancedCode =
  'import { ODataFilter } from "@forge-ui/web";\n<ODataFilter\n  mode="advanced"\n  fields={filterFields}\n  labels={filterLabels}\n  value={filterExpression}\n  onValueChange={onFilterChange}\n  onApply={onFilterApply}\n/>;\n';

export const sidebarCode =
  'import { ListPageTemplate, Card, CardHeader, CardBody, Heading, ODataFilter } from "@forge-ui/web";\n<ListPageTemplate titleId="records-title" pageTitle="PageTitle" filters={<aside aria-label="Filters"><Card><CardHeader><Heading level={3}>Filters</Heading></CardHeader><CardBody><ODataFilter mode="simple" fields={filterFields} labels={filterLabels} value={filterExpression} onValueChange={onFilterChange} onApply={onFilterApply} /></CardBody></Card></aside>}>\n  {children}\n</ListPageTemplate>;\n';
export const dropdownCode =
  'import { Popover, PopoverHeader, PopoverBody, Heading, IconButton, ODataFilter } from "@forge-ui/web";\n<Popover triggerLabel="Filters" label="Filters" open={open} onOpenChange={onOpenChange} trigger={<IconButton icon="filter" label="Filters" />}>\n  <PopoverHeader><Heading level={3}>Filters</Heading></PopoverHeader>\n  <PopoverBody><ODataFilter mode="simple" fields={filterFields} labels={filterLabels} value={filterExpression} onValueChange={onFilterChange} onApply={onFilterApply} onCancel={onCancel} /></PopoverBody>\n</Popover>;\n';
