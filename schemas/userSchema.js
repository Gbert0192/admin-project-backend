import { z } from "zod";

export const getUserIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const deleteUserSchema = z.object({
  id: z.coerce.number().int().positive(),
});
