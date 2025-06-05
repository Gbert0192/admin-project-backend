import { z, ZodType } from "zod";

export function ValidateSchema<T extends ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}
