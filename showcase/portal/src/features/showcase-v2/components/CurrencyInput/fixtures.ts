import { formatters, validators, type CurrencyInputProps } from "@forge-ui/web";
export const initialValue = "1234.56";

function result(id: string, input: string, format: () => string, valid: boolean) {
  let output: string;

  try {
    output = format();
  } catch (error) {
    output = error instanceof Error ? error.message : String(error);
  }

  return { id, input, output, valid };
}

export function helperRows(
  currency: CurrencyInputProps["currency"],
  locale: CurrencyInputProps["locale"],
) {
  return ["1234.56", "0", "-1.00", "9007199254740993.01", "1.234"].map((input, index) =>
    result(
      "fixture-" + index,
      input,
      () => formatters.money(input, { currency, locale }),
      validators.money(input, { currency, locale }),
    ),
  );
}
