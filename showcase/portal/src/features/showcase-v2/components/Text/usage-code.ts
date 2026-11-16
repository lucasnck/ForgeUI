export const basicCode =
  'import { Text } from "@forge-ui/web";\n\n<Text as="p" size="lg" weight="regular">\n  Children\n</Text>;';

export const durationCode = `import { Stack, Text, formatters, validators } from "@forge-ui/web";

<Stack gap="2">
  <Text as="p">0 s · pt-BR: {formatters.durationClock(0)} · {formatters.duration(0, "pt-BR")}</Text>
  <Text as="p">5400 s · pt-BR: {formatters.durationClock(5400)} · {formatters.duration(5400, "pt-BR")}</Text>
  <Text as="p">0 s · en: {formatters.durationClock(0)} · {formatters.duration(0, "en")}</Text>
  <Text as="p">5400 s · en: {formatters.durationClock(5400)} · {formatters.duration(5400, "en")}</Text>
  <Text as="p">validators.duration: 0={String(validators.duration(0))} · -1={String(validators.duration(-1))} · 1.5={String(validators.duration(1.5))}</Text>
</Stack>;`;

export const relativeTimeCode = `import { Stack, Text, formatters, validators } from "@forge-ui/web";

<Stack gap="2">
  <Text as="p">-3600000 ms · {formatters.relativeTime(1792278000000, 1792281600000, "en")} · {String(validators.relativeTime(1792278000000, 1792281600000))}</Text>
  <Text as="p">0 ms · {formatters.relativeTime(1792281600000, 1792281600000, "en")} · {String(validators.relativeTime(1792281600000, 1792281600000))}</Text>
  <Text as="p">60000 ms · {formatters.relativeTime(1792281660000, 1792281600000, "en")} · {String(validators.relativeTime(1792281660000, 1792281600000))}</Text>
</Stack>;`;

export const formattingNamespaceCode = `import { Stack, Text, formatters, validators } from "@forge-ui/web";

<Stack gap="2">
  <Text as="p">number: {formatters.number(1234.5, "en")} · {String(validators.number(1234.5))}</Text>
  <Text as="p">percent: {formatters.percent(0.25, "en")} · {String(validators.percent(0.25))}</Text>
  <Text as="p">date: {formatters.date(1792281600000, "en", { timeZone: "UTC" })} · {String(validators.date(1792281600000))}</Text>
  <Text as="p">money: {formatters.money("1234.56", { locale: "en", currency: "BRL" })} · {String(validators.money("1234.56", { locale: "en", currency: "BRL" }))}</Text>
  <Text as="p">cpf: {formatters.cpf("52998224725")} · {String(validators.cpf("52998224725"))}</Text>
  <Text as="p">cnpj: {formatters.cnpj("04252011000110")} · {String(validators.cnpj("04252011000110"))}</Text>
  <Text as="p">phone: {formatters.phone("+5511912345678")} · {String(validators.phone("+5511912345678"))}</Text>
  <Text as="p">cep: {formatters.cep("01234567")} · {String(validators.cep("01234567"))}</Text>
  <Text as="p">dateOnly: {formatters.dateOnly("2024-02-29", "en")} · {String(validators.dateOnly("2024-02-29"))}</Text>
  <Text as="p">duration: {formatters.duration(5400, "en")} · {String(validators.duration(5400))}</Text>
  <Text as="p">durationClock: {formatters.durationClock(5400)} · {String(validators.duration(5400))}</Text>
  <Text as="p">fileSize: {formatters.fileSize(1536, "en", { binary: true })} · {String(validators.fileSize(1536))}</Text>
  <Text as="p">relativeTime: {formatters.relativeTime(1792281660000, 1792281600000, "en")} · {String(validators.relativeTime(1792281660000, 1792281600000))}</Text>
</Stack>;`;
