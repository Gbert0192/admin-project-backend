import { Request, Response, NextFunction } from "express";
import { DashboardUserModel } from "../models/dashboardUserModel.js";
import pool from "../config/database.js";
import { getQuizCompleteService } from "../services/dashboardUserServices.js";

export const GetQuizCompleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardModel = new DashboardUserModel(pool);
    const userUuid = req?.user?.uuid;
    const form = await getQuizCompleteService(dashboardModel)(userUuid!);
    res.send(200).json({
      status: "success",
      data: form,
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
    const dashboardModel = new DashboardUserModel(pool);
    const userUuid = req?.user?.uuid;
    const form = await getQuizCompleteService(dashboardModel)(userUuid!);
    res.send(200).json({
      status: "success",
      data: form,
    });
  } catch (error) {
    next(error);
  }
};
