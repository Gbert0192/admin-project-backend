import {
  createRoleSchema,
  updateRolePermissionSchema,
} from "../schemas/roleSchema.js";
import {
  createRoleService,
  getRolesWithPermissionService,
  updateRolePermissionService,
} from "../services/roleServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const createRoleController = async (req, res) => {
  try {
    const { role_name, permission } = ValidateSchema(
      createRoleSchema,
      req.body
    );
    const role = await createRoleService(role_name, permission);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRolePermissionController = async (req, res) => {
  try {
    const { id, permission_id } = ValidateSchema(
      updateRolePermissionSchema,
      req.body
    );
    const role = await updateRolePermissionService(id, permission_id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json({
      data: role,
      message: "Role permission updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRolesWithPermissionsController = async (req, res) => {
  try {
    const roles = await getRolesWithPermissionService();
    res.status(200).json({
      data: roles,
      message: "Roles retrieved successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
