import pool from "../config/database.js";
import { UserModel } from "../models/userModel.js";
import {
  getUserByStudentIdService,
  getUserService,
} from "../services/userServices.js";
import { Request, Response } from "express";
import { pickKey } from "../utils/queryHelper.js";

export const GetUserController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const userModel = new UserModel(pool);
  const { users, total } = await getUserService(userModel)(limit, offset);

  const filteredUser = users.data.map((user) =>
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
