export interface ExampleRecord {
  id: string;
  index: number;
  title: string;
  description: string;
}
export const records: readonly ExampleRecord[] = Array.from({ length: 12 }, (_, index) => ({
  id: `item-${index + 1}`,
  index: index + 1,
  title: `Title ${index + 1}`,
  description: `Description ${index + 1}`,
}));

export function getRowKey(row: ExampleRecord) {
  return row.id;
}
