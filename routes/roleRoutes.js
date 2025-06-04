import { Router } from "express";
import {
  createRoleController,
  getRolesWithPermissionsController,
  updateRolePermissionController,
} from "../controllers/roleControllers.js";
export const RoleRouter = Router();

RoleRouter.post("/", createRoleController);
RoleRouter.put("/:id", updateRolePermissionController);
RoleRouter.get("/with-permissions", getRolesWithPermissionsController);
