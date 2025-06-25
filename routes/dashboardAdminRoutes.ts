import { Router } from "express";
import {
  GetTotalHuaweiFormsController,
  GetTotalKahootFormsController,
  GetTotalUsersController,
} from "../controllers/dashboardAdminController.js";

export const DashboardAdminRouter = Router();

DashboardAdminRouter.get("/total-huawei-forms", GetTotalHuaweiFormsController);
DashboardAdminRouter.get("/total-kahoot-forms", GetTotalKahootFormsController);
DashboardAdminRouter.get("/total-users", GetTotalUsersController);
