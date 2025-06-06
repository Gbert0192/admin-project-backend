import { Router } from "express";
import {
  CreatePermissionController,
  DeletePermissionController,
  GetAllPermissionsController,
  GetPermissionByIdController,
  UpdatePermissionController,
} from "../controllers/permissionControllers.js";

export const PermissionRouter = Router();

PermissionRouter.post("/", CreatePermissionController);
PermissionRouter.get("/", GetAllPermissionsController);
PermissionRouter.get("/:id", GetPermissionByIdController);
PermissionRouter.put("/:id", UpdatePermissionController);
PermissionRouter.delete("/:id", DeletePermissionController);
