import { Router } from "express";
import {
  CreatePermissionController,
  DeletePermissionController,
  GetAllPermissionsController,
  GetPermissionByIdController,
  GetPermissionMenuController,
  GetPermissionWithOutMenuController,
  UpdatePermissionController,
} from "../controllers/permissionControllers.js";
import {
  permissionBodySchema,
  permissionParamsSchema,
  permissionQuerySchema,
  permissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const PermissionRouter = Router();

PermissionRouter.post(
  "/",
  ValidateSchema(permissionBodySchema, "body"),
  CreatePermissionController
);

PermissionRouter.get(
  "/",
  ValidateSchema(permissionQuerySchema, "query"),
  GetAllPermissionsController
);

PermissionRouter.get("/no-menu", GetPermissionWithOutMenuController);
PermissionRouter.get("/menu", GetPermissionMenuController);

PermissionRouter.get(
  "/:uuid",
  ValidateSchema(permissionParamsSchema, "params"),
  GetPermissionByIdController
);

PermissionRouter.put(
  "/:uuid",
  ValidateSchema(permissionUpdatePayloadSchema, "body"),
  UpdatePermissionController
);

PermissionRouter.delete(
  "/:uuid",
  ValidateSchema(permissionParamsSchema, "params"),
  DeletePermissionController
);
