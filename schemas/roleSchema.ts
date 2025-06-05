import { z } from "zod";

export const createRoleSchema = z
  .object({
    role_name: z.string().min(1, "Role name is required"),
    permission: z
      .array(z.string())
      .min(1, "At least one permission is required"),
  })
  .strict();

export const updateRolePermissionSchema = z
  .object({
    id: z.coerce.number().int().positive(),
    permission_id: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;
export type UpdateRolePermissionSchema = z.infer<typeof updateRolePermissionSchema>; 