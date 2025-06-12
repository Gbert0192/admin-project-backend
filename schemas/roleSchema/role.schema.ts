import { z } from "zod";

export const createRolePayloadSchema = z.object({
  role_name: z.string().min(1, "Role name is required"),
  permissions: z.array(z.number().int().positive()),
});

export const updateRolePermissionPayloadSchema = z.object({
  uuid: z.coerce.string(),
  role_name: z.string().min(1, "Role name is required"),
  permission_id: z.array(z.number().int().positive()),
});

export const deleteRolePayloadSchema = z.object({
  uuid: z.coerce.string(),
});

export type CreateRolePayload = z.infer<typeof createRolePayloadSchema>;
export type UpdateRolePermissionPayload = z.infer<
  typeof updateRolePermissionPayloadSchema
>;
