"use client";
import {
  PageHeader,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Stack,
  Container,
  Surface,
  Text,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePageHeaderExample } from "./usePageHeaderExample";

export function PageHeaderExample() {
  const view = usePageHeaderExample();

  return (
    <Container padding="4">
      <Stack gap="4">
        <PageHeader
          titleId={view.id + "-title"}
          pageTitle="PageTitle"
          description="Description"
          {...view.properties}
          identity={<Avatar label="Identity" initials="I" />}
          breadcrumb={
            <Breadcrumb label="Breadcrumb">
              <BreadcrumbItem href={"#" + view.id + "-record"} onClick={view.navigate}>
                Children 1
              </BreadcrumbItem>
              <BreadcrumbItem current>Children 2</BreadcrumbItem>
            </Breadcrumb>
          }
          actions={
            <>
              <Button type="button" appearance="outlined" onClick={view.cancel}>
                Cancel
              </Button>
              <Button type="button" onClick={view.save}>
                Save
              </Button>
            </>
          }
        />
        <Surface id={view.id + "-record"} padding="4" shape="rounded">
          <Text>Children</Text>
        </Surface>
        <ExampleState value={view.state} />
      </Stack>
    </Container>
  );
}
