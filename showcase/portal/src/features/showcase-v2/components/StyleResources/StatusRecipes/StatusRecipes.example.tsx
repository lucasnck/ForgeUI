"use client";
import {
  Stack,
  Inline,
  Badge,
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
  Icon,
  Text,
  Button,
} from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useStatusRecipesExample } from "./useStatusRecipesExample";

export function StatusRecipesExample() {
  const view = useStatusRecipesExample();
  const {
    tone: viewTone,
    changeTone: viewChangeTone,
    action: viewAction,
    copy: viewCopy,
    actions: viewActions,
  } = view;

  return (
    <Stack gap="3">
      <ExampleControls>
        <SelectControl
          label="tone"
          value={viewTone}
          options={["success", "warning", "danger", "info"]}
          onChange={viewChangeTone}
        />
      </ExampleControls>
      <Badge tone={viewTone}>Children</Badge>
      <Alert>
        <AlertHeader>
          <Inline gap="2">
            <Icon name="info" />
            <Text>Title 1</Text>
          </Inline>
        </AlertHeader>
        <AlertBody>Description 1</AlertBody>
        <AlertFooter>
          <Inline gap="2" justify="end">
            <Button variant="outline" onClick={viewAction}>
              {viewCopy.dismiss}
            </Button>
          </Inline>
        </AlertFooter>
      </Alert>
      <EmptyState>
        <EmptyStateHeader>
          <Inline gap="2">
            <Icon name="search" />
            <Text>Title 2</Text>
          </Inline>
        </EmptyStateHeader>
        <EmptyStateBody>Description 2</EmptyStateBody>
        <EmptyStateFooter>
          <Inline gap="2" justify="end">
            <Button onClick={viewAction}>{viewCopy.addItem}</Button>
          </Inline>
        </EmptyStateFooter>
      </EmptyState>
      <ErrorState>
        <ErrorStateHeader>
          <Inline gap="2">
            <Icon name="info" />
            <Text>Title 3</Text>
          </Inline>
        </ErrorStateHeader>
        <ErrorStateBody>Description 3</ErrorStateBody>
        <ErrorStateFooter>
          <Inline gap="2" justify="end">
            <Button onClick={viewAction}>{viewCopy.retry}</Button>
          </Inline>
        </ErrorStateFooter>
      </ErrorState>
      <ResourceState value={{ tone: viewTone, actions: viewActions }} />
    </Stack>
  );
}
