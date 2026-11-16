import type { ChoiceOption, TreeNodeDescriptor, DataGridProps } from "@forge-ui/web";
export const resourceOptions: readonly ChoiceOption[] = Array.from({ length: 5 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `Label ${index + 1}`,
  disabled: index === 2,
}));
export const resourceNodes: readonly TreeNodeDescriptor[] = [
  {
    key: "item-1",
    label: "Label 1",
    children: [
      { key: "item-2", label: "Label 2" },
      { key: "item-3", label: "Label 3", disabled: true },
    ],
  },
  {
    key: "item-4",
    label: "Label 4",
    children: [{ key: "item-5", label: "Label 5" }],
  },
];
export interface ResourceRow {
  id: string;
  title: string;
  description: string;
}
export const resourceRows: readonly ResourceRow[] = Array.from({ length: 6 }, (_, index) => ({
  id: `item-${index + 1}`,
  title: `Title ${index + 1}`,
  description: `Description ${index + 1}`,
}));
export const resourceColumns: DataGridProps<ResourceRow>["columns"] = [
  {
    key: "title",
    header: "Header 1",
    sortable: true,
    sortLabel: "Label 1",
    rowHeader: true,
    renderCell: (row) => row.title,
  },
  {
    key: "description",
    header: "Header 2",
    renderCell: (row) => row.description,
  },
];

export function resourceRowKey(row: ResourceRow) {
  return row.id;
}
