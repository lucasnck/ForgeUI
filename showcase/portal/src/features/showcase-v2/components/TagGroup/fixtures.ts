export const items = [1, 2, 3].map((index) => ({
  id: `item-${index}`,
  index,
  label: `Label ${index}`,
  title: `Title ${index}`,
  children: `Children ${index}`,
  removeLabel: `RemoveLabel ${index}`,
}));
