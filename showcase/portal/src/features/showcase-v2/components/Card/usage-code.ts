export const basicCode = `import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Icon,
  Inline,
  Button,
} from "@forge-ui/web";

<Card fullWidth>
  <CardHeader>
    <Inline gap="2" align="center" wrap={false}>
      <Icon name="info" size="inherit" />
      <Heading level={4}>Children</Heading>
    </Inline>
  </CardHeader>
  <CardBody>Children</CardBody>
  <CardFooter>
    <Inline
      gap="2"
      align="center"
      justify="end"
      role="group"
      aria-label="Actions"
    >
      <Button variant="outline" tone="neutral" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSave}>Save</Button>
    </Inline>
  </CardFooter>
</Card>;
`;

export const bodyOnlyCode = `import { Card, CardBody } from "@forge-ui/web";

<Card>
  <CardBody>Children</CardBody>
</Card>;
`;
