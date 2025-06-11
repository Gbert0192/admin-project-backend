import { Router } from "express";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  createRolePayloadSchema,
  deleteRolePayloadSchema,
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

RoleRouter.get("/", GetRoleController);
RoleRouter.put("/", UpdateRolePermissionController);
RoleRouter.delete(
  "/:uuid",
  ValidateSchema(deleteRolePayloadSchema, "params"),
  DeleteRoleController
);
