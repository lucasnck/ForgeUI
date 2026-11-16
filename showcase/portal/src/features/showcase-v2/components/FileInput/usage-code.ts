export const basicCode =
  'import { FormField, FileInput } from "@forge-ui/web";\n\n<FormField controlId="files" label="Label">\n  <FileInput\n    name="files"\n    accept="image/*"\n    onFilesChange={onFilesChange}\n    fullWidth\n  />\n</FormField>;';

export const fileSizeCode = `import { Stack, Text, formatters, validators } from "@forge-ui/web";

<Stack gap="2">
  <Text as="p">0 B · decimal: {formatters.fileSize(0, "en", { binary: false })} · {String(validators.fileSize(0))}</Text>
  <Text as="p">0 B · binary: {formatters.fileSize(0, "en", { binary: true })} · {String(validators.fileSize(0))}</Text>
  <Text as="p">1536 B · decimal: {formatters.fileSize(1536, "en", { binary: false })} · {String(validators.fileSize(1536))}</Text>
  <Text as="p">1536 B · binary: {formatters.fileSize(1536, "en", { binary: true })} · {String(validators.fileSize(1536))}</Text>
</Stack>;`;
