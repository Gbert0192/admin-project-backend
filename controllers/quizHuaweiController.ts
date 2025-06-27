import { Request, Response, NextFunction } from "express";
import pool from "../config/database.js";
import { QuizHuaweiModel } from "../models/quizHuaweiModel.js";
import {
  getQuizHistoryService,
  postQuizService,
} from "../services/quizHuaweiServices.js";
import { UserModel } from "../models/userModel.js";
import { createTransaction } from "../config/transaction.js";
import { FormHuaweiModel } from "../models/formHuaweiModel.js";

export const GetQuizHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formHuaweiModel = new QuizHuaweiModel(pool);
    const userModel = new UserModel(pool);
    const userUuid = req?.user?.uuid;
    const data = await getQuizHistoryService(
      formHuaweiModel,
      userModel
    )(userUuid!);

    res.send({
      data: data,
      code: 201,
      message: "Get Form successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const PostQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return await createTransaction(pool)(async (db) => {
      const userModel = new UserModel(db);
      const formHuaweiModel = new FormHuaweiModel(db);
      const quizHuaweiModel = new QuizHuaweiModel(db);
      const userUuid = req?.user?.uuid;
      const quiz = await postQuizService({
        formHuaweiModel,
        userModel,
        quizHuaweiModel,
      })(req.body, userUuid!);

      res.send({
        data: quiz,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};
