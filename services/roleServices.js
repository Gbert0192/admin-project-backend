import { createRole, getRoleById } from "../models/roleModels.js";
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
  }
};

export const getRoleByIdService = async (id) => {
  try {
    const role = await getRoleById(id);
    return {
      data: role,
    };
  } catch (error) {
    logger.warn(error.message);
  }
};
