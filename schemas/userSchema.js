import { z } from "zod";

export const getUserIdSchema = z.object({
  id: z.coerce.number().int().positive(),
  // id: z.number().min(1),
});

export const deleteUserSchema = z.object({
  id: z.coerce.number().int().positive(),
  // id: z.number().min(1),
});
