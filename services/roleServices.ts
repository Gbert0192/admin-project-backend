import { AppError } from "../middleware/errorMiddleware.js";
import { RoleModel } from "../models/roleModel.js";
import {
  CreateRolePayload,
  UpdateRolePermissionPayload,
} from "../schemas/roleSchema/role.schema.js";
import { Role } from "../schemas/roleSchema/role.type.js";
import { PaginationInterfaceHelper } from "../utils/queryHelper.js";

export const createRoleService =
  (roleModel: RoleModel) => async (payload: CreateRolePayload) => {
    const role = await roleModel.createRole(payload);
    if (!role) {
      throw new AppError("Failed to create role", 401);
    }
    return role;
  };

export const getRoleService =
  (roleModel: RoleModel) => async (query: PaginationInterfaceHelper) => {
    const roles = await roleModel.getRoles(query);
    if (!roles || roles.data.length === 0) {
      throw new AppError("No roles found", 404);
    }
    return {
      data: roles.data,
      total: roles.total,
      limit: roles.limit,
    };
  };

export const updateRolePermissionService =
  (roleModel: RoleModel) => async (payload: UpdateRolePermissionPayload) => {
    const updatedRole = await roleModel.updateRolePermission(payload);
    if (!updatedRole) {
      throw new AppError("Failed to update role permission", 404);
    }
    return updatedRole;
  };

export const deleteRoleService =
  (roleModel: RoleModel) => async (uuid: string) => {
    const deletedRole = await roleModel.deleteRole(uuid);
    if (!deletedRole) {
      throw new AppError("Failed to delete role", 404);
    }
    return deletedRole as Role;
  };
