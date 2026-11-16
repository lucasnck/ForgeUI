export const basicCode = `import { FormPageTemplate, Form, FormHeader, FormBody, FormFooter, Button } from "@forge-ui/web";

<FormPageTemplate titleId="form-title" pageTitle="PageTitle" notice={notice}>
  <Form onValidSubmit={onValidSubmit} loading={loading}>
    <FormHeader>Children</FormHeader>
    <FormBody>{children}</FormBody>
    <FormFooter className={formActionsClassName}>
      <Button type="button" tone="neutral" appearance="ghost" onClick={onCancel}>Cancel</Button>
      <Button type="submit" tone="brand" appearance="solid" loading={loading}>Save</Button>
    </FormFooter>
  </Form>
</FormPageTemplate>;
`;

export const editCode = `import { FormPageTemplate, Form, FormHeader, FormBody, FormFooter, Button } from "@forge-ui/web";

<FormPageTemplate titleId="edit-title" pageTitle="PageTitle" identity={identity} notice={notice}>
  <Form onValidSubmit={onValidSubmit} loading={loading}>
    <FormHeader>Children</FormHeader>
    <FormBody>{children}</FormBody>
    <FormFooter className={formActionsClassName}>
      <Button type="button" tone="neutral" appearance="ghost" onClick={onCancel}>Cancel</Button>
      <Button type="submit" tone="brand" appearance="solid" loading={loading}>Save</Button>
    </FormFooter>
  </Form>
</FormPageTemplate>;
`;
