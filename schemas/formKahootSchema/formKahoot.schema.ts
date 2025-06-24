import { z } from "zod";

export const formKahootBodySchema = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  is_published: z.boolean().default(false),
});

export const formKahootQuerySchema = z.object({
  form_name: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const formKahootUpdateBodySchema = z.object({
  uuid: z.coerce.string().uuid({ message: "Invalid UUID format." }),
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  is_published: z.boolean().default(false),
});

export const formKahootDeleteQuerySchema = z.object({
  uuid: z.coerce.string(),
});

export type FormKahootBodySchema = z.infer<typeof formKahootBodySchema>;
export type FormKahootQuerySchema = z.infer<typeof formKahootQuerySchema>;
export type FormKahootUpdateBodySchema = z.infer<
  typeof formKahootUpdateBodySchema
>;
export type FormKahootDeleteQuerySchema = z.infer<
  typeof formKahootDeleteQuerySchema
>;
