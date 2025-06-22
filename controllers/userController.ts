import pool from "../config/database.js";
import { UserModel } from "../models/userModel.js";
import {
  changePasswordUserService,
  getUserAdminService,
  getUserByStudentIdService,
  getUserService,
  promoteUserService,
  updateUserService,
} from "../services/userServices.js";
import { NextFunction, Request, Response } from "express";
import { pickKey } from "../utils/queryHelper.js";
import { RoleModel } from "../models/roleModel.js";
import { createTransaction } from "../config/transaction.js";

export const GetUserController = async (req: Request, res: Response) => {
  const userModel = new UserModel(pool);
  const { data, total, limit } = await getUserService(userModel)(
    res.locals.cleaned
  );

  const filteredUser = data.map((user) =>
    pickKey(user, [
      "uuid",
      "name",
      "student_id",
      "created_at",
      "updated_at",
      "deleted_at",
    ])
  );

  const totalPages = Math.ceil(total / limit);

  res.send({
    data: filteredUser,
    code: 200,
    message: "Get User Successfully",
    total: total,
    totalPages,
  });
};

export const GetUserAdminController = async (req: Request, res: Response) => {
  const userModel = new UserModel(pool);
  const { data, total, limit } = await getUserAdminService(userModel)(
    res.locals.cleaned
  );

  const filteredUser = data.map((user) =>
    pickKey(user, [
      "uuid",
      "name",
      "student_id",
      "created_at",
      "updated_at",
      "deleted_at",
    ])
  );

  const totalPages = Math.ceil(total / limit);

  res.send({
    data: filteredUser,
    code: 200,
    message: "Get User Successfully",
    total: total,
    totalPages,
  });
};
export const GetUserControllerByStudentId = async (
  req: Request,
  res: Response
) => {
  const userModel = new UserModel(pool);
  const student_id = req.params.student_id;
  const user = await getUserByStudentIdService(userModel)(student_id);
  if (!user) {
    res.send({ data: null, code: 404, message: "User not found" });
  }
  res.send({ data: user, code: 200, message: "Get User Successfully" });
};

export const UpdateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const userModel = new UserModel(db);
      const user = await updateUserService(userModel)(req.body);
      if (!user) {
        res.send({ data: null, code: 404, message: "User not found" });
      }
      res.send({ data: user, code: 200, message: "Get User Successfully" });
    });
  } catch (error) {
    next(error);
  }
};

export const PromoteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const userModel = new UserModel(db);
      const roleModel = new RoleModel(db);
      const user = await promoteUserService({ userModel, roleModel })(req.body);
      res.send({ data: user, code: 200, message: "Get User Successfully" });
    });
  } catch (error) {
    next(error);
  }
};

export const ChangePasswordUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const userModel = new UserModel(db);
      const userUuid = req?.user?.uuid;
      const user = await changePasswordUserService(userModel)(
        req.body,
        userUuid!
      );

      const filteredUser = pickKey(user, [
        "uuid",
        "name",
        "student_id",
        "created_at",
        "updated_at",
        "deleted_at",
      ]);

      res.send({
        data: filteredUser,
        code: 200,
        message: "Get User Successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};
