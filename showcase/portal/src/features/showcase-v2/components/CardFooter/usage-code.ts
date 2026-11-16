export const basicCode = `import { Card, CardBody, CardFooter, Inline, Button } from "@forge-ui/web";

<Card fullWidth>
  <CardBody hidden />
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
