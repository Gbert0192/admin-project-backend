import { PermissionModel } from "../models/permissionModel.js";

export const createPermissionService =
  (permissionModel: PermissionModel) => async (routes: string[]) => {
    try {
      return permissionModel.createPermission(routes);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

export const getAllPermissionsService =
  (permissionModel: PermissionModel) => async () => {
    try {
      return permissionModel.getAllPermissions();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

export const getPermissionByIdService =
  (permissionModel: PermissionModel) => async (id: number) => {
    try {
      const permission = await permissionModel.getPermissionById(id);
      if (!permission) {
        throw new Error("Permission not found");
      }
      return permission;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

export const updatePermissionService =
  (permissionModel: PermissionModel) => async (id: number, route: string) => {
    try {
      const permission = await permissionModel.updatePermission(id, route);
      if (!permission) {
        throw new Error("Permission not found");
      }
      return permission;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

export const deletePermissionService =
  (permissionModel: PermissionModel) => async (id: number) => {
    try {
      const permission = await permissionModel.deletePermission(id);
      if (!permission) {
        throw new Error("Permission not found");
      }
      return permission;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
