export const basicCode = `import {
  DataGrid,
  DataGridHeader,
  DataGridBody,
  DataGridFooter,
} from "@forge-ui/web";

<DataGrid
  label="Label"
  rows={rows}
  columns={columns}
  getRowKey={(row) => row.id}
  sort={sort}
  onSortChange={onSortChange}
>
  <DataGridHeader />
  <DataGridBody />
  <DataGridFooter>Children</DataGridFooter>
</DataGrid>;
`;

export const filteredCode = `import {
  DataGrid,
  DataGridHeader,
  DataGridBody,
  SearchInput,
  Pagination,
  PaginationItem,
} from "@forge-ui/web";

<>
  <SearchInput
    aria-label="Search"
    clearLabel="Clear"
    placeholder="Placeholder"
    value={query}
    onChange={onQueryChange}
  />
  <DataGrid
    label="Label"
    rows={rows}
    columns={columns}
    getRowKey={(row) => row.id}
    emptyContent="No results"
  >
    <DataGridHeader />
    <DataGridBody />
  </DataGrid>
  <Pagination
    label="Page"
    page={page}
    pageCount={pageCount}
    onPageChange={onPageChange}
  >
    {Array.from({ length: pageCount }, (_, index) => (
      <PaginationItem
        key={index + 1}
        page={index + 1}
        label={"Page " + (index + 1)}
      />
    ))}
  </Pagination>
</>;
`;
