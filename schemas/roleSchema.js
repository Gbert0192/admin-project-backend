import { z } from "zod";

export const createRoleSchema = z
  .object({
    role_name: z.string().min(1, "Role name is required"),
    permission: z
      .array(z.enum(["create", "read", "update", "delete"]))
      .min(1, "At least one permission is required"),
  })
  .strict();

export const getRoleByIdSchema = z.object({
  id: z.string().min(1, "Role ID is required"),
});
