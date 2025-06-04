import { z } from "zod";

export const createPermissionSchema = z
  .object({
    route: z.array(
      z
        .string()
        .min(1, "Route is required")
        .startsWith("/", "Route must start with /")
    ),
  })
  .strict();

export const getPermissionByIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updatePermissionSchema = z
  .object({
    id: z.coerce.number().int().positive(),
    route: z.array(
      z
        .string()
        .min(1, "Route is required")
        .startsWith("/", "Route must start with /")
    ),
  })
  .strict();

export const deletePermissionSchema = z.object({
  id: z.coerce.number().int().positive(),
});
