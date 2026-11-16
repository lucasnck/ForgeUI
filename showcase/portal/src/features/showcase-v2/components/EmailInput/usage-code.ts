export const basicCode =
  'import { EmailInput, FormField } from "@forge-ui/web";\n\n<FormField controlId="email-input" label="Label" hint="Hint">\n  <EmailInput\n    name="Name"\n    placeholder="Placeholder"\n    value={value}\n    onValueChange={onValueChange}\n    providers={["example.com", "example.org", "example.net"]}\n    listboxLabel="ListboxLabel"\n  />\n</FormField>;\n';
