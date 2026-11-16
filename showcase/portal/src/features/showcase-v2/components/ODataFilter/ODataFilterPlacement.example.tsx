"use client";
import {
  ODataFilter,
  ListPageTemplate,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Popover,
  PopoverHeader,
  PopoverBody,
  IconButton,
  DataGrid,
  DataGridHeader,
  DataGridBody,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useODataFilterPlacementExample } from "./useODataFilterPlacementExample";

function ODataFilterPlacement({ dropdown = false }: { dropdown?: boolean }) {
  const view = useODataFilterPlacementExample();
  const filter = (
    <ODataFilter
      mode="simple"
      {...view.properties}
      fields={view.fields}
      labels={view.labels}
      value={view.expression}
      onValueChange={view.change}
      onApply={view.apply}
      onCancel={view.cancel}
    />
  );

  return (
    <Stack gap="4">
      <ListPageTemplate
        titleId={view.titleId}
        pageTitle="PageTitle"
        filters={
          dropdown ? undefined : (
            <aside aria-label="Filters">
              <Card>
                <CardHeader>
                  <Heading level={3}>Filters</Heading>
                </CardHeader>
                <CardBody>{filter}</CardBody>
              </Card>
            </aside>
          )
        }
      >
        {dropdown && (
          <Popover
            triggerLabel="Filters"
            label="Filters"
            trigger={<IconButton icon="filter" label="Filters" />}
            open={view.open}
            onOpenChange={view.changeOpen}
          >
            <PopoverHeader>
              <Heading level={3}>Filters</Heading>
            </PopoverHeader>
            <PopoverBody>{filter}</PopoverBody>
          </Popover>
        )}
        <DataGrid
          label="Results"
          rows={view.rows}
          columns={[
            { key: "title", header: "Title", renderCell: (row) => row.title },
            {
              key: "amount",
              header: "Amount",
              renderCell: (row) => row.amount,
            },
            {
              key: "active",
              header: "Active",
              renderCell: (row) => (row.active ? view.labels.yes : view.labels.no),
            },
          ]}
          getRowKey={(row) => row.id}
          emptyContent="No results"
        >
          <DataGridHeader />
          <DataGridBody />
        </DataGrid>
      </ListPageTemplate>
      <ExampleState value={view.state} />
    </Stack>
  );
}

export function ODataFilterSidebarExample() {
  return <ODataFilterPlacement />;
}

export function ODataFilterDropdownExample() {
  return <ODataFilterPlacement dropdown />;
}
