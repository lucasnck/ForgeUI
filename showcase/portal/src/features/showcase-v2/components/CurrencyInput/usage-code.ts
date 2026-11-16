export const basicCode =
  'import { CurrencyInput, FormField } from "@forge-ui/web";\n\n<FormField controlId="currency-input" label="Label" hint="Hint">\n  <CurrencyInput\n    name="Name"\n    placeholder="Placeholder"\n    value={amount}\n    onValueChange={onAmountChange}\n    currency="BRL"\n    locale="pt-BR"\n    invalidMessage="InvalidMessage"\n  />\n</FormField>;\n';
