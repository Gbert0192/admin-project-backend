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
export const questionsHuaweiBodySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("SINGLE_CHOICE"),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z
      .array(optionSchema)
      .min(2, "At least 2 options are required for SINGLE CHOICE.")
      .max(6, "No more than 6 options are allowed for SINGLE CHOICE.")
      .superRefine((options, ctx) => {
        const correctOptionsCount = options.filter(
          (opt) => opt.is_correct
        ).length;
        if (correctOptionsCount !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "SINGLE_CHOICE must have exactly one correct option.",
            path: ["options"],
          });
        }
      }),
  }),
  z.object({
    type: z.literal("MULTIPLE_CHOICE"),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z
      .array(optionSchema)
      .min(2, "At least 2 options are required for MULTIPLE CHOICE.")
      .max(6, "No more than 6 options are allowed for MULTIPLE CHOICE.")
      .superRefine((options, ctx) => {
        const correctOptionsCount = options.filter(
          (opt) => opt.is_correct
        ).length;
        if (correctOptionsCount === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "MULTIPLE_CHOICE must have at least one correct option.",
            path: ["options"],
          });
        }
      }),
  }),

  z.object({
    type: z.literal("TRUE_FALSE"),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z
      .array(
        z.object({
          text: z.enum(["True", "False"]),
          is_correct: z.boolean(),
        })
      )
      .length(
        2,
        "TRUE_FALSE questions must have exactly two options: 'True' and 'False'."
      )
      .superRefine((options, ctx) => {
        const trueOption = options.find((opt) => opt.text === "True");
        const falseOption = options.find((opt) => opt.text === "False");

        if (!trueOption || !falseOption) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "TRUE_FALSE options must include 'True' and 'False'.",
            path: ["options"],
          });
          return;
        }

        const correctOptionsCount = options.filter(
          (opt) => opt.is_correct
        ).length;
        if (correctOptionsCount !== 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "TRUE_FALSE must have exactly one true option ('True' or 'False').",
            path: ["options"],
          });
        }
      }),
  }),

  z.object({
    type: z.literal("ESSAY"),
    point: z.number().int().positive().min(1, "Point must be greater than 0"),
    difficulty: z.enum(["EASY", "MEDIUM", "HOT"]),
    question: z.string().min(1, { message: "Question is required." }),
    options: z.object({
      option_text: z.string().min(1, { message: "Answer is required." }),
      is_correct: z.boolean().default(true).optional(),
    }),
  }),
]);
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
