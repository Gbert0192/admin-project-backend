import { z } from "zod";

const attemptAnswerSchema = z.object({
  question_uuid: z.string().uuid({ message: "Invalid question UUID." }),
  user_answer: z.array(z.string()),
  is_correct: z.boolean(),
});

export const submitQuizPayload = z.object({
  form_uuid: z.string().uuid({ message: "Invalid form UUID." }),
  score: z.number().int().nonnegative(),
  duration_seconds: z.number().int().nonnegative(),
  max_score: z.number().int().nonnegative(),
  attempt_answers: z.array(attemptAnswerSchema),
});

export type SubmitQuizPayloadType = z.infer<typeof submitQuizPayload>;
