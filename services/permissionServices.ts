import { AppError } from "../middleware/errorMiddleware.js";
import { PermissionModel } from "../models/permissionModel.js";
import {
  PermissionBodySchema,
  PermissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";

export const createPermissionService =
  (permissionModel: PermissionModel) =>
  async (payload: PermissionBodySchema) => {
    const permission = await permissionModel.createPermission(payload);
    if (!permission) {
      throw new AppError("Failed to create permission", 401);
    }
    return permission;
  };

export const getAllPermissionsService =
  (permissionModel: PermissionModel) => async () => {
    const permissions = await permissionModel.getAllPermissions();
    if (!permissions || permissions.length === 0) {
      throw new AppError("No Permissions found", 404);
    }
    return permissions;
  };

export const getPermissionByIdService =
  (permissionModel: PermissionModel) => async (uuid: string) => {
    const permission = await permissionModel.getPermissionById(uuid);
    if (!permission) {
      throw new AppError("Permission not found", 404);
    }
    return permission;
  };

export const updatePermissionService =
  (permissionModel: PermissionModel) =>
  async (payload: PermissionUpdatePayloadSchema) => {
    const permission = await permissionModel.updatePermission(payload);
    if (!permission) {
      throw new AppError("Permission not found", 404);
    }
    return permission;
  };

export const deletePermissionService =
  (permissionModel: PermissionModel) => async (uuid: string) => {
    const permission = await permissionModel.deletePermission(uuid);
    if (!permission) {
      throw new AppError("Permission not found", 404);
    }
    return permission;
  };
