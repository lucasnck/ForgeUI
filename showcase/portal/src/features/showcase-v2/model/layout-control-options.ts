import type {
  ApplicationLayoutTemplateProps,
  ApplicationLayoutHeaderProps,
  ApplicationLayoutBodyProps,
  ApplicationLayoutFooterProps,
  ShowcasePageTemplateProps,
  PageHeaderProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const layoutControlOptions = {
  ApplicationLayoutTemplate: {
    mainId: { kind: "text" },
    title: { kind: "text" },
    header: { kind: "text" },
    footer: { kind: "text" },
    children: { kind: "text" },
  },
  ApplicationLayoutHeader: { children: { kind: "text" } },
  ApplicationLayoutBody: { children: { kind: "text" } },
  ApplicationLayoutFooter: { children: { kind: "text" } },
  ShowcasePageTemplate: { title: { kind: "text" }, children: { kind: "text" } },
  PageHeader: {
    pageTitle: { kind: "text" },
    description: { kind: "text" },
    divider: { kind: "boolean" },
    title: { kind: "text" },
  },
} satisfies {
  ApplicationLayoutTemplate: PropertyEditors<ApplicationLayoutTemplateProps>;
  ApplicationLayoutHeader: PropertyEditors<ApplicationLayoutHeaderProps>;
  ApplicationLayoutBody: PropertyEditors<ApplicationLayoutBodyProps>;
  ApplicationLayoutFooter: PropertyEditors<ApplicationLayoutFooterProps>;
  ShowcasePageTemplate: PropertyEditors<ShowcasePageTemplateProps>;
  PageHeader: PropertyEditors<PageHeaderProps>;
};
