import { formatters, validators, type InternationalTelephoneInputProps } from "@forge-ui/web";
export const initialValue: InternationalTelephoneInputProps["value"] = {
  number: "+5511912345678",
  country: "BR",
};
export const countries: NonNullable<InternationalTelephoneInputProps["countries"]> = [
  "BR",
  "US",
  "PT",
];

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
  return [true, false]
    .map((international) =>
      result(
        "br-" + international,
        "+5511912345678 · BR · " + international,
        () => formatters.phone("+5511912345678", { international }),
        validators.phone("+5511912345678", "BR"),
      ),
    )
    .concat([
      result(
        "us",
        "+12025550123 · US",
        () => formatters.phone("+12025550123"),
        validators.phone("+12025550123", "US"),
      ),
      result("invalid", "+55", () => formatters.phone("+55"), validators.phone("+55", "BR")),
    ]);
}
