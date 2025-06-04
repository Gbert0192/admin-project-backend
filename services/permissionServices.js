import logger from "../config/logger.js";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
} from "../models/permissionModel.js";

export const createPermissionService = async (route) => {
  try {
    const permission = await createPermission(route);
    return {
      data: permission,
      message: "Permission created successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const getAllPermissionsService = async () => {
  try {
    const permissions = await getAllPermissions();
    return {
      data: permissions,
      message: "Permissions retrieved successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const getPermissionByIdService = async (id) => {
  try {
    const permission = await getPermissionById(id);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return {
      data: permission,
      message: "Permission retrieved successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const updatePermissionService = async (id, route) => {
  try {
    const permission = await updatePermission(id, route);
    return {
      data: permission,
      message: "Permission updated successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const deletePermissionService = async (id) => {
  try {
    const permission = await deletePermission(id);
    return {
      data: permission,
      message: "Permission deleted successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};
