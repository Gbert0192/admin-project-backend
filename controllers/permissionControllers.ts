import { NextFunction, Request, RequestHandler, Response } from "express";
import pool from "../config/database.js";
import { PermissionModel } from "../models/permissionModel.js";
import {
  createPermissionService,
  deletePermissionService,
  getAllPermissionsService,
  getPermissionByIdService,
  getPermissionMenuService,
  getPermissionWithOutMenuService,
  updatePermissionService,
} from "../services/permissionServices.js";
import { pickKey } from "../utils/queryHelper.js";
import { createTransaction } from "../config/transaction.js";

export const CreatePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const permissionModel = new PermissionModel(db);
      const permission = await createPermissionService(permissionModel)(
        req.body
      );
      const filteredPermission = pickKey(permission, [
        "uuid",
        "is_menu",
        "route",
        "method",
        "permission_name",
        "created_at",
        "updated_at",
        "deleted_at",
      ]);
      res.send({
        data: filteredPermission,
        code: 201,
        message: "Permission created successfully!",
      });
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
    const { data, total, limit } = await getAllPermissionsService(
      permissionModel
    )(res.locals.cleaned);

    const filteredPermissions = data.map((permission) => {
      return pickKey(permission, [
        "uuid",
        "is_menu",
        "method",
        "route",
        "permission_name",
        "created_at",
        "updated_at",
        "deleted_at",
      ]);
    });

    const totalPages = Math.ceil(total / limit);

    res.send({
      data: filteredPermissions,
      code: 200,
      message: "Get all permissions successfully!",
      total: total,
      totalPages,
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
      "uuid",
      "route",
      "permission_name",
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
      "uuid",
      "route",
      "permission_name",
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
      "uuid",
      "route",
      "permission_name",
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

export const GetPermissionWithOutMenuController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const data = await getPermissionWithOutMenuService(permissionModel)();

    const filteredPermissions = data.map((permission) => {
      return pickKey(permission, [
        "uuid",
        "method",
        "route",
        "is_menu",
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

export const GetPermissionMenuController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissionModel = new PermissionModel(pool);
    const data = await getPermissionMenuService(permissionModel)();

    const filteredPermissions = data.map((permission) => {
      return pickKey(permission, [
        "uuid",
        "method",
        "route",
        "is_menu",
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
