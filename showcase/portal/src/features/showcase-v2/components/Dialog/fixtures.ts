import { listItems } from "../List/fixtures";
const first = listItems[0];
export const initialRecord = Object.freeze({
  id: first.id,
  title: "Title " + first.index,
  description: "Description " + first.index,
});
