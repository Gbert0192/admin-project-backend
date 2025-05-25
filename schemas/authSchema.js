import { z } from "zod";

export const loginSchema = z
  .object({
    nim: z.string().min(1, "Nama wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  })
  .strip();

export const registerSchema = z.object({
  nim: z.string().min(1, "Nama wajib diisi"),
  name: z.string().min(1, "Nama wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
