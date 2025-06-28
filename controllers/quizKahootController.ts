import { Request, Response, NextFunction } from "express";
import pool from "../config/database.js";
import { QuizKahootModel } from "../models/quizKahootModel.js";
import { UserModel } from "../models/userModel.js";
import { FormKahootModel } from "../models/formKahootModel.js";
import { submitKahootAttemptService, getQuizHistoryService } from "../services/quizKahootServices.js";
import { createTransaction } from "../config/transaction.js";

export const SubmitKahootAttemptController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const quizKahootModel = new QuizKahootModel(db);
      const userModel = new UserModel(db);
      const formKahootModel = new FormKahootModel(db);
      const userUuid = req?.user?.uuid;

      const result = await submitKahootAttemptService({
        quizKahootModel,
        userModel,
        formKahootModel,
      })(req.body, userUuid!);

      res.send({
        data: result.attempt,
        code: 201,
        message: result.message,
      });
    });
  } catch (error) {
    next(error);
  }
};

export const GetKahootHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizKahootModel = new QuizKahootModel(pool);
    const userModel = new UserModel(pool);
    const userUuid = req?.user?.uuid;

    const data = await getQuizHistoryService(
      quizKahootModel, 
      userModel
    )(userUuid!);

    res.send({
      data,
      code: 200,
      message: "Get quiz history successfully!",
    });
  } catch (error) {
    next(error);
  }
};