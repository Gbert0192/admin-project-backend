import { Router } from "express";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  createRolePayloadSchema,
  deleteRolePayloadSchema,
} from "../schemas/roleSchema/role.schema.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
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
  authMiddleware,
  CreateRoleController
);

RoleRouter.get("/", GetRoleController);
RoleRouter.put("/", authMiddleware, UpdateRolePermissionController);
RoleRouter.delete(
  "/:uuid",
  ValidateSchema(deleteRolePayloadSchema, "params"),
  authMiddleware,
  DeleteRoleController
);
