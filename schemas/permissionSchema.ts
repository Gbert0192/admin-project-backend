import { z } from "zod";

export const permissionBodySchema = z
  .object({
    route: z.array(
      z
        .string()
        .min(1, "Route is required")
        .startsWith("/", "Route must start with /")
    ),
  })
  .strict();

export const permissionParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type PermissionBodySchema = z.infer<typeof permissionBodySchema>;
export type PermissionParamsSchema = z.infer<typeof permissionParamsSchema>;
