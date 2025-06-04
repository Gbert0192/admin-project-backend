import {
  createPermissionSchema,
  deletePermissionSchema,
  getPermissionByIdSchema,
  updatePermissionSchema,
} from "../schemas/permissionSchema.js";
import {
  createPermissionService,
  deletePermissionService,
  getAllPermissionsService,
  getPermissionByIdService,
  updatePermissionService,
} from "../services/permissionServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const createPermissionController = async (req, res) => {
  try {
    const { route } = ValidateSchema(createPermissionSchema, req.body);
    const permission = await createPermissionService(route);
    res.status(201).json({
      data: permission,
      message: "Permission created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPermissionsController = async (req, res) => {
  try {
    const permissions = await getAllPermissionsService();
    res.status(200).json({
      data: permissions,
      message: "Permissions retrieved successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPermissionByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await getPermissionByIdService(id);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json({
      data: permission,
      message: "Permission retrieved successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePermissionController = async (req, res) => {
  try {
    const { id } = ValidateSchema(getPermissionByIdSchema, req.params);
    const { route } = ValidateSchema(updatePermissionSchema, req.body);
    const permission = await updatePermissionService(id, route);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json({
      data: permission,
      message: "Permission updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePermissionController = async (req, res) => {
  try {
    const { id } = ValidateSchema(deletePermissionSchema, req.params);
    const permission = await deletePermissionService(id);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json({
      data: permission,
      message: "Permission deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
