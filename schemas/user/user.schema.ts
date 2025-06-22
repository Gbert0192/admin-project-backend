import { z } from "zod";

export const getUserIdSchema = z.object({
  student_id: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const deleteUserSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateUserSchema = z.object({
  uuid: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  student_id: z
    .string()
    .regex(/^[0-9]+$/, "Student ID harus berupa angka positif"),
});

export const promoteUserSchema = z.object({
  role_name: z.string().min(1, "Role Name is Required"),
  uuid: z.string(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current Password is required"),
  newPassword: z.string().min(1, "New Password is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
});

export type GetUserIdSchema = z.infer<typeof getUserIdSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type UpdateUserSchemaPayload = z.infer<typeof updateUserSchema>;
export type PromoteUserSchemaPayload = z.infer<typeof promoteUserSchema>;
export type ChangePasswordSchemaPayload = z.infer<typeof changePasswordSchema>;
