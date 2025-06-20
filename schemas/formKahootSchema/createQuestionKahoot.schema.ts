import {z} from "zod";

export const questionKahootSchema = z.object({
    question_text: z.string().min(1, { message: "Question text is required." }),
    question_type: z.enum(["single_choice", "multiple_choice"]).default("single_choice"),
    duration: z.number().min(5).max(120).default(20),
});

export const questionOptionsKahootSchema = z.object({
    options: z.array(
        z.object({
        option_text: z.string().min(1, { message: "Option text is required." }),
        is_correct: z.boolean().default(false),
        })
    )
});

export const createQuestionWithOptionsSchema = z.object({
  ...questionKahootSchema.shape,
  ...questionOptionsKahootSchema.shape,
});

export type CreateQuestionsWithOptionsSchema = z.infer<typeof createQuestionWithOptionsSchema>;
