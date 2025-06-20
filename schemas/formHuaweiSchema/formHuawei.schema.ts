import { z } from "zod";

export const formHuaweiBodySchema = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  is_published: z.boolean().default(false).optional(),
});

export const formHuaweiQuerySchema = z.object({
  form_title: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const formHuaweiUpdateBodySchema = z.object({
  uuid: z.string().min(1, { message: "UUID is required." }),
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
});

export const formHuaweiDeleteQuerySchema = z.object({
  uuid: z.coerce.string(),
});

export type FormHuaweiBodySchema = z.infer<typeof formHuaweiBodySchema>;
export type FormHuaweiQuerySchema = z.infer<typeof formHuaweiQuerySchema>;
export type FormHuaweiUpdateBodySchema = z.infer<
  typeof formHuaweiUpdateBodySchema
>;
export type FormHuaweiDeleteQuerySchema = z.infer<
  typeof formHuaweiDeleteQuerySchema
>;
