import { z } from "zod";

export const permissionBodySchema = z.object({
  permission_name: z.string().min(1, "Permission name is required"),
  route: z
    .string()
    .min(1, "Route is required")
    .startsWith("/", "Route must start with /"),
});

export const permissionParamsSchema = z.object({
  uuid: z.coerce.string().uuid("Invalid UUID format"),
});

export const permissionUpdatePayloadSchema = z.object({
  uuid: z.string().uuid("Invalid UUID format"),
  permission_name: z.string().min(1, "Permission name is required"),
  route: z
    .string()
    .min(1, "Route is required")
    .startsWith("/", "Route must start with /"),
});

export const permissionQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  route: z.string().optional(),
  permission_name: z.string().optional(),
});

export type PermissionBodySchema = z.infer<typeof permissionBodySchema>;
export type PermissionParamsSchema = z.infer<typeof permissionParamsSchema>;
export type PermissionQuerySchema = z.infer<typeof permissionQuerySchema>;

export type PermissionUpdatePayloadSchema = z.infer<
  typeof permissionUpdatePayloadSchema
>;
