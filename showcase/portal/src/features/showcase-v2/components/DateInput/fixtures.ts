import { MASK_DATE_DMY, MASK_DATE_YMD, formatters, validators } from "@forge-ui/web";
export const mask = MASK_DATE_DMY;
export const initialValue = "29022024";

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
  return (["pt-BR", "es", "en"] as const).flatMap((locale) =>
    ["2024-02-29", "2023-02-29"].map((input) =>
      result(
        locale + input,
        input + " · " + locale,
        () => formatters.dateOnly(input, locale),
        validators.dateOnly(input),
      ),
    ),
  );
}

export const presetValues: Readonly<Record<string, string>> = {
  [MASK_DATE_DMY]: "29022024",
  [MASK_DATE_YMD]: "20240229",
};
