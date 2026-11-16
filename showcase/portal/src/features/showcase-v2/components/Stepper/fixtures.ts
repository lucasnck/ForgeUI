import { listItems } from "../List/fixtures";
export const steps = listItems.slice(0, 3).map((item) => ({
  ...item,
  label: "Label " + item.index,
  title: "Title " + item.index,
}));
