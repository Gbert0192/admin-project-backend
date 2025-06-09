import { Router } from "express";
import {
  CreatePermissionController,
  DeletePermissionController,
  GetAllPermissionsController,
  GetPermissionByIdController,
  UpdatePermissionController,
} from "../controllers/permissionControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  permissionBodySchema,
  permissionParamsSchema,
  permissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";

export const PermissionRouter = Router();

PermissionRouter.post(
  "/",
  ValidateSchema(permissionBodySchema, "body"),
  authMiddleware,
  CreatePermissionController
);

PermissionRouter.get("/", GetAllPermissionsController);

PermissionRouter.get(
  "/:uuid",
  ValidateSchema(permissionParamsSchema, "params"),
  authMiddleware,
  GetPermissionByIdController
);

PermissionRouter.put(
  "/:uuid",
  ValidateSchema(permissionUpdatePayloadSchema, "body"),
  authMiddleware,
  UpdatePermissionController
);

PermissionRouter.delete(
  "/:uuid",
  ValidateSchema(permissionParamsSchema, "params"),
  authMiddleware,
  DeletePermissionController
);
