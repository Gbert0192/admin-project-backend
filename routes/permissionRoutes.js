import { Router } from "express";
import {
  createPermissionController,
  deletePermissionController,
  getAllPermissionsController,
  getPermissionByIdController,
  updatePermissionController,
} from "../controllers/permissionControllers.js";

export const PermissionRouter = Router();

PermissionRouter.post("/", createPermissionController);
PermissionRouter.get("/", getAllPermissionsController);
PermissionRouter.get("/:id", getPermissionByIdController);
PermissionRouter.put("/:id", updatePermissionController);
PermissionRouter.delete("/:id", deletePermissionController);
