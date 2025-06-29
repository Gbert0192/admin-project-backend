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

const optionSchema = z.object({
  option_text: z.string().min(1, { message: "Option text is required." }),
  is_correct: z.boolean(),
});

export const questionsHuaweiBodySchema = z
  .object({
    type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE", "ESSAY"]),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z.array(optionSchema),
  })
  .refine(
    (data) =>
      (data.type !== "SINGLE_CHOICE" && data.type !== "MULTIPLE_CHOICE") ||
      data.options.length > 1,
    {
      message:
        "Options must have more than 1 item for Single Choice or Multiple Choice",
      path: ["options"],
    }
  )
  .refine((data) => data.type !== "TRUE_FALSE" || data.options.length === 2, {
    message: "True/False must have exactly 2 options.",
    path: ["options"],
  })
  .refine((data) => data.type !== "ESSAY" || data.options.length === 1, {
    message: "Essay must only have 1  option.",
    path: ["options"],
  });

export const questionsHuaweiUpdateBodySchema = z
  .object({
    formUuid: z.string(),
    uuid: z.string().min(1, { message: "UUID is required." }),
    type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE", "ESSAY"]),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z.array(optionSchema),
  })
  .refine(
    (data) =>
      (data.type !== "SINGLE_CHOICE" && data.type !== "MULTIPLE_CHOICE") ||
      data.options.length > 1,
    {
      message:
        "Options must have more than 1 item for Single Choice or Multiple Choice",
      path: ["options"],
    }
  )
  .refine((data) => data.type !== "TRUE_FALSE" || data.options.length === 2, {
    message: "True/False must have exactly 2 options.",
    path: ["options"],
  })
  .refine((data) => data.type !== "ESSAY" || data.options.length === 1, {
    message: "Essay must only have 1  option.",
    path: ["options"],
  });

export const publishFormBodySchema = z.object({
  uuid: z.string().min(1, { message: "UUID is required." }),
  is_published: z.boolean().default(true),
  durations: z.string(),
  essay_question: z.string(),
  multiple_choice_question: z.string(),
  single_choice_question: z.string(),
  true_false_question: z.string(),
});

export const formHuaweiQuestionQuerySchema = z.object({
  question: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export type FormHuaweiBodySchema = z.infer<typeof formHuaweiBodySchema>;
export type FormHuaweiQuerySchema = z.infer<typeof formHuaweiQuerySchema>;
export type FormHuaweiUpdateBodySchema = z.infer<
  typeof formHuaweiUpdateBodySchema
>;
export type FormHuaweiDeleteQuerySchema = z.infer<
  typeof formHuaweiDeleteQuerySchema
>;

export type QuestionsHuaweiBodySchema = z.infer<
  typeof questionsHuaweiBodySchema
>;

export type OptionHuaweiSchema = z.infer<typeof optionSchema>;

export type PublishFormBodySchema = z.infer<typeof publishFormBodySchema>;

export type FormHuaweiQuestionQuerySchema = z.infer<
  typeof formHuaweiQuestionQuerySchema
>;

export type QuestionsHuaweiUpdateBodySchema = z.infer<
  typeof questionsHuaweiUpdateBodySchema
>;
