import pool from "../config/database.js";
import { PermissionModel } from "../models/permissionModel.js";
import {
  createPermissionService,
  getAllPermissionsService,
  getPermissionByIdService,
  updatePermissionService,
  deletePermissionService,
} from "../services/permissionServices.js";
import { pickKey } from "../utils/queryHelper.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  permissionBodySchema,
  permissionParamsSchema,
} from "../schemas/permissionSchema.js";
export const CreatePermissionController = async (req, res) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const { route } = ValidateSchema(permissionBodySchema, req.body);
    const permission = await createPermissionService(permissionModel)(route);
    const filteredPermission = pickKey(permission, [
      "route",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);
    res.send({
      data: filteredPermission,
      code: 201,
      message: "Permission created successfully!",
    });
  } catch (error) {
    res.send({ code: 500, message: error.message });
    return;
  }
};
export const GetAllPermissionsController = async (req, res) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const permissions = await getAllPermissionsService(permissionModel)();
    const filteredPermissions = permissions.map((permission) => {
      return pickKey(permission, [
        "route",
        "created_at",
        "updated_at",
        "deleted_at",
      ]);
    });
    res.send({
      data: filteredPermissions,
      code: 200,
      message: "Get all permissions successfully!",
    });
  } catch (error) {
    res.send({ code: 500, message: error.message });
    return;
  }
};
export const GetPermissionByIdController = async (req, res) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const { id } = ValidateSchema(permissionParamsSchema, req.params);
    const permission = await getPermissionByIdService(permissionModel)(id);
    if (!permission) {
      res.send({
        code: 404,
        message: "Permission not found",
      });
      return;
    }
    const filteredPermission = pickKey(permission, [
      "route",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);
    res.send({
      data: filteredPermission,
      code: 200,
      message: "Get permission successfully!",
    });
  } catch (error) {
    res.send({ code: 500, message: error.message });
    return;
  }
};
export const UpdatePermissionController = async (req, res) => {
  try {
    const { id } = ValidateSchema(permissionParamsSchema, req.params);
    const { route } = ValidateSchema(permissionBodySchema, req.body);
    const permissionModel = new PermissionModel(pool);
    const permission = await updatePermissionService(permissionModel)(
      id,
      Array.isArray(route) ? route[0] : route
    );
    if (!permission) {
      res.send({
        code: 404,
        message: "Permission not found",
      });
      return;
    }
    const filteredPermission = pickKey(permission, [
      "route",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);
    res.send({
      data: filteredPermission,
      code: 200,
      message: "Permission updated successfully!",
    });
  } catch (error) {
    res.send({ code: 500, message: error.message });
    return;
  }
};
export const DeletePermissionController = async (req, res) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const { id } = ValidateSchema(permissionParamsSchema, req.params);
    const permission = await deletePermissionService(permissionModel)(id);
    if (!permission) {
      res.send({
        code: 404,
        message: "Permission not found",
      });
      return;
    }
    const filteredPermission = pickKey(permission, [
      "route",
      "created_at",
      "updated_at",
      "deleted_at",
    ]);
    res.send({
      data: filteredPermission,
      code: 200,
      message: "Permission deleted successfully!",
    });
    return;
  } catch (error) {
    res.send({
      code: 500,
      message: error.message,
    });
    return;
  }
};
//# sourceMappingURL=permissionControllers.js.map
