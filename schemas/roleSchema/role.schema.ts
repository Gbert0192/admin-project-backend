import { z } from "zod";

export const createRolePayloadSchema = z.object({
  role_name: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()).min(1, "Permission is required"),
});
export const createRolePayloadQuery = z.object({
  role_name: z.string().min(1, "Role name is required"),
  permissions: z
    .array(z.number().int().positive())
    .min(1, "Permission is required"),
});

export const updateRolePermissionPayloadSchema = z.object({
  uuid: z.coerce.string(),
  role_name: z.string().min(1, "Role name is required"),
  permission_id: z.array(z.number().int().positive()),
});

export const deleteRolePayloadSchema = z.object({
  uuid: z.coerce.string(),
});

export const getRoleQuerySchema = z.object({
  role_name: z.coerce.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export type CreateRoleQuery = z.infer<typeof createRolePayloadQuery>;
export type CreateRolePayloaSchema = z.infer<typeof createRolePayloadSchema>;
export type UpdateRolePermissionPayload = z.infer<
  typeof updateRolePermissionPayloadSchema
>;

export type GetRoleQuerySchema = z.infer<typeof getRoleQuerySchema>;
