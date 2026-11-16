import type { MapViewProps } from "@forge-ui/web";
import { layoutControlOptions } from "./layout-control-options";
import { odataControlOptions } from "./odata-control-options";
import { remainingControlOptions } from "./remaining-control-options";
import { toastControlOptions } from "./toast-control-options";
import { popupItemControlOptions } from "./popup-listbox-item-control-options";
import { popupListControlOptions } from "./popup-listbox-control-options";
import { queryControlOptions } from "./query-control-options";
import { treeGridControlOptions } from "./tree-grid-control-options";
import { dialogControlOptions } from "./dialog-control-options";
import { popupControlOptions } from "./popup-control-options";
import { treeControlOptions } from "./tree-control-options";
import { navigationControlOptions } from "./navigation-control-options";
import { menuControlOptions } from "./menu-control-options";
import { stepperControlOptions } from "./stepper-control-options";
import { gridListControlOptions } from "./grid-list-control-options";
import { formGridControlOptions } from "./form-grid-control-options";
import { specializedInputControlOptions } from "./specialized-input-control-options";
import { collectionControlOptions } from "./collection-control-options";
import type { ComponentProps } from "react";
import type {
  Collapse,
  CollapseHeader,
  CollapseBody,
  CollapseFooter,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  AccordionFooter,
  Pagination,
  PaginationItem,
  PaginationEllipsis,
  List,
  ListHeader,
  ListBody,
  ListFooter,
  ListItem,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  InputBase,
  Textarea,
  ColorInput,
  PasswordInput,
  NumberInput,
  TelephoneInput,
  UrlInput,
  DateTimeInput,
  TimeInput,
  Checkbox,
  Switch,
  Radio,
  Select,
  Option,
  Inline,
  ButtonGroup,
  Stack,
  Container,
  Surface,
  SimpleGrid,
  Heading,
  Text,
  Label,
  Legend,
  FieldHint,
  FieldError,
  Progress,
  ProgressBar,
  Meter,
  Slider,
  Spinner,
  Skeleton,
  CurrencyValue,
  Divider,
  Link,
  Icon,
  AspectRatio,
  Avatar,
  Badge,
  IconButton,
  VisuallyHidden,
  Alert,
  AlertHeader,
  AlertBody,
  AlertFooter,
  EmptyState,
  EmptyStateHeader,
  EmptyStateBody,
  EmptyStateFooter,
  ErrorState,
  ErrorStateHeader,
  ErrorStateBody,
  ErrorStateFooter,
  LoadingState,
  LoadingStateHeader,
  LoadingStateBody,
  LoadingStateFooter,
  FormField,
  FormFieldHeader,
  FormFieldBody,
  FormFieldFooter,
  InputGroup,
  InputAddon,
  Tag,
  FileInput,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  ModalBody,
  ModalFooter,
  Card,
  Modal,
  ModalHeader,
  DataGrid,
  HomePageTemplate,
  ListPageTemplate,
  DetailPageTemplate,
  FormPageTemplate,
} from "@forge-ui/web";
import type { PropertySchema, PropertyEditors } from "../components/ExampleScope/example-store";
type Editors<Props> = PropertyEditors<Props>;
const controlOptions = {
  Collapse: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    open: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  CollapseHeader: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  CollapseBody: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
  },
  CollapseFooter: {
    title: {
      kind: "text",
    },
  },
  Accordion: {
    level: {
      kind: "select",
      options: ["2", "1", "3", "4", "5", "6"],
      valueType: "number",
    },
    multiple: {
      kind: "boolean",
      defaultValue: false,
    },
    collapsible: {
      kind: "boolean",
      defaultValue: true,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  AccordionItem: {
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  AccordionHeader: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  AccordionBody: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
  },
  AccordionFooter: {
    title: {
      kind: "text",
    },
  },
  Pagination: {
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    page: {
      kind: "number",
    },
    pageCount: {
      kind: "number",
      defaultValue: 12,
    },
    title: {
      kind: "text",
    },
  },
  PaginationItem: {
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    label: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  PaginationEllipsis: {
    title: {
      kind: "text",
    },
  },
  List: {
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    title: {
      kind: "text",
    },
  },
  ListHeader: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
  },
  ListBody: {
    title: {
      kind: "text",
    },
  },
  ListFooter: {
    title: {
      kind: "text",
    },
  },
  ListItem: {
    title: {
      kind: "text",
    },
  },
  Breadcrumb: {
    label: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
  },
  BreadcrumbItem: {
    current: {
      kind: "boolean",
      defaultValue: false,
    },
    href: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
      defaultValue: "Children",
    },
  },
  Input: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  InputBase: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Textarea: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  ColorInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  PasswordInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    revealLabel: {
      kind: "text",
      defaultValue: "RevealLabel",
    },
    concealLabel: {
      kind: "text",
      defaultValue: "ConcealLabel",
    },
    revealable: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  NumberInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  TelephoneInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  UrlInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  DateTimeInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  TimeInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
      defaultValue: "Placeholder",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Checkbox: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
    },
    value: {
      kind: "text",
      defaultValue: "item-1",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Switch: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
    },
    value: {
      kind: "text",
      defaultValue: "item-1",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Radio: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Select: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "solid",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    value: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Option: {
    title: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Inline: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    align: {
      kind: "select",
      options: ["center", "start", "end", "stretch", "baseline"],
    },
    justify: {
      kind: "select",
      options: ["center", "start", "end", "between"],
      defaultValue: "end",
    },
    wrap: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  ButtonGroup: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
      defaultValue: "2",
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    title: {
      kind: "text",
    },
  },
  Stack: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
      defaultValue: "2",
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    align: {
      kind: "select",
      options: ["center", "start", "end", "stretch", "baseline"],
    },
    title: {
      kind: "text",
    },
  },
  Container: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    size: {
      kind: "select",
      options: ["narrow", "wide"],
    },
    title: {
      kind: "text",
    },
  },
  Surface: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    align: {
      kind: "select",
      options: ["center", "start", "end", "stretch", "baseline"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    elevation: {
      kind: "select",
      options: ["flat", "raised", "floating"],
      defaultValue: "raised",
    },
    title: {
      kind: "text",
    },
  },
  SimpleGrid: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    title: {
      kind: "text",
    },
  },
  Heading: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    level: {
      kind: "select",
      options: ["2", "1", "3", "4", "5", "6"],
      valueType: "number",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
    },
    weight: {
      kind: "select",
      options: ["bold", "regular", "medium", "semibold"],
    },
    tone: {
      kind: "select",
      options: ["brand", "success", "danger", "inverse", "default", "muted"],
    },
    title: {
      kind: "text",
    },
  },
  Text: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
    },
    tone: {
      kind: "select",
      options: ["brand", "success", "danger", "inverse", "default", "muted"],
    },
    weight: {
      kind: "select",
      options: ["bold", "regular", "medium", "semibold"],
    },
    title: {
      kind: "text",
    },
  },
  Label: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["brand", "success", "danger", "inverse", "default", "muted"],
      defaultValue: "default",
    },
    weight: {
      kind: "select",
      options: ["bold", "regular", "medium", "semibold"],
      defaultValue: "semibold",
    },
    htmlFor: {
      kind: "text",
    },
    required: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  Legend: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  FieldHint: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
      defaultValue: "sm",
    },
    tone: {
      kind: "select",
      options: ["brand", "success", "danger", "inverse", "default", "muted"],
      defaultValue: "muted",
    },
    weight: {
      kind: "select",
      options: ["bold", "regular", "medium", "semibold"],
      defaultValue: "regular",
    },
    title: {
      kind: "text",
    },
  },
  FieldError: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
      defaultValue: "sm",
    },
    tone: {
      kind: "select",
      options: ["brand", "success", "danger", "inverse", "default", "muted"],
      defaultValue: "danger",
    },
    weight: {
      kind: "select",
      options: ["bold", "regular", "medium", "semibold"],
      defaultValue: "regular",
    },
    announce: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  Progress: {
    value: {
      kind: "number",
    },
    max: {
      kind: "number",
      defaultValue: 100,
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  ProgressBar: {
    value: {
      kind: "number",
    },
    max: {
      kind: "number",
      defaultValue: 100,
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    valueText: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
  },
  Meter: {
    value: {
      kind: "number",
    },
    min: {
      kind: "number",
      defaultValue: 0,
    },
    max: {
      kind: "number",
      defaultValue: 100,
    },
    low: {
      kind: "number",
      defaultValue: 25,
    },
    high: {
      kind: "number",
      defaultValue: 75,
    },
    optimum: {
      kind: "number",
      defaultValue: 50,
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  Slider: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    valueText: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
    },
    value: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Spinner: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    decorative: {
      kind: "boolean",
      defaultValue: true,
    },
    label: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
  },
  Skeleton: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    kind: {
      kind: "select",
      options: ["circle", "text", "rectangle"],
      defaultValue: "rectangle",
    },
    title: {
      kind: "text",
    },
  },
  CurrencyValue: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
    },
    tone: {
      kind: "select",
      options: ["brand", "success", "danger", "inverse", "default", "muted"],
    },
    weight: {
      kind: "select",
      options: ["bold", "regular", "medium", "semibold"],
    },
    currency: {
      kind: "text",
    },
    locale: {
      kind: "select",
      options: ["pt-BR", "es", "en"],
    },
    currencyDisplay: {
      kind: "select",
      options: ["symbol", "code", "name", "narrowSymbol"],
    },
    useGrouping: {
      kind: "boolean",
      defaultValue: false,
    },
    value: {
      kind: "text",
    },
    emptyLabel: {
      kind: "text",
      defaultValue: "EmptyLabel",
    },
    title: {
      kind: "text",
    },
  },
  Divider: {
    title: {
      kind: "text",
    },
  },
  Link: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  Icon: {
    name: {
      kind: "select",
      options: [
        "menu",
        "search",
        "filter",
        "close",
        "info",
        "copy",
        "alert-triangle",
        "arrow-left",
        "arrow-right",
        "bell",
        "calendar",
        "check",
        "chevron-down",
        "chevron-left",
        "chevron-right",
        "chevron-up",
        "circle-check",
        "circle-x",
        "clock",
        "download",
        "edit",
        "external-link",
        "eye",
        "eye-off",
        "log-out",
        "minus",
        "plus",
        "refresh",
        "settings",
        "sort-ascending",
        "sort-descending",
        "spinner",
        "trash",
        "upload",
        "user",
      ],
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl", "inherit"],
      defaultValue: "inherit",
    },
    label: {
      kind: "text",
    },
  },
  AspectRatio: {
    ratio: {
      kind: "select",
      options: ["video", "square", "photo", "portrait"],
    },
    title: {
      kind: "text",
    },
  },
  Avatar: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
      defaultValue: "pill",
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    src: {
      kind: "text",
    },
    initials: {
      kind: "text",
      defaultValue: "IN",
    },
    decorative: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  Badge: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "soft",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  IconButton: {
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "brand",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    loading: {
      kind: "boolean",
      defaultValue: false,
    },
    loadingLabel: {
      kind: "text",
    },
    variant: {
      kind: "select",
      options: ["solid", "soft", "ghost", "outline"],
      defaultValue: "solid",
    },
    icon: {
      kind: "select",
      options: [
        "menu",
        "search",
        "filter",
        "close",
        "info",
        "copy",
        "alert-triangle",
        "arrow-left",
        "arrow-right",
        "bell",
        "calendar",
        "check",
        "chevron-down",
        "chevron-left",
        "chevron-right",
        "chevron-up",
        "circle-check",
        "circle-x",
        "clock",
        "download",
        "edit",
        "external-link",
        "eye",
        "eye-off",
        "log-out",
        "minus",
        "plus",
        "refresh",
        "settings",
        "sort-ascending",
        "sort-descending",
        "spinner",
        "trash",
        "upload",
        "user",
      ],
      defaultValue: "search",
    },
    title: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  VisuallyHidden: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  Alert: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    announcement: {
      kind: "select",
      options: ["off", "assertive", "polite"],
      defaultValue: "polite",
    },
    title: {
      kind: "text",
    },
  },
  AlertHeader: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  AlertBody: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  AlertFooter: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  EmptyState: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  EmptyStateHeader: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  EmptyStateBody: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  EmptyStateFooter: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  ErrorState: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    announcement: {
      kind: "select",
      options: ["off", "assertive", "polite"],
      defaultValue: "polite",
    },
    title: {
      kind: "text",
    },
  },
  ErrorStateHeader: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  ErrorStateBody: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  ErrorStateFooter: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  LoadingState: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    title: {
      kind: "text",
    },
  },
  LoadingStateHeader: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  LoadingStateBody: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  LoadingStateFooter: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  FormField: {
    controlId: {
      kind: "text",
    },
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    hint: {
      kind: "text",
    },
    error: {
      kind: "text",
    },
  },
  FormFieldHeader: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  FormFieldBody: {
    title: {
      kind: "text",
    },
  },
  FormFieldFooter: {
    hint: {
      kind: "text",
      defaultValue: "Hint",
    },
    error: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
  },
  InputGroup: {
    gap: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
      defaultValue: "2",
    },
    padding: {
      kind: "select",
      options: ["0", "2", "1", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
      defaultValue: "0",
    },
    align: {
      kind: "select",
      options: ["center", "start", "end", "stretch", "baseline"],
      defaultValue: "stretch",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  InputAddon: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  Tag: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "soft",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    removeLabel: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  FileInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
      defaultValue: "neutral",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
      defaultValue: "bordered",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    invalid: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
    placeholder: {
      kind: "text",
    },
    checked: {
      kind: "boolean",
      defaultValue: false,
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    readOnly: {
      kind: "boolean",
      defaultValue: false,
    },
  },
  Button: {
    children: {
      kind: "text",
      defaultValue: "Children",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    tone: {
      kind: "select",
      options: [
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
      ],
      defaultValue: "brand",
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    variant: {
      kind: "select",
      options: ["solid", "soft", "ghost", "outline"],
      defaultValue: "solid",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: false,
    },
    loading: {
      kind: "boolean",
      defaultValue: false,
    },
    loadingLabel: {
      kind: "text",
      defaultValue: "LoadingLabel",
    },
    type: {
      kind: "select",
      options: ["button", "submit", "reset"],
      defaultValue: "button",
    },
    disabled: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
      defaultValue: "Title",
    },
  },
  CardHeader: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  CardBody: {
    children: {
      kind: "text",
      binding: "registered",
      defaultValue: "Children",
    },
    title: {
      kind: "text",
    },
  },
  CardFooter: {
    title: {
      kind: "text",
    },
  },
  ModalBody: {
    title: {
      kind: "text",
    },
  },
  ModalFooter: {
    divider: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  Card: {
    elevation: {
      kind: "select",
      options: ["flat", "raised", "floating"],
      defaultValue: "raised",
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  Modal: {
    open: {
      kind: "boolean",
      defaultValue: false,
    },
    closeOnOutsideClick: {
      kind: "boolean",
      defaultValue: false,
    },
    animated: {
      kind: "boolean",
      defaultValue: true,
    },
    animationEffect: {
      kind: "select",
      options: ["none", "fade", "scale"],
      defaultValue: "fade",
    },
    title: {
      kind: "text",
    },
  },
  ModalHeader: {
    title: {
      kind: "text",
      defaultValue: "Title",
    },
    divider: {
      kind: "boolean",
      defaultValue: true,
    },
  },
  DataGrid: {
    label: {
      kind: "text",
      defaultValue: "Label",
    },
    fullWidth: {
      kind: "boolean",
      defaultValue: true,
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    showBorders: {
      kind: "boolean",
      defaultValue: true,
    },
    showColumnLines: {
      kind: "boolean",
      defaultValue: false,
    },
    showRowLines: {
      kind: "boolean",
      defaultValue: true,
    },
    rowAlternationEnabled: {
      kind: "boolean",
      defaultValue: true,
    },
    title: {
      kind: "text",
    },
  },
  HomePageTemplate: {
    pageTitle: {
      kind: "text",
      defaultValue: "PageTitle",
    },
    description: {
      kind: "text",
      defaultValue: "Description",
    },
    divider: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  ListPageTemplate: {
    pageTitle: {
      kind: "text",
      defaultValue: "PageTitle",
    },
    divider: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  DetailPageTemplate: {
    pageTitle: {
      kind: "text",
    },
    description: {
      kind: "text",
    },
    divider: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
  FormPageTemplate: {
    pageTitle: {
      kind: "text",
    },
    description: {
      kind: "text",
      defaultValue: "Description",
    },
    divider: {
      kind: "boolean",
      defaultValue: false,
    },
    title: {
      kind: "text",
    },
  },
} satisfies {
  Collapse: Editors<ComponentProps<typeof Collapse>>;
  CollapseHeader: Editors<ComponentProps<typeof CollapseHeader>>;
  CollapseBody: Editors<ComponentProps<typeof CollapseBody>>;
  CollapseFooter: Editors<ComponentProps<typeof CollapseFooter>>;
  Accordion: Editors<ComponentProps<typeof Accordion>>;
  AccordionItem: Editors<ComponentProps<typeof AccordionItem>>;
  AccordionHeader: Editors<ComponentProps<typeof AccordionHeader>>;
  AccordionBody: Editors<ComponentProps<typeof AccordionBody>>;
  AccordionFooter: Editors<ComponentProps<typeof AccordionFooter>>;
  Pagination: Editors<ComponentProps<typeof Pagination>>;
  PaginationItem: Editors<ComponentProps<typeof PaginationItem>>;
  PaginationEllipsis: Editors<ComponentProps<typeof PaginationEllipsis>>;
  List: Editors<ComponentProps<typeof List>>;
  ListHeader: Editors<ComponentProps<typeof ListHeader>>;
  ListBody: Editors<ComponentProps<typeof ListBody>>;
  ListFooter: Editors<ComponentProps<typeof ListFooter>>;
  ListItem: Editors<ComponentProps<typeof ListItem>>;
  Breadcrumb: Editors<ComponentProps<typeof Breadcrumb>>;
  BreadcrumbItem: Editors<ComponentProps<typeof BreadcrumbItem>>;
  Input: Editors<ComponentProps<typeof Input>>;
  InputBase: Editors<ComponentProps<typeof InputBase>>;
  Textarea: Editors<ComponentProps<typeof Textarea>>;
  ColorInput: Editors<ComponentProps<typeof ColorInput>>;
  PasswordInput: Editors<ComponentProps<typeof PasswordInput>>;
  NumberInput: Editors<ComponentProps<typeof NumberInput>>;
  TelephoneInput: Editors<ComponentProps<typeof TelephoneInput>>;
  UrlInput: Editors<ComponentProps<typeof UrlInput>>;
  DateTimeInput: Editors<ComponentProps<typeof DateTimeInput>>;
  TimeInput: Editors<ComponentProps<typeof TimeInput>>;
  Checkbox: Editors<ComponentProps<typeof Checkbox>>;
  Switch: Editors<ComponentProps<typeof Switch>>;
  Radio: Editors<ComponentProps<typeof Radio>>;
  Select: Editors<ComponentProps<typeof Select>>;
  Option: Editors<ComponentProps<typeof Option>>;
  Inline: Editors<ComponentProps<typeof Inline>>;
  ButtonGroup: Editors<ComponentProps<typeof ButtonGroup>>;
  Stack: Editors<ComponentProps<typeof Stack>>;
  Container: Editors<ComponentProps<typeof Container>>;
  Surface: Editors<ComponentProps<typeof Surface>>;
  SimpleGrid: Editors<ComponentProps<typeof SimpleGrid>>;
  Heading: Editors<ComponentProps<typeof Heading>>;
  Text: Editors<ComponentProps<typeof Text>>;
  Label: Editors<ComponentProps<typeof Label>>;
  Legend: Editors<ComponentProps<typeof Legend>>;
  FieldHint: Editors<ComponentProps<typeof FieldHint>>;
  FieldError: Editors<ComponentProps<typeof FieldError>>;
  Progress: Editors<ComponentProps<typeof Progress>>;
  ProgressBar: Editors<ComponentProps<typeof ProgressBar>>;
  Meter: Editors<ComponentProps<typeof Meter>>;
  Slider: Editors<ComponentProps<typeof Slider>>;
  Spinner: Editors<ComponentProps<typeof Spinner>>;
  Skeleton: Editors<ComponentProps<typeof Skeleton>>;
  CurrencyValue: Editors<ComponentProps<typeof CurrencyValue>>;
  Divider: Editors<ComponentProps<typeof Divider>>;
  Link: Editors<ComponentProps<typeof Link>>;
  Icon: Editors<ComponentProps<typeof Icon>>;
  AspectRatio: Editors<ComponentProps<typeof AspectRatio>>;
  Avatar: Editors<ComponentProps<typeof Avatar>>;
  Badge: Editors<ComponentProps<typeof Badge>>;
  IconButton: Editors<ComponentProps<typeof IconButton>>;
  VisuallyHidden: Editors<ComponentProps<typeof VisuallyHidden>>;
  Alert: Editors<ComponentProps<typeof Alert>>;
  AlertHeader: Editors<ComponentProps<typeof AlertHeader>>;
  AlertBody: Editors<ComponentProps<typeof AlertBody>>;
  AlertFooter: Editors<ComponentProps<typeof AlertFooter>>;
  EmptyState: Editors<ComponentProps<typeof EmptyState>>;
  EmptyStateHeader: Editors<ComponentProps<typeof EmptyStateHeader>>;
  EmptyStateBody: Editors<ComponentProps<typeof EmptyStateBody>>;
  EmptyStateFooter: Editors<ComponentProps<typeof EmptyStateFooter>>;
  ErrorState: Editors<ComponentProps<typeof ErrorState>>;
  ErrorStateHeader: Editors<ComponentProps<typeof ErrorStateHeader>>;
  ErrorStateBody: Editors<ComponentProps<typeof ErrorStateBody>>;
  ErrorStateFooter: Editors<ComponentProps<typeof ErrorStateFooter>>;
  LoadingState: Editors<ComponentProps<typeof LoadingState>>;
  LoadingStateHeader: Editors<ComponentProps<typeof LoadingStateHeader>>;
  LoadingStateBody: Editors<ComponentProps<typeof LoadingStateBody>>;
  LoadingStateFooter: Editors<ComponentProps<typeof LoadingStateFooter>>;
  FormField: Editors<ComponentProps<typeof FormField>>;
  FormFieldHeader: Editors<ComponentProps<typeof FormFieldHeader>>;
  FormFieldBody: Editors<ComponentProps<typeof FormFieldBody>>;
  FormFieldFooter: Editors<ComponentProps<typeof FormFieldFooter>>;
  InputGroup: Editors<ComponentProps<typeof InputGroup>>;
  InputAddon: Editors<ComponentProps<typeof InputAddon>>;
  Tag: Editors<ComponentProps<typeof Tag>>;
  FileInput: Editors<ComponentProps<typeof FileInput>>;
  Button: Editors<ComponentProps<typeof Button>>;
  CardHeader: Editors<ComponentProps<typeof CardHeader>>;
  CardBody: Editors<ComponentProps<typeof CardBody>>;
  CardFooter: Editors<ComponentProps<typeof CardFooter>>;
  ModalBody: Editors<ComponentProps<typeof ModalBody>>;
  ModalFooter: Editors<ComponentProps<typeof ModalFooter>>;
  Card: Editors<ComponentProps<typeof Card>>;
  Modal: Editors<ComponentProps<typeof Modal>>;
  ModalHeader: Editors<ComponentProps<typeof ModalHeader>>;
  DataGrid: Editors<ComponentProps<typeof DataGrid>>;
  HomePageTemplate: Editors<ComponentProps<typeof HomePageTemplate>>;
  ListPageTemplate: Editors<ComponentProps<typeof ListPageTemplate>>;
  DetailPageTemplate: Editors<ComponentProps<typeof DetailPageTemplate>>;
  FormPageTemplate: Editors<ComponentProps<typeof FormPageTemplate>>;
};
export const showcaseV2ControlOptions: Readonly<Record<string, PropertySchema>> = {
  MapView: {
    label: { kind: "text", defaultValue: "Label" },
    description: { kind: "text", defaultValue: "Description" },
    title: { kind: "text", defaultValue: "Title" },
    status: {
      kind: "select",
      options: ["loading", "ready", "empty", "unavailable"],
      defaultValue: "ready",
    },
  } satisfies PropertyEditors<MapViewProps>,
  ...controlOptions,
  ...layoutControlOptions,
  ...odataControlOptions,
  ...remainingControlOptions,
  ...toastControlOptions,
  ...popupItemControlOptions,
  ...popupListControlOptions,
  ...queryControlOptions,
  ...treeGridControlOptions,
  ...dialogControlOptions,
  ...popupControlOptions,
  ...treeControlOptions,
  ...navigationControlOptions,
  ...menuControlOptions,
  ...stepperControlOptions,
  ...gridListControlOptions,
  ...formGridControlOptions,
  ...collectionControlOptions,
  ...specializedInputControlOptions,
};
