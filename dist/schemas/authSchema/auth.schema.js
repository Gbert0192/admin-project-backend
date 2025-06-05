import { z } from "zod";
export const loginPayloadSchema = z.object({
    student_id: z.string().min(1, "Nama wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});
export const registerSchema = z.object({
    student_id: z.string().min(1, "Student Id Is Required"),
    name: z.string().min(1, "Nama wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    role_id: z.number().default(1),
});
//# sourceMappingURL=auth.schema.js.map