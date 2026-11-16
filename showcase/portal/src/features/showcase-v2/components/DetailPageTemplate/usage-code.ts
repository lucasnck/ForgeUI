export const basicCode = `import { DetailPageTemplate, Inline, Link } from "@forge-ui/web";

<DetailPageTemplate
  titleId="detail-title"
  pageTitle="PageTitle"
  identity={identity}
  actions={
    <Inline gap="2">
      <Link href="/demos/records/list/" className={actionLinkClassName} data-size="md" data-tone="neutral" data-appearance="ghost" onClick={onBack}>Back</Link>
      <Link href={editHref} className={actionLinkClassName} data-size="md" data-tone="sand" data-appearance="bordered" onClick={onEdit}>Edit</Link>
    </Inline>
  }
  aside={aside}
>
  {children}
</DetailPageTemplate>;
`;
