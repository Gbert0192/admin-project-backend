import { z } from "zod";

// Forms
export const formKahootBodySchema = z.object({
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  is_published: z.boolean().default(false),
  duration: z.string(),
});

export const formKahootQuerySchema = z.object({
  form_title: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const formKahootUpdateBodySchema = z.object({
  uuid: z.coerce.string().uuid({ message: "Invalid UUID format." }),
  form_title: z.string().min(1, { message: "Form Title is required." }),
  form_description: z
    .string()
    .min(1, { message: "Form Description is required." }),
  duration: z.string(),
});

export const formKahootDeleteQuerySchema = z.object({
  uuid: z.coerce.string(),
});

// Options
export const optionsKahootSchema = z.object({
  option_text: z.string().min(1, { message: "Option text is required." }),
  is_correct: z.boolean().default(false),
});

// Questions
export const questionsKahootBodySchema = z
  .object({
    question_text: z.string().min(1, { message: "Question text is required." }),
    question_type: z.enum(["single_choice", "multiple_choice", "true_false"]),
    options: z.array(optionsKahootSchema),
  })
  .refine(
    (data) =>
      (data.question_type !== "single_choice" &&
        data.question_type !== "multiple_choice") ||
      data.options.length > 1,
    {
      message:
        "Options must have more than 1 item for Single Choice or Multiple Choice",
      path: ["options"],
    }
  )
  .refine(
    (data) => data.question_type !== "true_false" || data.options.length === 2,
    {
      message: "True/False must have exactly 2 options.",
      path: ["options"],
    }
  );

export const questionsKahootUpdateBodySchema = z
  .object({
    uuid: z.coerce.string().uuid({ message: "Invalid UUID format." }),
    question_text: z.string().min(1, { message: "Question text is required." }),
    question_type: z.enum(["single_choice", "multiple_choice", "true_false"]),
    options: z.array(optionsKahootSchema),
  })
  .refine(
    (data) =>
      (data.question_type !== "single_choice" &&
        data.question_type !== "multiple_choice") ||
      data.options.length > 1,
    {
      message:
        "Options must have more than 1 item for Single Choice or Multiple Choice",
      path: ["options"],
    }
  )
  .refine(
    (data) => data.question_type !== "true_false" || data.options.length === 2,
    {
      message: "True/False must have exactly 2 options.",
      path: ["options"],
    }
  );

export const questionKahootQuerySchema = z.object({
  question: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const answerSubmissionSchema = z.object({
  questionUuid: z.coerce.string().uuid(),
  playerUuid: z.coerce.string().uuid(),
  answered_at: z.number(),
  selected_option: z.string(),
  question_started_at: z.number(),
});

export const publishFormKahootBodySchema = z.object({
  uuid: z.coerce.string().uuid({ message: "Invalid UUID format." }),
  is_published: z.boolean().default(true),
  single_choice_question: z.string(),
  multiple_choice_question: z.string(),
  true_false_question: z.string(),
});

// Form
export type FormKahootBodySchema = z.infer<typeof formKahootBodySchema>;
export type FormKahootQuerySchema = z.infer<typeof formKahootQuerySchema>;
export type FormKahootUpdateBodySchema = z.infer<
  typeof formKahootUpdateBodySchema
>;
export type FormKahootDeleteQuerySchema = z.infer<
  typeof formKahootDeleteQuerySchema
>;

// Options
export type OptionsKahootSchema = z.infer<typeof optionsKahootSchema>;

// Questions
export type QuestionsKahootBodySchema = z.infer<
  typeof questionsKahootBodySchema
>;
export type QuestionsKahootUpdateBodySchema = z.infer<
  typeof questionsKahootUpdateBodySchema
>;
export type QuestionKahootQuerySchema = z.infer<
  typeof questionKahootQuerySchema
>;

export type AnswerSubmissionSchema = z.infer<typeof answerSubmissionSchema>;

export type PublishFormKahootBodySchema = z.infer<
  typeof publishFormKahootBodySchema
>;
