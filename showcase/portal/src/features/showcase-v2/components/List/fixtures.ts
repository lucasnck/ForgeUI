export const listItems = Object.freeze(
  Array.from({ length: 6 }, (_, offset) => ({
    id: `item-${offset + 1}`,
    index: offset + 1,
    children: `Children ${offset + 1}`,
  })),
);
