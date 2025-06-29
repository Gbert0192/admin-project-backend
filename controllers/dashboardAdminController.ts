import { NextFunction, Request, Response } from "express";
import { DashboardAdminModel } from "../models/dashboardAdminModel.js";
import {
  getTotalHuaweiFormsService,
  getTotalKahootFormsService,
  getTotalUsersService,
  getDashboardCardDescriptionsService,
  getFormCreationTrendsService,
  getHuaweiFormAttemptStatsService,
  getKahootFormAttemptStatsService,
} from "../services/dashboardAdminService.js";
import pool from "../config/database.js";

export const GetDashboardDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const [totalHuaweiForms, totalKahootForms, totalUsers, descriptions] = await Promise.all([
      getTotalHuaweiFormsService(dashboardAdminModel)(),
      getTotalKahootFormsService(dashboardAdminModel)(),
      getTotalUsersService(dashboardAdminModel)(),
      getDashboardCardDescriptionsService(dashboardAdminModel)(),
    ]);
    
    res.send({
      status: "success",
      data: {
        total_huawei_forms: Number(totalHuaweiForms),
        total_kahoot_forms: Number(totalKahootForms),
        total_users: Number(totalUsers),
        descriptions: descriptions,
      },
      message: "Dashboard data retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const GetFormCreationTrendsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { months = 12 } = req.query;
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const trends = await getFormCreationTrendsService(dashboardAdminModel)(Number(months));
    
    res.send({
      status: "success",
      data: trends,
      message: "Form creation trends retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const GetFormAttemptStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const [huaweiStats, kahootStats] = await Promise.all([
      getHuaweiFormAttemptStatsService(dashboardAdminModel)(),
      getKahootFormAttemptStatsService(dashboardAdminModel)(),
    ]);
    
    res.send({
      status: "success",
      data: {
        huawei_forms: huaweiStats,
        kahoot_forms: kahootStats,
      },
      message: "Form attempt statistics retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};
