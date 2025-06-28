import { z } from "zod";

const attemptAnswerSchema = z.object({
  question_uuid: z.string().uuid({ message: "Invalid question UUID." }),
  user_answer: z.any(),
  is_correct: z.boolean(),
  answered_at: z.number(),
  question_started_at: z.number(),
  duration: z.number(),
});

export const submitKahootAttemptSchema = z.object({
  form_uuid: z.string().uuid(),
  score: z.number().int().nonnegative(),
  duration_seconds: z.number().int().nonnegative(),
  submitted_at: z.string().datetime(),
  attempt_answers: z.array(attemptAnswerSchema),
});

export type SubmitKahootAttemptSchema = z.infer<
  typeof submitKahootAttemptSchema
>;

export type AttemptAnswerInput = z.infer<typeof attemptAnswerSchema>;