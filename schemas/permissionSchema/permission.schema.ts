import { z } from "zod";

export const permissionBodySchema = z.object({
  permission_name: z.string().min(1, "Permission name is required"),
  route: z
    .string()
    .min(1, "Route is required")
    .startsWith("/", "Route must start with /"),
  method: z.array(z.enum(["GET", "POST", "PUT", "DELETE"])),
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
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  route: z.string().optional(),
  permission_name: z.string().optional(),
});

export type PermissionBodySchema = z.infer<typeof permissionBodySchema>;
export type PermissionParamsSchema = z.infer<typeof permissionParamsSchema>;
export type PermissionQuerySchema = z.infer<typeof permissionQuerySchema>;

export type PermissionUpdatePayloadSchema = z.infer<
  typeof permissionUpdatePayloadSchema
>;
