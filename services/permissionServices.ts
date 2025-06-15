import { AppError } from "../middleware/errorMiddleware.js";
import { PermissionModel } from "../models/permissionModel.js";
import {
  PermissionBodySchema,
  PermissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";
import { PaginationInterfaceHelper } from "../utils/queryHelper.js";

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
  (permissionModel: PermissionModel) => async (query: PaginationInterfaceHelper) => {
    const permissions = await permissionModel.getAllPermissions(query);
    if (!permissions) {
      throw new AppError("Failed to get permissions", 401);
    }
    return {
      data: permissions.data,
      total: permissions.total,
      limit: permissions.limit,
    };
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
      throw new AppError("Failed to update permission", 401);
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
