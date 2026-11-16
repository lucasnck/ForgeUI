import { Badge, Container, Heading, Inline, Stack, Text } from "@forge-ui/web";
export function PendingPage({name,specification,category}:{name:string;specification:string;category:string}){
 return <Container size="wide" padding="4"><Stack gap="3"><Inline gap="2" align="center"><Heading level={2} size="xl">{name}</Heading><Badge appearance="soft" tone="warning">Pendente</Badge></Inline><Text as="p">{category} — catalogado no Showcase V2 original, ainda não migrado para a biblioteca Forge UI.</Text><Text as="p">Especificação original: <code>{specification}</code></Text><Text as="p" size="sm" tone="muted">Os exemplos serão habilitados somente quando consumirem o componente público de @forge-ui/web e passarem pelos testes.</Text></Stack></Container>;
}
