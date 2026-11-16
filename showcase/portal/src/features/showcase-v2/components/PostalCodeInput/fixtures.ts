import { formatters, validators } from "@forge-ui/web";
export const mask = "00000-000";
export const initialValue = "01234567";

function result(id: string, input: string, format: () => string, valid: boolean) {
  let output: string;

  try {
    output = format();
  } catch (error) {
    output = error instanceof Error ? error.message : String(error);
  }

  return { id, input, output, valid };
}

export function helperRows() {
  return ["01234567", "01234-567", "123"].map((input, index) =>
    result("fixture-" + index, input, () => formatters.cep(input), validators.cep(input)),
  );
}
