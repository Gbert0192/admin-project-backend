import { NextFunction, Request, Response } from "express";
import { RoleModel } from "../models/roleModel.js";
import {
  createRoleService,
  deleteRoleService,
  getRoleService,
  updateRolePermissionService,
} from "../services/roleServices.js";
import { createTransaction } from "../config/transaction.js";
import pool from "../config/database.js";
import { pickKey } from "../utils/queryHelper.js";
import { PermissionModel } from "../models/permissionModel.js";

export const CreateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const roleModel = new RoleModel(db);
      const permissionModel = new PermissionModel(db);
      const role = await createRoleService({ roleModel, permissionModel })(
        req.body
      );
      const filteredRole = pickKey(role, [
        "role_name",
        "uuid",
        "permission_id",
        "created_at",
      ]);
      res.send({
        data: filteredRole,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const GetRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleModel = new RoleModel(pool);
    const { data, total, limit } = await getRoleService(roleModel)(
      res.locals.cleaned
    );
    const filteredRole = data.map((item) =>
      pickKey(item, ["role_name", "created_at", "permissions", "uuid"])
    );
    const totalPages = Math.ceil(total / limit);

    res.send({
      data: filteredRole,
      code: 200,
      message: "Roles fetched successfully!",
      total: total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateRolePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const roleModel = new RoleModel(db);
      const permissionModel = new PermissionModel(db);

      const role = await updateRolePermissionService({
        roleModel,
        permissionModel,
      })(req.body);
      const filteredRole = pickKey(role, [
        "role_name",
        "uuid",
        "permission_id",
        "updated_at",
        "created_at",
        "deleted_at",
      ]);
      res.send({
        data: filteredRole,
        code: 200,
        message: "Role permission updated successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleModel = new RoleModel(pool);
    const role = await deleteRoleService(roleModel)(res.locals.cleaned.uuid);
    res.send({
      data: pickKey(role, ["role_name", "uuid", "deleted_at"]),
      code: 200,
      message: "Role deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
