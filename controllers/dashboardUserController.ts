import { Request, Response, NextFunction } from "express";
import { DashboardUserModel } from "../models/dashboardUserModel.js";
import pool from "../config/database.js";
import {
  GetAverageScoreService,
  GetNewestQuizService,
  getQuizCompleteService,
  GetQuizHistoryService,
  getQuizQuizCountService,
} from "../services/dashboardUserServices.js";
import { UserModel } from "../models/userModel.js";

export const GetQuizCompleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardUserModel = new DashboardUserModel(pool);
    const userModel = new UserModel(pool);
    const userUuid = req?.user?.uuid;
    const form = await getQuizCompleteService({
      dashboardUserModel,
      userModel,
    })(userUuid!);
    res.send({
      data: form,
      code: 200,
      message: "Get User Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetQuizQuizCountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardUserModel = new DashboardUserModel(pool);
    const form = await getQuizQuizCountService({
      dashboardUserModel,
    })();
    res.send({
      data: form,
      code: 200,
      message: "Get Quiz Count Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetAverageScoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardUserModel = new DashboardUserModel(pool);
    const userUuid = req?.user?.uuid;
    const userModel = new UserModel(pool);
    const form = await GetAverageScoreService({
      dashboardUserModel,
      userModel,
    })(userUuid!);
    res.send({
      data: form,
      code: 200,
      message: "Get Average Score Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetQuizHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardUserModel = new DashboardUserModel(pool);
    const userUuid = req?.user?.uuid;
    const userModel = new UserModel(pool);
    const form = await GetQuizHistoryService({
      dashboardUserModel,
      userModel,
    })(userUuid!);
    res.send({
      data: form,
      code: 200,
      message: "Get User history Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetNewestQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardUserModel = new DashboardUserModel(pool);
    const userModel = new UserModel(pool);
    const userUuid = req?.user?.uuid;
    const form = await GetNewestQuizService({ dashboardUserModel, userModel })(
      userUuid!
    );
    res.send({
      data: form,
      code: 200,
      message: "Get Newest Quiz Successfully",
    });
  } catch (error) {
    next(error);
  }
};
