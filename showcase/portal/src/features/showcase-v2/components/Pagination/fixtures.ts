export const paginationItems = Array.from({ length: 12 }, (_, index) => ({
  id: `page-${index + 1}`,
  page: index + 1,
  label: `Label ${index + 1}`,
  children: `Children ${index + 1}`,
}));
