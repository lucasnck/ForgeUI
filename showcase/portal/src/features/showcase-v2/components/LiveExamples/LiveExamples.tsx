"use client";
import { useState } from "react";
import { Badge, Button, Checkbox, Divider, Heading, Input, Label, Radio, Spinner, Switch, Text, Textarea, VisuallyHidden, Icon, Card, CardHeader, CardBody, CardFooter, DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";
import type { ComponentSize, ComponentTone, DataGridSort, DataGridColumn } from "@forge-ui/web";
import "./legacy-samples.css";
export type ComponentKey =
  | "Button" | "Badge" | "Input" | "Checkbox" | "Text" | "Spinner"
  | "Textarea" | "Switch" | "Radio" | "Label" | "Divider" | "Heading" | "VisuallyHidden"
  | "Icon" | "Card" | "DataGrid";

type ButtonVariant = "solid" | "soft" | "ghost" | "outline";
type TextTone = "default" | "muted" | "brand" | "danger" | "success" | "inverse";
export type Example = {
  key: ComponentKey;
  description: string;
  contract: string;
  props: string[];
  states: string[];
};

export const examples: Example[] = [
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
  { key: "Icon", description: "Ícones SVG do catálogo original, com nome acessível opcional.", contract: "Ícone SVG com paths do DS, aria-hidden por padrão e label quando informativo.", props: ["name", "size", "label"], states: ["decorative", "informative"] },
  { key: "Card", description: "Composição pública de cabeçalho, corpo e rodapé.", contract: "Card exige CardBody; oferece CardHeader/CardFooter e props de elevação.", props: ["fullWidth", "elevation", "shape"], states: ["raised", "floating"] },
  { key: "DataGrid", description: "Tabela de dados real com cabeçalhos, células, ordenação e estado vazio.", contract: "DataGrid exige colunas com chaves únicas e getRowKey estável; compõe Header/Body/Row/Cell.", props: ["label", "rows", "columns", "sort", "onSortChange", "emptyContent"], states: ["populated", "sorted", "empty"] },
];

const catalogLater = ["Select", "Tabs", "Accordion", "Tooltip", "Dialog", "Form", "Tree", "ODataFilter", "Showcase V2 — demais exemplos"];
const nativeControlKeys: ComponentKey[] = ["Button", "Input", "Checkbox", "Textarea", "Switch", "Radio"];
const invalidKeys: ComponentKey[] = ["Input", "Checkbox", "Textarea", "Switch", "Radio"];
const textKeys: ComponentKey[] = ["Text", "Heading", "Label"];
const toTextTone = (tone: ComponentTone): TextTone =>
  (["brand", "danger", "success", "inverse"].includes(tone) ? tone : "default") as TextTone;

export function sourceFor(key: ComponentKey, size: ComponentSize, tone: ComponentTone, disabled: boolean, variant: ButtonVariant, level: number) {
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
    case "Icon": return `<Icon name="check" label="Concluído" size="md" />`;
    case "Card": return `<Card><CardHeader><Heading level={3}>Projeto</Heading></CardHeader><CardBody>Conteúdo do cartão</CardBody><CardFooter>Atualizado hoje</CardFooter></Card>`;
    case "DataGrid": return `const rows = [{ id: "1", name: "Forge UI" }];\nconst columns = [{ key: "name", header: "Projeto", rowHeader: true, renderCell: (row) => row.name }];\n\n<DataGrid label="Projetos" rows={rows} columns={columns} getRowKey={row => row.id}>\n  <DataGridHeader/>\n  <DataGridBody/>\n</DataGrid>`;
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
  emptyGrid?: boolean;
}

export function Preview({ selected, size, tone, disabled, variant, loading, invalid, headingLevel, emptyGrid = false }: PreviewProps) {
  const [checked, setChecked] = useState(true);
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [radioSelection, setRadioSelection] = useState("pro");
  const [sort, setSort] = useState<DataGridSort>({ columnKey: "name", direction: "ascending" });
  const rows = [ { id:"1", name:"Design System", status:"Ativo" }, { id:"2", name:"Portal", status:"Em andamento" }, { id:"3", name:"Biblioteca", status:"Ativo" } ];
  const columns:readonly DataGridColumn<(typeof rows)[number]>[] = [
    { key:"name", header:"Projeto", sortable:true, sortLabel:"Ordenar por projeto", rowHeader:true, renderCell:row=>row.name },
    { key:"status", header:"Situação", renderCell:row=><Badge tone={row.status === "Ativo" ? "success" : "info"} size="sm">{row.status}</Badge> },
  ];
  const sortedRows = [...rows].sort((a,b)=>sort.direction === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
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
    case "Icon": return <div className="sample-layout" aria-label="Ícones do Forge UI"><Icon name="check" label="Concluído" size={size}/><Icon name="alert-triangle" label="Atenção" size={size}/><Icon name="arrow-right" size={size}/></div>;
    case "Card": return <Card fullWidth><CardHeader><Heading level={3} size="md">Projeto Forge UI</Heading></CardHeader><CardBody><Text as="p">Composição criada com os componentes reais do Design System.</Text></CardBody><CardFooter><Text size="sm" tone="muted">Atualizado hoje</Text></CardFooter></Card>;
    case "DataGrid": return <DataGrid label="Projetos" rows={emptyGrid ? [] : sortedRows} columns={columns} getRowKey={row=>row.id} sort={sort} onSortChange={setSort} emptyContent="Nenhum projeto encontrado" fullWidth size="sm"><DataGridHeader/><DataGridBody/></DataGrid>;
    case "VisuallyHidden": return <div className="sample-layout"><Button size={size} tone={tone} aria-describedby="forge-hidden-explanation"><span aria-hidden="true">⌕</span><VisuallyHidden>Buscar no catálogo</VisuallyHidden></Button><Text as="span" size="sm" tone="muted" id="forge-hidden-explanation">O botão tem um nome acessível oculto visualmente.</Text></div>;
  }
}

