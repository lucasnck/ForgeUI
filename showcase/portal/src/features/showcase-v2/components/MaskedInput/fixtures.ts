import { MASK_TOKEN_6, applyMask, unmask, isMaskComplete } from "@forge-ui/web";
export const mask = MASK_TOKEN_6;
export const initialValue = "123456";

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
  return ["123456", "123", "12 34 56"].map((input, index) => {
    const canonical = unmask(input, MASK_TOKEN_6);

    return {
      ...result(
        "fixture-" + index,
        input,
        () => applyMask(canonical, MASK_TOKEN_6),
        isMaskComplete(canonical, MASK_TOKEN_6),
      ),
      canonical,
    };
  });
}
