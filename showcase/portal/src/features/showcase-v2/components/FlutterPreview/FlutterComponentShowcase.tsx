"use client";
import type { ReactNode } from "react";
import { FlutterScenarioControls } from "./FlutterScenarioControls";
import { inputConfigurations } from "./flutter-input-configurations";
import { compositeConfigurations } from "./flutter-composite-configurations";
import { feedbackConfigurations } from "./flutter-feedback-configurations";
import { primitiveConfigurations } from "./flutter-primitive-configurations";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import type {
  ShowcaseV2Definition,
  ShowcaseV2Example,
} from "../../model/showcase-v2.types";
import { ShowcaseV2Template } from "../ShowcaseV2Template/ShowcaseV2Template";
import { PropertyGrid } from "../PropertyGrid/PropertyGrid";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { findFlutterPreview } from "../../model/flutter-preview-index";
import {
  flutterButtonCode,
  flutterButtonProperties,
  flutterButtonSchema,
  type FlutterButtonProperties,
} from "./flutter-button-properties";
import {
  spinnerCode,
  groupCode,
  flutterSpinnerProperties,
  flutterGroupProperties,
  flutterSpinnerSchema,
  flutterGroupSchema,
  type FlutterSpinnerProperties,
  type FlutterGroupProperties,
} from "./flutter-component-properties";

function ButtonExample() {
  const { properties } =
    useExampleProperties<FlutterButtonProperties>("Button");
  return <FlutterPreview slug="button" properties={properties} />;
}
function HierarchyExample() {
  const { properties } =
    useExampleProperties<FlutterButtonProperties>("Button");
  return (
    <FlutterPreview
      slug="button"
      properties={{ ...properties, scenario: "crud-hierarchy" }}
    />
  );
}
function SpinnerExample() {
  const { properties } =
    useExampleProperties<FlutterSpinnerProperties>("Spinner");
  return <FlutterPreview slug="spinner" properties={properties} />;
}
function GroupExample() {
  const { properties } =
    useExampleProperties<FlutterGroupProperties>("ButtonGroup");
  return <FlutterPreview slug="button-group" properties={properties} />;
}
function hierarchyCode(v: Readonly<Record<string, unknown>>) {
  const primary = flutterButtonCode({
    ...v,
    tone: "brand",
    appearance: "solid",
  })
    .split("\n")
    .slice(3)
    .join("\n");
  return [
    "import 'package:flutter/widgets.dart';",
    "import 'package:forge_ui/forge_ui.dart';",
    "",
    "// Caller owns confirming, requestDeletion, confirmDeletion and cancelDeletion.",
    "Column(children: [",
    "  ForgeButtonGroup(",
    "    label: 'Ações do registro',",
    "    children: [",
    "__PRIMARY__",
    "      ForgeButton(onPressed: () {}, tone: ForgeTone.sand, appearance: ForgeAppearance.bordered, child: const Text('Editar')),",
    "      ForgeButton(onPressed: () {}, tone: ForgeTone.neutral, appearance: ForgeAppearance.ghost, child: const Text('Voltar')),",
    "      ForgeButton(onPressed: () {}, tone: ForgeTone.neutral, appearance: ForgeAppearance.bordered, child: const Text('Tentar novamente')),",
    "      ForgeButton(onPressed: requestDeletion, tone: ForgeTone.neutral, appearance: ForgeAppearance.ghost, child: const Text('Revisar exclusão')),",
    "    ],",
    "  ),",
    "  if (confirming) Column(children: [",
    "    const Text('Confirmar exclusão deste registro? Ação demonstrativa, sem alteração de dados.'),",
    "    ForgeButtonGroup(label: 'Confirmação de exclusão', children: [",
    "      ForgeButton(onPressed: confirmDeletion, tone: ForgeTone.danger, child: const Text('Confirmar exclusão')),",
    "      ForgeButton(onPressed: cancelDeletion, tone: ForgeTone.neutral, appearance: ForgeAppearance.ghost, child: const Text('Cancelar')),",
    "    ]),",
    "  ]),",
    "])",
  ]
    .map((line) => (line === "__PRIMARY__" ? primary + "," : line))
    .join("\n");
}
const configurations = {
  ...primitiveConfigurations,
  ...inputConfigurations,
  ...compositeConfigurations,
  ...feedbackConfigurations,
  button: {
    schema: flutterButtonSchema,
    properties: flutterButtonProperties,
    examples: [
      {
        id: "basic",
        title: "Ação básica",
        description: "Edite as propriedades reais do Button Flutter.",
        code: flutterButtonCode({}),
        getCode: flutterButtonCode,
        Component: ButtonExample,
      },
      {
        id: "crud-hierarchy",
        title: "Hierarquia de ações",
        description:
          "Uma ação principal brand/solid, Editar sand/bordered e ações neutras. O tom/aparência da principal ficam fixos neste cenário; as demais configurações continuam editáveis. A exclusão exige confirmação explícita.",
        code: hierarchyCode({}),
        getCode: hierarchyCode,
        Component: HierarchyExample,
      },
    ] satisfies ShowcaseV2Example[],
  },
  spinner: {
    schema: flutterSpinnerSchema,
    properties: flutterSpinnerProperties,
    examples: [
      {
        id: "basic",
        title: "Indicador de carregamento",
        description: "Teste tamanho, tom, animação e anúncio acessível.",
        code: spinnerCode({}),
        getCode: spinnerCode,
        Component: SpinnerExample,
      },
    ] satisfies ShowcaseV2Example[],
  },
  "button-group": {
    schema: flutterGroupSchema,
    properties: flutterGroupProperties,
    examples: [
      {
        id: "basic",
        title: "Grupo de ações",
        description:
          "Ações independentes com espaçamento e quebra de linha nativos.",
        code: groupCode({}),
        getCode: groupCode,
        Component: GroupExample,
      },
    ] satisfies ShowcaseV2Example[],
  },
};
export function FlutterComponentShowcase({
  definition,
  platformControls,
  panelId,
}: {
  definition: ShowcaseV2Definition;
  platformControls: ReactNode;
  panelId: string;
}) {
  const config =
    Object.hasOwn(configurations, definition.slug) &&
    findFlutterPreview(definition.slug)
      ? configurations[definition.slug as keyof typeof configurations]
      : null;
  const properties = flutterNativeProperties(definition.slug);
  return (
    <ShowcaseV2Template
      key={"flutter-" + definition.slug}
      name={definition.name}
      description={definition.description}
      platformControls={platformControls}
      panelId={panelId}
      panelLabelledBy="forge-platform-flutter"
      examples={config?.examples ?? []}
      properties={properties}
      schema={config?.schema ?? {}}
      emptyState={
        config ? undefined : <FlutterPreview slug={definition.slug} />
      }
    >
      {config ? <FlutterScenarioControls /> : null}
      {properties.length > 0 ? <PropertyGrid properties={properties} /> : null}
    </ShowcaseV2Template>
  );
}
