import { NextFunction, Request, Response } from "express";
import { DashboardAdminModel } from "../models/dashboardAdminModel.js";
import {
  getTotalHuaweiFormsService,
  getTotalKahootFormsService,
  getTotalUsersService,
} from "../services/dashboardAdminService.js";
import pool from "../config/database.js";

export const GetTotalHuaweiFormsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const totalForms = await getTotalHuaweiFormsService(dashboardAdminModel)();
    res.send(200).json({
      status: "success",
      data: totalForms,
      message: "Total Huawei forms retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const GetTotalKahootFormsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const totalForms = await getTotalKahootFormsService(dashboardAdminModel)();
    res.send(200).json({
      status: "success",
      data: totalForms,
      message: "Total Kahoot forms retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const GetTotalUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboardAdminModel = new DashboardAdminModel(pool);
    const totalUsers = await getTotalUsersService(dashboardAdminModel)();
    res.send(200).json({
      status: "success",
      data: totalUsers,
      message: "Total users retrieved successfully!",
    });
  } catch (error) {
    next(error);
  }
};
