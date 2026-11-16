import { listItems } from "../List/fixtures";
export const destinations = listItems.slice(0, 4).map((item) => ({
  ...item,
  label: "Label " + item.index,
  title: "Title " + item.index,
}));
