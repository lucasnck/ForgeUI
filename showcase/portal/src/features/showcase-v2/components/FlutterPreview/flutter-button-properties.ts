import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Property } from "../../model/showcase-v2.types";
export const flutterSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const flutterTones = [
  "neutral",
  "brand",
  "success",
  "warning",
  "danger",
  "info",
  "inverse",
  "sand",
  "violet",
  "forest",
  "sky",
] as const;
export const flutterAppearances = [
  "inherit",
  "solid",
  "soft",
  "outlined",
  "bordered",
  "ghost",
  "none",
] as const;
export const flutterShapes = ["inherit", "square", "rounded", "pill"] as const;
export const flutterVariants = [
  "inherit",
  "solid",
  "soft",
  "ghost",
  "outline",
] as const;
export interface FlutterButtonProperties {
  child: string;
  onPressed: boolean;
  disabled: boolean;
  loading: boolean;
  autofocus: boolean;
  outlined: boolean;
  loadingLabel: string;
  semanticLabel: string;
  tooltip: string;
  size: string;
  tone: string;
  appearance: string;
  shape: string;
  variant: string;
  fullWidth: boolean;
}
export const flutterButtonDefaults: FlutterButtonProperties = {
  child: "Salvar alterações",
  onPressed: true,
  disabled: false,
  loading: false,
  autofocus: false,
  outlined: false,
  loadingLabel: "",
  semanticLabel: "",
  tooltip: "",
  size: "md",
  tone: "brand",
  appearance: "inherit",
  shape: "inherit",
  variant: "inherit",
  fullWidth: false,
};
export const flutterButtonSchema: PropertySchema = {
  child: { kind: "text", defaultValue: flutterButtonDefaults.child },
  onPressed: { kind: "boolean", defaultValue: true },
  disabled: { kind: "boolean", defaultValue: false },
  autofocus: { kind: "boolean", defaultValue: false },
  loading: { kind: "boolean", defaultValue: false },
  outlined: { kind: "boolean", defaultValue: false },
  loadingLabel: { kind: "text", defaultValue: "" },
  semanticLabel: { kind: "text", defaultValue: "" },
  tooltip: { kind: "text", defaultValue: "" },
  size: { kind: "select", options: flutterSizes, defaultValue: "md" },
  tone: { kind: "select", options: flutterTones, defaultValue: "brand" },
  appearance: {
    kind: "select",
    options: flutterAppearances,
    defaultValue: "inherit",
  },
  shape: { kind: "select", options: flutterShapes, defaultValue: "inherit" },
  variant: {
    kind: "select",
    options: flutterVariants,
    defaultValue: "inherit",
  },
  fullWidth: { kind: "boolean", defaultValue: false },
};
const descriptions: Record<keyof FlutterButtonProperties, string> = {
  child: "Conteúdo do widget; este exemplo usa Text.",
  onPressed: "Ativa o callback de contagem. Null desabilita o botão.",
  autofocus: "Solicita foco nativo na entrada; não rouba foco em atualizações.",
  disabled: "Bloqueia explicitamente a ação, além de loading ou callback null.",
  loading:
    "Spinner decorativo, ação bloqueada e região semântica de atualização.",
  outlined:
    "Compatibilidade legada; appearance e variant explícitos têm precedência.",
  loadingLabel: "Substitui o conteúdo durante loading; vazio mantém child.",
  semanticLabel: "Nome acessível explícito, sem duplicar o texto do conteúdo.",
  tooltip: "Dica nativa; não substitui o nome acessível.",
  size: "Os mesmos cinco tamanhos da Web, usando tokens compartilhados.",
  tone: "Os mesmos onze tons da Web; prioridade é definida pelo consumidor.",
  appearance: "Seis aparências; inherit resolve variant e o alias legado.",
  shape: "Formato explícito ou herdado do tema.",
  variant: "Alias de aparência; outline corresponde a outlined.",
  fullWidth: "Preenche a largura disponível quando limitada pelo pai.",
};
export const flutterButtonProperties: readonly ShowcaseV2Property[] =
  Object.entries(flutterButtonDefaults)
    .map(([name, value]) => ({
      name,
      type:
        typeof value === "boolean"
          ? name === "onPressed"
            ? "VoidCallback?"
            : "bool"
          : name === "child"
            ? "Widget? (Text)"
            : ["loadingLabel", "semanticLabel", "tooltip"].includes(name)
              ? "String?"
              : "Forge enum",
      required: name === "onPressed",
      defaultValue: String(value),
      source: "ForgeButton",
      description: descriptions[name as keyof FlutterButtonProperties],
    }))
    .concat([
      {
        name: "focusNode",
        type: "FocusNode?",
        required: false,
        defaultValue: "fixture",
        source: "ForgeButton",
        description:
          "FocusNode emprestado pela fixture; mantém o contrato nativo de propriedade e descarte.",
      },
      {
        name: "onFocusChange",
        type: "ValueChanged<bool>?",
        required: false,
        defaultValue: "fixture",
        source: "ForgeButton",
        description:
          "A fixture exibe o estado de foco recebido pelo callback nativo.",
      },
    ]);
export const enumValue = (
  value: unknown,
  allowed: readonly string[],
  fallback: string,
): string =>
  typeof value === "string" && allowed.includes(value) ? value : fallback;
export const dartString = (value: string): string =>
  JSON.stringify(value).replaceAll("$", "\\$");
export function resolveFlutterButtonProperties(
  v: Readonly<Record<string, unknown>>,
): FlutterButtonProperties {
  return {
    child:
      typeof v.child === "string"
        ? v.child.slice(0, 200)
        : flutterButtonDefaults.child,
    onPressed: typeof v.onPressed === "boolean" ? v.onPressed : true,
    disabled: v.disabled === true,
    loading: v.loading === true,
    outlined: v.outlined === true,
    autofocus: v.autofocus === true,
    loadingLabel:
      typeof v.loadingLabel === "string" ? v.loadingLabel.slice(0, 200) : "",
    semanticLabel:
      typeof v.semanticLabel === "string" ? v.semanticLabel.slice(0, 200) : "",
    tooltip: typeof v.tooltip === "string" ? v.tooltip.slice(0, 200) : "",
    size: enumValue(v.size, flutterSizes, "md"),
    tone: enumValue(v.tone, flutterTones, "brand"),
    appearance: enumValue(v.appearance, flutterAppearances, "inherit"),
    shape: enumValue(v.shape, flutterShapes, "inherit"),
    variant: enumValue(v.variant, flutterVariants, "inherit"),
    fullWidth: v.fullWidth === true,
  };
}
export function flutterButtonCode(
  values: Readonly<Record<string, unknown>>,
): string {
  const p = resolveFlutterButtonProperties(values);
  const lines = [
    "import 'package:flutter/widgets.dart';",
    "import 'package:forge_ui/forge_ui.dart';",
    "",
    "ForgeButton(",
    "  onPressed: " + (p.onPressed ? "() {}" : "null") + ",",
    "  size: ForgeSize." + p.size + ",",
    "  tone: ForgeTone." + p.tone + ",",
    ...(p.appearance !== "inherit"
      ? ["  appearance: ForgeAppearance." + p.appearance + ","]
      : []),
    ...(p.variant !== "inherit"
      ? ["  variant: ForgeVariant." + p.variant + ","]
      : []),
    ...(p.shape !== "inherit" ? ["  shape: ForgeShape." + p.shape + ","] : []),
    "  fullWidth: " + p.fullWidth + ",",
    "  autofocus: " + p.autofocus + ",",
    "  disabled: " + p.disabled + ",",
    "  loading: " + p.loading + ",",
    ...(p.outlined
      ? ["  outlined: true, // Legacy alias; prefer appearance."]
      : []),
    ...(p.loadingLabel
      ? ["  loadingLabel: " + dartString(p.loadingLabel) + ","]
      : []),
    ...(p.semanticLabel
      ? ["  semanticLabel: " + dartString(p.semanticLabel) + ","]
      : []),
    ...(p.tooltip ? ["  tooltip: " + dartString(p.tooltip) + ","] : []),
    "  child: Text(" + dartString(p.child) + "),",
    ")",
  ];
  return lines.join("\n");
}
