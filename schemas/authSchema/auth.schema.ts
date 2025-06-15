import { z } from "zod";

export const loginPayloadSchema = z.object({
  student_id: z.string().min(1, "Nama wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  student_id: z.string().min(1, "Student Id Is Required"),
  name: z.string().min(1, "Nama wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role_name: z.string().min(1, "Role Name Is Required"),
});

export const registerQuerySchema = z.object({
  student_id: z.string().min(1, "Student Id Is Required"),
  name: z.string().min(1, "Nama wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role_id: z.number(),
});

// export const UserLoginPayload = z.object({
//   student_id: z.string().min(1, "Student Id Is Required"),
//   password: z.string().min(6, "Password minimal 6 karakter"),
// });

export type LoginSchema = z.infer<typeof loginPayloadSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterQuerySchema = z.infer<typeof registerQuerySchema>;
