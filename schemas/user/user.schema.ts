import { z } from "zod";

export const getUserIdSchema = z.object({
  student_id: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const deleteUserSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type GetUserIdSchema = z.infer<typeof getUserIdSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
