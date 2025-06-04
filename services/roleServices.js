import {
  createRole,
  getRolesWithPermissions,
  updateRolePermission,
} from "../models/roleModels.js";
import logger from "../config/logger.js";

export const createRoleService = async (role_name, permission) => {
  try {
    const role = await createRole(role_name, permission);
    return {
      data: role,
      message: "Role created successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const getRolesWithPermissionService = async () => {
  try {
    const role = await getRolesWithPermissions();
    return {
      data: role,
      message: "Roles retrieved successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const updateRolePermissionService = async (id, permission_id) => {
  try {
    const role = await updateRolePermission(id, permission_id);
    return {
      data: role,
      message: "Role permission updated successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};
