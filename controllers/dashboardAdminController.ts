import { NextFunction, Request, Response } from "express";
import { DashboardAdminModel } from "../models/dashboardAdminModel.js";
import {
  getTotalHuaweiFormsService,
  getTotalKahootFormsService,
  getTotalUsersService,
} from "../services/dashboardAdminService.js";
import pool from "../config/database.js";

export const GetDashboardDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const [totaluaweiForms, totalKahootForms, totalUsers] = await Promise.all([
      getTotalHuaweiFormsService(dashboardAdminModel)(),
      getTotalKahootFormsService(dashboardAdminModel)(),
      getTotalUsersService(dashboardAdminModel)(),
    ]);
    res.send({
      status: "success",
      data: {
        total_huawei_forms: Number(totaluaweiForms),
        total_kahoot_forms: Number(totalKahootForms),
        total_users: Number(totalUsers),
      },
      message: "Dashboard data retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};
