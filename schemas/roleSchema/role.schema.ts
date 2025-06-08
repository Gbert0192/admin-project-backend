import { z } from "zod";

export const createRolePayloadSchema = z
  .object({
    role_name: z.string().min(1, "Role name is required"),
    permission: z
      .array(z.string())
      .min(1, "At least one permission is required"),
  })
  .strict();

export const updateRolePermissionPayloadSchema = z
  .object({
    id: z.coerce.number().int().positive(),
    permission_id: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateRolePayload = z.infer<typeof createRolePayloadSchema>;
export type UpdateRolePermissionPayload = z.infer<
  typeof updateRolePermissionPayloadSchema
>;
