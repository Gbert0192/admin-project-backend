import { z } from "zod";

export const formBodySchema = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  max_total_score: z.number().max(1000).min(100).default(100),
  max_questions: z.number().max(60).min(10).default(10),
});

export const formQuerySchema = z.object({
  form_name: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export type FormBodySchema = z.infer<typeof formBodySchema>;
export type FormQuerySchema = z.infer<typeof formQuerySchema>;
