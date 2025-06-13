import { Router } from "express";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  createRolePayloadSchema,
  deleteRolePayloadSchema,
  getRoleQuerySchema,
} from "../schemas/roleSchema/role.schema.js";
import {
  CreateRoleController,
  DeleteRoleController,
  GetRoleController,
  UpdateRolePermissionController,
} from "../controllers/roleControllers.js";

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
RoleRouter.put("/", UpdateRolePermissionController);
RoleRouter.delete(
  "/:uuid",
  ValidateSchema(deleteRolePayloadSchema, "params"),
  DeleteRoleController
);
