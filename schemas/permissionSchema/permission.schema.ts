import { z } from "zod";

export const permissionBodySchema = z.object({
  permission_name: z.string().min(1, "Permission name is required"),
  route: z.string().min(1, "Route is required").startsWith("/", "Route must start with /")
  
});

export const permissionParamsSchema = z.object({
  uuid: z.coerce.string().uuid("Invalid UUID format"),
});

export const permissionUpdatePayloadSchema = z.object({
  uuid: z.string().uuid("Invalid UUID format"),
  permission_name: z.string().min(1, "Permission name is required"),
  route: 
    z
      .string()
      .min(1, "Route is required")
      .startsWith("/", "Route must start with /")
  });

export type PermissionBodySchema = z.infer<typeof permissionBodySchema>;
export type PermissionParamsSchema = z.infer<typeof permissionParamsSchema>;

export type PermissionUpdatePayloadSchema = z.infer<
  typeof permissionUpdatePayloadSchema
>;
