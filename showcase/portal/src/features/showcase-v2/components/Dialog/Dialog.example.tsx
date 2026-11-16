"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  Icon,
  Heading,
  Text,
  Stack,
  Inline,
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  FormField,
  Input,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useDialogExample } from "./useDialogExample";

function DialogScenario({ edit = false }: { edit?: boolean }) {
  const {
    triggerRef,
    cancelRef,
    copy,
    open,
    show,
    request,
    id,
    properties,
    record,
    draft,
    changeDraft,
    save,
    state,
  } = useDialogExample();

  return (
    <Stack gap="4">
      <Button ref={triggerRef} type="button" onClick={show}>
        {copy.show}
      </Button>
      <Dialog
        title="Title"
        {...properties}
        open={open}
        onOpenChange={request}
        returnFocusRef={triggerRef}
        initialFocusRef={cancelRef}
      >
        <DialogHeader title="Title" icon={<Icon name="info" size="sm" />}>
          <DialogClose aria-label={copy.close} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          {edit ? (
            <Form id={id} onValidSubmit={save}>
              <FormHeader hidden />
              <FormBody>
                <FormField controlId={id + "-input"} label="Label 1">
                  <Input
                    id={id + "-input"}
                    name="Name 1"
                    placeholder="Placeholder 1"
                    required
                    value={draft}
                    onChange={changeDraft}
                  />
                </FormField>
              </FormBody>
              <FormFooter hidden />
            </Form>
          ) : (
            <Stack gap="2">
              <Heading level={3}>{record.title}</Heading>
              <Text>{record.description}</Text>
            </Stack>
          )}
        </DialogBody>
        <DialogFooter>
          <Inline gap="2" align="center" justify="end">
            <DialogClose ref={cancelRef} appearance="outlined">
              {edit ? copy.cancel : copy.close}
            </DialogClose>
            {edit && (
              <Button type="submit" form={id}>
                {copy.save}
              </Button>
            )}
          </Inline>
        </DialogFooter>
      </Dialog>
      <ExampleState value={state} />
    </Stack>
  );
}

export function DialogExample() {
  return <DialogScenario />;
}

export function DialogEditExample() {
  return <DialogScenario edit />;
}
