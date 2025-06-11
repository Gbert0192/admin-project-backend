import { Router } from "express";
import {
  CreatePermissionController,
  DeletePermissionController,
  GetAllPermissionsController,
  GetPermissionByIdController,
  UpdatePermissionController,
} from "../controllers/permissionControllers.js";
import {
  permissionBodySchema,
  permissionParamsSchema,
  permissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const PermissionRouter = Router();

PermissionRouter.post(
  "/",
  ValidateSchema(permissionBodySchema, "body"),
  CreatePermissionController
);

PermissionRouter.get("/", GetAllPermissionsController);

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
