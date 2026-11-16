"use client";
import {
  useExamplePropertySnapshot as useHomePageTemplateExamplePropertySnapshot,
  useExamplePropertySnapshot as useListPageTemplateExamplePropertySnapshot,
  useExamplePropertySnapshot as useDetailPageTemplateExamplePropertySnapshot,
  useExamplePropertySnapshot as useFormPageTemplateExamplePropertySnapshot,
} from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseFormPageTemplateProps } from "react";
import { useExampleProperties as useFormPageTemplateExampleProperties } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseDetailPageTemplateProps } from "react";
import { useExampleProperties as useDetailPageTemplateExampleProperties } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseListPageTemplateProps } from "react";
import { useExampleProperties as useListPageTemplateExampleProperties } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseHomePageTemplateProps } from "react";
import { useExampleProperties as useHomePageTemplateExampleProperties } from "../ExampleScope/useExampleScope";
import type { ReactNode } from "react";
import type { ComponentTone, ComponentAppearance } from "@forge-ui/web";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  Icon,
  Checkbox,
  PageTransition,
  SharedElement,
  HomePageTemplate,
  ListPageTemplate,
  DetailPageTemplate,
  FormPageTemplate,
  Heading,
  Text,
  Link,
  Button,
  Stack,
  Inline,
  SearchInput,
  Select,
  Option,
  DataGrid,
  DataGridHeader,
  DataGridBody,
  Pagination,
  PaginationItem,
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  FormField,
  Input,
} from "@forge-ui/web";
import {
  demoBase,
  templateDemoIds,
  templateDemoTransitionName,
  type TemplateDemoRecord,
} from "../../model/template-demo.fixtures";
import {
  useTemplateDemoPathname,
  useDemoLink,
  useTemplateDemo,
  useTemplateDemoDocumentation,
  useTemplateDemoForm,
} from "./useTemplateDemo";
import { useTemplateDemoCopy } from "./useTemplateDemoCopy";
import styles from "./TemplateDemoPages.module.css";

function DemoIdentity({
  entity,
  role,
  children,
}: {
  entity: string;
  role: string;
  children: ReactNode;
}) {
  const demo = useTemplateDemo();

  return (
    <SharedElement
      animated={demo.animated}
      name={templateDemoTransitionName(demo.instanceId, entity, role)}
    >
      {children}
    </SharedElement>
  );
}

function DemoRecordTitle({ record }: { record: TemplateDemoRecord }) {
  return (
    <DemoIdentity entity={record.id} role="title">
      {record.title}
    </DemoIdentity>
  );
}

function DemoRecordDescription({ record }: { record: TemplateDemoRecord }) {
  return (
    <DemoIdentity entity={record.id} role="description">
      {record.description}
    </DemoIdentity>
  );
}

function DemoPageContent({ children }: { children: ReactNode }) {
  const demo = useTemplateDemo();
  const pathname = useTemplateDemoPathname();

  return (
    <PageTransition key={pathname} animated={demo.animated}>
      {children}
    </PageTransition>
  );
}

function DemoBreadcrumb({ current, record }: { current: string; record?: TemplateDemoRecord }) {
  const copy = useTemplateDemoCopy();
  const home = useDemoLink(demoBase + "/home/");
  const list = useDemoLink(demoBase + "/list/");
  const detail = useDemoLink(
    record ? demoBase + "/details/" + record.id + "/" : demoBase + "/list/",
  );

  return (
    <Breadcrumb label={copy.breadcrumb}>
      {current !== copy.home && (
        <BreadcrumbItem href={demoBase + "/home/"} onClick={home}>
          {copy.home}
        </BreadcrumbItem>
      )}
      {current !== copy.home && current !== copy.list && (
        <BreadcrumbItem href={demoBase + "/list/"} onClick={list}>
          {copy.list}
        </BreadcrumbItem>
      )}
      {record && (
        <BreadcrumbItem href={demoBase + "/details/" + record.id + "/"} onClick={detail}>
          {record.title}
        </BreadcrumbItem>
      )}
      <BreadcrumbItem current>{current}</BreadcrumbItem>
    </Breadcrumb>
  );
}

export function DemoLink({ href, children }: { href: string; children: ReactNode }) {
  const navigate = useDemoLink(href);

  return (
    <Link href={href} onClick={navigate}>
      {children}
    </Link>
  );
}

function DemoActionLink({
  href,
  children,
  tone,
  appearance,
}: {
  href: string;
  children: ReactNode;
  tone: ComponentTone;
  appearance: ComponentAppearance;
}) {
  const navigate = useDemoLink(href);

  return (
    <Link
      href={href}
      onClick={navigate}
      className={styles.actionLink}
      data-tone={tone}
      data-appearance={appearance}
      data-size="md"
    >
      {children}
    </Link>
  );
}

export function TemplateDemoChrome({ children }: { children: ReactNode }) {
  const documentationHref = useTemplateDemoDocumentation();
  const demo = useTemplateDemo();
  const copy = useTemplateDemoCopy();

  return (
    <Stack padding="3" gap="3">
      <nav aria-label="Template demo">
        <Inline gap="3">
          <DemoLink href={`${demoBase}/home/`}>{copy.home}</DemoLink>
          <DemoLink href={`${demoBase}/list/`}>{copy.list}</DemoLink>
          <DemoLink href={documentationHref}>{copy.documentation}</DemoLink>
        </Inline>
      </nav>
      <DemoSimulation onReset={demo.reset} />
      <main id="main-content" key={demo.revision}>
        {children}
      </main>
    </Stack>
  );
}

export function DemoSimulation({ onReset }: { onReset?: () => void }) {
  const demo = useTemplateDemo();
  const copy = useTemplateDemoCopy();

  return (
    <Inline gap="2" align="end">
      <label className={styles.simulationField}>
        {copy.simulation}
        <Select value={demo.simulation} onChange={demo.updateSimulation}>
          <Option value="fast">{copy.fast}</Option>
          <Option value="slow">{copy.slow}</Option>
          <Option value="failed">{copy.failed}</Option>
        </Select>
      </label>
      <Button
        type="button"
        appearance="bordered"
        tone="neutral"
        onClick={demo.refresh}
        disabled={demo.status === "loading"}
      >
        {copy.retry}
      </Button>
      <Button type="button" appearance="bordered" tone="neutral" onClick={onReset ?? demo.reset}>
        {copy.reset}
      </Button>
      <Inline gap="2" align="center">
        <Checkbox
          id={`${demo.instanceId}-animations`}
          checked={demo.animated}
          onChange={demo.updateAnimated}
        />
        <label htmlFor={`${demo.instanceId}-animations`}>{copy.animations}</label>
      </Inline>
      <Text role="status">
        {demo.status === "loading" ? copy.loading : demo.status === "error" ? copy.error : ""}
      </Text>
    </Inline>
  );
}

export function TemplateDemoHome() {
  const { properties: homePageTemplateProperties } = useHomePageTemplatePropertyBindings();
  const demo = useTemplateDemo();
  const copy = useTemplateDemoCopy();
  useHomePageTemplatePropertySnapshot({
    pageTitle: copy.welcome,
    description: copy.homeDescription,
  });
  return (
    <DemoPageContent>
      <HomePageTemplate
        titleId={demo.instanceId + "-home"}
        pageTitle={copy.welcome}
        description={copy.homeDescription}
        breadcrumb={<DemoBreadcrumb current={copy.home} />}
        divider
        quickActions={
          <Card>
            <CardHeader>
              <Inline gap="2" align="center">
                <DemoIdentity entity="records" role="icon">
                  <Icon name="info" />
                </DemoIdentity>
                <Heading level={2} size="md">
                  <DemoIdentity entity="records" role="title">
                    {copy.list}
                  </DemoIdentity>
                </Heading>
              </Inline>
            </CardHeader>
            <CardBody>
              <DemoIdentity entity="records" role="description">
                {copy.listDescription}
              </DemoIdentity>
            </CardBody>
            <CardFooter>
              <DemoActionLink href={demoBase + "/list/"} tone="brand" appearance="solid">
                {copy.openList}
              </DemoActionLink>
            </CardFooter>
          </Card>
        }
        summary={
          <Stack gap="2">
            <Heading level={2} size="md">
              {copy.summary}
            </Heading>
            <SimpleGrid columns={{ base: "1", mobile: "3" }} gap="3">
              {[
                [copy.total, demo.records.length],
                [copy.recent, Math.min(3, demo.records.length)],
                [copy.available, templateDemoIds.length - demo.records.length],
              ].map(([label, value]) => (
                <Card key={label}>
                  <CardHeader>{label}</CardHeader>
                  <CardBody>
                    <Text size="xl">{value}</Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        }
        {...homePageTemplateProperties}
      >
        <Stack gap="2">
          <Heading level={2} size="md">
            {copy.recent}
          </Heading>
          <SimpleGrid columns={{ base: "1", mobile: "3" }} gap="3">
            {demo.records.slice(0, 3).map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <Heading level={3} size="md">
                    <DemoRecordTitle record={record} />
                  </Heading>
                </CardHeader>
                <CardBody>
                  <DemoRecordDescription record={record} />
                </CardBody>
                <CardFooter>
                  <DemoLink href={demoBase + "/details/" + record.id + "/"}>
                    {copy.viewDetails}
                  </DemoLink>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </HomePageTemplate>
    </DemoPageContent>
  );
}

export function TemplateDemoList() {
  const { properties: listPageTemplateProperties } = useListPageTemplatePropertyBindings();

  const demo = useTemplateDemo();
  const copy = useTemplateDemoCopy();
  const filtered = demo.records
    .filter((record) =>
      `${record.title} ${record.description}`.toLowerCase().includes(demo.query.toLowerCase()),
    )
    .sort((a, b) => (demo.descending ? b.index - a.index : a.index - b.index));
  const pageCount = Math.max(1, Math.ceil(filtered.length / 4));
  const page = Math.min(demo.page, pageCount);
  const columns = [
    {
      key: "title",
      header: "Header 1",
      rowHeader: true,
      renderCell: (record: TemplateDemoRecord) => (
        <DemoLink href={`${demoBase}/details/${record.id}/`}>
          <DemoRecordTitle record={record} />
        </DemoLink>
      ),
    },
    {
      key: "description",
      header: "Header 2",
      renderCell: (record: TemplateDemoRecord) => <DemoRecordDescription record={record} />,
    },
    {
      key: "actions",
      header: "Header 3",
      renderCell: (record: TemplateDemoRecord) => (
        <DemoLink href={`${demoBase}/details/${record.id}/`}>{copy.viewDetails}</DemoLink>
      ),
    },
  ];
  useListPageTemplatePropertySnapshot({ pageTitle: copy.list });
  return (
    <DemoPageContent>
      <ListPageTemplate
        titleId={`${demo.instanceId}-list`}
        pageTitle={
          <DemoIdentity entity="records" role="title">
            {copy.list}
          </DemoIdentity>
        }
        description={
          <DemoIdentity entity="records" role="description">
            {copy.listDescription}
          </DemoIdentity>
        }
        identity={
          <DemoIdentity entity="records" role="icon">
            <Icon name="info" />
          </DemoIdentity>
        }
        breadcrumb={<DemoBreadcrumb current={copy.list} />}
        divider
        actions={
          <Inline gap="2">
            <DemoActionLink href={demoBase + "/home/"} tone="neutral" appearance="ghost">
              {copy.home}
            </DemoActionLink>
            <DemoActionLink href={demoBase + "/create/"} tone="brand" appearance="solid">
              <DemoIdentity entity="create" role="title">
                {copy.create}
              </DemoIdentity>
            </DemoActionLink>
          </Inline>
        }
        filters={
          <Stack gap="2">
            <SearchInput
              aria-label={copy.filter}
              placeholder="Placeholder"
              value={demo.query}
              onChange={demo.updateQuery}
            />
            <Button type="button" tone="neutral" appearance="bordered" onClick={demo.toggleSort}>
              {copy.sort}: {demo.descending ? "↓" : "↑"}
            </Button>
          </Stack>
        }
        pagination={
          <Pagination
            label={copy.page}
            page={page}
            pageCount={pageCount}
            onPageChange={demo.setPage}
            disabled={demo.status === "loading"}
          >
            {Array.from({ length: pageCount }, (_, i) => (
              <PaginationItem key={i + 1} page={i + 1} label={`${copy.page} ${i + 1}`} />
            ))}
          </Pagination>
        }
        {...listPageTemplateProperties}
      >
        <DataGrid
          label="Label"
          rows={filtered.slice((page - 1) * 4, page * 4)}
          columns={columns}
          getRowKey={(record) => record.id}
          emptyContent={copy.empty}
          aria-busy={demo.status === "loading"}
        >
          <DataGridHeader />
          <DataGridBody />
        </DataGrid>
      </ListPageTemplate>
    </DemoPageContent>
  );
}

export function TemplateDemoDetails({ id }: { id: string }) {
  const { properties: detailPageTemplateProperties } = useDetailPageTemplatePropertyBindings();

  const demo = useTemplateDemo();
  const copy = useTemplateDemoCopy();
  const record = demo.records.find((item) => item.id === id);
  useDetailPageTemplatePropertySnapshot({
    pageTitle: record?.title ?? copy.missing,
    description: record?.description,
  });
  return (
    <DemoPageContent>
      <DetailPageTemplate
        titleId={`${demo.instanceId}-details`}
        pageTitle={record ? <DemoRecordTitle record={record} /> : copy.missing}
        description={record ? <DemoRecordDescription record={record} /> : undefined}
        breadcrumb={<DemoBreadcrumb current={record?.title ?? copy.missing} />}
        divider
        actions={
          <Inline gap="2">
            <DemoActionLink href={`${demoBase}/list/`} tone="neutral" appearance="ghost">
              {copy.back}
            </DemoActionLink>
            {record && (
              <DemoActionLink href={`${demoBase}/edit/${id}/`} tone="sand" appearance="bordered">
                {copy.edit}
              </DemoActionLink>
            )}
          </Inline>
        }
        {...detailPageTemplateProperties}
      >
        <Card>
          <CardHeader>
            <Heading level={2} size="md">
              {copy.details}
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack gap="2">
              <Text>
                {copy.recordId}: {record?.id ?? id}
              </Text>
              <Text>{record?.description ?? copy.missing}</Text>
            </Stack>
          </CardBody>
        </Card>
      </DetailPageTemplate>
    </DemoPageContent>
  );
}

function TemplateDemoFormContent({ id, preview = false }: { id?: string; preview?: boolean }) {
  const { properties: formPageTemplateProperties } = useFormPageTemplatePropertyBindings();

  const view = useTemplateDemoForm(id, preview);
  const copy = useTemplateDemoCopy();
  useFormPageTemplatePropertySnapshot({
    pageTitle: id ? copy.edit : copy.create,
    description: "Description",
  });
  if (id && !view.record) return <Text role="status">{copy.missing}</Text>;
  return (
    <FormPageTemplate
      titleId={`${view.fieldId}-form`}
      pageTitle={
        view.record ? (
          <Inline gap="2">
            {copy.edit}
            <DemoRecordTitle record={view.record} />
          </Inline>
        ) : (
          <DemoIdentity entity="create" role="title">
            {copy.create}
          </DemoIdentity>
        )
      }
      description={
        view.record ? <DemoRecordDescription record={view.record} /> : copy.createDescription
      }
      breadcrumb={<DemoBreadcrumb current={id ? copy.edit : copy.create} record={view.record} />}
      divider
      notice={view.demo.status === "error" ? <Text role="alert">{copy.error}</Text> : undefined}
      {...formPageTemplateProperties}
    >
      <Form
        onValidSubmit={view.submit}
        loading={view.demo.status === "loading"}
        loadingLabel={copy.loading}
        aria-label={id ? copy.edit : copy.create}
      >
        <FormHeader>
          <Text>Children</Text>
        </FormHeader>
        <FormBody>
          <FormField controlId={`${view.fieldId}-title`} label="Label">
            <Input
              name="title"
              value={view.title}
              placeholder="Placeholder"
              onChange={view.updateTitle}
              required
              readOnly={view.demo.status === "loading"}
            />
          </FormField>
          <FormField controlId={`${view.fieldId}-description`} label="Label 2">
            <Input
              name="description"
              value={view.description}
              placeholder="Placeholder"
              onChange={view.updateDescription}
              readOnly={view.demo.status === "loading"}
            />
          </FormField>
        </FormBody>
        <FormFooter className={styles.formActions}>
          <Button type="button" appearance="ghost" tone="neutral" onClick={view.navigateBack}>
            {copy.cancel}
          </Button>
          <Button
            type="submit"
            tone="brand"
            appearance="solid"
            loading={view.demo.status === "loading"}
            loadingLabel={copy.loading}
          >
            {copy.save}
          </Button>
        </FormFooter>
      </Form>
      {view.capacity && <Text role="alert">{copy.capacity}</Text>}
      {view.saved && <Text role="status">{copy.saved}</Text>}
      {view.pendingHref && (
        <Stack gap="2" role="alert">
          <Text>{copy.discardHelp}</Text>
          <Inline gap="2">
            <Button type="button" tone="danger" appearance="solid" onClick={view.discard}>
              {copy.confirm}
            </Button>
            <Button type="button" tone="neutral" appearance="ghost" onClick={view.keepEditing}>
              {copy.stay}
            </Button>
          </Inline>
        </Stack>
      )}
    </FormPageTemplate>
  );
}

export function TemplateDemoForm(props: { id?: string; preview?: boolean }) {
  const demo = useTemplateDemo();

  return (
    <DemoPageContent>
      <TemplateDemoFormContent key={`${demo.revision}-${props.id ?? "create"}`} {...props} />
    </DemoPageContent>
  );
}

function useFormPageTemplatePropertyBindings() {
  return useFormPageTemplateExampleProperties<
    Pick<
      ShowcaseFormPageTemplateProps<typeof FormPageTemplate>,
      "pageTitle" | "description" | "divider" | "title"
    >
  >("FormPageTemplate");
}

function useDetailPageTemplatePropertyBindings() {
  return useDetailPageTemplateExampleProperties<
    Pick<
      ShowcaseDetailPageTemplateProps<typeof DetailPageTemplate>,
      "pageTitle" | "description" | "divider" | "title"
    >
  >("DetailPageTemplate");
}

function useListPageTemplatePropertyBindings() {
  return useListPageTemplateExampleProperties<
    Pick<ShowcaseListPageTemplateProps<typeof ListPageTemplate>, "pageTitle" | "divider" | "title">
  >("ListPageTemplate");
}

function useHomePageTemplatePropertyBindings() {
  return useHomePageTemplateExampleProperties<
    Pick<
      ShowcaseHomePageTemplateProps<typeof HomePageTemplate>,
      "pageTitle" | "description" | "divider" | "title"
    >
  >("HomePageTemplate");
}

function useHomePageTemplatePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useHomePageTemplateExamplePropertySnapshot("HomePageTemplate", values);
}

function useListPageTemplatePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useListPageTemplateExamplePropertySnapshot("ListPageTemplate", values);
}

function useDetailPageTemplatePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useDetailPageTemplateExamplePropertySnapshot("DetailPageTemplate", values);
}

function useFormPageTemplatePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useFormPageTemplateExamplePropertySnapshot("FormPageTemplate", values);
}
