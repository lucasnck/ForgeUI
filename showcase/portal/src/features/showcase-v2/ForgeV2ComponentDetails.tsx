"use client";

import { useState } from "react";
import { Badge, Button, Checkbox, Divider, Heading, Input, Label, Radio, Spinner, Switch, Text, Textarea, VisuallyHidden, Select, Stack, Inline, Surface } from "@forge-ui/web";
import type { ComponentSize, ComponentTone } from "@forge-ui/web";

type ComponentKey =
  | "Button" | "Badge" | "Input" | "Checkbox" | "Text" | "Spinner"
  | "Textarea" | "Switch" | "Radio" | "Label" | "Divider" | "Heading" | "VisuallyHidden";
type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type TextTone = "default" | "muted" | "brand" | "danger" | "success" | "inverse";
type Example = {
  key: ComponentKey;
  description: string;
  contract: string;
  props: string[];
  states: string[];
};

const examples: Example[] = [
  { key: "Button", description: "Ação nativa com tons, estados, tamanhos e variantes.", contract: "HTML button com props nativas e estado de loading.", props: ["size", "tone", "variant", "loading", "disabled", "fullWidth"], states: ["hover", "focus", "disabled", "loading"] },
  { key: "Badge", description: "Rótulo compacto para status e metadados.", contract: "HTML span não interativo, conforme contexto semântico.", props: ["size", "tone", "appearance", "shape"], states: ["default", "tone"] },
  { key: "Input", description: "Campo de entrada de texto com validação visual.", contract: "HTML input com eventos e atributos nativos.", props: ["size", "tone", "appearance", "invalid", "disabled"], states: ["focus", "invalid", "disabled"] },
  { key: "Checkbox", description: "Controle nativo para escolhas booleanas.", contract: "HTML input type=checkbox com valor controlado e nome acessível.", props: ["size", "tone", "checked", "disabled", "invalid"], states: ["checked", "unchecked", "disabled"] },
  { key: "Text", description: "Tipografia semântica e reutilizável.", contract: "Renderiza span, p, small ou strong, com tom tipográfico.", props: ["as", "size", "tone", "weight"], states: ["default", "muted", "brand"] },
  { key: "Spinner", description: "Indicador de progresso indeterminado.", contract: "Definir label/role=status quando não decorativo.", props: ["size", "tone", "animated", "decorative", "label"], states: ["animated", "static"] },
  { key: "Textarea", description: "Campo multilinha com aparência e feedback de validação.", contract: "HTML textarea com atributos nativos, placeholder, invalid e largura total.", props: ["size", "tone", "appearance", "invalid", "disabled", "fullWidth"], states: ["focus", "invalid", "disabled"] },
  { key: "Switch", description: "Alternância binária com estilo de chave.", contract: "HTML input type=checkbox com role=switch, checked e rótulo acessível.", props: ["size", "tone", "checked", "disabled", "invalid"], states: ["on", "off", "disabled"] },
  { key: "Radio", description: "Seleção única dentro de um grupo de opções.", contract: "HTML input type=radio; cada opção deve compartilhar name e ter rótulo.", props: ["size", "tone", "name", "checked", "disabled", "invalid"], states: ["checked", "unchecked", "disabled"] },
  { key: "Label", description: "Rótulo associado a um controle de formulário.", contract: "HTML label com htmlFor obrigatório e indicador visual required.", props: ["htmlFor", "required", "size", "tone", "weight"], states: ["optional", "required"] },
  { key: "Divider", description: "Separador visual entre regiões de conteúdo.", contract: "HTML hr sem interação, com estilos semânticos de borda.", props: ["className", "aria-hidden"], states: ["default"] },
  { key: "Heading", description: "Hierarquia de títulos baseada em níveis semânticos.", contract: "Renderiza h1 a h6 pelo level, preservando tokens de tipografia.", props: ["level", "size", "tone", "weight"], states: ["levels 1–6"] },
  { key: "VisuallyHidden", description: "Texto acessível sem ocupar espaço visual.", contract: "HTML span visualmente oculto para manter o nome acessível.", props: ["children", "className"], states: ["screen-reader"] },
];

const catalogLater = ["Select", "Tabs", "Accordion", "Tooltip", "Dialog", "DataGrid", "Form", "Tree", "ODataFilter", "Showcase V2 — demais exemplos"];
const nativeControlKeys: ComponentKey[] = ["Button", "Input", "Checkbox", "Textarea", "Switch", "Radio"];
const invalidKeys: ComponentKey[] = ["Input", "Checkbox", "Textarea", "Switch", "Radio"];
const textKeys: ComponentKey[] = ["Text", "Heading", "Label"];
const toTextTone = (tone: ComponentTone): TextTone =>
  (["brand", "danger", "success", "inverse"].includes(tone) ? tone : "default") as TextTone;

function sourceFor(key: ComponentKey, size: ComponentSize, tone: ComponentTone, disabled: boolean, variant: ButtonVariant, level: number) {
  const common = `size="${size}" tone="${tone}"`;
  const disabledProp = disabled ? " disabled" : "";
  switch (key) {
    case "Button": return `<Button ${common} variant="${variant}"${disabledProp}>Salvar alterações</Button>`;
    case "Badge": return `<Badge ${common} appearance="soft">Em andamento</Badge>`;
    case "Input": return `<Input ${common}${disabledProp} placeholder="Digite um valor" aria-label="Exemplo de input" />`;
    case "Checkbox": return `<Checkbox ${common}${disabledProp} aria-label="Receber notificações" />`;
    case "Text": return `<Text as="p" size="${size}" tone="${toTextTone(tone)}">Texto do Forge UI</Text>`;
    case "Spinner": return `<Spinner ${common} decorative={false} label="Carregando" />`;
    case "Textarea": return `<Textarea ${common}${disabledProp} aria-label="Descrição" placeholder="Escreva a descrição" />`;
    case "Switch": return `<Switch ${common}${disabledProp} aria-label="Notificações" />`;
    case "Radio": return `<Radio ${common}${disabledProp} name="plano" value="pro" aria-label="Plano Pro" />`;
    case "Label": return `<><Label htmlFor="project-name" required>Nome do projeto</Label><Input id="project-name" /></>`;
    case "Divider": return `<Divider aria-hidden="true" />`;
    case "Heading": return `<Heading level={${level}} tone="${toTextTone(tone)}">Título do projeto</Heading>`;
    case "VisuallyHidden": return `<Button><span aria-hidden="true">⌕</span><VisuallyHidden>Buscar</VisuallyHidden></Button>`;
  }
}

interface PreviewProps {
  selected: ComponentKey;
  size: ComponentSize;
  tone: ComponentTone;
  disabled: boolean;
  variant: ButtonVariant;
  loading: boolean;
  invalid: boolean;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
}

function Preview({ selected, size, tone, disabled, variant, loading, invalid, headingLevel }: PreviewProps) {
  const [checked, setChecked] = useState(true);
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [radioSelection, setRadioSelection] = useState("pro");
  switch (selected) {
    case "Button": return <div className="sample-layout">
      <Button size={size} tone={tone} disabled={disabled} variant={variant} loading={loading} loadingLabel="Carregando...">Salvar alterações</Button>
      <Button size={size} tone="neutral" variant="outline" disabled={disabled}>Cancelar</Button>
    </div>;
    case "Badge": return <div className="sample-layout"><Badge size={size} tone={tone} appearance="soft">Em andamento</Badge><Badge size={size} tone="success" appearance="solid">Concluído</Badge><Badge size={size} tone="danger" appearance="outlined">Erro</Badge></div>;
    case "Input": return <div className="sample-input"><Label htmlFor="forge-input-preview">Nome do projeto</Label><Input id="forge-input-preview" size={size} tone={tone} invalid={invalid} disabled={disabled} placeholder="Ex.: Meu design system" /><small>{invalid ? "Verifique o valor informado." : "Use um nome descritivo."}</small></div>;
    case "Checkbox": return <div className="sample-layout sample-checkable"><Checkbox size={size} tone={tone} disabled={disabled} invalid={invalid} checked={checked} onChange={(e) => setChecked(e.target.checked)} aria-label="Receber notificações"/><span>Receber notificações</span></div>;
    case "Text": return <div className="sample-copy"><Text as="p" tone={toTextTone(tone)} size={size} weight="semibold">Componentes para interfaces consistentes.</Text><Text as="p" size="sm" tone="muted">Tipografia, semântica e tokens.</Text></div>;
    case "Spinner": return <div className="sample-layout"><Spinner size={size} tone={tone} decorative={false} label="Carregando exemplo"/><span>Aguarde um instante</span></div>;
    case "Textarea": return <div className="sample-input"><Label htmlFor="forge-textarea-preview">Descrição</Label><Textarea id="forge-textarea-preview" size={size} tone={tone} disabled={disabled} invalid={invalid} rows={4} placeholder="Descreva o projeto..." /><small>{invalid ? "Descrição inválida." : "Campo multilinha nativo."}</small></div>;
    case "Switch": return <div className="sample-layout sample-checkable"><Switch size={size} tone={tone} checked={switchEnabled} disabled={disabled} invalid={invalid} onChange={(e) => setSwitchEnabled(e.target.checked)} aria-label="Ativar notificações"/><span>Notificações {switchEnabled ? "ativadas" : "desativadas"}</span></div>;
    case "Radio": return <div role="group" aria-label="Escolha um plano" className="sample-layout sample-checkable">{["free", "pro"].map((choice) => <label className="sample-layout" key={choice}><Radio size={size} tone={tone} disabled={disabled} invalid={invalid} name="forge-plan-preview" value={choice} checked={radioSelection === choice} onChange={() => setRadioSelection(choice)} aria-label={`Plano ${choice}`}/><span>{choice === "free" ? "Gratuito" : "Pro"}</span></label>)}</div>;
    case "Label": return <div className="sample-input"><Label htmlFor="forge-label-preview" required size={size} tone={toTextTone(tone)}>Nome do projeto</Label><Input id="forge-label-preview" placeholder="Digite o nome" /></div>;
    case "Divider": return <div className="sample-divider"><Text as="p">Primeira seção</Text><Divider aria-hidden="true"/><Text as="p" tone="muted">Segunda seção</Text></div>;
    case "Heading": return <div className="sample-copy"><Heading level={headingLevel} tone={toTextTone(tone)}>Título do projeto</Heading><Text as="p" size="sm" tone="muted">Nível semântico h{headingLevel}</Text></div>;
    case "VisuallyHidden": return <div className="sample-layout"><Button size={size} tone={tone} aria-describedby="forge-hidden-explanation"><span aria-hidden="true">⌕</span><VisuallyHidden>Buscar no catálogo</VisuallyHidden></Button><Text as="span" size="sm" tone="muted" id="forge-hidden-explanation">O botão tem um nome acessível oculto visualmente.</Text></div>;
  }
}


import { showcaseEntries } from "./catalog";

/** The preview logic came from the previous 13 real @forge-ui/web demos.
 * The outer shell and routing now follow the original Showcase V2 layout.
 */
export function ForgeV2ComponentDetails({ slug }: { slug: string }) {
  const active = examples.find((item) => showcaseEntries.some((entry) => entry.slug === slug && entry.name === item.key));
  const [size, setSize] = useState<ComponentSize>("md");
  const [tone, setTone] = useState<ComponentTone>("brand");
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [headingLevel, setHeadingLevel] = useState<1|2|3|4|5|6>(2);
  const [copied, setCopied] = useState(false);
  if (!active) return <Stack padding="4" gap="2"><Heading level={2}>Componente indisponível</Heading><Text as="p">Este componente ainda não foi migrado para o Forge UI.</Text></Stack>;
  const selected = active.key;
  const imports = selected === "Label" ? "Label, Input" : selected === "VisuallyHidden" ? "Button, VisuallyHidden" : selected;
  const snippet = `import { ${imports} } from "@forge-ui/web";\n\n${sourceFor(selected, size, tone, disabled, variant, headingLevel)}`;
  async function copySnippet() { try { await navigator.clipboard.writeText(snippet); setCopied(true); } catch { setCopied(false); } }
  return <Stack padding="4" gap="4" as="article">
    <header><Text as="p" tone="muted" size="sm">CATÁLOGO / COMPONENTES / ÁTOMOS</Text><Heading level={2}>{selected}</Heading><Text as="p">{active.description}</Text></header>
    <Surface padding="4" elevation="raised" shape="rounded">
      <Stack gap="3"><Heading level={3}>Exemplo dinâmico</Heading><Preview key={selected} selected={selected} size={size} tone={tone} disabled={disabled} variant={variant} loading={loading} invalid={invalid} headingLevel={headingLevel}/></Stack>
    </Surface>
    <Surface padding="4" elevation="raised" shape="rounded">
      <Stack gap="3"><Heading level={3}>Propriedades</Heading>
        {selected !== "Divider" && selected !== "VisuallyHidden" && <Inline gap="2" align="center"><Label htmlFor="demo-size">Tamanho</Label><Select id="demo-size" fullWidth={false} value={size} onChange={(e) => setSize(e.target.value as ComponentSize)}>{["xs","sm","md","lg","xl"].map((x)=><option key={x}>{x}</option>)}</Select></Inline>}
        {selected !== "Divider" && selected !== "VisuallyHidden" && <Inline gap="2" align="center"><Label htmlFor="demo-tone">Tom</Label><Select id="demo-tone" fullWidth={false} value={tone} onChange={(e) => setTone(e.target.value as ComponentTone)}>{["brand","neutral","success","danger","warning","info"].map((x)=><option key={x}>{x}</option>)}</Select></Inline>}
        {selected === "Button" && <Inline gap="2" align="center"><Label htmlFor="demo-variant">Variante</Label><Select id="demo-variant" fullWidth={false} value={variant} onChange={(e) => setVariant(e.target.value as ButtonVariant)}>{["solid","soft","ghost","outline"].map((x)=><option key={x}>{x}</option>)}</Select></Inline>}
        {selected === "Heading" && <Inline gap="2" align="center"><Label htmlFor="demo-heading">Nível</Label><Select id="demo-heading" fullWidth={false} value={headingLevel} onChange={(e) => setHeadingLevel(Number(e.target.value) as 1|2|3|4|5|6)}>{[1,2,3,4,5,6].map((x)=><option key={x} value={x}>h{x}</option>)}</Select></Inline>}
        {nativeControlKeys.includes(selected) && <Inline gap="2" align="center"><Checkbox id="demo-disabled" checked={disabled} onChange={(e)=>setDisabled(e.target.checked)}/><Label htmlFor="demo-disabled">Desabilitado</Label></Inline>}
        {selected === "Button" && <Inline gap="2" align="center"><Checkbox id="demo-loading" checked={loading} onChange={(e)=>setLoading(e.target.checked)}/><Label htmlFor="demo-loading">Carregando</Label></Inline>}
        {invalidKeys.includes(selected) && <Inline gap="2" align="center"><Checkbox id="demo-invalid" checked={invalid} onChange={(e)=>setInvalid(e.target.checked)}/><Label htmlFor="demo-invalid">Inválido</Label></Inline>}
        <Text as="p" size="sm" tone="muted">{active.props.join(" • ")}</Text>
      </Stack>
    </Surface>
    <Surface padding="4" elevation="raised" shape="rounded"><Stack gap="2"><Inline gap="2" justify="between" align="center"><Heading level={3}>Código de uso</Heading><Button size="sm" variant="outline" onClick={copySnippet}>{copied ? "Copiado" : "Copiar"}</Button></Inline><pre style={{overflowX:"auto",whiteSpace:"pre-wrap"}}><code>{snippet}</code></pre></Stack></Surface>
    <Surface padding="4" elevation="raised" shape="rounded"><Stack gap="2"><Heading level={3}>Métodos e recursos</Heading><Text as="p" tone="muted">{active.contract}</Text><Text as="p" size="sm" tone="muted">Estados: {active.states.join(", ")}.</Text></Stack></Surface>
  </Stack>;
}
