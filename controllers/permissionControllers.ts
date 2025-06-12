import pool from "../config/database.js";
import { NextFunction, RequestHandler } from "express";
import { PermissionModel } from "../models/permissionModel.js";
import {
  createPermissionService,
  getAllPermissionsService,
  getPermissionByIdService,
  updatePermissionService,
  deletePermissionService,
} from "../services/permissionServices.js";
import { Request, Response } from "express";
import { pickKey } from "../utils/queryHelper.js";

export const CreatePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const permission = await createPermissionService(permissionModel)(req.body);
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
    next(error);
  }
};

export const GetAllPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const permissions = await getAllPermissionsService(permissionModel)();
    const filteredPermissions = permissions.map((permission) => {
      return pickKey(permission, [
        "uuid",
        "route",
        "permission_name",
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
    next(error);
  }
};

export const GetPermissionByIdController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const uuid = req.params.uuid;
    const permission = await getPermissionByIdService(permissionModel)(uuid);
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
    next(error);
  }
};

export const UpdatePermissionController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const permission = await updatePermissionService(permissionModel)(req.body);
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
    next(error);
  }
};

export const DeletePermissionController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const uuid = req.params.uuid;
    const permission = await deletePermissionService(permissionModel)(uuid);
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
    next(error);
  }
};
