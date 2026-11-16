import { formatters, validators } from "@forge-ui/web";
export const mask = "000.000.000-00";
export const initialValue = "52998224725";

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
  return ["52998224725", "52998224724"]
    .map((input, index) =>
      result("cpf-" + index, input, () => formatters.cpf(input), validators.cpf(input)),
    )
    .concat(
      ["11222333000181", "12ABC34501DE35", "12ABC34501DE36"].map((input, index) =>
        result("cnpj-" + index, input, () => formatters.cnpj(input), validators.cnpj(input)),
      ),
    );
}

export const presetValues: Readonly<Record<string, string>> = {
  "000.000.000-00": "52998224725",
  "00.000.000/0000-00": "11222333000181",
  "SS.SSS.SSS/SSSS-00": "12ABC34501DE35",
};
