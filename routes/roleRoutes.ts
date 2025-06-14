import { Router } from "express";
import {
  CreateRoleController,
  DeleteRoleController,
  GetRoleController,
  UpdateRolePermissionController,
} from "../controllers/roleControllers.js";
import {
  createRolePayloadSchema,
  deleteRolePayloadSchema,
  getRoleQuerySchema,
  updateRolePermissionPayloadSchema,
} from "../schemas/roleSchema/role.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const RoleRouter = Router();

RoleRouter.post(
  "/",
  ValidateSchema(createRolePayloadSchema, "body"),
  CreateRoleController
);

RoleRouter.get(
  "/",
  ValidateSchema(getRoleQuerySchema, "query"),
  GetRoleController
);
RoleRouter.put(
  "/",
  ValidateSchema(updateRolePermissionPayloadSchema, "body"),
  UpdateRolePermissionController
);
RoleRouter.delete(
  "/:uuid",
  ValidateSchema(deleteRolePayloadSchema, "params"),
  DeleteRoleController
);
