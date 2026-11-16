"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { FormExample, FormIntentsExample } from "./Form.example";
import { basicCode, intentsCode } from "./usage-code";
const definition = {
  ...{
    name: "Form",
    slug: "form",
    level: "organisms",
    specification: "docs/sc/ds/components/organisms/Form.sc.md",
    description: "Native form submission, validation and caller-owned loading.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        defaultValue: null,
        description:
          "Public compound composition. Structured children retain required parts and semantic controls.",
        source: "DOMAttributes",
      },
      {
        name: "onValidSubmit",
        type: 'FormProps["onValidSubmit"]',
        required: true,
        defaultValue: null,
        description:
          "Receives native FormData including the submitter, after native validation and caller onSubmit.",
        source: "FormProps",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description:
          "Suppresses owned valid submission and sets FormBody aria-busy. It does not disable native controls.",
        source: "ComponentLoadingProps",
      },
      {
        name: "loadingLabel",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Footer status message while loading.",
        source: "ComponentLoadingProps",
      },
      {
        name: "noValidate",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Native constraint-validation opt-out.",
        source: "NativeFormRootProps",
      },
      {
        name: "autoComplete",
        type: '"on" | "off"',
        required: false,
        defaultValue: "on",
        description: "Native autocomplete preference.",
        source: "NativeFormRootProps",
      },
      {
        name: "name",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Native form name.",
        source: "NativeFormRootProps",
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Native title of the demonstrated part.",
        source: "HTMLAttributes",
      },
      {
        name: "native attributes",
        type: "Native HTML attributes",
        required: false,
        defaultValue: null,
        description:
          "Native attributes, events and refs are delegated to the semantic owner. Owned structural relationships remain authoritative.",
        source: "React",
      },
    ],
    methods: [
      {
        name: "requestSubmit",
        signature: "HTMLFormElement.requestSubmit(submitter?: HTMLElement): void",
        description:
          "Via native ref; requests browser validation and submit. Do not use form.submit().",
      },
      {
        name: "reset",
        signature: "HTMLFormElement.reset(): void",
        description: "Via native ref; restores default native values and dispatches reset.",
      },
    ],
    events: [
      {
        name: "onValidSubmit",
        signature: 'FormProps["onValidSubmit"]',
        description:
          "Native FormData from the accepted submit event, including submitter name/value.",
      },
      {
        name: "onSubmit",
        signature: 'NativeFormRootProps["onSubmit"]',
        description: "Runs first; preventDefault cancels owned submission.",
      },
      {
        name: "onInvalidCapture",
        signature: 'NativeFormRootProps["onInvalidCapture"]',
        description: "Observes native validation failures.",
      },
      {
        name: "onReset",
        signature: 'NativeFormRootProps["onReset"]',
        description: "Observes native reset; fixture feedback is cleared by the caller.",
      },
    ],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/organisms/Form/Form.tsx",
      },
      {
        id: "ownership",
        name: "Ownership",
        description:
          "Form owns native submission; fixture state and actions belong to the caller. No backend or secondary validation engine.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Required native submission",
      description: "Native form submission, validation and caller-owned loading.",
      code: basicCode,
      Component: FormExample,
    },
    {
      id: "intents",
      title: "Multiple submit intents",
      description:
        "Native submitter intent, additional field and caller-owned loading suppression.",
      code: intentsCode,
      Component: FormIntentsExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
