export const accordionItems = [1, 2, 3].map((index) => ({
  id: `item-${index}`,
  index,
  children: `Children ${index}`,
}));
