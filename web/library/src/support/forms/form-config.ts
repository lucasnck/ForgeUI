import { z } from "zod";
import type { FormConfig, FormFieldsConfig } from "./form-config.types";

export function defineFormConfig<TShape extends z.ZodRawShape>(
  fields: FormFieldsConfig<TShape>,
): FormConfig<TShape> {
  const shape: Record<string, z.ZodType> = {};
  const defaults: Record<string, unknown> = {};

  for (const [key, field] of Object.entries(fields)) {
    if (field.name !== key) {
      throw new Error("Form field keys and name literals must match.");
    }

    shape[key] = field.validation;
    defaults[key] = structuredClone(field.defaultValue);
  }

  return {
    fields,
    schema: z.object(shape as TShape),
    defaultValues: defaults as FormConfig<TShape>["defaultValues"],
  };
}
